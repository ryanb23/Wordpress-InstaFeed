=== Instagram Feed Pro ===
Contributors: smashballoon
Support Website: http://smashballoon/instagram-feed/
Requires at least: 3.0
Tested up to: 4.6.1
Stable tag: 2.3
Version: 2.3
License: Non-distributable, Not for resale

Display beautifully clean, customizable, and responsive feeds from multiple Instagram accounts

== Description ==

Display Instagram photos from any non-private Instagram accounts, either in the same single feed or in multiple different ones.

= Features =
* Super **simple to set up**
* Completely **responsive** and mobile ready - layout looks great on any screen size and in any container width
* **Completely customizable** - Customize the width, height, number of photos, number of columns, image size, background color, image spacing, text styling, likes & comments and more!
* Display **multiple Instagram feeds** on the same page or on different pages throughout your site
* Use the built-in **shortcode options** to completely customize each of your Instagram feeds
* Display thumbnail, medium or **full-size photos** from your Instagram feed
* **Infinitely load more** of your Instagram photos with the 'Load More' button
* View photos in a pop-up **lightbox**
* Display photos by User ID or hashtag
* Display photo captions, likes and comments
* Use your own Custom CSS or JavaScript

= Benefits =
* Increase your Instagram followers by displaying your Instagram content on your website
* Save time and increase efficiency by only posting your photos to Instagram and automatically displaying them on your website

== Installation ==

1. Install the Instagram plugin either via the WordPress plugin directory, or by uploading the files to your web server (in the `/wp-content/plugins/` directory).
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Navigate to the 'Instagram Feed' settings page to configure your Instagram feed.
4. Use the shortcode `[instagram-feed]` in your page, post or widget to display your photos.
5. You can display multiple Instagram feeds by using shortcode options, for example: `[instagram-feed id=YOUR_USER_ID_HERE cols=3 width=50 widthunit=%]`

== Changelog ==
= 2.3 =
* New: Added the ability to display a feed of specific posts. You can do this by using the `single` shortcode setting. First set the feed type to be "single", then paste the ID of the post(s) into the single shortcode setting, like so: `[instagram-feed type="single" single="sbi_1349591022052854916_10145706"]`. For further information, see [these directions](https://smashballoon.com/how-do-i-create-a-single-post-feed/).
* New: We've added a widget with the "Instagram Feed" label so that you no longer need to use the default "Text" widget
* Tweak: Addressed an occasional error with includewords/excludewords setting
* Tweak: Added commas to large numbers
* Tweak: When displaying photos by random the plugin will now randomize from the last 33 posts for unfiltered feeds rather than just randomizing the posts shown in the feed
* Tweak: User names can now be used instead of user ids for user feeds
* Fix: International characters are now supported in includewords/excludewords settings
* Fix: Fixed an undefined constant warning

= 2.2.1 =
* Tweak: Added a setting to disable the icon font used in the plugin
* Tweak: The "Include words" filtering option now only returns posts for an exact match instead of fuzzy matching
* Tweak: Change Instagram link to go to https
* Tweak: Added coordinates as attributes to the location element
* Fix: Fixed an issue with the Instagram image URLs which was resulting in inconsistent url references in some feeds
* Fix: Fixed an imcompatibility issue the MediaElement.js plugin
* Fix: Fixed an issue with videos not pausing in the lightbox when navigating using the keyboard arrows

= 2.2 =
* **IMPORTANT: Due to the recent Instagram API changes, in order for the Instagram Feed plugin to continue working after June 1st you must obtain a new Access Token by using the Instagram button on the plugin's Settings page.** This is required even if you recently already obtained a new token. Apologies for any inconvenience.

= 2.1.1 =
* Tweak: Updated the Instagram icon to match their new branding
* Tweak: Added a help link next to the Instagram login button in case there's an issue using it
* Fix: Updated the Font Awesome icon font to the latest version: 4.6.3

= 2.1 =
* Compatible with Instagram's new API changes effective June 1st
* New: Added the ability to display posts that your user has "liked" on Instagram. Thanks to Anders Hjort Straarup for his code contribution.
* New: Added a setting to allow you to use a fixed pixel width for the feed on desktop but switch to a 100% width responsive layout on mobile
* Tweak: Added a width and height attribute to the images to help improve Google PageSpeed score
* Tweak: When a feed contains posts from multiple hashtags then all of the hashtags are listed in the feed header
* Tweak: Allow users with WordPress "Editor" role to be able to moderate images in the feed
* Tweak: Added descriptive error messages
* Tweak: A few minor UI tweaks on the settings pages
* Fix: Hashtags which include foreign characters are now linked correctly
* Fix: Fixed an issue with the `showfollowers` shortcode option
* Fix: Fixed an issue with the carousel shortcode setting not working reliably
* Fix: Fixed an issue with the carousel script firing too soon when multiple API requests were required to fill the feed
* Misc bug fixes

= 2.0.4.2 =
* Fix: Fixed a JavaScript error in the admin area when using WordPress 4.5

= 2.0.4.1 =
* Fix: Fixed an issue with images in carousels not scaling correctly on mobile
* Fix: Fixed an issue with the lightbox breaking when an image didn't have a caption

= 2.0.4 =
* Fix: Fixed a bug which was causing the height of the photos to be shorter than they should have been in some themes
* Fix: Fixed an issue where when a feed was initially hidden (in a tab, for example) then the photo resolution was defaulting to 'thumbnail'

= 2.0.3 =
* Fix: Fixed an issue which was setting the visibility of some photos to be hidden in certain browsers
* Fix: The new square photo cropping is no longer being applied to feeds displaying images at less than 150px wide as the images from Instagram at this size are already square cropped
* Fix: Fixed a JavaScript error in Internet Explorer 8 caused by the 'addEventListener' function not being supported
* Note: If you notice any other bugs then please let us know so we can get them fixed right away. Thanks!

= 2.0.2 =
* Tweak: Added an option to force the plugin cache to clear on an interval if it isn't automatically clearing as expected
* Fix: Fixed an issue where photo wouldn't appear in the Instagram feed if it was initially being hidden
* Fix: Fixed an issue where the new image cropping fuction was failing to run on some sites and causing the images to appear as blank
* Fix: Fixed a bug where stray commas at the beginning or end of lists of IDs or hashtags would cause an error
* Fix: Removed the document ready function from around the plugin's initiating function so that it can be called externally if needed

= 2.0.1 =
* Fix: Fixed an issue with the number of likes and comments not showing over the photo when selected
* Fix: Fixed an issue with the carousel navigation arrows not being correctly aligned vertically when the caption was displayed beneath the photos
* Fix: The icons in the header for the number of photos and followers are now the right way around

= 2.0 =
* **MAJOR UDPATE**
* New: Completely rebuilt the core of the plugin to drastically improve the flexibility of the plugin and allow us to add some new post filtering options
* New: Added caching to minimize Instagram API requests
* New: Added a new Carousel feature which allows you to create awesome, customizable, and responsive carousels out of your Instagram feeds. Includes the ability to display navigation arrows, pagination, or enable autoplay. Use the Carousel settings on the plugin's Customize page or enable the carousel directly in your shortcode by using `carousel=true`. See [here]('https://smashballoon.com/instagram-feed/demo/carousel/') for an example of the carousel in action.
* New: You can now display photos from location ID. Use the field on the plugin's Settings page or the following shortcode options: `type=location location=213456451`.
* New: Display photos by location coordinates. Use the field on the plugin's Settings page or the following shortcode options: `type=coordinates coordinates="(25.76,-80.19,500)"`. See the directions on the plugin's Settings page for help on how to find coordinates.
* New: If you have uploaded a photo in portrait or landscape then the plugin will now display the square cropped version of photo in your feed and the full landscape/portrait image in the pop-up lightbox. **Important:** To enable this you will need to refresh your Access Token by using the big blue Instagram login button on the plugin's Settings page, and then copying your new token into the plugin's Access Token field.
* New: You can now choose to only show photos from your feeds which contain certain words or hashtags. For example, you can display photos from a User account which only contain a specific hashtag. Use the settings in the new 'Post Filtering' section on the Customize page, or define words or hashtags directly in your shortcode; `includewords="#sunshine"`
* New: You can now also remove photos which contain certain words or hashtags. Use the setting in the 'Post Filtering' section, or the following shortcode option `excludewords="bad, words"`
* New: Block photos from certain users by entering their usernames into the 'Block Users' field on the plugin's Customize page
* New: Added a second style of header. The 'boxed' header style can be configured under the 'Header' section of the plugin's Customize page, or enabled using `headerstyle=boxed`
* New: The plugin now automatically removes duplicate photos from your feed
* New: When you click on the name of a setting on the plugin's Settings pages it now displays the shortcode option for that setting, making it easier to find the option that you need
* New: Hashtags and @tags in the caption are now linked to the relevant pages on Instagram
* New: Text in the pop-up lightbox is now formatted with line breaks as it is on Instagram
* New: Choose to show the number of photos and followers an account has in the feed header. Use the setting under the 'Header' section, or the following shortcode option `showfollowers=true`.
* New: You can now choose to include only photos or only videos in your feed. Use the setting under the 'Photos' section on the Customize page, or the following shortcode option: `media=photos`.
* New: You can now display the photo location, caption, or number of likes and comments over the photo when it's hovered upon
* New: Pick and choose which information to show over the photo when it's hovered upon. Use the checkboxes under the 'Photo Hover Style' section, or the `hoverdisplay` shortcode option: `hoverdisplay="date, location, likes"`.
* Tweak: A header is now added to the hashtag feed and displays the hashtag
* Tweak: Added a loading symbol to the 'Load more' button to indicate when new photos are loading
* Fix: Fixed an issue where duplicate photos would be loaded into a feed if the 'Are you using an Ajax powered theme' setting was checked on a non-Ajax powered theme
* Fix: The play button icon shown over the top of the photo is now clickable
* Fix: Fixed an issue with emojis in the feed header displaying on a separate line
* Fix: Fixed a bug where the image resolution 'Auto-detect' setting would sometimes display the wrong image size

= 1.3.1 =
* New: Added an email option to the share icons in the pop-up lightbox
* Fix: Fixed an issue with the 'Load more' button not always showing when displaying photos from multiple hashtags or User IDs
* Fix: Fixed an issue where clicking on the play icon on the photo didn't launch the video pop-up
* Fix: Moved the initiating sbi_init function outside of the jQuery ready function so that it can be called externally if needed by Ajax powered themes/plugins
* Fix: Fixed a problem which sometimes caused the lightbox to conflict with lightboxes built into themes or other plugins

= 1.3 =
* New: Added an option to disable the pop-up photo lightbox
* New: Added swipe support for the popup lightbox on touch screen devices
* New: Added an setting which allows you to use the plugin with an Ajax powered theme
* New: Added an option to disable the mobile layout
* New: Added a Support tab which contains System Info to help with troubleshooting
* New: Added friendly error messages which display only to WordPress admins
* New: Added validation to the User ID field to prevent usernames being entered instead of IDs
* Tweak: Disabled the hover event on touch screen devices so that tapping the photo once launches the lightbox
* Tweak: Made the Access Token field slightly wider to prevent tokens being copy and pasted incorrectly
* Tweak: Updated the plugin updater/license check script

= 1.2.2 =
* New: Added the ability to add a class to the feed via the shortcode, like so: [instagram-feed class="my-feed"]
* Fix: Fixed an issue with videos not playing on some touch-screen devices
* Fix: Fixed an issue with video sizing on some mobile devices
* Fix: Addressed a few CSS issues which were causing some minor formatting issues on certain themes

= 1.2.1 =
* Fix: Fixed an issue with the width of videos exceeding the lightbox container on smaller screen sizes and mobile devices
* Fix: Fixed an issue with both buttons being hidden when there were no more posts to load, rather than just the 'Load More' button
* Fix: Added a small amount of margin to the top of the buttons to prevent them touching when displayed in narrow columns or on mobile

= 1.2 =
* New: You can now display photos from multiple User IDs or hashtags. Simply separate your IDs or hashtags by commas.
* New: Added an optional header to the feed which contains your profile picture, username and bio. You can activate this on the Customize page.
* New: Specific photos in your feed can now be hidden. A link is displayed in the popup photo lightbox to site admins only which reveals the photos ID. This can then be added to the new 'Hide Photos' section on the plugin's Customize page.
* New: The plugin now includes an 'Auto-detect' option for the Image Resolution setting which will automatically set the correct image resolution based on the size of your feed.
* New: Added the username and profile picture to the popup photo lightbox
* New: Added a 'Share' button to the photo lightbox which allows you to share the photo on various social media platforms
* New: Added an Instagram button to the photo lightbox which allows you to view the photo on Instagram
* New: Added an optional 'Follow on Instagram' button which can be displayed at the bottom of your feed. You can activate this on the Customize page.
* New: Added the ability to use your own custom text for the 'Load More' button
* New: You can now change the color of the text and icons which are displayed when hovering over the photos
* New: Added a loader icon to indicate that the images are loading
* Tweak: Tweaked some CSS to improve spacing and cross-browser consistency
* Tweak: Removed the semi-transparent background color from caption and likes section. can now be added via CSS instead using: #sb_instagram .sbi_info{ background: rgba(255,255,255,0.5); }
* Tweak: Improved the documentation within the plugin settings pages
* Fix: Fixed an issue with some photos not displaying at full size in the popup photo lightbox
* Fix: Added word wrapping to captions so that long sentences or hashtags without spaces to wrap onto the next line

= 1.1 =
* New: Added video support. Videos now play in the lightbox!
* New: Redesigned the photo hover state to use icons and include the date and author name
* New: Added an option to change the color of the hover background
* Tweak: You can now specify the hashtag with or without the # symbol
* Tweak: Tweaked the responsive design and modified the media queries so that the feed switches to 1 or 2 columns on mobile
* Tweak: Added a friendly message if you activate the Pro version of the plugin while the free version is still activated
* Tweak: Added a 'Settings' link to the Plugins page
* Tweak: Added a link to the [setup directions](https://smashballoon.com/instagram-feed/docs/)
* Fix: Replaced the 'on' function with the 'click' function to increase compatibility with themes using older versions of jQuery
* Fix: Fixed an issue with double quotes in photo captions
* Fix: Removed float from the feed container to prevent clearing issues with other widgets

= 1.0.3 =
* Tweak: If you have more than one Instagram feed on a page then the photos in each lightbox slideshow are now grouped by feed
* Tweak: Added an initialize function to the plugin
* Fix: Added a unique class and data attribute to the lightbox to prevent conflicts with other lightboxes on your site
* Fix: Fixed an occasional issue with the 'Sort Photos By' option being undefined

= 1.0.2 =
* Tweak: Added the photo caption as the 'alt' tag of the images
* Fix: Fixed an issue with the caption elipsis link not always working correctly after having clicked the 'Load More' button
* Fix: Changed the double quotes to single quotes on the 'data-options' attribute

= 1.0.1 =
* Fix: Fixed a minor issue with the Custom JavaScript being run before the photos are loaded

= 1.0 =
* Launched the Instagram Feed Pro plugin!