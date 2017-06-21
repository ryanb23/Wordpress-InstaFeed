<?php
/**
 * Created by IntelliJ IDEA.
 * User: john
 * Date: 2/6/17
 * Time: 4:35 PM
 */

function get_url_content($url){
    $curl_handle=curl_init();
    curl_setopt($curl_handle, CURLOPT_URL,$url);
    curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl_handle, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl_handle, CURLOPT_HEADER, 0);
    curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 30);
    curl_setopt($curl_handle, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($curl_handle, CURLOPT_SSL_VERIFYPEER, FALSE);
    $query = curl_exec($curl_handle);
    curl_close($curl_handle);
    return $query;
}
function change_token($is_expired){
    global $wpdb;
    $options = get_option('sb_instagram_settings');
    $query = "SELECT * FROM wpsb_instagram_tokens ORDER BY id";
    $results = $wpdb->get_results( $query);

    $prev_token = $new_token = '';
    foreach ($results as $row)
    {
        if($row->is_used) {
            $prev_token = $row->token;
            break;
        }
    }
    foreach ($results as $row)
    {
        if($row->is_used) continue;
        $new_token = $row->token;
        $url = 'https://api.instagram.com/v1/users/self/?access_token='.$new_token;
        $ret = get_url_content($url);
        $tmp = json_decode($ret);

        if(!isset($tmp->meta->error_message) || !isset($tmp->error_code)) {
            $options['sb_instagram_at'] = $new_token;
            $options['is_expired'] = 0;
            update_option('sb_instagram_settings', $options);

            $query = "UPDATE wpsb_instagram_tokens SET `is_used`=0";
            $wpdb->query($query);
            $query = "UPDATE wpsb_instagram_tokens SET `is_used`=1 WHERE id=".$row->id ;
            $wpdb->query($query);
            break;
        }
    }
    if($is_expired == 0) {
        send_notification_mail(array('prev'=>$prev_token,'now'=> $new_token));
    }
}
function check_api_limit($result)
{
    $is_expired = 0;
    $options = get_option('sb_instagram_settings');
    if(isset($result->meta->error_message) || isset($result->error_message)) {
        $error_message = isset($result->meta->error_message)?$result->meta->error_message:$result->error_message;
        $error_code = isset($result->meta->code)?$result->meta->code:$result->code;

        if (strpos($error_message, 'access_token') !== false || $error_code == 429) {
            $is_expired = 1;
        }
    }
    if($is_expired == 1) {
        change_token($options['is_expired']);
    }

    return $is_expired;
}
function expire_html($is_admin = false){
    if($is_admin)
        $return = "<h1 class=\"expire_h\">Api Limit Reached or Wrong Access Token!</h1>";
    else
        $return = "<h3 class=\"expire_h\">En estos momentos estamos experimentando una alta demanda debido al tráfico.  Intente nuevamente dentro de un rato.</h3>";
    return $return;
}
function send_notification_mail($tokens){
    $mail = new PHPMailer(true); //defaults to using php "mail()"; the true param means it will throw exceptions on errors, which we need to catch
    try {
    //$mail->AddAddress('jjs.j23@gmail.com');
    $mail->AddAddress('josh@mediarank.info');
    $mail->From = "rank.social";
    $mail->FromName = "Rank.Social Support Team";
    $mail->Subject = 'Token has been Expired';
    $mail->MsgHTML('Token <b>'.$tokens['prev'].'</b> has been expired<br/><br/> System automatically made another toke <b>'.$tokens['now'].'</b> in use!');
    $mail->Send();

    } catch (phpmailerException $e) {
    echo $e->errorMessage(); //Pretty error messages from PHPMailer
    } catch (Exception $e) {
    echo $e->getMessage(); //Boring error messages from anything else!
    }
}

function get_day($strMediaDays)
{
    preg_match('/(?P<week>\d+)(w)/', $strMediaDays, $matches);
    $week = isset($matches['week']) ? intval($matches['week']) : 0;
    preg_match('/(?P<day>\d+)(d)/', $strMediaDays, $matches);
    $day = isset($matches['day']) ? intval($matches['day']) : 0;

    return ($week*7 + $day ? $week*7 + $day : null);
}
?>