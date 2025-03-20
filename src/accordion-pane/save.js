import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { Dashicon } from '@wordpress/components';
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
    const { heading, backgroundColor, textColor } = attributes;

    return (
        <div { ...useBlockProps.save({ style: { margin: 'var(--wp--custom--accordion--marginTop) var(--wp--custom--accordion--marginRight) var(--wp--custom--accordion--marginBottom) var(--wp--custom--accordion--marginLeft)', backgroundColor } }) }>
        
            <div className="pane-header" tabindex="0" style={{ padding: 'var(--wp--custom--accordion--paddingTop) var(--wp--custom--accordion--paddingRight) var(--wp--custom--accordion--paddingBottom) var(--wp--custom--accordion--paddingLeft)', backgroundColor: textColor }}>
                <RichText.Content
                    tagName="h2"
                    value={ heading }
                />
                <Dashicon
                    icon="arrow-down-alt2"
                    className="pane-switch"
                />
            </div>
            <div className="pane-content" style={{ padding: '0 var(--wp--custom--accordion--paddingRight) 0 var(--wp--custom--accordion--paddingLeft)' }}>
                <InnerBlocks.Content />
            </div>
        </div>
    );
}