import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
    const { collapsed, oneAtATime, textColor, backgroundColor, activeTextColor, activeBackgroundColor, margin, padding } = attributes;

    // Function to generate inline styles based on block attributes
    const getStyle = () => {
        const style = {};
        if ( padding ) {
            style['--wp--custom--accordion--paddingTop'] = padding.top;
            style['--wp--custom--accordion--paddingRight'] = padding.right;
            style['--wp--custom--accordion--paddingBottom'] = padding.bottom;
            style['--wp--custom--accordion--paddingLeft'] = padding.left;
        }
        if ( margin ) {
            style['--wp--custom--accordion--marginTop'] = margin.top;
            style['--wp--custom--accordion--marginRight'] = margin.right;
            style['--wp--custom--accordion--marginBottom'] = margin.bottom;
            style['--wp--custom--accordion--marginLeft'] = margin.left;
        }
        if ( textColor ) {
            style['--wp--custom--accordion--textColor'] = textColor;
        }
        if ( backgroundColor ) {
            style['--wp--custom--accordion--backgroundColor'] = backgroundColor;
        }
        if ( activeTextColor ) {
            style['--wp--custom--accordion--activeTextColor'] = activeTextColor;
        }
        if ( activeBackgroundColor ) {
            style['--wp--custom--accordion--activeBackgroundColor'] = activeBackgroundColor;
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