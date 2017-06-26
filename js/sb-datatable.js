jQuery(document).ready(function($) {
    var ajax_url = 'admin-ajax.php';

    jQuery.validator.setDefaults({
        success: 'valid',
        rules: {},
        errorPlacement: function(error, element) {
            error.insertBefore(element);
        },
        highlight: function(element) {
            $(element).parent('.field_container').removeClass('valid').addClass('error');
        },
        unhighlight: function(element) {
            $(element).parent('.field_container').addClass('valid').removeClass('error');
        }
    });


    // Show message
    function show_message(message_text, message_type) {
        $('#message').html('<p>' + message_text + '</p>').attr('class', message_type);
        $('#message_container').show();
        if (typeof timeout_message !== 'undefined') {
            window.clearTimeout(timeout_message);
        }
        timeout_message = setTimeout(function() {
            hide_message();
        }, 8000);
    }
    // Hide message
    function hide_message() {
        $('#message').html('').attr('class', '');
        $('#message_container').hide();
    }

    // Show loading message
    function show_loading_message() {
        $('#loading_container').show();
    }
    // Hide loading message
    function hide_loading_message() {
        $('#loading_container').hide();
    }

    // Show lightbox
    function show_lightbox(class_name) {
        var selector = '.lightbox_container';
        if (typeof(class_name) != 'undefined' && class_name != '')
            selector += '.' + class_name;
        $('.lightbox_bg').show();
        $(selector).show();
    }
    // Hide lightbox
    function hide_lightbox() {
        $('.lightbox_bg').hide();
        $('.lightbox_container').hide();
    }
    // Lightbox background
    $(document).on('click', '.lightbox_bg', function() {
        hide_lightbox();
    });
    // Lightbox close button
    $(document).on('click', '.lightbox_close', function() {
        hide_lightbox();
    });
    // Escape keyboard key
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            hide_lightbox();
        }
    });

    // Hide iPad keyboard
    function hide_ipad_keyboard() {
        document.activeElement.blur();
        $('input').blur();
    }

    //Keyword Management
    if (jQuery("#table_keywords").length) {
        var table_keywords = jQuery("#table_keywords").dataTable({
            "ajax": {
                "url": ajax_url,
                "data": function(d) {
                    d.job = 'get_keywords';
                    d.action = 'manage_keyword';
                },
                "type": "post"
            },
            "columns": [
                { "data": "id" },
                { "data": "keyword_name" },
                { "data": "country" },
                { "data": "has_perm" },
                { "data": "functions", "sClass": "functions" }
            ],
            "aoColumnDefs": [
                { "bSortable": false, "aTargets": [-1] }
            ],
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],
            "oLanguage": {
                "oPaginate": {
                    "sFirst": " ",
                    "sPrevious": " ",
                    "sNext": " ",
                    "sLast": " ",
                },
                "sLengthMenu": "Records per page: _MENU_",
                "sInfo": "Total of _TOTAL_ records (showing _START_ to _END_)",
                "sInfoFiltered": "(filtered from _MAX_ total records)"
            }
        });

        var form_keyword = $('#form_keyword');
        form_keyword.validate();

        $(document).on('click', '#bulk_keyword', function(e) {
            if (confirm("Are you sure to bulk all proper keywords?")) {
                var data = "action=manage_keyword&job=bulk_keyword";
                show_loading_message();
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: data,
                    type: 'post'
                });
                request.done(function(output) {
                    console.log(output);
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_keywords.api().ajax.reload(function() {
                            hide_loading_message();

                            show_message("Bulk operation has been done successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message('Add request failed', 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Add request failed: ' + textStatus, 'error');
                });
            }
        });

        // Add Keyword Bulk button
        $(document).on('click', '#add_keyword_bulk', function(e) {
            e.preventDefault();
            var form_keyword_bulk = $('#form_keyword_bulk');
            $('#keyword_list', form_keyword_bulk).val('');
            $('#keyword_country_name', form_keyword_bulk).val('');
            $('#is_overwrite', form_keyword_bulk).prop("checked", 0);

            show_lightbox('add_keyword_bulk');
        });
        // Add Keyword bulk submit form
        $(document).on('submit', '#form_keyword_bulk.add', function(e) {
            e.preventDefault();
            // Validate form
            var form_keyword_bulk = $('#form_keyword_bulk');
            if (form_keyword_bulk.valid() == true) {
                // Send user information to database
                hide_ipad_keyboard();
                hide_lightbox();
                show_loading_message();
                var form_data = form_keyword_bulk.serialize() + '&action=manage_keyword&job=add_keyword_list';
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: form_data,
                    type: 'post'
                });
                request.done(function(output) {
                    console.log(output);
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_keywords.api().ajax.reload(function() {
                            hide_loading_message();
                            show_message("Keyword List added successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message(output.message, 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Add request failed: ' + textStatus, 'error');
                });
            }
        });

        // Add Keyword button
        $(document).on('click', '#add_keyword', function(e) {
            e.preventDefault();
            $('.lightbox_content.add_keyword h2').text('Add Keyword');
            $('button', form_keyword).text('Add Keyword');
            form_keyword.attr('class', 'form add');
            form_keyword.attr('data-id', '');
            form_keyword.attr('data-post-id', '');
            $('.field_container label.error', form_keyword).hide();
            $('.field_container', form_keyword).removeClass('valid').removeClass('error');
            $('#keyword_name', form_keyword).val('');
            $('#keyword_name', form_keyword).prop("readonly", false);
            $('#keyword_country_name', form_keyword).val('');
            $('#page_title', form_keyword).val('');
            $('#page_permalink', form_keyword).val('');
            $('#page_content', form_keyword).val('[instagram-feed tag="top" showheader=false showcaption=true showbutton=false num=20 includewords="" post_style = "product"]');
            $('#page_is_create', form_keyword).prop("checked", true);
            disable_page_info();
            show_lightbox('add_keyword');
        });
        $(document).on('change', '#page_is_create', function(e) {
            disable_page_info();
        });

        function disable_page_info() {
            var disabled = true;
            if ($('#page_is_create', form_keyword).is(':checked'))
                disabled = false;
            $('#page_title', form_keyword).prop("readonly", disabled).removeClass('input_disabled');
            $('#page_permalink', form_keyword).prop("readonly", disabled).removeClass('input_disabled');
            $('#page_content', form_keyword).prop("readonly", disabled).removeClass('input_disabled');
            if (disabled) {
                $('#page_title', form_keyword).addClass('input_disabled');
                $('#page_permalink', form_keyword).addClass('input_disabled');
                $('#page_content', form_keyword).addClass('input_disabled');
            }
        }
        // Add Keyword submit form
        $(document).on('submit', '#form_keyword.add', function(e) {
            e.preventDefault();
            // Validate form
            if (form_keyword.valid() == true) {
                // Send user information to database
                hide_ipad_keyboard();
                hide_lightbox();
                show_loading_message();
                var form_data = $('#form_keyword').serialize() + '&action=manage_keyword&job=add_keyword';
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: form_data,
                    type: 'post'
                });
                request.done(function(output) {
                    console.log(output);
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_keywords.api().ajax.reload(function() {
                            hide_loading_message();
                            var keyword_name = $('#keyword_name').val();
                            show_message("Keyword '" + keyword_name + "' added successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message(output.message, 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Add request failed: ' + textStatus, 'error');
                });
            }
        });

        // Edit user button
        $(document).on('click', '.function_edit a', function(e) {
            e.preventDefault();
            // Get user information from database
            show_loading_message();
            var id = $(this).data('id');
            var keyword_name = $(this).data('name');
            var post_id = $(this).data('post-id');
            var request = $.ajax({
                url: ajax_url,
                cache: false,
                data: 'id=' + id + '&post_id=' + post_id + '&name=' + keyword_name + '&job=get_keyword&action=manage_keyword',
                //      dataType:     'json',
                //      contentType:  'application/json; charset=utf-8',
                type: 'post'
            });
            request.done(function(output) {
                output = JSON.parse(output);
                var page_is_create = typeof output.data[0].post_id !== 'undefined' ? true : false;

                if (output.result == 'success') {
                    var form_keyword = $('#form_keyword');
                    $('#page_is_create', form_keyword).removeAttr('checked');
                    $('.lightbox_content.add_keyword h2').text('Edit Keyword');
                    $('button', form_keyword).text('Edit Keyword');
                    form_keyword.attr('class', 'form edit');
                    form_keyword.attr('data-id', id);
                    form_keyword.attr('data-post-id', post_id);
                    form_keyword.attr('data-name', keyword_name);
                    $('.field_container label.error', form_keyword).hide();
                    $('.field_container', form_keyword).removeClass('valid').removeClass('error');
                    $('#keyword_name', form_keyword).val(keyword_name);
                    $('#keyword_country_name', form_keyword).val(output.data[0].country_name);
                    if (typeof output.data[0].post_id !== 'undefined') {
                        $('#page_title', form_keyword).val(output.data[0].page_title);
                        $('#page_content', form_keyword).val(output.data[0].page_content);
                        $('#page_permalink', form_keyword).val(output.data[0].page_permalink);
                        $('#page_is_create', form_keyword).prop("checked", page_is_create);
                    } else {
                        $('#page_title', form_keyword).val("");
                        $('#page_permalink', form_keyword).val("");
                        $('#page_is_create', form_keyword).prop("checked", page_is_create);
                        $('#page_content', form_keyword).val('[instagram-feed tag="top" showheader=false showcaption=true showbutton=false num=20 includewords="" post_style = "product"]');
                    }
                    disable_page_info();
                    hide_loading_message();
                    show_lightbox();
                } else {
                    hide_loading_message();
                    show_message('Information request failed', 'error');
                }
            });
            request.fail(function(jqXHR, textStatus) {
                hide_loading_message();
                show_message('Information request failed: ' + textStatus, 'error');
            });
        });

        // Edit keyword submit form
        $(document).on('submit', '#form_keyword.edit', function(e) {
            e.preventDefault();
            // Validate form
            if (form_keyword.valid() == true) {
                // Send user information to database
                hide_ipad_keyboard();
                hide_lightbox();
                show_loading_message();
                var id = form_keyword.attr('data-id');
                var post_id = form_keyword.attr('data-post-id');
                var keyword_name = form_keyword.attr('data-name');
                var form_data = form_keyword.serialize() + '&action=manage_keyword&job=edit_keyword&id=' + id + '&post_id=' + post_id;
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: form_data,
                    type: 'post'
                });
                request.done(function(output) {
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_keywords.api().ajax.reload(function() {
                            hide_loading_message();
                            show_message("Keyword has been changed successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message(output.message, 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Edit request failed: ' + textStatus, 'error');
                });
            }
        });

        // Delete user
        $(document).on('click', '.function_delete a', function(e) {
            e.preventDefault();
            var keyword_name = $(this).data('name');
            if (confirm("Are you sure you want to delete '" + keyword_name + "'?")) {
                show_loading_message();
                var id = $(this).data('id');
                var post_id = $(this).data('post-id');
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: 'action=manage_keyword&job=delete_keyword&id=' + id + '&keyword_name=' + keyword_name + '&post_id=' + post_id,
                    type: 'post'
                });
                request.done(function(output) {
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_keywords.api().ajax.reload(function() {
                            hide_loading_message();
                            show_message("Keyword '" + keyword_name + "' deleted successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message('Delete request failed', 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Delete request failed: ' + textStatus, 'error');
                });
            }
        });
    }

    //Company management

    if (jQuery("#table_companies").length) {
        // On page load: datatable
        var table_companies = $('#table_companies').dataTable({
            "ajax": {
                "url": ajax_url,
                "data": function(d) {
                    d.job = 'get_companies';
                    d.action = 'manage_company';
                },
                "type": "post"
            },
            "columns": [
                { "data": "id" },
                { "data": "userid" },
                { "data": "username" },
                { "data": "tags" },
                { "data": "permalink" },
                { "data": "functions", "sClass": "functions" }
            ],
            "aoColumnDefs": [
                { "bSortable": false, "aTargets": [-1] }
            ],
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],
            "oLanguage": {
                "oPaginate": {
                    "sFirst": " ",
                    "sPrevious": " ",
                    "sNext": " ",
                    "sLast": " ",
                },
                "sLengthMenu": "Records per page: _MENU_",
                "sInfo": "Total of _TOTAL_ records (showing _START_ to _END_)",
                "sInfoFiltered": "(filtered from _MAX_ total records)"
            }
        });


        var form_company = $('#form_company');
        form_company.validate();


        // Add user button
        $(document).on('click', '#add_company', function(e) {

            e.preventDefault();
            $('.lightbox_content h2').text('Add User');
            $('#form_company button').text('Add User');
            $('#form_company').attr('class', 'form add');
            $('#form_company').attr('data-id', '');
            $('#form_company .field_container label.error').hide();
            $('#form_company .field_container').removeClass('valid').removeClass('error');
            $('#form_company #userid').val('');
            $('#form_company #userid').prop("readonly", false);
            $('#form_company #username').val('');
            $('#form_company #username').prop("readonly", false);
            $('#form_company #tags').val('');
            $('#form_company #userid').removeClass('input_disabled');
            $('#form_company #username').removeClass('input_disabled');
            $('#form_company #page_title').val('');
            $('#form_company #page_title').val('');
            $('#form_company #page_permalink').val('');
            $('#form_company #page_content').val('[instagram-feed id="" showheader=false showcaption=true showbutton=false num=20  post_style = "product_influencer"]');
            show_lightbox();
        });

        // Add user submit form
        $(document).on('submit', '#form_company.add', function(e) {

            e.preventDefault();
            // Validate form
            if (form_company.valid() == true) {
                // Send user information to database
                hide_ipad_keyboard();
                hide_lightbox();
                show_loading_message();
                var form_data = $('#form_company').serialize() + '&action=manage_company&job=add_company';
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: form_data,
                    type: 'post'
                });
                request.done(function(output) {
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_companies.api().ajax.reload(function() {
                            hide_loading_message();
                            var userid = $('#userid').val();
                            show_message("User '" + userid + "' added successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message(output.message, 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Add request failed: ' + textStatus, 'error');
                });
            }
        });

        // Edit user button
        $(document).on('click', '.function_edit a', function(e) {
            e.preventDefault();
            // Get user information from database
            show_loading_message();
            var id = $(this).data('id');
            var post_id = $(this).data('post-id');
            var request = $.ajax({
                url: ajax_url,
                cache: false,
                data: 'id=' + id + '&post_id=' + post_id + '&job=get_company&action=manage_company',
                //      dataType:     'json',
                //      contentType:  'application/json; charset=utf-8',
                type: 'post'
            });
            request.done(function(output) {
                output = JSON.parse(output);

                if (output.result == 'success') {
                    $('.lightbox_content h2').text('Edit User');
                    $('#form_company button').text('Edit User');
                    $('#form_company').attr('class', 'form edit');
                    $('#form_company').attr('data-id', id);
                    $('#form_company').attr('data-post-id', post_id);
                    $('#form_company .field_container label.error').hide();
                    $('#form_company .field_container').removeClass('valid').removeClass('error');
                    $('#form_company #userid').val(output.data[0].userid);
                    $('#form_company #userid').prop("readonly", true);
                    $('#form_company #username').val(output.data[0].username);
                    $('#form_company #username').prop("readonly", true);
                    $('#form_company #tags').val(output.data[0].tags);
                    $('#form_company #page_title').val(output.data[0].page_title);
                    $('#form_company #page_permalink').val(output.data[0].page_permalink);
                    $('#form_company #page_content').val(output.data[0].page_content);
                    $('#form_company #userid').addClass('input_disabled');
                    $('#form_company #username').addClass('input_disabled');

                    hide_loading_message();
                    show_lightbox();
                } else {
                    hide_loading_message();
                    show_message('Information request failed', 'error');
                }
            });
            request.fail(function(jqXHR, textStatus) {
                hide_loading_message();
                show_message('Information request failed: ' + textStatus, 'error');
            });
        });

        // Edit user submit form
        $(document).on('submit', '#form_company.edit', function(e) {
            e.preventDefault();
            // Validate form
            if (form_company.valid() == true) {
                // Send user information to database
                hide_ipad_keyboard();
                hide_lightbox();
                show_loading_message();
                var id = $('#form_company').attr('data-id');
                var post_id = $('#form_company').attr('data-post-id');
                var form_data = $('#form_company').serialize() + '&action=manage_company&job=edit_company&id=' + id + '&post_id=' + post_id;
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: form_data,
                    type: 'post'
                });
                request.done(function(output) {
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_companies.api().ajax.reload(function() {
                            hide_loading_message();
                            var userid = $('#userid').val();
                            show_message("User '" + userid + "' edited successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message('Edit request failed', 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Edit request failed: ' + textStatus, 'error');
                });
            }
        });

        // Delete user
        $(document).on('click', '.function_delete a', function(e) {
            e.preventDefault();
            var userid = $(this).data('name');
            if (confirm("Are you sure you want to delete '" + userid + "'?")) {
                show_loading_message();
                var id = $(this).data('id');
                var post_id = $(this).data('post-id');
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: 'action=manage_company&job=delete_company&id=' + id + '&post_id=' + post_id,
                    type: 'post'
                });
                request.done(function(output) {
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_companies.api().ajax.reload(function() {
                            hide_loading_message();
                            show_message("User '" + userid + "' deleted successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message('Delete request failed', 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Delete request failed: ' + textStatus, 'error');
                });
            }
        });
    }

    // Token Management
    if (jQuery("#table_tokens").length) {
        var table_tokens = jQuery("#table_tokens").dataTable({
            "ajax": {
                "url": ajax_url,
                "data": function(d) {
                    d.job = 'get_tokens';
                    d.action = 'manage_token';
                },
                "type": "post"
            },
            "columns": [
                { "data": "id" },
                { "data": "token" },
                { "data": "is_used" },
                { "data": "functions", "sClass": "functions" }
            ],
            "aoColumnDefs": [
                { "bSortable": false, "aTargets": [-1] }
            ],
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],
            "oLanguage": {
                "oPaginate": {
                    "sFirst": " ",
                    "sPrevious": " ",
                    "sNext": " ",
                    "sLast": " ",
                },
                "sLengthMenu": "Records per page: _MENU_",
                "sInfo": "Total of _TOTAL_ records (showing _START_ to _END_)",
                "sInfoFiltered": "(filtered from _MAX_ total records)"
            }
        });

        var form_token = $('#form_token');
        form_token.validate();


        // Add Token button
        $(document).on('click', '#add_token', function(e) {
            e.preventDefault();
            $('.lightbox_content h2').text('Add Token');
            $('button', form_token).text('Add Token');
            form_token.attr('class', 'form add');
            form_token.attr('data-id', '');
            $('.field_container label.error', form_token).hide();
            $('.field_container', form_token).removeClass('valid').removeClass('error');
            $('#token', form_token).val('');
            $('#token_is_used', form_token).prop("checked", false);
            show_lightbox();
        });

        // Add Token submit form
        $(document).on('submit', '#form_token.add', function(e) {
            e.preventDefault();
            // Validate form
            if (form_token.valid() == true) {
                // Send user information to database
                hide_ipad_keyboard();
                hide_lightbox();
                show_loading_message();
                var form_data = $('#form_token').serialize() + '&action=manage_token&job=add_token';
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: form_data,
                    type: 'post'
                });
                request.done(function(output) {
                    console.log(output);
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_tokens.api().ajax.reload(function() {
                            hide_loading_message();
                            show_message("Token is added successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message('Add request failed', 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Add request failed: ' + textStatus, 'error');
                });
            }
        });

        // Edit user button
        $(document).on('click', '.function_edit a', function(e) {
            e.preventDefault();
            // Get user information from database
            var id = $(this).data('id');
            var token = $(this).data('token');
            var is_used = $(this).data('is-used');

            var form_token = $('#form_token');
            $('#token_is_used', form_token).removeAttr('checked');
            $('.lightbox_content h2').text('Edit Token');
            $('button', form_token).text('Edit Token');
            form_token.attr('class', 'form edit');
            form_token.attr('data-id', id);
            $('.field_container label.error', form_token).hide();
            $('.field_container', form_token).removeClass('valid').removeClass('error');
            $('#token', form_token).val(token);
            $('#token_is_used', form_token).prop("checked", is_used);
            show_lightbox();

        });

        // Edit Token submit form
        $(document).on('submit', '#form_token.edit', function(e) {
            e.preventDefault();
            // Validate form
            if (form_token.valid() == true) {
                // Send user information to database
                hide_ipad_keyboard();
                hide_lightbox();
                show_loading_message();
                var id = form_token.attr('data-id');
                var form_data = form_token.serialize() + '&action=manage_token&job=edit_token&id=' + id;
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: form_data,
                    type: 'post'
                });
                request.done(function(output) {
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_tokens.api().ajax.reload(function() {
                            hide_loading_message();
                            show_message("Token has been changed successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message(output.message, 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Edit request failed: ' + textStatus, 'error');
                });
            }
        });

        // Delete user
        $(document).on('click', '.function_delete a', function(e) {
            e.preventDefault();
            var token_id = $(this).data('id');
            if (confirm("Are you sure you want to delete token ?")) {
                show_loading_message();

                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: 'action=manage_token&job=delete_token&id=' + token_id,
                    type: 'post'
                });
                request.done(function(output) {
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_tokens.api().ajax.reload(function() {
                            hide_loading_message();
                            show_message("Token is deleted successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message('Delete request failed', 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Delete request failed: ' + textStatus, 'error');
                });
            }
        });
    }

    //Pagelimit Management
    if (jQuery("#table_pagelimit").length) {
        var table_pagelimit = jQuery("#table_pagelimit").dataTable({
            "ajax": {
                "url": ajax_url,
                "data": function(d) {
                    d.job = 'get_data';
                    d.action = 'manage_pagelimit';
                },
                "type": "post"
            },
            "columns": [
                { "data": "id" },
                { "data": "user_role" },
                { "data": "influencer" },
                { "data": "brand" },
                { "data": "ranking" },
                { "data": "ranking_media" },
                { "data": "search" },
                { "data": "search_media" },
                { "data": "functions", "sClass": "functions" }
            ],
            "aoColumnDefs": [
                { "bSortable": false, "aTargets": [-1] }
            ],
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],
            "oLanguage": {
                "oPaginate": {
                    "sFirst": " ",
                    "sPrevious": " ",
                    "sNext": " ",
                    "sLast": " ",
                },
                "sLengthMenu": "Records per page: _MENU_",
                "sInfo": "Total of _TOTAL_ records (showing _START_ to _END_)",
                "sInfoFiltered": "(filtered from _MAX_ total records)"
            }
        });

        var form_pagelimit = $('#form_pagelimit');
        form_pagelimit.validate();

        // Edit button
        $(document).on('click', '.function_edit a', function(e) {
            e.preventDefault();
            // Get user information from database
            show_loading_message();
            var id = $(this).data('id');
            var influencer_num = $(this).data('influencer'),
                brand_num = $(this).data('brand'),
                ranking_num = $(this).data('ranking'),
                ranking_m_num = $(this).data('ranking_media'),
                search_num = $(this).data('search'),
                search_m_num = $(this).data('search_media'),
                influencer_day = $(this).data('influencer_day'),
                brand_day = $(this).data('brand_day'),
                ranking_m_day = $(this).data('ranking_media_day'),
                search_m_day = $(this).data('search_media_day');
            form_pagelimit.attr('data-id', id);
            $('.field_container label.error', form_pagelimit).hide();
            $('.field_container', form_pagelimit).removeClass('valid').removeClass('error');

            $('#influencer_num', form_pagelimit).val(influencer_num);
            $('#brand_num', form_pagelimit).val(brand_num);
            $('#ranking_num', form_pagelimit).val(ranking_num);
            $('#ranking_m_num', form_pagelimit).val(ranking_m_num);
            $('#search_num', form_pagelimit).val(search_num);
            $('#search_m_num', form_pagelimit).val(search_m_num);

            $('#influencer_day', form_pagelimit).val(influencer_day);
            $('#brand_day', form_pagelimit).val(brand_day);
            $('#ranking_m_day', form_pagelimit).val(ranking_m_day);
            $('#search_m_day', form_pagelimit).val(search_m_day);

            hide_loading_message();
            show_lightbox();

        });

        // Edit pagelimit submit form
        $(document).on('submit', '#form_pagelimit.edit', function(e) {
            e.preventDefault();
            // Validate form
            if (form_pagelimit.valid() == true) {
                // Send user information to database
                hide_ipad_keyboard();
                hide_lightbox();
                show_loading_message();
                var id = form_pagelimit.attr('data-id');
                var form_data = form_pagelimit.serialize() + '&action=manage_pagelimit&job=edit_data&id=' + id;
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: form_data,
                    type: 'post'
                });
                request.done(function(output) {
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_pagelimit.api().ajax.reload(function() {
                            hide_loading_message();
                            show_message("Page Limit has been changed successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message(output.message, 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Edit request failed: ' + textStatus, 'error');
                });
            }
        });
    }

    //Permission Management
    if (jQuery("#table_permission").length) {
        var table_permission = jQuery("#table_permission").dataTable({
            "ajax": {
                "url": ajax_url,
                "data": function(d) {
                    d.job = 'get_data';
                    d.action = 'manage_permission';
                },
                "type": "post"
            },
            "columns": [
                { "data": "id" },
                { "data": "user_role" },
                { "data": "excel_download" },
                { "data": "label" },
                { "data": "filter_media" },
                { "data": "autoupdate" },
                { "data": "default_socialname" },
                { "data": "manage_pages" },
                { "data": "functions", "sClass": "functions" }
            ],
            "aoColumnDefs": [
                { "bSortable": false, "aTargets": [-1] }
            ],
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],
            "oLanguage": {
                "oPaginate": {
                    "sFirst": " ",
                    "sPrevious": " ",
                    "sNext": " ",
                    "sLast": " ",
                },
                "sLengthMenu": "Records per page: _MENU_",
                "sInfo": "Total of _TOTAL_ records (showing _START_ to _END_)",
                "sInfoFiltered": "(filtered from _MAX_ total records)"
            }
        });

        var form_permission = $('#form_permission');
        form_permission.validate();

        // Edit button
        $(document).on('click', '.function_edit a', function(e) {
            e.preventDefault();
            // Get user information from database
            show_loading_message();
            var id = $(this).data('id');
            var is_excel_download = $(this).data('excel_download'),
                is_label = $(this).data('label'),
                is_filter_media = $(this).data('filter_media'),
                is_autoupdate = $(this).data('autoupdate'),
                val_default_socialname = $(this).data('default_socialname'),
                val_manage_pages = $(this).data('manage_pages').toString();

            form_permission.attr('data-id', id);
            $('#excel_download', form_token).prop("checked", is_excel_download);
            $('#label', form_token).prop("checked", is_label);
            $('#filter_media', form_token).prop("checked", is_filter_media);
            $('#autoupdate', form_token).prop("checked", is_autoupdate);
            $('#default_socialname', form_token).val(val_default_socialname);
            $('#role_id', form_token).html(id);

            console.log(val_manage_pages);
            if(val_manage_pages == '')
                $tmp_arr = [];
            else
                $tmp_arr = val_manage_pages.split(',');
            $selected_brands = [];
            $(".brand_check_box").prop("checked", 0);
            $('.brand_info_sel').empty();
            for(var i=0; i<$tmp_arr.length; i++)
            {
                $item = $("[data-post-id='"+ $tmp_arr[i] + "']");
                $item.prop("checked", 1);
                $('.brand_info_sel').append("<span class='brand_sel_item' id='brand_sel_item_"+$tmp_arr[i]+"'>"+$item.data('keyword-name')+"</span>");
            }

            $('.field_container label.error', form_permission).hide();
            $('.field_container', form_permission).removeClass('valid').removeClass('error');

            $('#is_excel_download', form_permission).val(is_excel_download);

            hide_loading_message();
            show_lightbox();

        });

        // Edit pagelimit submit form
        $(document).on('submit', '#form_permission.edit', function(e) {
            e.preventDefault();
            // Validate form
            if (form_permission.valid() == true) {
                // Send user information to database
                hide_ipad_keyboard();
                hide_lightbox();
                show_loading_message();
                var id = form_permission.attr('data-id');
                var form_data = form_permission.serialize() + '&action=manage_permission&job=edit_data&id=' + id;
                var request = $.ajax({
                    url: ajax_url,
                    cache: false,
                    data: form_data,
                    type: 'post'
                });
                request.done(function(output) {
                    output = JSON.parse(output);
                    if (output.result == 'success') {
                        // Reload datable
                        table_permission.api().ajax.reload(function() {
                            hide_loading_message();
                            show_message("Role Permission has been changed successfully.", 'success');
                        }, true);
                    } else {
                        hide_loading_message();
                        show_message(output.message, 'error');
                    }
                });
                request.fail(function(jqXHR, textStatus) {
                    hide_loading_message();
                    show_message('Edit request failed: ' + textStatus, 'error');
                });
            }
        });
    }
});
