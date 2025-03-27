import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Button, SelectControl, __experimentalBoxControl as BoxControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
    const { collapsed, oneAtATime, headerTag, margin, padding, headerTextColor, headerBackgroundColor, activeHeaderTextColor, activeHeaderBackgroundColor, bodyTextColor, bodyBackgroundColor } = attributes;

    // Generate the inline styles based on block attributes
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
    const blockProps = useBlockProps( {
        style: getStyle(),
    } );

    // Add a new pane
    const addPane = () => {
        const innerBlocks = wp.data.select( 'core/block-editor' ).getBlocks( clientId );

        // Add a new pane block...
        const paneBlock = wp.blocks.createBlock( 'hs-blocks/accordion-pane', {} );

        // ... and insert it
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
                    <SelectControl
                        label={ __( 'Header Tag', 'accordion' ) }
                        value={ headerTag }
                        options={ [
                            { label: 'h1', value: 'h1' },
                            { label: 'h2', value: 'h2' },
                            { label: 'h3', value: 'h3' },
                            { label: 'h4', value: 'h4' },
                            { label: 'h5', value: 'h5' },
                            { label: 'h6', value: 'h6' },
                            { label: 'p', value: 'p' },
                            { label: 'div', value: 'div' },
                        ] }
                        onChange={ ( value ) => setAttributes( { headerTag: value } ) }
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
                                value: headerTextColor,
                                onChange: ( color ) => setAttributes( { headerTextColor: color } ),
                                label: __( 'Header Text Color', 'accordion' ),
                            },
                            {
                                value: headerBackgroundColor,
                                onChange: ( color ) => setAttributes( { headerBackgroundColor: color } ),
                                label: __( 'Header Background Color', 'accordion' ),
                            },
                            {
                                value: activeHeaderTextColor,
                                onChange: ( color ) => setAttributes( { activeHeaderTextColor: color } ),
                                label: __( 'Active Header Text Color', 'accordion' ),
                            },
                            {
                                value: activeHeaderBackgroundColor,
                                onChange: ( color ) => setAttributes( { activeHeaderBackgroundColor: color } ),
                                label: __( 'Active Header Background Color', 'accordion' ),
                            },
                            {
                                value: bodyTextColor,
                                onChange: ( color ) => setAttributes( { bodyTextColor: color } ),
                                label: __( 'Body Text Color', 'accordion' ),
                            },
                            {
                                value: bodyBackgroundColor,
                                onChange: ( color ) => setAttributes( { bodyBackgroundColor: color } ),
                                label: __( 'Body Background Color', 'accordion' ),
                            },

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