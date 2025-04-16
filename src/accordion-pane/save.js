import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { SelectedIcon } from './good-icon';
// import DOMPurify from 'dompurify'; // Import a sanitizer library

/**
 *
 * @return {Element} Element to render.
 */

//const generateAnchor = (text) => {
//    return DOMPurify.sanitize(text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));

//};


// add id={ generateAnchor(heading) } to div.pane-header tag

export default function save({ attributes }) {
    const { heading, paneSettings } = attributes;
    const justifyLeft = paneSettings.iconPosition === 'left' ? "justify-left" : "";

    return (
        <div { ...useBlockProps.save({ style: { margin: 'var(--wp--custom--accordion--margin-top) var(--wp--custom--accordion--margin-right) var(--wp--custom--accordion--margin-bottom) var(--wp--custom--accordion--margin-left)'} }) }>
        
            <div 
				className={ `pane-header ${justifyLeft}` }
				tabindex="0" style={{ padding: 'var(--wp--custom--accordion--padding-top) var(--wp--custom--accordion--padding-right) var(--wp--custom--accordion--padding-bottom) var(--wp--custom--accordion--padding-left)'
                }}
            >
				{ paneSettings.iconPosition === "left" ? <SelectedIcon iconType={ paneSettings.iconType } /> : null }
				
                <RichText.Content
                    tagName={paneSettings.headerTag}
                    value={ heading }
                />
				
				{ paneSettings.iconPosition === "right" ? <SelectedIcon iconType={ paneSettings.iconType } /> : null }

            </div>
            <div className="pane-content" style={{ padding: '0 var(--wp--custom--accordion--padding-right) 0 var(--wp--custom--accordion--padding-left)', color: 'var(--wp--custom--accordion--body--text-color)', backgroundColor: 'var(--wp--custom--accordion--body--background-color)' }}>
                <InnerBlocks.Content />
            </div>
        </div>
    );
}