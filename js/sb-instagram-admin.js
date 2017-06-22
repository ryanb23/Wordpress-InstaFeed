jQuery(document).ready(function($) {

    //Autofill the token and id
    var hash = window.location.hash,
        token = hash.substring(14),
        id = token.split('.')[0];
    //If there's a hash then autofill the token and id
    if (hash) {
        $('#sbi_config').append('<div id="sbi_config_info"><p><b>Access Token: </b><input type="text" size=58 readonly value="' + token + '" onclick="this.focus();this.select()" title="To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac)."></p><p><b>User ID: </b><input type="text" size=12 readonly value="' + id + '" onclick="this.focus();this.select()" title="To copy, click the field then press Ctrl + C (PC) or Cmd + C (Mac)."></p><p><i class="fa fa-clipboard" aria-hidden="true"></i>&nbsp; <b><span style="color: red;">Important:</span> Copy and paste</b> these into the fields below and click <b>"Save Changes"</b>.</p></div>');
    }

    //Tooltips
    jQuery('#sbi_admin .sbi_tooltip_link').click(function() {
        jQuery(this).siblings('.sbi_tooltip').slideToggle();
    });

    jQuery('#sbi_admin label').click(function() {
        var $sbi_shortcode = jQuery(this).siblings('.sbi_shortcode');
        if ($sbi_shortcode.is(':visible')) {
            jQuery(this).siblings('.sbi_shortcode').css('display', 'none');
        } else {
            jQuery(this).siblings('.sbi_shortcode').css('display', 'block');
        }
    });

    //Single post directions
    jQuery('#sbi_admin .sbi_single_directions .sbi_one, #sbi_admin .sbi_single_directions .sbi_two .sbi_click_area').click(function() {
        console.log('click');
        jQuery(this).closest('.sbi_row').find('.sbi_tooltip').slideToggle();
    });

    //Shortcode label on hover
    jQuery('#sbi_admin label').hover(function() {
        if (jQuery(this).siblings('.sbi_shortcode').length > 0) {
            jQuery(this).attr('title', 'Click for shortcode option').append('<code class="sbi_shortcode_symbol">[]</code>');
        }
    }, function() {
        jQuery(this).find('.sbi_shortcode_symbol').remove();
    });

    //Add the color picker
    if (jQuery('.sbi_colorpick').length > 0) jQuery('.sbi_colorpick').wpColorPicker();

    //Check User ID is numeric
    jQuery("#sb_instagram_user_id").change(function() {

        var sbi_user_id = jQuery('#sb_instagram_user_id').val(),
            $sbi_user_id_error = $(this).closest('td').find('.sbi_user_id_error');

        if (sbi_user_id.match(/[^0-9, _.-]/)) {
            $sbi_user_id_error.fadeIn();
        } else {
            $sbi_user_id_error.fadeOut();
        }

    });

    //Mobile width
    var sb_instagram_feed_width = jQuery('#sbi_admin #sb_instagram_width').val(),
        sb_instagram_width_unit = jQuery('#sbi_admin #sb_instagram_width_unit').val(),
        $sb_instagram_width_options = jQuery('#sbi_admin #sb_instagram_width_options');

    if (typeof sb_instagram_feed_width !== 'undefined') {

        //Show initially if a width is set
        if ((sb_instagram_feed_width.length > 1 && sb_instagram_width_unit == 'px') || (sb_instagram_feed_width !== '100' && sb_instagram_width_unit == '%')) $sb_instagram_width_options.show();

        jQuery('#sbi_admin #sb_instagram_width, #sbi_admin #sb_instagram_width_unit').change(function() {
            sb_instagram_feed_width = jQuery('#sbi_admin #sb_instagram_width').val();
            sb_instagram_width_unit = jQuery('#sbi_admin #sb_instagram_width_unit').val();

            if (sb_instagram_feed_width.length < 2 || (sb_instagram_feed_width == '100' && sb_instagram_width_unit == '%')) {
                $sb_instagram_width_options.slideUp();
            } else {
                $sb_instagram_width_options.slideDown();
            }
        });

    }

    //Hide the location coordinates initially
    jQuery('#sbi_loc_radio_coordinates_opts').hide();

    var sbi_loc_type = 'id';
    //Toggle location id/coordinates options
    jQuery('#sbi_loc_radio_id, #sbi_loc_radio_coordinates').change(function() {
        if (jQuery('#sbi_loc_radio_id').is(':checked')) {
            jQuery('#sbi_loc_radio_id_opts').show();
            jQuery('#sbi_loc_radio_coordinates_opts').hide();
            sbi_loc_type = 'id';
        } else {
            jQuery('#sbi_loc_radio_coordinates_opts').show();
            jQuery('#sbi_loc_radio_id_opts').hide();
            sbi_loc_type = 'coordinates';
        }
    });

    //Add new location
    var sbiCoordinatesShow = false,
        $sb_instagram_coordinates_options = jQuery('#sb_instagram_coordinates_options');
    jQuery('#sb_instagram_new_coordinates').on('click', function() {
        if (sbiCoordinatesShow) {
            $sb_instagram_coordinates_options.hide();
            sbiCoordinatesShow = false;
        } else {
            $sb_instagram_coordinates_options.show();
            sbiCoordinatesShow = true;
        }

    });

    var $sb_instagram_coordinates = jQuery('#sb_instagram_coordinates'),
        sbi_coordinates = $sb_instagram_coordinates.val();
    $sb_instagram_coordinates.blur(function() {
        sbi_coordinates = $sb_instagram_coordinates.val();
    });

    jQuery('#sb_instagram_add_location').on('click', function() {
        if (sbi_coordinates.length > 0) sbi_coordinates = sbi_coordinates + ',';

        sbi_coordinates = sbi_coordinates + '(' + jQuery('#sb_instagram_lat').val() + ',' + jQuery('#sb_instagram_long').val() + ',' + jQuery('#sb_instagram_dist').val() + ')';
        $sb_instagram_coordinates.val(sbi_coordinates);

        //Clear fields
        jQuery('#sb_instagram_long').val('');
        jQuery('#sb_instagram_lat').val('');
        jQuery('#sb_instagram_loc_id').val('');
    });

    //Scroll to hash for quick links
    jQuery('#sbi_admin a').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = jQuery(this.hash);
            target = target.length ? target : this.hash.slice(1);
            if (target.length) {
                jQuery('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

    //Boxed header options
    var sb_instagram_header_style = $('#sb_instagram_header_style').val(),
        $sb_instagram_header_style_boxed_options = $('#sb_instagram_header_style_boxed_options');

    //Should we show anything initially?
    if (sb_instagram_header_style == 'circle') $sb_instagram_header_style_boxed_options.hide();
    if (sb_instagram_header_style == 'boxed') $sb_instagram_header_style_boxed_options.show();

    //When page type is changed show the relevant item
    jQuery('#sb_instagram_header_style').change(function() {
        sb_instagram_header_style = jQuery('#sb_instagram_header_style').val();

        if (sb_instagram_header_style == 'boxed') {
            $sb_instagram_header_style_boxed_options.fadeIn();
        } else {
            $sb_instagram_header_style_boxed_options.fadeOut();
        }
    });

    //Filter Table
    jQuery(document).on('keyup', '#filterInput', function() {
        var input, filter, table, tr, td, i;
        input = document.getElementById("filterInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("brand_info_table");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

    });

    jQuery(document).on('click', '[name="manage_pages[]"]', function() {
        var id = jQuery(this).data('key');
        var item = jQuery('.brand_info_keyword_'+id).html();
 
        if(jQuery('#brand_sel_item_'+id).length)
          jQuery('#brand_sel_item_'+id).remove();
        else
          jQuery('.brand_info_sel').append("<span class='brand_sel_item' id='brand_sel_item_"+id+"'>"+item+"</span>");
    });
});
