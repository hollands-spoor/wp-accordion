/**
 * TODO: to pass data from accordion to accordionpanes: see: https://wordpress.stackexchange.com/questions/370665/how-to-access-parent-blocks-attributes-in-nested-blocks-save-function
 * 
 * 
 */



/**
 * Retrieves the translation of text.
 */


import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";
import { SelectedIcon } from "./good-icon";
import { useState } from "@wordpress/element";
//import DOMPurify from 'dompurify'; // Import a sanitizer library

import "./editor.scss";

/**
 * Uses isActive to open / close the pane in the editor.
 *
 * On frontend pane will be opened by script from accordion block.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, context }) {
	const { heading, paneSettings } = attributes;
	console.log( "paneSettings", paneSettings );
	
	
	const [isActive, setIsActive] = useState(false);

	const toggleActive = () => {
		setIsActive(!isActive);
	};

	const CONTENT_TEMPLATE = [
		["core/paragraph", { placeholder: __("Add content...", "accordion") }],
	];

	console.log( 'context provided: ', context );
	if( paneSettings !== context['hs-blocks/accordion'] ) {
		setAttributes({ paneSettings: context['hs-blocks/accordion'] });
	}

	return (
		<div {...useBlockProps({ className: isActive ? "active" : "" })}>
			<div
				className={ ( paneSettings.iconPosition === 'left' ) ? "pane-header justify-left" : "pane-header" }
				style={{
					color: "var(--wp--custom--accordion--header--text-color)",
					backgroundColor:
						"var(--wp--custom--accordion--header--background-color)",
					margin:
						"var(--wp--custom--accordion--margin-top) var(--wp--custom--accordion--margin-right) var(--wp--custom--accordion--margin-bottom) var(--wp--custom--accordion--margin-left)",
					padding:
						"var(--wp--custom--accordion--padding-top) var(--wp--custom--accordion--padding-right) var(--wp--custom--accordion--padding-bottom) var(--wp--custom--accordion--padding-left)",
				}}
				onClick={toggleActive}
			>

				{ paneSettings.iconPosition === "left" ? <SelectedIcon iconType={ paneSettings.iconType } /> : null }

				<RichText
					tagName={paneSettings.headerTag}
					value={heading}
					onChange={(value) => setAttributes({ heading: value })}
					placeholder={__("Add heading...", "accordion")}
				/>

				{ paneSettings.iconPosition === "right" ? <SelectedIcon iconType={ paneSettings.iconType } /> : null }

			</div>
			<div
				className="pane-content"
				style={{
					margin:
						"0 var(--wp--custom--accordion--margin-right) 0 var(--wp--custom--accordion--margin-left)",
					padding:
						"0 var(--wp--custom--accordion--padding-right) 0 var(--wp--custom--accordion--padding-left)",
					color: "var(--wp--custom--accordion--body--text-color)",
					backgroundColor:
						"var(--wp--custom--accordion--body--background-color)",
				}}
			>
				<InnerBlocks template={CONTENT_TEMPLATE} templateLock={false} />
			</div>
		</div>
	);
}
