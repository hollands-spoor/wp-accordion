import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
    const { collapsed, oneAtATime, textColor, backgroundColor, activeTextColor, activeBackgroundColor, margin, padding } = attributes;

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
        if ( textColor ) {
            style['--wp--custom--accordion--text-color'] = textColor;
        }
        if ( backgroundColor ) {
            style['--wp--custom--accordion--background-color'] = backgroundColor;
        }
        if ( activeTextColor ) {
            style['--wp--custom--accordion--active-text-color'] = activeTextColor;
        }
        if ( activeBackgroundColor ) {
            style['--wp--custom--accordion--active-background-color'] = activeBackgroundColor;
        }

        return style;
    };

    // Generate block properties including inline styles
    const blockProps = useBlockProps.save( {
        'data-one-at-a-time': oneAtATime,
        'data-collapsed': collapsed,
        style: getStyle(),
        'aria-expanded': collapsed ? 'false' : 'true',
        'aria-controls': 'pane-content-id',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
}