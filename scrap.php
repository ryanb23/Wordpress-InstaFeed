<?php
/**
 * Created by IntelliJ IDEA.
 * User: john
 * Date: 3/31/17
 * Time: 8:08 PM
 */
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers:X-Requested-With,Content-Type,Accept,Origin,Authorization");
    header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE,OPTIONS");
    function get_url_content($url){
        $curl_handle=curl_init();
        curl_setopt($curl_handle, CURLOPT_URL,$url);
        curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl_handle, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl_handle, CURLOPT_HEADER, 0);
        curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 20);
    //    curl_setopt($curl_handle, CURLOPT_USERAGENT, 'rank.social');
        $query = curl_exec($curl_handle);
        curl_close($curl_handle);
        return $query;
    }
    $media_arry = json_decode($_REQUEST['media']);
    $result = array();

    $total_view_cnt = 0;
    $total_rep_cnt = 0;
    $rep_cnt_arr = array();
    $like_cnt_arr = array();
    $view_rate = array();
    foreach($media_arry as $key => $media)
    {
        if($media->type == "video")
        {
            $user_id = $media->user_id;
            $url = $media->url;
            $ret = get_url_content($url);
            preg_match_all('/"video_view_count": (.*?)\,/s', $ret, $matches);
            $item_view_count = intval($matches[1][0]);
            $like_cnt_arr[$user_id] += $media->likes;
            $rep_cnt_arr[$user_id] += $item_view_count;
            $total_rep_cnt += $item_view_count;
            $result['data'][$media->id]['views'] = $item_view_count;
        }
    }
    foreach($like_cnt_arr as $user_id => $row) {
        $view_rate[$user_id] = $like_cnt_arr[$user_id] != 0 ? $rep_cnt_arr[$user_id] / $like_cnt_arr[$user_id] : 0;
    }

    foreach($media_arry as $key => $media)
    {
        if($media->type != "video")
        {
            $user_id = $media->user_id;
            if(!isset($view_rate[$user_id]))
                $view_rate[$user_id] = 0;
            $item_view_count = intval($media->likes * $view_rate[$user_id]);
            $result['data'][$media->id]['views'] = $item_view_count;
            $total_view_cnt += $item_view_count;
        }
        $result['data'][$media->id]['type'] = $media->type;
    }
    $result['total_rep_cnt'] = $total_rep_cnt;
    $result['total_view_cnt'] = $total_view_cnt;
    echo json_encode($result);
    die();
?>