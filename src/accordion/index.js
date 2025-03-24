/**
 * Register the Accordion block.
 */
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { hsAccordionLogo } from '../icons/icons.js';


registerBlockType( metadata.name, {

	icon: {
        background: '#ffffff',
        foreground: '#ad6200',
        src: hsAccordionLogo
    },
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
