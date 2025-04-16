=== Good Accordion === 
Contributors:      duijvelshoff
Tags:              accordion, faq
Donate link:       https://hollands-spoor.com/donate/
Requires at least: 6.7
Tested up to:      6.8
Stable tag:        1.0.2
Requires PHP:      7.4
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Wordpress accordion block. Simple, small and good.

== Description ==

Simple and good accordion plugin providing 2 blocks: Accordion and Accordion-pane. Drag an Accordion block into your post, page or custom post type and hit the 'Add pane' button for as often as you need.

Features:

* Setting for 'One at a time'. Only one pane within an accordion can be opened. Uncheck this to allow for all panes to be opened simultaneously.
* Use 'Tab' key to focus panes and hit 'Enter' to open
* Panes scroll into view when a previous pane gets closed
* Adjust colors, margins and padding in the block editor
* Add styling via css, css-vars or theme.json




== Installation ==

Upload the plugin files to the `/wp-content/plugins/good-accordion` directory, or install the plugin using the WordPress plugins screen directly.

Activate the plugin in the 'Plugins' screen in WordPress

== Use ==

Drag an Accordion block into a post or page or CPT and use the 'Add pane' button at the bottom of the block to add pane-blocks.
 
== styling ==

At the root some basic styling variables are defined that can be overwritten by your theme. Some of these can be changed ad hoc by the user in de block-editor. These are:
`
    --wp--custom--accordion--transition-time: 0.1s;
    --wp--custom--accordion--margin-top: 0px;
    --wp--custom--accordion--margin-right: 0px;
    --wp--custom--accordion--margin-bottom: 0.1em;
    --wp--custom--accordion--margin-left: 0px;
    --wp--custom--accordion--padding-top: 0.5em;
    --wp--custom--accordion--padding-right: 2em;
    --wp--custom--accordion--padding-bottom: 0.5em;
    --wp--custom--accordion--padding-left: 2em;
    --wp--custom--accordion--header--text-color: #ffffff;
    --wp--custom--accordion--header--background-color: #666666;
    --wp--custom--accordion--header--active-text-color: #ffffff;
    --wp--custom--accordion--header--active-background-color: #999999;
    --wp--custom--accordion--body--text-color: #ffffff;
    --wp--custom--accordion--body--background-color: #666666;
`
The default values can also be defined in the theme.json of your (child-) theme:

Add them to the theme.json like so: 

`{
	"$schema": "https://schemas.wp.org/wp/6.7/theme.json",
	"version": 3,
    "settings": {
        "custom": {
            "accordion": {
                "transitionTime": "0.1s",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0.1em",
                "marginLeft": "0px",
                "paddingTop": "0.5em",
                "paddingRight": "2em",
                "paddingBottom": "0.5em",
                "paddingLeft": "2em",
                "headerTextColor": "#ffffff",
                "headerBackgroundColor" : "#666666",
                "activeHeaderTextColor": "#ffffff"
                "activeHeaderBackgroundColor": "#999999",
                "bodyTextColor": "#000000",
                "bodyBackgroundColor" : "#ffffff",
            }
        }
    }
}`
   

== Accessability ==
The pane-headers have a tab-index. If the Enter-key is pressed while a pane-header has focus, a click-event is triggered on that pane-header thereby activating / opening it.

== Frequently Asked Questions ==

= Can I nest the accordion block into another accordion? =

Yes. Just pull another good-accordion block into the open pane of another good-accordion block.

== Screenshots ==

1. Good Accordion
2. Customised in block editor
3. Customised in stylesheet


== Changelog ==

= 1.0.2 =

*Release Date - 14 April 2025*

* Replaced Dashicons with some SVG sources
* Toggle switch for icon-position in header pane
* Updated translation
* Added nl_NL-formal translation

= 1.0.1 =
*Release Date - 10 April 2025*

* Minor bugfix in accordionpane header-tag

