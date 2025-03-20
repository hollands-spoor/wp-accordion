=== Accordion ===
Contributors:      Hollands Spoor
Tags:              block
Tested up to:      6.7
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Accordion block.

== Description ==

Extremely simple accordion plugin. Containing 2 blocks: Accordion and Accordion-pane. 

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/accordion` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress

== Use ==

Drag an Accordion block into the post or page and use the 'Add pane' button at the bottom of the block to add pane-blocks.
 
== styling ==
At the root some basic styling variables are defined that can be overwritten by your theme or ad hoc by the user in de block-editor. These are:

    --wp--custom--accordion--transitionTime: 0.1s;
    --wp--custom--accordion--marginTop: 0px;
    --wp--custom--accordion--marginRight: 0px;
    --wp--custom--accordion--marginBottom: 0.1em;
    --wp--custom--accordion--marginLeft: 0px;
    --wp--custom--accordion--paddingTop: 0.5em;
    --wp--custom--accordion--paddingRight: 2em;
    --wp--custom--accordion--paddingBottom: 0.5em;
    --wp--custom--accordion--paddingLeft: 2em;
    --wp--custom--accordion--textColor: #ffffff;
    --wp--custom--accordion--backgroundColor: #666666;
    --wp--custom--accordion--activeTextColor: #ffffff;
    --wp--custom--accordion--activeBackgroundColor: #999999;


    

== Accessability ==
The pane-headers have a tab-index. I the enter-key is pressed while a pane-headers has focus, a click-event is triggered.



== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

= What about foo bar? =

Answer to foo bar dilemma.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 1.0.0 =
* Release

