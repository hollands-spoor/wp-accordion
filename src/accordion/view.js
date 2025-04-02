/**
 * Initialize the accordion block.
 * Add event listeners to the accordion panes.
 * Open first pane when collapsed is false.
 * On opening a pane, close all other panes when oneAtATime is true.
 * On opening and closing a pane, set max-height of the pane-content. This allows for css transitions.
 */

document.addEventListener("DOMContentLoaded", function () {
	const accordionBlocks = document.querySelectorAll(
		".wp-block-hs-blocks-accordion",
	);

	/**
	 * Scrollheight is not correct during transition. So it can not serve during
	 * transition of the max height of a pane.
	 *
	 * Therefore this method is called twice: once before transition with reset = true.
	 * Then again after transition with reset = false. The parent needs its
	 * css max-height set afterwards for the case that this parent itself is
	 * collapsed by the user. All this is only here for the case the accordion
	 * needs animation by means of .js class-changes and css.
	 *
	 * max-height and its css transition seems to be the most used way to animate.
	 * But maybe something else can be found?
	 *
	 * TODO: reset can be called unset, for that is what actually happens during
	 * the transition.
	 *
	 * Traverse upwards in the DOM and find out if accordion-block is inside the pane
	 * of another accordion-block.
	 * If so, unset the max-height of the content of that parent pane during
	 * animation ( i.e. during transition of css max-height ).
	 * After the transition is done, set
	 * the max-height back to the content's scrollHeight.
	 */
	const checkForParentPane = (element, unset) => {
		const parentPane = element.closest(".wp-block-hs-blocks-accordion-pane");
		if (parentPane) {
			// If parent pane is closed, which is possible if keyboard is used to set focus to a hidden element, then it should be opened.
			if (! parentPane.classList.contains("active")) {
				const parentHeader = parentPane.querySelector(".pane-header");
				parentHeader.click();
			}
			const content = parentPane.querySelector(".pane-content");
			if (unset) {
				content.style.removeProperty('max-height');
			} else {
				content.style.maxHeight = content.scrollHeight + "px";
			}
			const parentBlock = parentPane.closest(".wp-block-hs-blocks-accordion");
			if (parentBlock) {
				checkForParentPane(parentBlock);
			}
		}
	};


	/**
	 * Get the offset of the element.
	 * @param {*} el 
	 * @returns {Object} - The offset of the element
	 */
	const getElementOffset = (el) => {
		const rect = el.getBoundingClientRect();
		return {
		  left: rect.left + window.scrollX,
		  top: rect.top + window.scrollY
		};
	}

	/**
	 * Get the height of the element including margins.	
	 * @param {*} el 
	 * @returns height of the element
	 */

	const getElementHeight = (el) => {
		const styles = window.getComputedStyle(el);
		const margin = parseFloat(styles['marginTop']) +
					 parseFloat(styles['marginBottom']);
		return Math.ceil(el.offsetHeight + margin);
	}

	/**
	 * Check all the accordions in the page...
	 */
	accordionBlocks.forEach((block) => {
		const oneAtATime = block.getAttribute("data-one-at-a-time") === "true";
		const collapsed = block.getAttribute("data-collapsed") === "true";
		const accordionPanes = block.querySelectorAll(
			":scope > .wp-block-hs-blocks-accordion-pane",
		);

		/**
		 * ...and add a click handler to the header of each pane.
		 * Also open the first pane if collapsed is false.
		 * Open all panes would make the use of an accordion useless.
		 * Ensure accessibility by adding keydown event listener for Enter key.
		 * 
		 */
		accordionPanes.forEach((pane, index) => {
			const header = pane.querySelector(".pane-header");
			const content = pane.querySelector(".pane-content");
			// If collapsed is false, open the first pane
			if (!collapsed && index === 0) {
				pane.classList.add("active");
				content.style.maxHeight = content.scrollHeight + "px";
				checkForParentPane(block, false);
			} else {
				content.style.maxHeight = "0";
			}

			header.addEventListener("click", function (event) {
				if (oneAtATime) {
					// Close other open panes, i.e. remove 'active' class from all sibling panes
					accordionPanes.forEach((siblingPane) => {
						if (siblingPane !== pane) {
							siblingPane.classList.remove("active");
							siblingPane.querySelector(".pane-content").style.maxHeight = "0";
						}
					});
				}

				pane.classList.toggle("active");
				if (pane.classList.contains("active")) {
					content.style.maxHeight = content.scrollHeight + "px";
					pane.classList.add('opening');
					// Pane can be clicked during animation
					pane.classList.remove('closing');
					//scroll to position of the currently opened pane-header. Maybe some previous pane is in the process of closing, so the position is calculated in advance by taking the top of the current accordion block and then add ( index * height of the paneheader ).
					if( oneAtATime ) {
						const paneHeaderHeight = getElementHeight( header);
						const newScrollPosition =  getElementOffset(block).top + ( index * paneHeaderHeight );
						const currentScrollPosition = document.documentElement.scrollTop; // Check browsersupport for this

						// FIXME: This is not working in Firefox. <-- Check this!
						// FIXME: When using mouse, new position can only be smaller, but when using keyboard in nested accordion, it can be larger so check if newly opened pane is below the screen bottom.
						if( newScrollPosition < currentScrollPosition){
							window.scrollTo({ top: newScrollPosition, behavior: "smooth" });
						}
					}
				} else {
					content.style.maxHeight = "0";
					// Pane can be clicked during animation
					pane.classList.remove('opening');
					pane.classList.add('closing');

				}

				/**
                 * If url must be changed when a pane is opened, it can be done here. 
				 * However, it assumes header has an id.
                 * if(pane.classList.contains("active")) {
                 *   const id = header.id;
                 *   window.history.pushState(null, null, `#${id}`);
                 * } else {
                 *   window.history.pushState(null, null, window.location.pathname);
                 * }
                */

				// Check if current accordion block is in the pane of another accordion.
				checkForParentPane(block, true);
				content.addEventListener(
					"transitionend",
					function onTransitionEnd(event) {
						if (event.propertyName === "max-height") {
							content.removeEventListener("transitionend", onTransitionEnd);
							pane.classList.remove('opening');
							pane.classList.remove('closing');
							checkForParentPane(block, false);
						}
					},
				);
			});

			
			// Add key down event listener to handle Enter key
			// In a nested accordion, pane-headers in a closed parent pane can receive focus.
			// FIXED: In that case the parent pane should be opened first. It should be done recursively so maybe the checkForParentPane function can be used to this end.
			// 
			header.addEventListener("keydown", function (event) {
				if (event.code === "Enter" || event.key === "Enter") {
					if (document.activeElement === header) {
						event.preventDefault();
						event.stopPropagation();
						header.click();
					}
				}
			});
		});
	});
});
