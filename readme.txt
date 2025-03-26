== Good Accordion == 
Contributors:      Hollands Spoor
Tags:              block, accordion, faq
Tested up to:      6.8
Stable tag:        1.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Wordpress accordion block.

== Description ==

Simple and good accordion plugin providing 2 blocks: Accordion and Accordion-pane. 

== Installation ==

Upload the plugin files to the `/wp-content/plugins/good-accordion` directory, or install the plugin using the WordPress plugins screen directly.

Activate the plugin in the 'Plugins' screen in WordPress

== Use ==

Drag an Accordion block into a post or page or CPT and use the 'Add pane' button at the bottom of the block to add pane-blocks.
 
== styling ==

At the root some basic styling variables are defined that can be overwritten by your theme. Some of these can be changed ad hoc by the user in de block-editor. These are:

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

The default values can also be defined in the theme.json of your (child-) theme:

Add them to the theme.json like so: 

{
	"$schema": "https://schemas.wp.org/wp/6.7/theme.json",
	"version": 3,
 
    ...
 
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
                "headerBackgroundColor" : "#666666",
                "headerTextColor": "#ffffff",
                "activeHeaderBackgroundColor": "#999999",
                "activeHeaderTextColor": "#ffffff"
                "bodyBackgroundColor" : "#ffffff",
                "bodyTextColor": "#000000",
            }
        }
    }
 
    ...

}
   

== Accessability ==
The pane-headers have a tab-index. If the Enter-key is pressed while a pane-header has focus, a click-event is triggered on that pane-header thereby activating / opening it.

== Frequently Asked Questions ==

= Can I nest the accordion block into another accrodion? =

Yes.


== Changelog ==

= 1.1.0 =
Added Selectbox to change headertag in pane header
Added color and backgroundcolor for pane-content


