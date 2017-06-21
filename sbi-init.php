<?php

//Include the widget
require_once( dirname( __FILE__ ) . '/widget.php' );

//Include admin
include dirname( __FILE__ ) .'/instagram-feed-admin.php';
include_once dirname( __FILE__ ) .'/Mobile_Detect.php';
// include_once dirname( __FILE__ ) .'/class.phpmailer.php';
include_once dirname( __FILE__ ) .'/functions.php';

include_once dirname( __FILE__ ) .'/functions.php';
include_once dirname( __FILE__ ) .'/phpexcel/PHPExcel.php';
include_once dirname( __FILE__ ) .'/phpexcel/PHPExcel/Writer/Excel2007.php';

// Add shortcodes
if(!isset($_REQUEST['action']))
    add_shortcode('instagram-feed', 'display_sb_instagram_feed');
$category_arr = array( 
        'female' => 'Mujeres',
        'male' => 'Hombres', 
        'musica' => 'Música', 
        'deporte' => 'Deportes',
        'foodie' => 'Foodies',
        'lifestyle' => 'Lifestyle',
        'moda' => 'Moda',
        'humor' => 'Humor',
        'cine' => 'Cine',
        'tvn' => 'TVN',
        'medcom' => 'MEDCOM',
        'nextv' => 'NEXTV',
        'all' => 'Todos');

function extractKeyWords($string) {
    $stopWords = array('i','a','about','an','and','are','as','at','be','by','com','de','en','for','from','how','in','is','it','la','of','on','or','that','the','this','to','was','what','when','where','who','will','with','und','the','www','para','gracias','cuando','esta','estás','hasta','siempre','esto','estoy','tener','quien','algo','veces','entre','mas','más','mucho','muchos','todos','tienen','nosotros','estaba','todas','ustedes','aqui','aquí','vemos','otro','hace','asi','así','toda','todo','somos','qué','que','desde','eres','estas','este','estos','nada','vamos','será','sera','mientras','donde','dónde','antes','ante','tengo','otra','super','súper','ella','bajo','con','contra','hacia','por','según','sobre ','tras','las','los','del','nos','solo','gran','les','tan','mis','soy','tus','vez','tiene','sea','sin','hay','ese','eso','muy','esa','poco','junto','ver','sobre','una','pueden','como','porque','ser','si','sí','aún','aun','puedes','cosas','sus','está','puede','dar','saben','muchas','estamos','están','tanto','estar','mí','pero','fue','tal','parte','dice','cada','tú','has','casi','sido','voy','día','año','uno','dos','sé','han','tienes','hacer','quiere','sabes','misma','quieres','vienes','espero','era','esos','mejor','ahora','son','fui','después','dan','buenos','buen','mal','malos','vas','seguir','mismo','feliz','fin','ahí','hoy','ven','semana','personas','esas','menos','mes','fuera','nuestro','nuestros','manera','gusta','mucha','saber','decir','hoy','bien','nuestra','vive','vivo','hacen','dias','unos','ganas','haciendo','menos','esas','decir','podemos','siento','cuenta','van','seguir','hacen','sigue','pronto','luego','darle','importante','llegar','unos','después','mismo','mejor');
    
    $string = preg_replace('/[^\sa-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ@#_]+/u', ' ', $string); // only take alphanumerical characters, but keep the spaces and dashes too…
    $string = preg_replace('/\s\s+/i', ' ', $string); // replace whitespace
    $string = trim($string); // trim the string
    $string = strtolower($string); // make it lowercase

    $matchWords = preg_split('/\s+/', $string);
   
    foreach ( $matchWords as $key=>$item ) {
      if ( $item == '' || in_array(strtolower($item), $stopWords) || strlen($item) < 3 || !is_string($item)) {
          unset($matchWords[$key]);
      }
    }   

    $wordCountArr = array();
    if ( is_array($matchWords) ) {
      foreach ( $matchWords as $key => $val ) {
        if(is_numeric($val))
            continue;
        $val = strtolower($val);
        if ( isset($wordCountArr[$val]) ) {
          $wordCountArr[$val]++;
        } else {
          $wordCountArr[$val] = 1;
        }
      }
    }

    arsort($wordCountArr);
    $return_arr = $wordCountArr;
    $return_arr = array_slice($wordCountArr,0,200);

    return $return_arr;

}


function get_recent_media($uid_arr, $atts, $options)
{
    $page_id = get_the_ID();
    //If the caching time doesn't exist in the database then set it to be 1 hour
    ( !array_key_exists( 'sb_instagram_cache_time', $options ) ) ? $sb_instagram_cache_time = 1 : $sb_instagram_cache_time = $options['sb_instagram_cache_time'];
    ( !array_key_exists( 'sb_instagram_cache_time_unit', $options ) ) ? $sb_instagram_cache_time_unit = 'minutes' : $sb_instagram_cache_time_unit = $options['sb_instagram_cache_time_unit'];
    //Calculate the cache time in seconds
    if($sb_instagram_cache_time_unit == 'minutes') $sb_instagram_cache_time_unit = 60;
    if($sb_instagram_cache_time_unit == 'hours') $sb_instagram_cache_time_unit = 60*60;
    if($sb_instagram_cache_time_unit == 'days') $sb_instagram_cache_time_unit = 60*60*24;
    $cache_seconds = intval($sb_instagram_cache_time) * intval($sb_instagram_cache_time_unit);

    ($sb_instagram_cache_time == 0 || $sb_instagram_cache_time == '0') ? $sb_instagram_disable_cache = 'true' : $sb_instagram_disable_cache = 'false';

    $text_result_arr = '';
    foreach($uid_arr as $sb_tmp_id) {

        //if followers_min and max are set, get followed_by value and filter the users
        $sb_instagram_followers_min = $atts['followers_min'];
        $sb_instagram_followers_max = $atts['followers_max'];
        if($sb_instagram_followers_min != "" || $sb_instagram_followers_max != "" || $page_id ==3046)
        {
            $sbi_header_transient_name = 'sbi_header_' . trim($sb_tmp_id);
            $sbi_header_transient_name = substr($sbi_header_transient_name, 0, 45);
            $sbi_header_cache_exists = get_transient( $sbi_header_transient_name );
            $header_tmp = null;
            if($sb_instagram_disable_cache != 'true' && $sbi_header_cache_exists)
            {   
                $header_tmp = json_decode($sbi_header_cache_exists);
                if(!$header_tmp)
                    $header_tmp = json_decode(stripcslashes($sbi_header_cache_exists));
            }
            if(!$header_tmp)
            {
                $url = 'https://api.instagram.com/v1/users/' . trim($sb_tmp_id). '?access_token=' . trim($options['sb_instagram_at']);
                $ret = get_url_content($url);
                $header_tmp = json_decode($ret);
                if(check_api_limit($header_tmp)) {
                    return false;
                }
                set_transient( $sbi_header_transient_name, $ret, $cache_seconds );
            }
            if(!$header_tmp)
                continue;
            if(isset($header_tmp->data->counts->followed_by))
                $followers = $header_tmp->data->counts->followed_by;
            else
                $followers = 0;
            if(($sb_instagram_followers_min != "" && $followers < $sb_instagram_followers_min) || ($sb_instagram_followers_max != "" && $followers > $sb_instagram_followers_max))
                continue;

            if($page_id == 3046){

                if(isset($search_post_param['follower_min_select']) && isset($search_post_param['follower_min_select']))
                {
                    $search_follower_min = $search_post_param['follower_min_select'];
                    $search_follower_max = $search_post_param['follower_max_select'];

                    if($followers < $search_follower_min)
                        continue;
                    if($followers > $search_follower_max && $search_follower_max != '1')
                        continue;
                }
            }
        }
            
        //if header cache exists, get cache .

        $sbi_header_ranking_transient_name = 'sbi_header_ranking_' . $atts['num'].'_'. trim($sb_tmp_id);
        $sbi_header_ranking_transient_name = substr($sbi_header_ranking_transient_name,0,45);
        //delete_transient($sbi_header_ranking_transient_name);
        $sbi_header_ranking_cache_exists = get_transient( $sbi_header_ranking_transient_name );
        //var_dump($sbi_transient_name);var_dump($sbi_header_ranking_cache_exists);

        $tmp = null;
        if($sb_instagram_disable_cache != 'true' && $sbi_header_ranking_cache_exists){
            $tmp = json_decode($sbi_header_ranking_cache_exists);
            if(!$tmp)
                $tmp = json_decode(stripslashes($sbi_header_ranking_cache_exists));
        }
        // var_dump($sb_instagram_disable_cache);die;
        if(!$tmp){
            // var_dump(json_decode($sbi_header_ranking_cache_exists));
            // $url ='https://api.instagram.com/v1/users/' . trim($sb_tmp_id) . '&access_token=' . trim($options['sb_instagram_at']);
            $url = "https://api.instagram.com/v1/users/".trim($sb_tmp_id)."/media/recent?access_token=" . trim($options['sb_instagram_at']) . "&count=".$atts['num']."&_=".trim($sb_tmp_id);
            $ret = get_url_content($url);
            $tmp = json_decode($ret);
            $is_expired = check_api_limit($tmp);
            if($is_expired){
                $sb_instagram_content = expire_html();
                return $sb_instagram_content;
            }
            set_transient( $sbi_header_ranking_transient_name, $ret, $cache_seconds);
        }

        if(!$tmp) {
            continue;
        }
        if(!isset($tmp->data))
            continue;
        foreach($tmp->data as $tmp_obj)
        {
            //check if text contains keywords
            if(!isset($tmp_obj->caption->text))
                continue;
            $text = strtolower($tmp_obj->caption->text);
            $text_result_arr .= trim($text);
        }
    }
    return extractKeyWords($text_result_arr);
}
function display_sb_instagram_feed($atts, $content = null) {
    global $wpdb; 
    global $category_arr;
    /******************* SHORTCODE OPTIONS ********************/
    $page_id = get_the_ID();

    $options = get_option('sb_instagram_settings');
    $search_post_param = array();
    $search_post_param['category_select'] = array_keys($category_arr)[0];
    if($page_id == 3046){
        if(isset($_POST['category_select']))
            $search_post_param['category_select'] = $_POST['category_select'];
        if(isset($_POST['input_keywords']) && $_POST['input_keywords'] == '.....')
            unset($_POST['input_keywords']);
        if(isset($_POST['input_keywords']) && $_POST['input_keywords'] != ''){
            $include_keywords_custom = $_POST['input_keywords'];
            $atts['includewords'] = $include_keywords_custom;
            $search_post_param['category_select'] = $_POST['category_select'];
            $search_post_param['follower_min_select'] = $_POST['follower_min_select'];
            $search_post_param['follower_max_select'] = $_POST['follower_max_select'];
        }else
        {
            $include_keywords_custom = $atts['includewords'];
        }
    }
    //Check Access_token Expire
    // $url = 'https://api.instagram.com/v1/users/self/?access_token=' . $options['sb_instagram_at'];

    // //$url = "https://api.instagram.com/v1/users/279594584/media/recent?access_token=".trim($options['sb_instagram_at']);
    // $ret = get_url_content($url);
    // $check_result = json_decode($ret);
    // $is_expired = check_api_limit($check_result);
    // if ($is_expired) {

    //     $sb_instagram_content = expire_html();
    //     return $sb_instagram_content;
    // }

    //Create the includes string to set as shortcode default
    $hover_include_string = '';
    if( isset($options[ 'sbi_hover_inc_username' ]) ){
        ($options[ 'sbi_hover_inc_username' ] && $options[ 'sbi_hover_inc_username' ] !== '') ? $hover_include_string .= 'username,' : $hover_include_string .= '';
    }
    //If the username option doesn't exist in the database yet (eg: on plugin update) then set it to be displayed
    if ( !array_key_exists( 'sbi_hover_inc_username', $options ) ) $hover_include_string .= 'username,';

    if( isset($options[ 'sbi_hover_inc_icon' ]) ){
        ($options[ 'sbi_hover_inc_icon' ] && $options[ 'sbi_hover_inc_icon' ] !== '') ? $hover_include_string .= 'icon,' : $hover_include_string .= '';
    }
    if ( !array_key_exists( 'sbi_hover_inc_icon', $options ) ) $hover_include_string .= 'icon,';

    if( isset($options[ 'sbi_hover_inc_date' ]) ){
        ($options[ 'sbi_hover_inc_date' ] && $options[ 'sbi_hover_inc_date' ] !== '') ? $hover_include_string .= 'date,' : $hover_include_string .= '';
    }
    if ( !array_key_exists( 'sbi_hover_inc_date', $options ) ) $hover_include_string .= 'date,';

    if( isset($options[ 'sbi_hover_inc_instagram' ]) ){
        ($options[ 'sbi_hover_inc_instagram' ] && $options[ 'sbi_hover_inc_instagram' ] !== '') ? $hover_include_string .= 'instagram,' : $hover_include_string .= '';
    }
    if ( !array_key_exists( 'sbi_hover_inc_instagram', $options ) ) $hover_include_string .= 'instagram,';

    if( isset($options[ 'sbi_hover_inc_location' ]) ){
        ($options[ 'sbi_hover_inc_location' ] && $options[ 'sbi_hover_inc_location' ] !== '') ? $hover_include_string .= 'location,' : $hover_include_string .= '';
    }
    if( isset($options[ 'sbi_hover_inc_caption' ]) ){
        ($options[ 'sbi_hover_inc_caption' ] && $options[ 'sbi_hover_inc_caption' ] !== '') ? $hover_include_string .= 'caption,' : $hover_include_string .= '';
    }
    if( isset($options[ 'sbi_hover_inc_likes' ]) ){
        ($options[ 'sbi_hover_inc_likes' ] && $options[ 'sbi_hover_inc_likes' ] !== '') ? $hover_include_string .= 'likes,' : $hover_include_string .= '';
    }
    
    //Pass in shortcode attrbutes
    $atts = shortcode_atts(
    array(
        'type' => isset($options[ 'sb_instagram_type' ]) ? $options[ 'sb_instagram_type' ] : '',
        'id' => isset($options[ 'sb_instagram_user_id' ]) ? $options[ 'sb_instagram_user_id' ] : '',
        'tag' => isset($options[ 'sb_instagram_user_tag' ]) ? $options[ 'sb_instagram_user_tag' ] : '',
        'hashtag' => isset($options[ 'sb_instagram_hashtag' ]) ? $options[ 'sb_instagram_hashtag' ] : '',
        'location' => isset($options[ 'sb_instagram_location' ]) ? $options[ 'sb_instagram_location' ] : '',
        'coordinates' => isset($options[ 'sb_instagram_coordinates' ]) ? $options[ 'sb_instagram_coordinates' ] : '',
	    'single' => '',
        'width' => isset($options[ 'sb_instagram_width' ]) ? $options[ 'sb_instagram_width' ] : '',
        'widthunit' => isset($options[ 'sb_instagram_width_unit' ]) ? $options[ 'sb_instagram_width_unit' ] : '',
        'widthresp' => isset($options[ 'sb_instagram_feed_width_resp' ]) ? $options[ 'sb_instagram_feed_width_resp' ] : '',
        'height' => isset($options[ 'sb_instagram_height' ]) ? $options[ 'sb_instagram_height' ] : '',
        'heightunit' => isset($options[ 'sb_instagram_height_unit' ]) ? $options[ 'sb_instagram_height_unit' ] : '',
        'sortby' => isset($options[ 'sb_instagram_sort' ]) ? $options[ 'sb_instagram_sort' ] : '',
        'disablelightbox' => isset($options[ 'sb_instagram_disable_lightbox' ]) ? $options[ 'sb_instagram_disable_lightbox' ] : '',
        'num' => isset($options[ 'sb_instagram_num' ]) ? $options[ 'sb_instagram_num' ] : '',
        'keywords' => isset($options[ 'sb_instagram_custom_keywords' ]) ? $options[ 'sb_instagram_custom_keywords' ] : '',
        'cols' => isset($options[ 'sb_instagram_cols' ]) ? $options[ 'sb_instagram_cols' ] : '',
        'disablemobile' => isset($options[ 'sb_instagram_disable_mobile' ]) ? $options[ 'sb_instagram_disable_mobile' ] : '',
        'imagepadding' => isset($options[ 'sb_instagram_image_padding' ]) ? $options[ 'sb_instagram_image_padding' ] : '',
        'imagepaddingunit' => isset($options[ 'sb_instagram_image_padding_unit' ]) ? $options[ 'sb_instagram_image_padding_unit' ] : '',

        //Photo hover styles
        'hovereffect' => isset($options[ 'sb_instagram_hover_effect' ]) ? $options[ 'sb_instagram_hover_effect' ] : '',
        'hovercolor' => isset($options[ 'sb_hover_background' ]) ? $options[ 'sb_hover_background' ] : '',
        'hovertextcolor' => isset($options[ 'sb_hover_text' ]) ? $options[ 'sb_hover_text' ] : '',
        'hoverdisplay' => $hover_include_string,

        'background' => isset($options[ 'sb_instagram_background' ]) ? $options[ 'sb_instagram_background' ] : '',
        'showbutton' => isset($options[ 'sb_instagram_show_btn' ]) ? $options[ 'sb_instagram_show_btn' ] : '',
        'buttoncolor' => isset($options[ 'sb_instagram_btn_background' ]) ? $options[ 'sb_instagram_btn_background' ] : '',
        'buttontextcolor' => isset($options[ 'sb_instagram_btn_text_color' ]) ? $options[ 'sb_instagram_btn_text_color' ] : '',
        'buttontext' => isset($options[ 'sb_instagram_btn_text' ]) ? stripslashes( esc_attr( $options[ 'sb_instagram_btn_text' ] ) ) : '',
        'imageres' => isset($options[ 'sb_instagram_image_res' ]) ? $options[ 'sb_instagram_image_res' ] : '',
        'media' => isset($options[ 'sb_instagram_media_type' ]) ? $options[ 'sb_instagram_media_type' ] : '',
        'showcaption' => isset($options[ 'sb_instagram_show_caption' ]) ? $options[ 'sb_instagram_show_caption' ] : '',
        'captionlength' => isset($options[ 'sb_instagram_caption_length' ]) ? $options[ 'sb_instagram_caption_length' ] : '',
        'captioncolor' => isset($options[ 'sb_instagram_caption_color' ]) ? $options[ 'sb_instagram_caption_color' ] : '',
        'captionsize' => isset($options[ 'sb_instagram_caption_size' ]) ? $options[ 'sb_instagram_caption_size' ] : '',
        'showlikes' => isset($options[ 'sb_instagram_show_meta' ]) ? $options[ 'sb_instagram_show_meta' ] : '',
        'likescolor' => isset($options[ 'sb_instagram_meta_color' ]) ? $options[ 'sb_instagram_meta_color' ] : '',
        'likessize' => isset($options[ 'sb_instagram_meta_size' ]) ? $options[ 'sb_instagram_meta_size' ] : '',
        'hidephotos' => isset($options[ 'sb_instagram_hide_photos' ]) ? $options[ 'sb_instagram_hide_photos' ] : '',

        'showfollow' => isset($options[ 'sb_instagram_show_follow_btn' ]) ? $options[ 'sb_instagram_show_follow_btn' ] : '',
        'followcolor' => isset($options[ 'sb_instagram_folow_btn_background' ]) ? $options[ 'sb_instagram_folow_btn_background' ] : '',
        'followtextcolor' => isset($options[ 'sb_instagram_follow_btn_text_color' ]) ? $options[ 'sb_instagram_follow_btn_text_color' ] : '',
        'followtext' => isset($options[ 'sb_instagram_follow_btn_text' ]) ? stripslashes( esc_attr( $options[ 'sb_instagram_follow_btn_text' ] ) ) : '',
        //Header
        'showheader' => isset($options[ 'sb_instagram_show_header' ]) ? $options[ 'sb_instagram_show_header' ] : '',
        'post_style' => isset($options[ 'sb_instagram_post_style' ]) ? $options[ 'sb_instagram_post_style' ] : '',
        'headercolor' => isset($options[ 'sb_instagram_header_color' ]) ? $options[ 'sb_instagram_header_color' ] : '',
        'headerstyle' => isset($options[ 'sb_instagram_header_style' ]) ? $options[ 'sb_instagram_header_style' ] : '',
        'showfollowers' => isset($options[ 'sb_instagram_show_followers' ]) ? $options[ 'sb_instagram_show_followers' ] : '',
        'showbio' => isset($options[ 'sb_instagram_show_bio' ]) ? $options[ 'sb_instagram_show_bio' ] : '',
        'headerprimarycolor' => isset($options[ 'sb_instagram_header_primary_color' ]) ? $options[ 'sb_instagram_header_primary_color' ] : '',
        'headersecondarycolor' => isset($options[ 'sb_instagram_header_secondary_color' ]) ? $options[ 'sb_instagram_header_secondary_color' ] : '',

        'class' => '',
        'ajaxtheme' => isset($options[ 'sb_instagram_ajax_theme' ]) ? $options[ 'sb_instagram_ajax_theme' ] : '',
        'cachetime' => isset($options[ 'sb_instagram_cache_time' ]) ? $options[ 'sb_instagram_cache_time' ] : '',
        'blockusers' => isset($options[ 'sb_instagram_block_users' ]) ? $options[ 'sb_instagram_block_users' ] : '',
        'excludewords' => isset($options[ 'sb_instagram_exclude_words' ]) ? $options[ 'sb_instagram_exclude_words' ] : '',
        'includewords' => isset($options[ 'sb_instagram_include_words' ]) ? $options[ 'sb_instagram_include_words' ] : '',
        'maxrequests' => isset($options[ 'sb_instagram_requests_max' ]) ? $options[ 'sb_instagram_requests_max' ] : '',

        //Carousel
        'carousel' => isset($options[ 'sb_instagram_carousel' ]) ? $options[ 'sb_instagram_carousel' ] : '',
        'carouselarrows' => isset($options[ 'sb_instagram_carousel_arrows' ]) ? $options[ 'sb_instagram_carousel_arrows' ] : '',
        'carouselpag' => isset($options[ 'sb_instagram_carousel_pag' ]) ? $options[ 'sb_instagram_carousel_pag' ] : '',
        'carouselautoplay' => isset($options[ 'sb_instagram_carousel_autoplay' ]) ? $options[ 'sb_instagram_carousel_autoplay' ] : '',
        'carouseltime' => isset($options[ 'sb_instagram_carousel_interval' ]) ? $options[ 'sb_instagram_carousel_interval' ] : '',

        'followers_min' => isset($options[ 'sb_instagram_followers_min' ]) ? $options[ 'sb_instagram_followers_min' ] : '',
        'followers_max' => isset($options[ 'sb_instagram_followers_max' ]) ? $options[ 'sb_instagram_followers_max' ] : '',
        'brands' => isset($options[ 'brands' ]) ? $options[ 'brands' ] : '',
        'country' => isset($options[ 'country' ]) ? $options[ 'country' ] : '',
        'limit' => isset($options[ 'limit' ]) ? $options[ 'limit' ] : '',
        'title' => '',
        'keywordtype' => '',
        'pagetype' => 'single',
        'days' => '',
        'showavatar' => false,
        'showexcel' => true,
        'showhighlight' => true
    ), $atts);

    /******************* VARS ********************/

    $atts['imageres'] = isset($options[ 'sb_instagram_image_res' ]) ? $options[ 'sb_instagram_image_res' ] : '';
    
    $page_title = $atts['title'];
    $keywordType = $atts['keywordtype'];
    $pageType = $atts['pagetype'];
    $strMediaDays = $atts['days'];
    $showAvatar = ($atts['showavatar'] === 'true' || $atts['showavatar'] === true) ? true: false;
    $showexcel = ($atts['showexcel'] === 'true' || $atts['showexcel'] === true) ? true: false;
    $showhighlight = ($atts['showhighlight'] === 'true' || $atts['showhighlight'] === true) ? true: false;
    $mediaDays = null;

    $sb_page_limit = unserialize($options['sb_instagram_pagelimit']);
    $influencer_view_limit = null;
    $brand_view_limit = null;
    $ranking_view_limit = null;
    $ranking_media_view_limit = null;
    $search_view_limit = null;
    $search_media_view_limit = null;

    $influencer_view_limit_day = null;
    $brand_view_limit_day = null;
    $ranking_media_view_limit_day = null;
    $search_media_view_limit_day = null;

    $current_user = wp_get_current_user();
    $user_roles = $current_user->roles;
    foreach ($user_roles as $role_item)
    {
        if(!isset($sb_page_limit[$role_item]))
            continue;
        $influencer_view_limit = ($sb_page_limit[$role_item]['influencer'] > $influencer_view_limit)?$sb_page_limit[$role_item]['influencer']:$influencer_view_limit;
        $brand_view_limit = ($sb_page_limit[$role_item]['brand'] > $brand_view_limit)?$sb_page_limit[$role_item]['brand']:$brand_view_limit;
        $ranking_media_view_limit = ($sb_page_limit[$role_item]['ranking_media'] > $ranking_media_view_limit)?$sb_page_limit[$role_item]['ranking_media']:$ranking_media_view_limit;
        $search_media_view_limit = ($sb_page_limit[$role_item]['search_media'] > $search_media_view_limit)?$sb_page_limit[$role_item]['search_media']:$search_media_view_limit;

        if(!isset($sb_page_limit[$role_item]['influencer_day'])) $sb_page_limit[$role_item]['influencer_day'] = null;
        if(!isset($sb_page_limit[$role_item]['brand_day'])) $sb_page_limit[$role_item]['brand_day'] = null;
        if(!isset($sb_page_limit[$role_item]['ranking_media_day'])) $sb_page_limit[$role_item]['ranking_media_day'] = null;
        if(!isset($sb_page_limit[$role_item]['search_media_day'])) $sb_page_limit[$role_item]['search_media_day'] = null;


        $influencer_view_limit_day = ($sb_page_limit[$role_item]['influencer_day'] > $influencer_view_limit_day)?$sb_page_limit[$role_item]['influencer_day']:$influencer_view_limit_day;
        $brand_view_limit_day = ($sb_page_limit[$role_item]['brand_day'] > $brand_view_limit_day)?$sb_page_limit[$role_item]['brand_day']:$brand_view_limit_day;
        $ranking_media_view_limit_day = ($sb_page_limit[$role_item]['ranking_media_day'] > $ranking_media_view_limit_day)?$sb_page_limit[$role_item]['ranking_media_day']:$ranking_media_view_limit_day;
        $search_media_view_limit_day = ($sb_page_limit[$role_item]['search_media_day'] > $search_media_view_limit_day)?$sb_page_limit[$role_item]['search_media_day']:$search_media_view_limit_day;

    }
    if(isset($atts['num']))
    {
        $influencer_view_limit  = ($influencer_view_limit == null) ? $atts['num'] : $influencer_view_limit;
        $brand_view_limit       = ($brand_view_limit == null) ? $atts['num'] : $brand_view_limit;
        $ranking_media_view_limit = ($ranking_media_view_limit == null) ? $atts['num'] :  $ranking_media_view_limit;
        $search_media_view_limit = ($search_media_view_limit == null) ? $atts['num'] :  $search_media_view_limit;
    }
    if(isset($atts['days']))
    {
        $influencer_view_limit_day  = ($influencer_view_limit_day == null) ? $atts['days'] : $influencer_view_limit_day;
        $brand_view_limit_day       = ($brand_view_limit_day == null) ? $atts['days'] : $brand_view_limit_day;
        $ranking_media_view_limit_day = ($ranking_media_view_limit_day == null) ? $atts['days'] :  $ranking_media_view_limit_day;
        $search_media_view_limit_day = ($search_media_view_limit_day == null) ? $atts['days'] :  $search_media_view_limit_day;
    }

    foreach ($user_roles as $role_item)
    {
        if(!isset($sb_page_limit[$role_item]))
            continue;
        $ranking_view_limit = ($sb_page_limit[$role_item]['ranking'] > $ranking_view_limit)?$sb_page_limit[$role_item]['ranking']:$ranking_view_limit;
        $search_view_limit = ($sb_page_limit[$role_item]['search'] > $search_view_limit)?$sb_page_limit[$role_item]['search']:$search_view_limit;
    }

    if((isset($atts['limit']) && $atts['limit'] != '' && $atts['limit'] != 0))
    {
        $ranking_view_limit     = ($ranking_view_limit == null) ? $atts['limit'] : $ranking_view_limit;
        $search_view_limit      = ($search_view_limit == null) ? $atts['limit'] : $search_view_limit;
    }

    $sb_instagram_post_style = $atts['post_style'];
    switch ($sb_instagram_post_style)
    {
        case "product_influencer":
            $atts['num'] = ($influencer_view_limit != null)? $influencer_view_limit: $options['sb_instagram_num'];
            $page_title = !empty($page_title) ? $page_title : "MARCAS MENCIONADAS POR EL INFLUENCER";
            $keywordType = !empty($keywordType) ? $keywordType : "MARCAS";
            if($strMediaDays != '')
                $mediaDays = get_day($influencer_view_limit_day);
            break;
        case "product":
            $atts['num'] = ($brand_view_limit != null)? $brand_view_limit: $options['sb_instagram_num'];
            $page_title = !empty($page_title) ? $page_title : "INFLUENCERS QUE MENCIONARON LA MARCA";
            $keywordType = !empty($keywordType) ? $keywordType : "INFLUENCERS";
            if($strMediaDays != '')
                $mediaDays = get_day($brand_view_limit_day);
            break;
        case "list":
            if($page_id == 3046) {
                $atts['num'] = ($search_media_view_limit != null) ? $search_media_view_limit : $options['sb_instagram_num'];
                $mediaDays = get_day($search_media_view_limit_day);
            }
            else {

                $atts['num'] = ($ranking_media_view_limit != null) ? $ranking_media_view_limit : $options['sb_instagram_num'];
                $mediaDays = get_day($ranking_media_view_limit_day);
            }
            break;
        default:
//            $atts['num'] = $options['sb_instagram_num'];
            break;
    }
    if($page_id == 6488)
        $atts['num'] = 5;
//    echo $atts['num'];die;
    //Detect Mobile and if yes, set num=10
    $detect = new Mobile_Detect;
    if ( $detect->isMobile() ) {

//        $atts['num'] = 10;
    }
    //$atts['num'] = 10;
    //Config
    $where_cond = '';
    if($page_id == 3046)
    {
        if(isset($search_post_param['category_select']))
        {
            if($search_post_param['category_select'] != 'all')
                $where_cond = "AND tags REGEXP '[[:<:]]".$search_post_param['category_select']."[[:>:]]' AND tags REGEXP '[[:<:]]panama[[:>:]]'";
        }
    }

    $sb_instagram_type = trim($atts['type']);
    $sb_instagram_user_id = trim($atts['id'], " ,");
    $sb_instagram_tag = trim($atts['tag']);
    $sb_instagram_user_permalinks = [];

    if($sb_instagram_tag != '' ){
        //If tag attr is set, then generate user id list
        //tag can be comma separated.
        $tag_arr = explode(',',$sb_instagram_tag);
        $user_ids = [];
        foreach($tag_arr as $tag){
            $tag_arr1 = explode('|',$tag);
            $query = "select * from wpsb_tags WHERE (1=1) ";
            foreach($tag_arr1 as $tag1)
            {
                $tag1 = strtolower(trim($tag1));
                $query .= " AND tags REGEXP '[[:<:]]".trim($tag1)."[[:>:]]' ";
            }
            $query .= $where_cond;
            $result = $wpdb->get_results($query);
            if(!$result)
                continue;
            foreach($result as $row){
                if(!(in_array($row->userid,$user_ids)))
                    $user_ids[] = $row->userid;
                $sb_instagram_user_permalinks[$row->userid] = $row->post_id ? get_permalink($row->post_id) : null;
            }
        }
        //var_dump($user_ids);

        $sb_instagram_user_id = implode(",",$user_ids);
        // echo $sb_instagram_user_id;
    }

    $keywords = explode("\r\n", $options['sb_instagram_custom_keywords']);
    $sb_instagram_custom_brands = trim($atts['brands']);
    $sb_instagram_custom_country = trim($atts['country']);

    $brand_country_arr = explode(",",$sb_instagram_custom_country);
    $sb_instagram_brand_country = unserialize($options['sb_instagram_brand_country']);
    foreach($sb_instagram_brand_country as $key => &$value){
        if(trim($value) == "")
            unset($sb_instagram_brand_country[$key]);
        else
            $value = explode(",",$value);
    }
    $keywords_by_country = array();

    foreach($keywords as $keyword_item)
    {
        $keyword_item = trim(strtolower($keyword_item));
        if(isset($sb_instagram_brand_country[$keyword_item])) {
            foreach($sb_instagram_brand_country[$keyword_item] as $tmp_country_item) {
                $tmp_country_item = strtolower(trim($tmp_country_item));
                $keywords_by_country[$tmp_country_item][] = $keyword_item;
            }
        }else{
            $keywords_by_country['panama'][] = $keyword_item;
        }
    }

    //if post_style == product_influencer set includeWords to use ALL the custom keywords
    if($atts['post_style'] == 'product_influencer') 
    {
        if($sb_instagram_custom_brands != '') {
            if($sb_instagram_custom_brands == ",") {
                $custom_keywords_arr=[];
                $atts['includewords'] = '';
                $keywords = $custom_keywords_arr;
            }else {
                $atts['includewords'] = $sb_instagram_custom_brands;
                $keywords = explode(",", $sb_instagram_custom_brands);
            }
        }else if($sb_instagram_custom_country != ''){
            $custom_keywords_arr = array();

            foreach($brand_country_arr as $brand_country_item){
                $brand_country_item = strtolower(trim($brand_country_item));
                $custom_keywords_arr = array_unique(array_merge($custom_keywords_arr,$keywords_by_country[$brand_country_item]), SORT_REGULAR);
            }
            $atts['includewords'] = implode(",",$custom_keywords_arr);
            $keywords = $custom_keywords_arr;
        }else{
            $brand_country_item = "panama";
            $custom_keywords_arr = $keywords_by_country[$brand_country_item];
            $atts['includewords'] = implode(",", $custom_keywords_arr);
            $keywords = $custom_keywords_arr;
        }
    }

    $sb_instagram_hashtag = trim(str_replace( '#', '', trim($atts['hashtag']) ), " ,"); //Remove hashtags and trailing commas
    $sb_instagram_location = trim($atts['location'], " ,");
    $sb_instagram_coordinates = trim($atts['coordinates'], " ,");
	$sb_instagram_single = trim($atts['single'], " ,");


	//Container styles
    $sb_instagram_width = $atts['width'];
    $sb_instagram_width_unit = $atts['widthunit'];
    $sb_instagram_height = $atts['height'];
    $sb_instagram_height_unit = $atts['heightunit'];
    $sb_instagram_image_padding = $atts['imagepadding'];
    $sb_instagram_image_padding_unit = $atts['imagepaddingunit'];
    $sb_instagram_background = str_replace('#', '', $atts['background']);
    $sb_hover_background = $atts['hovercolor'];
    $sb_hover_text = str_replace('#', '', $atts['hovertextcolor']);

    //Set to be 100% width on mobile?
    $sb_instagram_width_resp = $atts[ 'widthresp' ];
    ( $sb_instagram_width_resp == 'on' || $sb_instagram_width_resp == 'true' || $sb_instagram_width_resp == true ) ? $sb_instagram_width_resp = true : $sb_instagram_width_resp = false;
    if( $atts[ 'widthresp' ] == 'false' ) $sb_instagram_width_resp = false;

    //Layout options
    $sb_instagram_cols = $atts['cols'];

    $sb_instagram_styles = 'style="';
    if($sb_instagram_cols == 1) $sb_instagram_styles .= 'max-width: 640px; ';
    if ( !empty($sb_instagram_width) ) $sb_instagram_styles .= 'width:' . $sb_instagram_width . $sb_instagram_width_unit .'; ';
    if ( !empty($sb_instagram_height) && $sb_instagram_height != '0' ) $sb_instagram_styles .= 'height:' . $sb_instagram_height . $sb_instagram_height_unit .'; ';
    if ( !empty($sb_instagram_background) ) $sb_instagram_styles .= 'background-color: #' . $sb_instagram_background . '; ';
    if ( !empty($sb_instagram_image_padding) ) $sb_instagram_styles .= 'padding-bottom: ' . (2*intval($sb_instagram_image_padding)).$sb_instagram_image_padding_unit . '; ';
    $sb_instagram_styles .= '"';

    //Header
    $sb_instagram_show_header = $atts['showheader'];
    ( $sb_instagram_show_header == 'on' || $sb_instagram_show_header == 'true' || $sb_instagram_show_header == true ) ? $sb_instagram_show_header = true : $sb_instagram_show_header = false;
    if( $atts[ 'showheader' ] === 'false' ) $sb_instagram_show_header = false;

    $sb_instagram_header_style = $atts['headerstyle'];

    $sb_instagram_show_followers = $atts['showfollowers'];
    ( $sb_instagram_show_followers == 'on' || $sb_instagram_show_followers == 'true' || $sb_instagram_show_followers ) ? $sb_instagram_show_followers = 'true' : $sb_instagram_show_followers = 'false';
    if( $atts[ 'showfollowers' ] === 'false' ) $sb_instagram_show_followers = false;
    //As this is a new option in the update then set it to be true if it doesn't exist yet
    if ( !array_key_exists( 'sb_instagram_show_followers', $options ) ) $sb_instagram_show_followers = 'true';

    $sb_instagram_show_bio = $atts['showbio'];
    ( $sb_instagram_show_bio == 'on' || $sb_instagram_show_bio == 'true' || $sb_instagram_show_bio ) ? $sb_instagram_show_bio = 'true' : $sb_instagram_show_bio = 'false';
    if( $atts[ 'showbio' ] === 'false' ) $sb_instagram_show_bio = false;
    //As this is a new option in the update then set it to be true if it doesn't exist yet
    if ( !array_key_exists( 'sb_instagram_show_bio', $options ) ) $sb_instagram_show_bio = 'true';

    $sb_instagram_header_color = str_replace('#', '', $atts['headercolor']);

    $sb_instagram_header_primary_color = str_replace('#', '', $atts['headerprimarycolor']);
    $sb_instagram_header_secondary_color = str_replace('#', '', $atts['headersecondarycolor']);

    //Load more button
    $sb_instagram_show_btn = $atts['showbutton'];
    ( $sb_instagram_show_btn == 'on' || $sb_instagram_show_btn == 'true' || $sb_instagram_show_btn == true ) ? $sb_instagram_show_btn = true : $sb_instagram_show_btn = false;
    if( $atts[ 'showbutton' ] === 'false' ) $sb_instagram_show_btn = false;

    $sb_instagram_btn_background = str_replace('#', '', $atts['buttoncolor']);
    $sb_instagram_btn_text_color = str_replace('#', '', $atts['buttontextcolor']);
    //Load more button styles
    $sb_instagram_button_styles = 'style="';
    if ( !empty($sb_instagram_btn_background) ) $sb_instagram_button_styles .= 'background: #'.$sb_instagram_btn_background.'; ';
    if ( !empty($sb_instagram_btn_text_color) ) $sb_instagram_button_styles .= 'color: #'.$sb_instagram_btn_text_color.';';
    $sb_instagram_button_styles .= '"';

    //Follow button vars
    $sb_instagram_show_follow_btn = $atts['showfollow'];
    ( $sb_instagram_show_follow_btn == 'on' || $sb_instagram_show_follow_btn == 'true' || $sb_instagram_show_follow_btn == true ) ? $sb_instagram_show_follow_btn = true : $sb_instagram_show_follow_btn = false;
    if( $atts[ 'showfollow' ] === 'false' ) $sb_instagram_show_follow_btn = false;

    $sb_instagram_follow_btn_background = str_replace('#', '', $atts['followcolor']);
    $sb_instagram_follow_btn_text_color = str_replace('#', '', $atts['followtextcolor']);
    $sb_instagram_follow_btn_text = $atts['followtext'];
    //Follow button styles
    $sb_instagram_follow_btn_styles = 'style="';
    if ( !empty($sb_instagram_follow_btn_background) ) $sb_instagram_follow_btn_styles .= 'background: #'.$sb_instagram_follow_btn_background.'; ';
    if ( !empty($sb_instagram_follow_btn_text_color) ) $sb_instagram_follow_btn_styles .= 'color: #'.$sb_instagram_follow_btn_text_color.';';
    $sb_instagram_follow_btn_styles .= '"';
    //Follow button HTML
    $sb_instagram_follow_btn_html = '<div class="sbi_follow_btn"><a href="https://instagram.com/" '.$sb_instagram_follow_btn_styles.' target="_blank"><i class="fa fa-instagram"></i>'.stripslashes($sb_instagram_follow_btn_text).'</a></div>';

    //Text styles
    $sb_instagram_show_caption = $atts['showcaption'];
    $sb_instagram_caption_length = $atts['captionlength'];
    $sb_instagram_caption_color = str_replace('#', '', $atts['captioncolor']);
    $sb_instagram_caption_size = $atts['captionsize'];

    //Meta styles
    $sb_instagram_show_meta = $atts['showlikes'];
    $sb_instagram_meta_color = str_replace('#', '', $atts['likescolor']);
    $sb_instagram_meta_size = $atts['likessize'];

    //Lighbox
    $sb_instagram_disable_lightbox = $atts['disablelightbox'];
    ( $sb_instagram_disable_lightbox == 'on' || $sb_instagram_disable_lightbox == 'true' || $sb_instagram_disable_lightbox == true ) ? $sb_instagram_disable_lightbox = 'true' : $sb_instagram_disable_lightbox = 'false';
    if( $atts[ 'disablelightbox' ] === 'false' ) $sb_instagram_disable_lightbox = 'false';


    //Mobile
    $sb_instagram_disable_mobile = $atts['disablemobile'];
    ( $sb_instagram_disable_mobile == 'on' || $sb_instagram_disable_mobile == 'true' || $sb_instagram_disable_mobile == true ) ? $sb_instagram_disable_mobile = ' sbi_disable_mobile' : $sb_instagram_disable_mobile = '';
    if( $atts[ 'disablemobile' ] === 'false' ) $sb_instagram_disable_mobile = '';

    //Class
    !empty( $atts['class'] ) ? $sbi_class = ' ' . trim($atts['class']) : $sbi_class = '';

    //Media type
    $sb_instagram_media_type = $atts['media'];
    if( !isset($sb_instagram_media_type) || empty($sb_instagram_media_type) ) $sb_instagram_media_type = 'all';

    //Ajax theme
    $sb_instagram_ajax_theme = $atts['ajaxtheme'];
    ( $sb_instagram_ajax_theme == 'on' || $sb_instagram_ajax_theme == 'true' || $sb_instagram_ajax_theme == true ) ? $sb_instagram_ajax_theme = true : $sb_instagram_ajax_theme = false;
    if( $atts[ 'ajaxtheme' ] === 'false' ) $sb_instagram_ajax_theme = false;

    //Caching
    $sb_instagram_cache_time = trim($atts['cachetime']);
    if ( !array_key_exists( 'sb_instagram_cache_time', $options ) || $sb_instagram_cache_time == '' ) $sb_instagram_cache_time = '1';
    ($sb_instagram_cache_time == 0 || $sb_instagram_cache_time == '0') ? $sb_instagram_disable_cache = 'true' : $sb_instagram_disable_cache = 'false';
    //API requests
    $sb_instagram_requests_max = trim($atts['maxrequests']);
    if( $sb_instagram_requests_max == '0' ) $sb_instagram_requests_max = 1;
    if( empty($sb_instagram_requests_max) ) $sb_instagram_requests_max = 5;
    $sb_instagram_requests_max = min($sb_instagram_requests_max, 10);

    //Carousel
    $sbi_carousel = $atts['carousel'];
    ( $sbi_carousel == 'true' || $sbi_carousel == 'on' || $sbi_carousel == true || $sbi_carousel == 1 || $sbi_carousel == '1' ) ? $sbi_carousel = 'true' : $sbi_carousel = 'false';
    if( $atts[ 'carousel' ] === 'false' ) $sbi_carousel = 'false';

    $sbi_carousel_class = '';
    $sbi_carousel_options = '';
    $sb_instagram_cols_class = $sb_instagram_cols;
    if($sbi_carousel == 'true'){
        $sbi_carousel_class = 'class="sbi_carousel" ';
        $sb_instagram_show_btn = false;
        $sb_instagram_cols_class = '1';
    }
    $sb_instagram_carousel_arrows = $atts['carouselarrows'];
    ( $sb_instagram_carousel_arrows == 'true' || $sb_instagram_carousel_arrows == 'on' || $sb_instagram_carousel_arrows == 1 || $sb_instagram_carousel_arrows == '1' ) ? $sb_instagram_carousel_arrows = 'true' : $sb_instagram_carousel_arrows = 'false';
    if( $atts[ 'carouselarrows' ] === false ) $sb_instagram_carousel_arrows = 'false';

    $sb_instagram_carousel_pag = $atts['carouselpag'];
    ( $sb_instagram_carousel_pag == 'true' || $sb_instagram_carousel_pag == 'on' || $sb_instagram_carousel_pag == 1 || $sb_instagram_carousel_pag == '1' ) ? $sb_instagram_carousel_pag = 'true' : $sb_instagram_carousel_pag = 'false';
    if( $atts[ 'carouselpag' ] === false ) $sb_instagram_carousel_pag = 'false';

    $sb_instagram_carousel_autoplay = $atts['carouselautoplay'];
    ( $sb_instagram_carousel_autoplay == 'true' || $sb_instagram_carousel_autoplay == 'on' || $sb_instagram_carousel_autoplay == 1 || $sb_instagram_carousel_autoplay == '1' ) ? $sb_instagram_carousel_autoplay = 'true' : $sb_instagram_carousel_autoplay = 'false';
    if( $atts[ 'carouselautoplay' ] === false ) $sb_instagram_carousel_autoplay = 'false';

    $sb_instagram_carousel_interval = intval($atts['carouseltime']);


    //Filters
    //Exclude words
    isset($atts[ 'excludewords' ]) ? $sb_instagram_exclude_words = trim($atts['excludewords']) : $sb_instagram_exclude_words = '';

    //Explode string by commas
    // $sb_instagram_exclude_words = explode(",", trim( $sb_instagram_exclude_words ) );

    //Include words
    isset($atts[ 'includewords' ]) ? $sb_instagram_include_words = trim($atts['includewords']) : $sb_instagram_include_words = '';

    //Explode string by commas
    // $sb_instagram_include_words = explode(",", trim( $sb_instagram_include_words ) );

    //Access token
    isset($sb_instagram_settings[ 'sb_instagram_at' ]) ? $sb_instagram_at = trim($sb_instagram_settings['sb_instagram_at']) : $sb_instagram_at = '';


    /* CACHING */
    //Create the transient name from the plugin settings
    $sb_instagram_include_words = $atts['includewords'];
    $sb_instagram_exclude_words = $atts['excludewords'];
    $sbi_cache_string_include = '';
    $sbi_cache_string_exclude = '';

    //Convert include words array into a string consisting of 3 chars each
    if( !empty($sb_instagram_include_words) ){
        $sb_instagram_include_words_arr = explode(',', $sb_instagram_include_words);

        foreach($sb_instagram_include_words_arr as $sbi_word){
            $sbi_include_word = str_replace(str_split(' #'), '', $sbi_word);
            $sbi_cache_string_include .= substr($sbi_include_word, 0, 3);
        }
    }

    //Convert exclude words array into a string consisting of 3 chars each
    if( !empty($sb_instagram_exclude_words) ){
        $sb_instagram_exclude_words_arr = explode(',', $sb_instagram_exclude_words);

        foreach($sb_instagram_exclude_words_arr as $sbi_word){
            $sbi_exclude_word = str_replace(str_split(' #'), '', $sbi_word);
            $sbi_cache_string_exclude .= substr($sbi_exclude_word, 0, 3);
        }
    }

    //Figure out how long the first part of the caching string should be
    $sbi_cache_string_include_length = strlen($sbi_cache_string_include);
    $sbi_cache_string_exclude_length = strlen($sbi_cache_string_exclude);
    $sbi_cache_string_length = 40 - min($sbi_cache_string_include_length + $sbi_cache_string_exclude_length, 20);

    //Create the first part of the caching string
    $sbi_transient_name = 'sbi_';

    //calculate sum of ids
    $t_ids = explode(",",$sb_instagram_user_id);
    $t_sum = 0;
    for($i = 0;$i < sizeof($t_ids);$i++)
        $t_sum += (int)$t_ids[$i];

    if( $sb_instagram_type == 'user' ) $sbi_transient_name .= substr( str_replace(str_split(', '), '', $t_sum), 0, $sbi_cache_string_length); //Remove commas and spaces and limit chars
    if( $sb_instagram_type == 'hashtag' ) $sbi_transient_name .= substr( str_replace(str_split(', #'), '', $sb_instagram_hashtag), 0, $sbi_cache_string_length);
    if( $sb_instagram_type == 'location' ) $sbi_transient_name .= substr( str_replace(str_split(', -.()'), '', $sb_instagram_location), 0, $sbi_cache_string_length);
    if( $sb_instagram_type == 'liked' ) $sbi_transient_name .= 'liked';

    //Find the length of the string so far, and then however many chars are left we can use this for filters
    $sbi_cache_string_length = strlen($sbi_transient_name);
    $sbi_cache_string_length = 44 - intval($sbi_cache_string_length);

    //Set the length of each filter string
    if( $sbi_cache_string_exclude_length < $sbi_cache_string_length/2 ){
        $sbi_cache_string_include = substr($sbi_cache_string_include, 0, $sbi_cache_string_length - $sbi_cache_string_exclude_length);
    } else {
        //Exclude string
        if( strlen($sbi_cache_string_exclude) == 0 ){
            $sbi_cache_string_include = substr($sbi_cache_string_include, 0, $sbi_cache_string_length );
        } else {
            $sbi_cache_string_include = substr($sbi_cache_string_include, 0, ($sbi_cache_string_length/2) );
        }
        //Include string
        if( strlen($sbi_cache_string_include) == 0 ){
            $sbi_cache_string_exclude = substr($sbi_cache_string_exclude, 0, $sbi_cache_string_length );
        } else {
            $sbi_cache_string_exclude = substr($sbi_cache_string_exclude, 0, ($sbi_cache_string_length/2) );
        }
    }

    //Add both parts of the caching string together and make sure it doesn't exceed 45
    $sbi_transient_name .= $sbi_cache_string_include . $sbi_cache_string_exclude;
    $sbi_transient_name = substr($sbi_transient_name, 0, 45);

     //delete_transient($sbi_transient_name);

    //Check whether the cache transient exists in the database
    ( false === ( $sbi_cache_exists = get_transient( $sbi_transient_name ) ) ) ? $sbi_cache_exists = false : $sbi_cache_exists = true;
    ($sbi_cache_exists) ? $sbi_cache_exists = 'true' : $sbi_cache_exists = 'false';

    $sbiHeaderCache = 'false';
    if( $sb_instagram_type == 'user' ){
        //If it's a user then add the header cache check to the feed
        $sb_instagram_user_id_arr = explode(',', $sb_instagram_user_id);
        $sbi_header_transient_name = 'sbi_header_' . trim($sb_instagram_user_id_arr[0]);
        $sbi_header_transient_name = substr($sbi_header_transient_name, 0, 45);

        //Check for the header cache
        ( false === ( $sbi_header_cache_exists = get_transient( $sbi_header_transient_name ) ) ) ? $sbi_header_cache_exists = false : $sbi_header_cache_exists = true;

        ($sbi_header_cache_exists) ? $sbiHeaderCache = 'true' : $sbiHeaderCache = 'false';
    }
    /* END CACHING */

    /******************* CONTENT ********************/

    $sb_instagram_content = '';
    if($page_id == 3046)
    {
        $keywords_custom = $include_keywords_custom;

        
        $follower_min_html = get_select_box('min',$search_post_param);
        $follower_max_html = get_select_box('max',$search_post_param);
        $category_html = get_category_box($search_post_param);

        $html = '<div class="search-input-container"><form action="" method="post"><div class="row"><div class="inf-cat-div">'.$category_html.'</div></div><div class="row"><div style="margin:auto;width:310px;"><div class="follower-cat-div">'.$follower_min_html.'</div><div class="follower-cat-div" style="float:right;"> '.$follower_max_html.'</div><div class="clearfix"></div></div></div><div class="searc-input-div"> <input class="search-input" name="input_keywords" placeholder="Palabras Clave..." type="text" value="'.$keywords_custom.'" autocomplete="off"><p class="button"></p><div class="clearfix"></div></div><h5 style="text-align:center;margin-top:20px;"><button class="btn btn-danger btn-generate-keyword" type="button">Generate Word Cloud</button><input type="hidden" name="generate_keyword" value="0"/><h5></form><div class="danger"> La palabra clave no es válida. Se requiere al menos una palabra clave</div></div>';
        $sb_instagram_content = $html;
        if(trim($keywords_custom) == ''){
            if($sb_instagram_post_style == 'list')
            {
                $sb_ids = explode(',',$sb_instagram_user_id);
                if(isset($_POST['generate_keyword']) && $_POST['generate_keyword'] == '1')
                    $text_result_arr = get_recent_media($sb_ids,$atts,$options);
                else
                    $text_result_arr = '';

                if($text_result_arr === false)
                {
                    $sb_instagram_content = expire_html();
                    return $sb_instagram_content;
                }
                $sb_instagram_content .= '<script>var wcloud_txt_arr = '.json_encode($text_result_arr).'</script>';
                $sb_instagram_content .= '<h5 style="text-align: center;margin-top:20px;">PRUEBA @HANDLES, #HASHTAGS O CUALQUIER PALABRA CLAVE</h5><div id="search_word_cloud"></div>';
            }
            return $sb_instagram_content;
        }
    }

//    if($page_id != 194 && $page_id != 1613)
    if($sb_instagram_post_style != 'list')
    {
        $sb_instagram_content .= '<div class="row"><div class="pull-right export_but"></div></div>';
        $sb_instagram_content .= '<div id="sb_instagram" class="sbi' . $sbi_class . $sb_instagram_disable_mobile;
        if ( !empty($sb_instagram_height) ) $sb_instagram_content .= ' sbi_fixed_height ';
        $sb_instagram_content .= ' sbi_col_' . trim($sb_instagram_cols_class);
        if ( $sb_instagram_width_resp ) $sb_instagram_content .= ' sbi_width_resp';
        $sb_instagram_content .= '" '.$sb_instagram_styles .' data-post-style="' . $sb_instagram_post_style . '" data-id="' . $sb_instagram_user_id . '" data-num="' . trim($atts['num']) . '" data-res="' . trim($atts['imageres']) . '" data-cols="' . trim($sb_instagram_cols) . '" data-options=\'{&quot;showcaption&quot;: &quot;'.$sb_instagram_show_caption.'&quot;, &quot;captionlength&quot;: &quot;'.$sb_instagram_caption_length.'&quot;, &quot;captioncolor&quot;: &quot;'.$sb_instagram_caption_color.'&quot;, &quot;captionsize&quot;: &quot;'.$sb_instagram_caption_size.'&quot;, &quot;showlikes&quot;: &quot;'.$sb_instagram_show_meta.'&quot;, &quot;likescolor&quot;: &quot;'.$sb_instagram_meta_color.'&quot;, &quot;likessize&quot;: &quot;'.$sb_instagram_meta_size.'&quot;, &quot;sortby&quot;: &quot;'.$atts['sortby'].'&quot;, &quot;hashtag&quot;: &quot;'.$sb_instagram_hashtag.'&quot;, &quot;type&quot;: &quot;'.$sb_instagram_type.'&quot;, &quot;hovercolor&quot;: &quot;'.sbi_hextorgb($sb_hover_background).'&quot;, &quot;hovertextcolor&quot;: &quot;'.sbi_hextorgb($sb_hover_text).'&quot;, &quot;hoverdisplay&quot;: &quot;'.$atts['hoverdisplay'].'&quot;, &quot;hovereffect&quot;: &quot;'.$atts['hovereffect'].'&quot;, &quot;headercolor&quot;: &quot;'.$sb_instagram_header_color.'&quot;, &quot;headerprimarycolor&quot;: &quot;'.$sb_instagram_header_primary_color.'&quot;, &quot;headersecondarycolor&quot;: &quot;'.$sb_instagram_header_secondary_color.'&quot;, &quot;disablelightbox&quot;: &quot;'.$sb_instagram_disable_lightbox.'&quot;, &quot;disablecache&quot;: &quot;'.$sb_instagram_disable_cache.'&quot;, &quot;location&quot;: &quot;'.$sb_instagram_location.'&quot;, &quot;coordinates&quot;: &quot;'.$sb_instagram_coordinates.'&quot;, &quot;single&quot;: &quot;'.$sb_instagram_single.'&quot;, &quot;maxrequests&quot;: &quot;'.$sb_instagram_requests_max.'&quot;, &quot;headerstyle&quot;: &quot;'.$sb_instagram_header_style.'&quot;, &quot;showfollowers&quot;: &quot;'.$sb_instagram_show_followers.'&quot;, &quot;showbio&quot;: &quot;'.$sb_instagram_show_bio.'&quot;, &quot;carousel&quot;: &quot;['.$sbi_carousel.', '.$sb_instagram_carousel_arrows.', '.$sb_instagram_carousel_pag.', '.$sb_instagram_carousel_autoplay.', '.$sb_instagram_carousel_interval.']&quot;, &quot;imagepadding&quot;: &quot;'.$sb_instagram_image_padding.'&quot;, &quot;imagepaddingunit&quot;: &quot;'.$sb_instagram_image_padding_unit.'&quot;, &quot;media&quot;: &quot;'.$sb_instagram_media_type.'&quot;, &quot;includewords&quot;: &quot;'.$sb_instagram_include_words.'&quot;, &quot;post_style&quot;: &quot;'.$sb_instagram_post_style.'&quot;, &quot;excludewords&quot;: &quot;'.$sb_instagram_exclude_words.'&quot;, &quot;sbiCacheExists&quot;: &quot;'.$sbi_cache_exists.'&quot;, &quot;sbiHeaderCache&quot;: &quot;'.$sbiHeaderCache.'&quot;, &quot;sbiHeaderTitle&quot;: &quot;'.$page_title.'&quot;, &quot;sbiKeywordType&quot;: &quot;'.$keywordType.'&quot;, &quot;sbiPageType&quot;: &quot;'.$pageType.'&quot;, &quot;sbiMediaDays&quot;: &quot;'.$mediaDays.'&quot;, &quot;sbiShowAvatar&quot;: &quot;'.$showAvatar.'&quot;,&quot;sbiShowHighlight&quot;: &quot;'.$showhighlight.'&quot;}\'>';

        //Header
        if( $sb_instagram_show_header ){
            $sb_instagram_content .= '<div class="sb_instagram_header sbi_feed_type_' . $sb_instagram_type;
            if($sb_instagram_type !== 'user') $sb_instagram_content .= ' sbi_header_type_generic';
            if( $sb_instagram_header_style == 'boxed' ) $sb_instagram_content .= ' sbi_header_style_boxed';
            $sb_instagram_content .= '"';
            if( $sb_instagram_header_style == 'boxed' ) $sb_instagram_content .= ' data-follow-text="' . $sb_instagram_follow_btn_text . '"';
            $sb_instagram_content .= 'style="';
            if( $sb_instagram_header_style !== 'boxed' ) $sb_instagram_content .= 'padding: '.(intval($sb_instagram_image_padding)).$sb_instagram_image_padding_unit.' '.(2*intval($sb_instagram_image_padding)).$sb_instagram_image_padding_unit . ';';
            if( intval($sb_instagram_image_padding) < 10 && $sb_instagram_header_style !== 'boxed' ) $sb_instagram_content .= ' margin-bottom: 10px;';
            if( $sb_instagram_header_style == 'boxed' ) $sb_instagram_content .= ' background: #'.$sb_instagram_header_primary_color.';';
            $sb_instagram_content .= '"></div>';
        }

        //Images container
        $sb_instagram_content .= '<div id="sbi_images" '.$sbi_carousel_class.'style="padding: '.$sb_instagram_image_padding . $sb_instagram_image_padding_unit .';">';

        //Loader
        $sb_instagram_content .= '<div class="sbi_loader fa-spin"></div>';

        //Error messages
        if( $sb_instagram_type == 'user' && ( empty($sb_instagram_user_id) || !isset($sb_instagram_user_id) ) ) $sb_instagram_content .= '<p>Please enter a User ID on the Instagram plugin Settings page</p>';

        if( $sb_instagram_type == 'hashtag' && (empty($sb_instagram_hashtag) || !isset($sb_instagram_hashtag) ) ) $sb_instagram_content .= '<p>Please enter a Hashtag on the Instagram plugin Settings page</p>';

        if( empty($options[ 'sb_instagram_at' ]) || !isset($options[ 'sb_instagram_at' ]) ) $sb_instagram_content .= '<p>Please enter an Access Token on the Instagram Feed plugin Settings page</p>';

        $sb_instagram_content .= '</div><div id="sbi_load"';
        if($sb_instagram_image_padding == 0 || !isset($sb_instagram_image_padding)) $sb_instagram_content .= ' style="padding-top: 5px"';
        $sb_instagram_content .= '>';

        //Load More button
        if( $sb_instagram_show_btn ) $sb_instagram_content .= '<a class="sbi_load_btn" href="javascript:void(0);" '.$sb_instagram_button_styles.'><span class="sbi_btn_text">'.$atts['buttontext'].'</span><span class="fa fa-spinner fa-pulse"></span></a>';

        //Follow button
        if( $sb_instagram_show_follow_btn && $sb_instagram_type == 'user' ) $sb_instagram_content .= $sb_instagram_follow_btn_html;

        $sb_instagram_content .= '</div>'; //End #sbi_load

        $sb_instagram_content .= '</div>'; //End #sb_instagram
        $sb_instagram_content .= '<script type="text/javascript">var sb_instagram_keywords=["'.implode('","',$keywords).'"]</script>';
        //If using an ajax theme then add the JS to the bottom of the feed
        if($sb_instagram_ajax_theme){

            //Hide photos
            (isset($atts[ 'hidephotos' ]) && !empty($atts[ 'hidephotos' ])) ? $sb_instagram_hide_photos = trim($atts['hidephotos']) : $sb_instagram_hide_photos = '';

            //Block users
            (isset($atts[ 'blockusers' ]) && !empty($atts[ 'blockusers' ])) ? $sb_instagram_block_users = trim($atts['blockusers']) : $sb_instagram_block_users = '';

            $sb_instagram_content .= '<script type="text/javascript">var sb_instagram_js_options = {"sb_instagram_at":"'.trim($options['sb_instagram_at']).'", "sb_instagram_hide_photos":"'.$sb_instagram_hide_photos.'", "sb_instagram_block_users":"'.$sb_instagram_block_users.'"};var sb_instagram_keywords={"'.implode('","',$keywords).'"}</script>';
            $sb_instagram_content .= "<script type='text/javascript' src='".plugins_url( '/js/sb-instagram.js?ver='.SBIVER , __FILE__ )."'></script>";
            $sb_instagram_content .= "<script type='text/javascript' src='".plugins_url( '/js/Chart.js' , __FILE__ )."'></script>";
            $sb_instagram_content .= "<script type='text/javascript' src='".plugins_url( '/js/jquery.dropdown.min.js' , __FILE__ )."'></script>";
            $sb_instagram_content .= "<script type='text/javascript' src='".plugins_url( '/js/jquery-ui.js' , __FILE__ )."'></script>";
        }

        if(is_user_logged_in())
            if($showexcel) {
                $sb_instagram_content .= '<div class="row"><div class="pull-right export_but"></div></div>';
            }
        //Return our feed HTML to display
        return $sb_instagram_content;

    }

    $sb_ids = explode(',',$sb_instagram_user_id);
    //now sort sb_ids decreasing mode
    $sb_ids_sorted = array();
    $sb_ids_details = array();
    if($page_id == 3046){
        $keywords = explode(",",$atts['includewords']);
        $custom_keywords = explode("\r\n",$atts['keywords']);
    }else{
        if($sb_instagram_custom_country != ''){
            $custom_keywords_arr = array();

            foreach($brand_country_arr as $brand_country_item){
                $brand_country_item = strtolower(trim($brand_country_item));
                $custom_keywords_arr = array_unique(array_merge($custom_keywords_arr,$keywords_by_country[$brand_country_item]), SORT_REGULAR);
            }
            $atts['includewords'] = implode(",",$custom_keywords_arr);
            $keywords = $custom_keywords_arr;
        }
        else {
            $brand_country_item = "panama";
            $custom_keywords_arr=$keywords_by_country[$brand_country_item];
            $atts['includewords'] = implode(",",$custom_keywords_arr);
            $keywords = $custom_keywords_arr;
        }
    }

    $sb_instagram_settings = get_option('sb_instagram_settings');
    //If the caching time doesn't exist in the database then set it to be 1 hour
    ( !array_key_exists( 'sb_instagram_cache_time', $sb_instagram_settings ) ) ? $sb_instagram_cache_time = 1 : $sb_instagram_cache_time = $sb_instagram_settings['sb_instagram_cache_time'];
    ( !array_key_exists( 'sb_instagram_cache_time_unit', $sb_instagram_settings ) ) ? $sb_instagram_cache_time_unit = 'minutes' : $sb_instagram_cache_time_unit = $sb_instagram_settings['sb_instagram_cache_time_unit'];
    //Calculate the cache time in seconds
    if($sb_instagram_cache_time_unit == 'minutes') $sb_instagram_cache_time_unit = 60;
    if($sb_instagram_cache_time_unit == 'hours') $sb_instagram_cache_time_unit = 60*60;
    if($sb_instagram_cache_time_unit == 'days') $sb_instagram_cache_time_unit = 60*60*24;
    $cache_seconds = intval($sb_instagram_cache_time) * intval($sb_instagram_cache_time_unit);

    if(trim($sb_instagram_user_id) == '')
    {
        $sb_instagram_content .= '<h5 style="text-align: center;margin-top:20px;">No se encontraron Influencers.  Intente otra búsqueda.</h5>';
        return $sb_instagram_content;
    }
    // $i= 0;
    foreach($sb_ids as $sb_tmp_id) {
        // $i++;
        // if($i == ) break;
        //if followers_min and max are set, get followed_by value and filter the users
        $sb_instagram_followers_min = $atts['followers_min'];
        $sb_instagram_followers_max = $atts['followers_max'];
        if($sb_instagram_followers_min != "" || $sb_instagram_followers_max != "" || $page_id ==3046)
        {
            $sbi_header_transient_name = 'sbi_header_' . trim($sb_tmp_id);
            $sbi_header_transient_name = substr($sbi_header_transient_name, 0, 45);
            $sbi_header_cache_exists = get_transient( $sbi_header_transient_name );
            $header_tmp = null;
            if($sb_instagram_disable_cache != 'true' && $sbi_header_cache_exists)
            {   
                $header_tmp = json_decode($sbi_header_cache_exists);
                if(!$header_tmp)
                    $header_tmp = json_decode(stripcslashes($sbi_header_cache_exists));
            }
            if(!$header_tmp)
            {   
                $url = 'https://api.instagram.com/v1/users/' . trim($sb_tmp_id). '?access_token=' . trim($options['sb_instagram_at']);
                $ret = file_get_contents($url);
                $header_tmp = json_decode($ret);
                $is_expired = check_api_limit($header_tmp);
                if($is_expired){
                    $sb_instagram_content = expire_html();
                    return $sb_instagram_content;
                }
                set_transient( $sbi_header_transient_name, $ret, $cache_seconds );
            }

            if(!$header_tmp)
                continue;
            if(isset($header_tmp->data->counts->followed_by))
                $followers = $header_tmp->data->counts->followed_by;
            else
                $followers = 0;
            if(($sb_instagram_followers_min != "" && $followers < $sb_instagram_followers_min) || ($sb_instagram_followers_max != "" && $followers > $sb_instagram_followers_max))
                continue;
            if($page_id == 3046){

                if(isset($search_post_param['follower_min_select']) && isset($search_post_param['follower_min_select']))
                {
                    $search_follower_min = $search_post_param['follower_min_select'];
                    $search_follower_max = $search_post_param['follower_max_select'];

                    if($followers < $search_follower_min)
                        continue;
                    if($followers > $search_follower_max && $search_follower_max != '1')
                        continue;
                }
            }
        }
        //if header cache exists, get cache .
        $sbi_header_ranking_transient_name = 'sbi_header_ranking_' . $atts['num'].'_'.trim($sb_tmp_id);
        $sbi_header_ranking_transient_name = substr($sbi_header_ranking_transient_name,0,45);
        //delete_transient($sbi_header_ranking_transient_name);
        $sbi_header_ranking_cache_exists = get_transient( $sbi_header_ranking_transient_name );
        //var_dump($sbi_transient_name);var_dump($sbi_header_ranking_cache_exists);
        $tmp = null;
        if($sb_instagram_disable_cache != 'true' && $sbi_header_ranking_cache_exists){
            $tmp = json_decode($sbi_header_ranking_cache_exists);
            if(!$tmp)
                $tmp = json_decode(stripslashes($sbi_header_ranking_cache_exists));
        }
        // var_dump($sb_instagram_disable_cache);die;
        if(!$tmp){
            // var_dump(json_decode($sbi_header_ranking_cache_exists));
            // $url ='https://api.instagram.com/v1/users/' . trim($sb_tmp_id) . '&access_token=' . trim($options['sb_instagram_at']);
            $url = "https://api.instagram.com/v1/users/".trim($sb_tmp_id)."/media/recent?access_token=" . trim($options['sb_instagram_at']) . "&count=".$atts['num']."&_=".trim($sb_tmp_id);
            $ret = get_url_content($url);
            $tmp = json_decode($ret);
            $is_expired = check_api_limit($tmp);
            if($is_expired){
                $sb_instagram_content = expire_html();
                return $sb_instagram_content;
            }
            set_transient( $sbi_header_ranking_transient_name, $ret, $cache_seconds);
        }
       // var_dump($sbi_header_ranking_cache_exists);
       
       // var_dump($sbi_header_ranking_transient_name);
// var_dump($tmp);
//var_dump("https://api.instagram.com/v1/users/".trim($sb_tmp_id)."/media/recent?access_token=" . trim($options['sb_instagram_at']) . "&count=".$atts['num']."&_=".trim($sb_tmp_id));
/*
        //if cache exists, get cache
        $sbi_transient_name = 'sbi_' . trim($sb_tmp_id);
        $sbi_transient_name = substr($sbi_transient_name,0,45);
        //delete_transient( $sbi_transient_name );
        $sbi_header_cache_exists = get_transient( $sbi_transient_name );
        //var_dump($sbi_transient_name);var_dump($sbi_header_cache_exists);
        if( $sbi_header_cache_exists === false){
            $url = "https://api.instagram.com/v1/users/".trim($sb_tmp_id)."/media/recent?access_token=" . trim($options['sb_instagram_at']) . "&count=".$atts['num']."&_=".trim($sb_tmp_id);
            $tmp = json_decode(get_url_content($url));

        }
        else{
            $tmp = json_decode(str_replace('\'', '\\\'',urldecode($sbi_header_cache_exists)));
        }
*/
        if(!$tmp)
            continue;
        //calculate the total likes
        $total_likes = 0;
        $total_ints = 0;
//        echo sizeof($tmp->data);
        $count_contain_keywords = 0;
        $likes_contain_keywords = 0;
        $ints_contain_keywords = 0;
        $media_result_cnt = 0;
        if(!isset($tmp->data))
            continue;
        foreach($tmp->data as $tmp_obj)
        {
            //check if text contains keywords
            if(!isset($tmp_obj->caption->text))
                continue;

            $text = isset($tmp_obj->caption->text)?$tmp_obj->caption->text:'';
            $contains = false;
            $custom_contains = false;
            $ints = $tmp_obj->likes->count + $tmp_obj->comments->count;

            $text = preg_replace('/[^\sa-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ@#_]+/u', ' ', $text); // only take alphanumerical characters, but keep the spaces and dashes too…
            $text = preg_replace('/\s\s+/i', ' ', $text); // replace whitespace
            $text = trim($text); // trim the string
            $text = ' '.strtolower($text).' '; // make it lowercase
            foreach($keywords as $keyword){
                // echo $keyword;

                if(preg_match("/\s+(".strtolower(trim($keyword)).")\s+/", $text ))
                {
                    $contains = true;
                    break;
                }
            }
            if($contains && isset($custom_keywords))
            {
                foreach($custom_keywords as $keyword){
                    if(preg_match("/\s+(".strtolower(trim($keyword)).")\s+/", $text ))
                    {
                        $custom_contains = true;
                        break;
                    }
                }
            }
            if($page_id == 3046)
            {
                if($contains == true)
                {
                    $total_likes += $tmp_obj->likes->count;
                    $total_ints += $ints;
                    $media_result_cnt ++;
                }
                if($custom_contains == true)
                {       
                    $count_contain_keywords ++;
                    $likes_contain_keywords += $tmp_obj->likes->count;
                    $ints_contain_keywords += $ints;
                }

            }else{
                $total_likes += $tmp_obj->likes->count;
                $total_ints += $ints;
                if($contains == true)
                {       
                    $count_contain_keywords ++;
                    $likes_contain_keywords += $tmp_obj->likes->count;
                    $ints_contain_keywords += $ints;
                }
            }
        }
       // echo $total_likes;echo $sb_tmp_id;
        $tmp_user_id = trim($sb_tmp_id);
        if($page_id == 3046){
            if($media_result_cnt == 0)
                continue;
            else{

                $sb_ids_sorted[$tmp_user_id] = $total_ints;
            }
        }else{
            $sb_ids_sorted[$tmp_user_id] = $total_ints;
        }
        $sb_ids_details[$tmp_user_id]['count'] = $count_contain_keywords;
        $sb_ids_details[$tmp_user_id]['likes'] = $likes_contain_keywords;
        $sb_ids_details[$tmp_user_id]['total_likes'] = $total_likes;
        $sb_ids_details[$tmp_user_id]['total_ints'] = $total_ints;

        $media_cnt = $atts['num'];
        if($page_id == 3046)
            $media_cnt = $media_result_cnt;
        $sb_ids_details[$tmp_user_id]['percentage'] = ($media_cnt != 0)?round($count_contain_keywords * 100 / $media_cnt,2):0;
        //var_dump($count_contain_keywords);var_dump($atts['num']);
        if($count_contain_keywords != 0 )
        {
            $sb_ids_details[$tmp_user_id]['marcas'] = round($ints_contain_keywords / $count_contain_keywords,0);
        }
        else
            $sb_ids_details[$tmp_user_id]['marcas'] = 0 ;
        // if($sb_ids_details[$total_likes]['marcas'] >= 1000)
        //     $sb_ids_details[$total_likes]['marcas'] = round($sb_ids_details[$total_likes]['marcas'] / 1000,1)."K";

        $sb_ids_details[$tmp_user_id]['todos'] = ($media_cnt != 0)?round($total_ints / $media_cnt ,0):0;
        // if($sb_ids_details[$total_likes]['todos'] >= 1000)
        //     $sb_ids_details[$total_likes]['todos'] = round($sb_ids_details[$total_likes]['todos'] / 1000,1)."K";
        // echo $sb_tmp_id.'-';
    }
    if($page_id == 3046 && count($sb_ids_sorted) == 0)
    {
        $sb_instagram_content .= '<h5 style="text-align: center;margin-top:20px;">No se encontraron Influencers.  Intente otra búsqueda.</h5>';
        return $sb_instagram_content;
    }
    
    //var_dump($sb_ids_details);
    arsort($sb_ids_sorted);
    if($sb_instagram_post_style == "list") {
        if ($page_id == 3046) {
            if ($search_view_limit != null)
                $sb_ids_sorted = array_slice($sb_ids_sorted, 0, $search_view_limit, true);
        } else {
            if ($ranking_view_limit != null)
                $sb_ids_sorted = array_slice($sb_ids_sorted, 0, $ranking_view_limit, true);
        }
    }

    $sb_rank = 0;
    foreach($sb_ids_sorted as $sb_tmp_id=>$sb_ints) {
        $sb_rank ++;
        if(($page_id == 1833 || $page_id == 1834) && $sb_rank > 20)//check if top ranking
            break;
        // if($sb_rank >= 40)
        //     break;
        //check transient name again for each

        //Create the first part of the caching string
        $sbi_transient_name = 'sbi_';
        if( $sb_instagram_type == 'user' ) $sbi_transient_name .= substr( str_replace(str_split(', '), '', $sb_tmp_id), 0, $sbi_cache_string_length); //Remove commas and spaces and limit chars
        if( $sb_instagram_type == 'hashtag' ) $sbi_transient_name .= substr( str_replace(str_split(', #'), '', $sb_instagram_hashtag), 0, $sbi_cache_string_length);
        if( $sb_instagram_type == 'location' ) $sbi_transient_name .= substr( str_replace(str_split(', -.()'), '', $sb_instagram_location), 0, $sbi_cache_string_length);
        if( $sb_instagram_type == 'liked' ) $sbi_transient_name .= 'liked';

        //Find the length of the string so far, and then however many chars are left we can use this for filters
        $sbi_cache_string_length = strlen($sbi_transient_name);
        $sbi_cache_string_length = 44 - intval($sbi_cache_string_length);

        //Set the length of each filter string
        if( $sbi_cache_string_exclude_length < $sbi_cache_string_length/2 ){
            $sbi_cache_string_include = substr($sbi_cache_string_include, 0, $sbi_cache_string_length - $sbi_cache_string_exclude_length);
        } else {
            //Exclude string
            if( strlen($sbi_cache_string_exclude) == 0 ){
                $sbi_cache_string_include = substr($sbi_cache_string_include, 0, $sbi_cache_string_length );
            } else {
                $sbi_cache_string_include = substr($sbi_cache_string_include, 0, ($sbi_cache_string_length/2) );
            }
            //Include string
            if( strlen($sbi_cache_string_include) == 0 ){
                $sbi_cache_string_exclude = substr($sbi_cache_string_exclude, 0, $sbi_cache_string_length );
            } else {
                $sbi_cache_string_exclude = substr($sbi_cache_string_exclude, 0, ($sbi_cache_string_length/2) );
            }
        }

        //Add both parts of the caching string together and make sure it doesn't exceed 45
        $sbi_transient_name .= $sbi_cache_string_include . $sbi_cache_string_exclude;
        $sbi_transient_name = substr($sbi_transient_name, 0, 45);

        // delete_transient($sbi_transient_name);

        //Check whether the cache transient exists in the database
        ( false === ( $sbi_cache_exists = get_transient( $sbi_transient_name ) ) ) ? $sbi_cache_exists = false : $sbi_cache_exists = true;
        ($sbi_cache_exists) ? $sbi_cache_exists = 'true' : $sbi_cache_exists = 'false';

        $sbiHeaderCache = 'false';
        if( $sb_instagram_type == 'user' ){
            //If it's a user then add the header cache check to the feed
            $sb_instagram_user_id_arr = explode(',', $sb_tmp_id);
            $sbi_header_transient_name = 'sbi_header_' . trim($sb_instagram_user_id_arr[0]);
            $sbi_header_transient_name = substr($sbi_header_transient_name, 0, 45);

            //Check for the header cache
            ( false === ( $sbi_header_cache_exists = get_transient( $sbi_header_transient_name ) ) ) ? $sbi_header_cache_exists = false : $sbi_header_cache_exists = true;

            ($sbi_header_cache_exists) ? $sbiHeaderCache = 'true' : $sbiHeaderCache = 'false';
        }
        /* END CACHING */


        $tmp_sbi_pemarlink = $sb_instagram_user_permalinks[$sb_tmp_id];


        $sb_instagram_content .= '<div id="sb_instagram" class="sbi_my_instagram sbi' . $sbi_class . $sb_instagram_disable_mobile;
        if (!empty($sb_instagram_height)) $sb_instagram_content .= ' sbi_fixed_height ';
        $sb_instagram_content .= ' sbi_col_' . trim($sb_instagram_cols_class);
        if ($sb_instagram_width_resp) $sb_instagram_content .= ' sbi_width_resp';
        $sb_instagram_content .= '" ' . $sb_instagram_styles . ' data-post-style="' . $sb_instagram_post_style . '"  data-id="' . $sb_tmp_id . '" data-likes="'.$sb_ints.'" data-rank="'.$sb_rank. '" data-percentage="'.$sb_ids_details[$sb_tmp_id]['percentage']. '" data-marcas="'.$sb_ids_details[$sb_tmp_id]['marcas'].'" data-todos="'.$sb_ids_details[$sb_tmp_id]['todos'].'" data-num="' . trim($atts['num']) . '" data-res="' . trim($atts['imageres']) . '" data-cols="' . trim($sb_instagram_cols) . '" data-options=\'{&quot;showcaption&quot;: &quot;' . $sb_instagram_show_caption . '&quot;, &quot;captionlength&quot;: &quot;' . $sb_instagram_caption_length . '&quot;, &quot;captioncolor&quot;: &quot;' . $sb_instagram_caption_color . '&quot;, &quot;captionsize&quot;: &quot;' . $sb_instagram_caption_size . '&quot;, &quot;showlikes&quot;: &quot;' . $sb_instagram_show_meta . '&quot;, &quot;likescolor&quot;: &quot;' . $sb_instagram_meta_color . '&quot;, &quot;likessize&quot;: &quot;' . $sb_instagram_meta_size . '&quot;, &quot;sortby&quot;: &quot;' . $atts['sortby'] . '&quot;, &quot;hashtag&quot;: &quot;' . $sb_instagram_hashtag . '&quot;, &quot;type&quot;: &quot;' . $sb_instagram_type . '&quot;, &quot;hovercolor&quot;: &quot;' . sbi_hextorgb($sb_hover_background) . '&quot;, &quot;hovertextcolor&quot;: &quot;' . sbi_hextorgb($sb_hover_text) . '&quot;, &quot;hoverdisplay&quot;: &quot;' . $atts['hoverdisplay'] . '&quot;, &quot;hovereffect&quot;: &quot;' . $atts['hovereffect'] . '&quot;, &quot;headercolor&quot;: &quot;' . $sb_instagram_header_color . '&quot;, &quot;headerprimarycolor&quot;: &quot;' . $sb_instagram_header_primary_color . '&quot;, &quot;headersecondarycolor&quot;: &quot;' . $sb_instagram_header_secondary_color . '&quot;, &quot;disablelightbox&quot;: &quot;' . $sb_instagram_disable_lightbox . '&quot;, &quot;disablecache&quot;: &quot;' . $sb_instagram_disable_cache . '&quot;, &quot;location&quot;: &quot;' . $sb_instagram_location . '&quot;, &quot;coordinates&quot;: &quot;' . $sb_instagram_coordinates . '&quot;, &quot;single&quot;: &quot;' . $sb_instagram_single . '&quot;, &quot;maxrequests&quot;: &quot;' . $sb_instagram_requests_max . '&quot;, &quot;headerstyle&quot;: &quot;' . $sb_instagram_header_style . '&quot;, &quot;showfollowers&quot;: &quot;' . $sb_instagram_show_followers . '&quot;, &quot;showbio&quot;: &quot;' . $sb_instagram_show_bio . '&quot;, &quot;carousel&quot;: &quot;[' . $sbi_carousel . ', ' . $sb_instagram_carousel_arrows . ', ' . $sb_instagram_carousel_pag . ', ' . $sb_instagram_carousel_autoplay . ', ' . $sb_instagram_carousel_interval . ']&quot;, &quot;imagepadding&quot;: &quot;' . $sb_instagram_image_padding . '&quot;, &quot;imagepaddingunit&quot;: &quot;' . $sb_instagram_image_padding_unit . '&quot;, &quot;media&quot;: &quot;' . $sb_instagram_media_type . '&quot;, &quot;includewords&quot;: &quot;' . $sb_instagram_include_words . '&quot;, &quot;excludewords&quot;: &quot;' . $sb_instagram_exclude_words . '&quot;, &quot;sbiCacheExists&quot;: &quot;' . $sbi_cache_exists . '&quot;, &quot;sbiHeaderCache&quot;: &quot;' . $sbiHeaderCache . '&quot;, &quot;sbiHeaderTitle&quot;: &quot;'.$page_title.'&quot;, &quot;sbiKeywordType&quot;: &quot;'.$keywordType.'&quot;, &quot;sbiPageType&quot;: &quot;'.$pageType.'&quot;, &quot;sbiMediaDays&quot;: &quot;'.$mediaDays.'&quot;, &quot;sbiShowAvatar&quot;: &quot;'.$showAvatar.'&quot;,&quot;sbiShowHighlight&quot;: &quot;'.$showhighlight.'&quot;,&quot;sbiPermalink&quot;: &quot;'.$tmp_sbi_pemarlink.'&quot;}\'>';
        //Header
        if ($sb_instagram_show_header) {
            $sb_instagram_content .= '<div class="sb_instagram_header sbi_feed_type_' . $sb_instagram_type;
            if ($sb_instagram_type !== 'user') $sb_instagram_content .= ' sbi_header_type_generic';
            if ($sb_instagram_header_style == 'boxed') $sb_instagram_content .= ' sbi_header_style_boxed';
            $sb_instagram_content .= '"';
            if ($sb_instagram_header_style == 'boxed') $sb_instagram_content .= ' data-follow-text="' . $sb_instagram_follow_btn_text . '"';
            $sb_instagram_content .= 'style="';
            if ($sb_instagram_header_style !== 'boxed') $sb_instagram_content .= 'padding: ' . (intval($sb_instagram_image_padding)) . $sb_instagram_image_padding_unit . ' ' . (2 * intval($sb_instagram_image_padding)) . $sb_instagram_image_padding_unit . ';';
            //if (intval($sb_instagram_image_padding) < 10 && $sb_instagram_header_style !== 'boxed') $sb_instagram_content .= ' margin-bottom: 10px;';
            if ($sb_instagram_header_style == 'boxed') $sb_instagram_content .= ' background: #' . $sb_instagram_header_primary_color . ';';
            $sb_instagram_content .= '"></div>';
        }
        
        //Images container
        $sb_instagram_content .= '<div id="sbi_images" ' . $sbi_carousel_class . 'style="padding: ' . $sb_instagram_image_padding . $sb_instagram_image_padding_unit . ';">';

        //Loader
        $sb_instagram_content .= '<div class="sbi_loader fa-spin"></div>';

        //Error messages
        if ($sb_instagram_type == 'user' && (empty($sb_tmp_id) || !isset($sb_tmp_id))) $sb_instagram_content .= '<p>Please enter a User ID on the Instagram plugin Settings page</p>';

        if ($sb_instagram_type == 'hashtag' && (empty($sb_instagram_hashtag) || !isset($sb_instagram_hashtag))) $sb_instagram_content .= '<p>Please enter a Hashtag on the Instagram plugin Settings page</p>';

        if (empty($options['sb_instagram_at']) || !isset($options['sb_instagram_at'])) $sb_instagram_content .= '<p>Please enter an Access Token on the Instagram Feed plugin Settings page</p>';

        $sb_instagram_content .= '</div><div id="sbi_load"';
        if ($sb_instagram_image_padding == 0 || !isset($sb_instagram_image_padding)) $sb_instagram_content .= ' style="padding-top: 5px"';
        $sb_instagram_content .= '>';

        //Load More button
        if ($sb_instagram_show_btn) $sb_instagram_content .= '<a class="sbi_load_btn" href="javascript:void(0);" ' . $sb_instagram_button_styles . '><span class="sbi_btn_text">' . $atts['buttontext'] . '</span><span class="fa fa-spinner fa-pulse"></span></a>';

        //Follow button
        if ($sb_instagram_show_follow_btn && $sb_instagram_type == 'user') $sb_instagram_content .= $sb_instagram_follow_btn_html;

        $sb_instagram_content .= '</div>'; //End #sbi_load

        $sb_instagram_content .= '</div>'; //End #sb_instagram
        //If using an ajax theme then add the JS to the bottom of the feed
        if ($sb_instagram_ajax_theme) {

            //Hide photos
            (isset($atts['hidephotos']) && !empty($atts['hidephotos'])) ? $sb_instagram_hide_photos = trim($atts['hidephotos']) : $sb_instagram_hide_photos = '';

            //Block users
            (isset($atts['blockusers']) && !empty($atts['blockusers'])) ? $sb_instagram_block_users = trim($atts['blockusers']) : $sb_instagram_block_users = '';

            $sb_instagram_content .= '<script type="text/javascript">var sb_instagram_js_options = {"sb_instagram_at":"' . trim($options['sb_instagram_at']) . '", "sb_instagram_hide_photos":"' . $sb_instagram_hide_photos . '", "sb_instagram_block_users":"' . $sb_instagram_block_users . '"};var sb_instagram_keywords={"'.implode('","',$keywords).'"}</script>';
            $sb_instagram_content .= "<script type='text/javascript' src='" . plugins_url('/js/sb-instagram.js?ver=' . SBIVER, __FILE__) . "'></script>";
            $sb_instagram_content .= "<script type='text/javascript' src='".plugins_url( '/js/Chart.js' , __FILE__ )."'></script>";
            $sb_instagram_content .= "<script type='text/javascript' src='".plugins_url( '/js/jquery.dropdown.min.js' , __FILE__ )."'></script>";
            $sb_instagram_content .= "<script type='text/javascript' src='".plugins_url( '/js/jquery-ui.js' , __FILE__ )."'></script>";
        }
    }
    $sb_instagram_content .= '<script type="text/javascript">var sb_instagram_keywords=["'.implode('","',$keywords).'"]</script>';
    // die;
    /*
    $sb_instagram_content .= '<div id="sbi_my_load" class="sbi_my_load"';
    if($sb_instagram_image_padding == 0 || !isset($sb_instagram_image_padding)) $sb_instagram_content .= ' style="padding-top: 5px"';
    $sb_instagram_content .= '>';

    //Load More button
    $sb_instagram_content .= '<a class="sbi_load_btn sbi_my_load_btn" href="javascript:void(0);" '.$sb_instagram_button_styles.'><span class="sbi_btn_text">'.$atts['buttontext'].'</span><span class="fa fa-spinner fa-pulse"></span></a>';


    $sb_instagram_content .= '</div>'; //End #sbi_my_load
*/
    //Return our feed HTML to display
    if(is_user_logged_in())
        if($showexcel) {
            $sb_instagram_content .= '<div class="row"><div class="pull-right export_but"></div></div>';
        }
    return $sb_instagram_content;

}


#############################

//Convert Hex to RGB
function sbi_hextorgb($hex) {
   $hex = str_replace("#", "", $hex);

   if(strlen($hex) == 3) {
      $r = hexdec(substr($hex,0,1).substr($hex,0,1));
      $g = hexdec(substr($hex,1,1).substr($hex,1,1));
      $b = hexdec(substr($hex,2,1).substr($hex,2,1));
   } else {
      $r = hexdec(substr($hex,0,2));
      $g = hexdec(substr($hex,2,2));
      $b = hexdec(substr($hex,4,2));
   }
   $rgb = array($r, $g, $b);
   return implode(",", $rgb); // returns the rgb values separated by commas
   //return $rgb; // returns an array with the rgb values
}

//Allows shortcodes in theme
add_filter('widget_text', 'do_shortcode');

function sbi_cache_photos() {
    global $wpdb;

    $sb_instagram_settings = get_option('sb_instagram_settings');
    //If the caching time doesn't exist in the database then set it to be 1 hour
    ( !array_key_exists( 'sb_instagram_cache_time', $sb_instagram_settings ) ) ? $sb_instagram_cache_time = 1 : $sb_instagram_cache_time = $sb_instagram_settings['sb_instagram_cache_time'];
    ( !array_key_exists( 'sb_instagram_cache_time_unit', $sb_instagram_settings ) ) ? $sb_instagram_cache_time_unit = 'minutes' : $sb_instagram_cache_time_unit = $sb_instagram_settings['sb_instagram_cache_time_unit'];

    //Calculate the cache time in seconds
    if($sb_instagram_cache_time_unit == 'minutes') $sb_instagram_cache_time_unit = 60;
    if($sb_instagram_cache_time_unit == 'hours') $sb_instagram_cache_time_unit = 60*60;
    if($sb_instagram_cache_time_unit == 'days') $sb_instagram_cache_time_unit = 60*60*24;
    $cache_seconds = intval($sb_instagram_cache_time) * intval($sb_instagram_cache_time_unit);

    $transient_name = $_POST['transientName'];
    $photos_data = $_POST['photos'];

    set_transient( $transient_name, $photos_data, $cache_seconds );
}
add_action('wp_ajax_cache_photos', 'sbi_cache_photos');
add_action('wp_ajax_nopriv_cache_photos', 'sbi_cache_photos');



function sbi_get_cache() {
    global $wpdb;

    $cached_data = get_transient( $_POST['transientName'] );

	print $cached_data;

    die();
}
add_action('wp_ajax_get_cache', 'sbi_get_cache');
add_action('wp_ajax_nopriv_get_cache', 'sbi_get_cache');

function download_excel_file($filename ,$arr){
    $arr = json_decode($arr);
    // Instantiate a new PHPExcel object
    $objPHPExcel = new PHPExcel();
    // Set the active Excel worksheet to sheet 0
    $objPHPExcel->setActiveSheetIndex(0);
    $sheet0 = $objPHPExcel->getActiveSheet(0);
    $sheet0->setTitle("BENCHMARK");

    $sheet0->getStyle('C:F')
    ->getNumberFormat()->setFormatCode('#,##0');
    $sheet0->getStyle('E')
    ->getNumberFormat()->applyFromArray( 
        array( 
            'code' => PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE
        )
    );
    $sheet0->setSelectedCells('A1');
    // Initialise the Excel row number
    $rowCount = 1;
    // Iterate through each result from the SQL query in turn
    // We fetch each database result row into $row in turn

    foreach($arr->header as $row)
    {
        $column_index = 'A';
        foreach($row as $row_item) {
            $objPHPExcel->getActiveSheet()->SetCellValue($column_index . $rowCount, $row_item);
            $column_index++;
        }
        $rowCount++;
    }

    $objPHPExcel->createSheet(1);
    $objPHPExcel->setActiveSheetIndex(1);
    $sheet1 = $objPHPExcel->getActiveSheet();
    $sheet1->setTitle("CONTENDIO");
    
    $sheet1->getStyle('D:E')
    ->getNumberFormat()->setFormatCode('#,##0');
    $sheet1->setSelectedCells('A1');
    // Initialise the Excel row number
    $rowCount = 1;
    // Iterate through each result from the SQL query in turn
    // We fetch each database result row into $row in turn
    foreach($arr->data as $row)
    {
        $column_index = 'A';
        foreach($row as $row_item) {
            $objPHPExcel->getActiveSheet()->SetCellValue($column_index . $rowCount, $row_item);
            $column_index++;
        }
        $rowCount++;
    }
   
    for($col = 'A'; $col !== 'J'; $col++) {
        $objPHPExcel->setActiveSheetIndex(0)
            ->getColumnDimension($col)
            ->setAutoSize(true);
        $objPHPExcel->setActiveSheetIndex(1)
            ->getColumnDimension($col)
            ->setAutoSize(true);
    }

    header('Content-Type: application/vnd.ms-excel');
    //tell browser what's the file name
    header('Content-Disposition: attachment;filename="' . $filename . '"');

    header('Cache-Control: max-age=0'); //no cache
    //save it to Excel5 format (excel 2003 .XLS file), change this to 'Excel2007' (and adjust the filename extension, also the header mime type)
    //if you want to save it as .XLSX Excel 2007 format

    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');

    //force user to download the Excel file without writing it to server's HD
    $objWriter->save('php://output');
}

add_action('wp_ajax_save_export_data', 'save_export_data');
function save_export_data()
{
    $index = $_POST['index'];
    $result_arr = json_decode(stripslashes($_POST['data_table']));
    $header_arr = array(array('Rank','Influencer','Followers','Indice','Posts de Marcas','Indice de Marcas'));
    $header_arr1 = array(array('Date','Time','Influencer','Comments','Likes','Type','Link','Brands','Content'));

    function cmp($a, $b)
    {
        return $a[0] > $b[0];
    }

    usort($result_arr->header, "cmp");

    $cache_arr = array();
    $cache_arr['header'] = array_merge($header_arr,$result_arr->header);
    $cache_arr['data'] = array_merge($header_arr1,$result_arr->data);
    set_transient( 'export_'+$index, json_encode($cache_arr), 60);
    die();
}

add_action('wp_ajax_export_file', 'export_file');
function export_file()
{
    $index = $_GET['index'];
    $filename = $_GET['filename'].".xls";
    $result_arr = get_transient('export_'+$index);
    download_excel_file($filename ,$result_arr);
    die();
}

//Enqueue stylesheet
add_action( 'wp_enqueue_scripts', 'sb_instagram_styles_enqueue' );
function sb_instagram_styles_enqueue() {
    wp_register_style( 'sb_instagram_styles', plugins_url('css/sb-instagram.css', __FILE__), array(), SBIVER );
    wp_enqueue_style( 'sb_instagram_styles' );
    wp_register_style( 'sb_instagram_dropdown_styles', plugins_url('css/jquery.dropdown.css', __FILE__), array(), SBIVER );
    wp_enqueue_style( 'sb_instagram_dropdown_styles' );
    wp_register_style( 'sb_instagram_ui_styles', plugins_url('css/jquery-ui.css', __FILE__), array(), SBIVER );
    wp_enqueue_style( 'sb_instagram_ui_styles' );
    wp_register_style( 'sb_instagram_ui_styles', plugins_url('css/jquery-ui.css', __FILE__), array(), SBIVER );
    wp_enqueue_style( 'sb_instagram_ui_styles' );
    wp_register_style( 'sb_instagram_bootstrap_styles', plugins_url('assets/bootstrap/css/bootstrap.min.css', __FILE__), array(), SBIVER );
    wp_enqueue_style( 'sb_instagram_bootstrap_styles' );
    wp_register_style( 'sb_instagram_bsselect_styles', plugins_url('assets/bootstrap-select/bootstrap-select.min.css', __FILE__), array(), SBIVER );
    wp_enqueue_style( 'sb_instagram_bsselect_styles' );

    $sb_instagram_settings = get_option('sb_instagram_settings');
    $sb_instagram_settings['sb_instagram_disable_font'] = isset($sb_instagram_settings['sb_instagram_disable_font']) ? $sb_instagram_settings['sb_instagram_disable_font'] : false;

    if( !$sb_instagram_settings['sb_instagram_disable_font'] ) wp_enqueue_style( 'sbi-font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css', array(), '4.6.3' );
}

//Enqueue scripts
add_action( 'wp_enqueue_scripts', 'sb_instagram_scripts_enqueue' );
function sb_instagram_scripts_enqueue() {
    $page_id = get_the_ID();

    //Register the script to make it available
    wp_register_script( 'sb_instagram_scripts', plugins_url( '/js/sb-instagram.js' , __FILE__ ), array('jquery'), SBIVER, true );
    wp_register_script( 'sb_instagram_scripts_chart', plugins_url( '/js/Chart.js' , __FILE__ ), array('jquery'), SBIVER, true );
    wp_register_script( 'sb_instagram_scripts_dropdown', plugins_url( '/js/jquery.dropdown.min.js' , __FILE__ ), array('jquery'), SBIVER, true );
    wp_register_script( 'sb_instagram_scripts_ui', plugins_url( '/js/jquery-ui.js' , __FILE__ ), array('jquery'), SBIVER, true );
    wp_register_script( 'sb_instagram_scripts_bs', plugins_url( 'assets/bootstrap/js/bootstrap.min.js' , __FILE__ ), array('jquery'), SBIVER, true );
    wp_register_script( 'sb_instagram_scripts_bs_select', plugins_url( 'assets/bootstrap-select/bootstrap-select.min.js' , __FILE__ ), array('jquery'), SBIVER, true );

    if($page_id == 3046)
    {
        wp_register_script( 'sb_instagram_scripts_d3', plugins_url( 'assets/d3/d3.min.js' , __FILE__ ), array('jquery'), SBIVER, true );
        wp_register_script( 'sb_instagram_scripts_d3_layout', plugins_url( 'assets/d3/d3.layout.cloud.js' , __FILE__ ), array('jquery'), SBIVER, true );
    }
    //Options to pass to JS file
    $sb_instagram_settings = get_option('sb_instagram_settings');

    //Hide photos
    isset($sb_instagram_settings[ 'sb_instagram_hide_photos' ]) ? $sb_instagram_hide_photos = trim($sb_instagram_settings['sb_instagram_hide_photos']) : $sb_instagram_hide_photos = '';

    //Block users
    isset($sb_instagram_settings[ 'sb_instagram_block_users' ]) ? $sb_instagram_block_users = trim($sb_instagram_settings['sb_instagram_block_users']) : $sb_instagram_block_users = '';

    //Access token
    isset($sb_instagram_settings[ 'sb_instagram_at' ]) ? $sb_instagram_at = trim($sb_instagram_settings['sb_instagram_at']) : $sb_instagram_at = '';

    $data = array(
        'sb_instagram_at' => $sb_instagram_at,
        'sb_instagram_hide_photos' => $sb_instagram_hide_photos,
        'sb_instagram_block_users' => $sb_instagram_block_users,
        'sb_page_id' => $page_id,
    );

    isset($sb_instagram_settings[ 'sb_instagram_ajax_theme' ]) ? $sb_instagram_ajax_theme = trim($sb_instagram_settings['sb_instagram_ajax_theme']) : $sb_instagram_ajax_theme = '';
    ( $sb_instagram_ajax_theme == 'on' || $sb_instagram_ajax_theme == 'true' || $sb_instagram_ajax_theme == true ) ? $sb_instagram_ajax_theme = true : $sb_instagram_ajax_theme = false;

    //Enqueue it to load it onto the page
    if( !$sb_instagram_ajax_theme ){
        wp_enqueue_script('sb_instagram_scripts');
        wp_enqueue_script('sb_instagram_scripts_chart');
        wp_enqueue_script('sb_instagram_scripts_dropdown');
        wp_enqueue_script('sb_instagram_scripts_ui');
        wp_enqueue_script('sb_instagram_scripts_bs');
        wp_enqueue_script('sb_instagram_scripts_bs_select');
        if($page_id == 3046)
        {
            wp_enqueue_script('sb_instagram_scripts_d3');
            wp_enqueue_script('sb_instagram_scripts_d3_layout');
        }
    }

    wp_localize_script('sb_instagram_scripts', 'sb_instagram_js_options', $data);
    $keywords = explode("\r\n",$sb_instagram_settings['sb_instagram_custom_keywords']);
//    wp_localize_script('sb_instagram_scripts', 'sb_instagram_keywords',$keywords);
}

//Custom CSS
add_action( 'wp_head', 'sb_instagram_custom_css' );
function sb_instagram_custom_css() {
    $options = get_option('sb_instagram_settings');

    isset($options[ 'sb_instagram_custom_css' ]) ? $sb_instagram_custom_css = trim($options['sb_instagram_custom_css']) : $sb_instagram_custom_css = '';

    //Show CSS if an admin (so can see Hide Photos link), if including Custom CSS or if hiding some photos
    ( current_user_can( 'edit_posts' ) || !empty($sb_instagram_custom_css) || !empty($sb_instagram_hide_photos) ) ? $sbi_show_css = true : $sbi_show_css = false;

    if( $sbi_show_css ) echo '<!-- Instagram Feed CSS -->';
    if( $sbi_show_css ) echo "\r\n";
    if( $sbi_show_css ) echo '<style type="text/css">';

    if( !empty($sb_instagram_custom_css) ){
        echo "\r\n";
        echo stripslashes($sb_instagram_custom_css);
    }

    if( current_user_can( 'edit_posts' ) ){
        echo "\r\n";
        echo "#sbi_mod_link, #sbi_mod_error{ display: block; }";
    }

    if( $sbi_show_css ) echo "\r\n";
    if( $sbi_show_css ) echo '</style>';
    if( $sbi_show_css ) echo "\r\n";
}

//Custom JS
add_action( 'wp_footer', 'sb_instagram_custom_js' );
function sb_instagram_custom_js() {

    $options = get_option('sb_instagram_settings');
    isset($options[ 'sb_instagram_custom_js' ]) ? $sb_instagram_custom_js = trim($options['sb_instagram_custom_js']) : $sb_instagram_custom_js = '';

    echo '<!-- Instagram Feed JS -->';
    echo "\r\n";
    echo '<script type="text/javascript">';
    echo "\r\n";
    echo 'var sbiajaxurl = "' . admin_url('admin-ajax.php') . '";';
    if( !empty($sb_instagram_custom_js) ) echo "\r\n";
    if( !empty($sb_instagram_custom_js) ) echo "jQuery( document ).ready(function($) {";
    if( !empty($sb_instagram_custom_js) ) echo "\r\n";
    if( !empty($sb_instagram_custom_js) ) echo "window.sbi_custom_js = function(){";
    if( !empty($sb_instagram_custom_js) ) echo "\r\n";
    if( !empty($sb_instagram_custom_js) ) echo stripslashes($sb_instagram_custom_js);
    if( !empty($sb_instagram_custom_js) ) echo "\r\n";
    if( !empty($sb_instagram_custom_js) ) echo "}";
    if( !empty($sb_instagram_custom_js) ) echo "\r\n";
    if( !empty($sb_instagram_custom_js) ) echo "});";

    echo "\r\n";
    echo '</script>';
    echo "\r\n";

}
function get_select_box($type = 'min',$search_post_param)
{
    $follower_arr = array('0'=>'<- 10K','25000'=>'25K','50000'=>'50K','75000'=>'75K','100000'=>'100K','150000'=>'150K','250000'=>'250K','1'=>'250K ->');
    $select_name = "follower_min_select";
    if($type == 'max')
        $select_name = "follower_max_select";
    $res_html =  '<select class="selectpicker form-control" data-style="btn-danger" name="'.$select_name.'">';
    foreach($follower_arr as $key => $value)
    {
        $selected = '';
        if($type == "min")
        {
            if($key == '1')
                continue;
            if(isset($search_post_param['follower_min_select']) && $key == $search_post_param['follower_min_select'])
                $selected = 'selected';

        }
        if($type == "max"){
            if($key == '0')
                continue;
            if(isset($search_post_param['follower_max_select']) && $key == $search_post_param['follower_max_select'])
                $selected = 'selected';
            else if($key == 1)
                $selected = 'selected';

        }            
        $res_html .= '<option value="'.$key.'" '.$selected.'>'.$value.'</option>';
    }
    $res_html .= '</select>';
    return $res_html;
}

function get_category_box($search_post_param)
{
    global $category_arr;
    $res_html = '<select class="selectpicker form-control" data-style="btn-danger" name="category_select">';
    foreach($category_arr as $key => $value)
    {
        $select = '';
        if(isset($search_post_param['category_select']) && $key == $search_post_param['category_select'])
            $select = 'selected';
        $res_html .= '<option value="'.$key.'" '.$select.'> '.$value.'</option>';
    }
    $res_html .= '</select>';
    return $res_html;
}

?>