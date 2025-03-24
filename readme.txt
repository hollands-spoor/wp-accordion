== Good Accordion == 
Contributors:      Hollands Spoor
Tags:              block, accordion, faq
Tested up to:      6.7
Stable tag:        1.0.0
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
    --wp--custom--accordion--text-color: #ffffff;
    --wp--custom--accordion--background-color: #666666;
    --wp--custom--accordion--active-text-color: #ffffff;
    --wp--custom--accordion--active-background-color: #999999;

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
                "backgroundColor" : "#666666",
                "textColor": "#ffffff",
                "activeBackgroundColor": "#999999",
                "activeTextColor": "#ffffff"
            }
        }
    }
 
    ...

}



    

== Accessability ==
The pane-headers have a tab-index. I the Enter-key is pressed while a pane-header has focus, a click-event is triggered on that pane-header thereby activating / opening it.

== Frequently Asked Questions ==

= Can I nest the accordion block into another accrodion? =

Yes.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 1.0.0 =
* Release

== Roadmap ==

Maybe open a pane when an element it contains it receives focus. 



