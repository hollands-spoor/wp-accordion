import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Button, __experimentalBoxControl as BoxControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
    const { collapsed, oneAtATime, margin, padding, textColor, backgroundColor, activeTextColor, activeBackgroundColor } = attributes;

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
    const blockProps = useBlockProps( {
        style: getStyle(),
    } );

    // Function to add a new pane
    const addPane = () => {
        const innerBlocks = wp.data.select( 'core/block-editor' ).getBlocks( clientId );

        // Add a new pane block
        const paneBlock = wp.blocks.createBlock( 'hs-blocks/accordion-pane', {} );

        // And insert it
        wp.data.dispatch( 'core/block-editor' ).insertBlock(
            paneBlock,
            innerBlocks.length,
            clientId
        );
    };

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={ __( 'Settings', 'accordion' ) }>
                    <ToggleControl
                        label={ __( 'Collapsed', 'accordion' ) }
                        checked={ collapsed }
                        onChange={ ( value ) => setAttributes( { collapsed: value } ) }
                    />
                    <ToggleControl
                        label={ __( 'One at a time', 'accordion' ) }
                        checked={ oneAtATime }
                        onChange={ ( value ) => setAttributes( { oneAtATime: value } ) }
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelBody title={ __( 'Appearance', 'accordion' ) }>
                    <PanelColorSettings
                        title={ __( 'Color Settings', 'accordion' ) }
                        initialOpen={ true }
                        colorSettings={ [
                            {
                                value: backgroundColor,
                                onChange: ( color ) => setAttributes( { backgroundColor: color } ),
                                label: __( 'Background Color', 'accordion' ),
                            },
                            {
                                value: textColor,
                                onChange: ( color ) => setAttributes( { textColor: color } ),
                                label: __( 'Text Color', 'accordion' ),
                            },
                            {
                                value: activeBackgroundColor,
                                onChange: ( color ) => setAttributes( { activeBackgroundColor: color } ),
                                label: __( 'Active Background Color', 'accordion' ),
                            },
                            {
                                value: activeTextColor,
                                onChange: ( color ) => setAttributes( { activeTextColor: color } ),
                                label: __( 'Active Text Color', 'accordion' ),
                            }
                        ] }
                    />
                    <BoxControl
                        label={ __( 'Margin', 'accordion' ) }
                        values={ margin }
                        onChange={ ( values ) => setAttributes( { margin: values } ) }
                    />
                    <BoxControl
                        label={ __( 'Padding', 'accordion' ) }
                        values={ padding }
                        onChange={ ( values ) => setAttributes( { padding: values } ) }
                    />
                </PanelBody>
            </InspectorControls>
            <div { ...blockProps }>
                <InnerBlocks allowedBlocks={ [ 'hs-blocks/accordion-pane' ] } />
                <Button variant="primary" onClick={ addPane }>
                    { __( 'Add Pane', 'accordion' ) }
                </Button>
            </div>
        </>
    );
}