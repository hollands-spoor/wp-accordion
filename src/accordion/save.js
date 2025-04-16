import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
    const { collapsed, oneAtATime, headerTextColor, headerBackgroundColor, activeHeaderTextColor, activeHeaderBackgroundColor, bodyTextColor, bodyBackgroundColor, margin, padding } = attributes;

    // Function to generate inline styles based on block attributes
    const getStyle = () => {
        const style = {};
        if ( padding ) {
            style['--wp--custom--accordion--padding-top'] = padding.top;
            style['--wp--custom--accordion--padding-right'] = padding.right;
            style['--wp--custom--accordion--padding-bottom'] = padding.bottom;
            style['--wp--custom--accordion--padding-left'] = padding.left;
        }
        if ( margin ) {
            style['--wp--custom--accordion--margin-top'] = margin.top;
            style['--wp--custom--accordion--margin-right'] = margin.right;
            style['--wp--custom--accordion--margin-bottom'] = margin.bottom;
            style['--wp--custom--accordion--margin-left'] = margin.left;
        }
        if ( headerTextColor ) {
            style['--wp--custom--accordion--header--text-color'] = headerTextColor;
        }
        if ( headerBackgroundColor ) {
            style['--wp--custom--accordion--header--background-color'] = headerBackgroundColor;
        }
        if ( activeHeaderTextColor ) {
            style['--wp--custom--accordion--active--header--text-color'] = activeHeaderTextColor;
        }
        if ( activeHeaderBackgroundColor ) {
            style['--wp--custom--accordion--active--header--background-color'] = activeHeaderBackgroundColor;
        }
        if ( bodyTextColor ) {
            style['--wp--custom--accordion--body--text-color'] = bodyTextColor;
        }
        if ( bodyBackgroundColor ) {
            style['--wp--custom--accordion--body--background-color'] = bodyBackgroundColor;
        }


        return style;
    };

    // Generate block properties including inline styles
    // Add attributes that are needed by view script as data attributes
    const blockProps = useBlockProps.save( {
        style: getStyle(),
        'data-one-at-a-time': oneAtATime,
        'data-collapsed': collapsed,
        'aria-expanded': collapsed ? 'false' : 'true',
        'aria-controls': 'pane-content-id',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
}