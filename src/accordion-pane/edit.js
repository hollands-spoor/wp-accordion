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

import { useEffect, useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
//import DOMPurify from 'dompurify'; // Import a sanitizer library

import "./editor.scss";

/**
 * Uses isActive to open / close the pane in the editor.
 *
 * On frontend pane will be opened by script from accordion block.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const { heading, headerTag, iconPosition, iconType } = attributes;
	const [isActive, setIsActive] = useState(false);

	const toggleActive = () => {
		setIsActive(!isActive);
	};

	const CONTENT_TEMPLATE = [
		["core/paragraph", { placeholder: __("Add content...", "accordion") }],
	];

	// Retrieve header-tag from the parent block
	// This way of getting attributes from parent block can maybe replace the use of data attributes
	const parentAttributes = useSelect(
		(select) => {
			const { getBlockParentsByBlockName, getBlock } =
				select("core/block-editor");
			const parentId = getBlockParentsByBlockName(
				clientId,
				"hs-blocks/accordion",
			)[0];
			if (parentId) {
				const parentBlock = getBlock(parentId);
				return parentBlock?.attributes;
			}
			return false;
		},
		[clientId],
	);

	// Update the headerTag attribute if it differs from the parentHeaderTag

	const parentHeaderTag = parentAttributes ? parentAttributes.headerTag : "h3";
	const parentIconPosition = parentAttributes ? parentAttributes.iconPosition : "right";
	const parentIconType = parentAttributes ? parentAttributes.iconType : "plusminus";
	useEffect(() => {
		if (parentHeaderTag !== headerTag) {
			setAttributes({ headerTag: parentHeaderTag });
		}
		if (parentIconPosition !== iconPosition) {
			setAttributes({ iconPosition: parentIconPosition });
		}
		if (parentIconType !== iconType) {
			setAttributes({ iconType: parentIconType });
		}

	}, [parentHeaderTag, parentIconPosition, parentIconType]);

	// Function to generate a sanitized anchor ID from the heading text
	//    const generateAnchor = (text) => {
	//        return DOMPurify.sanitize(text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
	//    };
	// add id={ generateAnchor(heading) } to div.pane-header tag


	return (
		<div {...useBlockProps({ className: isActive ? "active" : "" })}>
			<div
				className={ ( iconPosition === 'left' ) ? "pane-header justify-left" : "pane-header" }
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

				{ iconPosition === "left" ? <SelectedIcon iconType={ iconType } /> : null }

				<RichText
					tagName={headerTag}
					value={heading}
					onChange={(value) => setAttributes({ heading: value })}
					placeholder={__("Add heading...", "accordion")}
				/>

				{ iconPosition === "right" ? <SelectedIcon iconType={ iconType } /> : null }

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
