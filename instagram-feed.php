<?php 
/*
Plugin Name: Instagram Feed Pro Personal
Plugin URI: http://smashballoon.com/instagram-feed
Description: Add a customizable Instagram feed to your website
Version: 2.3
Author: Smash Balloon
Author URI: http://smashballoon.com/
*/
/*
Copyright 2016  Smash Balloon  (email: hey@smashballoon.com)
This program is paid software; you may not redistribute it under any
circumstances without the expressed written consent of the plugin author.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

if ( function_exists('display_instagram') ){
    wp_die( "Please deactivate the free version of the Instagram Feed plugin before activating this version.<br /><br />Back to the WordPress <a href='".get_admin_url(null, 'plugins.php')."'>Plugins page</a>." );
} else {
    include dirname( __FILE__ ) .'/sbi-init.php';
}

// set_site_transient( 'update_plugins', null );
define( 'SBIVER', '2.3' );
define( 'SBI_STORE_URL', 'http://smashballoon.com/' );
define( 'SBI_PLUGIN_NAME', 'Instagram Feed Pro Personal' ); //Update #
// The ID of the product. Used for renewals
$sbi_download_id = 33604; //33604, 33748, 33751

if( !class_exists( 'EDD_SL_Plugin_Updater' ) ) {
    // load custom updater
    include( dirname( __FILE__ ) . '/EDD_SL_Plugin_Updater.php' );
}

function sb_instagram_plugin_updater() {
    // retrieve license key from the DB
    $sbi_license_key = trim( get_option( 'sbi_license_key' ) );

    // setup the updater
    $edd_updater = new EDD_SL_Plugin_Updater( SBI_STORE_URL, __FILE__, array( 
            'version'   => SBIVER,                   // current version number
            'license'   => $sbi_license_key,        // license key
            'item_name' => SBI_PLUGIN_NAME,         // name of this plugin
            'author'    => 'Smash Balloon'          // author of this plugin
        )
    );
}
add_action( 'admin_init', 'sb_instagram_plugin_updater', 0 );


//Run function on plugin activate
function sb_instagram_activate_pro() {
    $options = get_option('sb_instagram_settings');
    $options[ 'sb_instagram_show_btn' ] = true;
    $options[ 'sb_instagram_show_header' ] = true;
    $options[ 'sb_instagram_show_follow_btn' ] = true;
    update_option( 'sb_instagram_settings', $options );

    //Run cron twice daily when plugin is first activated for new users
    wp_schedule_event(time(), 'twicedaily', 'sb_instagram_cron_job');
}
register_activation_hook( __FILE__, 'sb_instagram_activate_pro' );

function sb_instagram_deactivate_pro() {
    wp_clear_scheduled_hook('sb_instagram_cron_job');
}
register_deactivation_hook(__FILE__, 'sb_instagram_deactivate_pro');


//Uninstall
function sb_instagram_uninstall_pro()
{
    if ( ! current_user_can( 'activate_plugins' ) )
        return;

    //If the user is preserving the settings then don't delete them
    $options = get_option('sb_instagram_settings');
    $sb_instagram_preserve_settings = $options[ 'sb_instagram_preserve_settings' ];
    if($sb_instagram_preserve_settings) return;

    //Settings
    delete_option( 'sb_instagram_settings' );

    //Deactivate and delete license
    // retrieve the license from the database
    $license = trim( get_option( 'sbi_license_key' ) );
    // data to send in our API request
    $api_params = array( 
        'edd_action'=> 'deactivate_license', 
        'license'   => $license, 
        'item_name' => urlencode( SBI_PLUGIN_NAME ) // the name of our product in EDD
    );
    // Call the custom API.
    $response = wp_remote_get( add_query_arg( $api_params, SBI_STORE_URL ), array( 'timeout' => 15, 'sslverify' => false ) );
    delete_option( 'sbi_license_key' );
    delete_option( 'sbi_license_status' );
}
register_uninstall_hook( __FILE__, 'sb_instagram_uninstall_pro' );

?>