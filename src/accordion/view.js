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


	const getOffset = (el) => {
		const rect = el.getBoundingClientRect();
		return {
		  left: rect.left + window.scrollX,
		  top: rect.top + window.scrollY
		};
	}

	const getHeight = (el) => {

		const styles = window.getComputedStyle(el);
		const margin = parseFloat(styles['marginTop']) +
					 parseFloat(styles['marginBottom']);
	  
		const height = Math.ceil(el.offsetHeight + margin);

		return {
		  height: height
		};

	}



	accordionBlocks.forEach((block) => {
		const oneAtATime = block.getAttribute("data-one-at-a-time") === "true";
		const collapsed = block.getAttribute("data-collapsed") === "true";
		const accordionPanes = block.querySelectorAll(
			":scope > .wp-block-hs-blocks-accordion-pane",
		);

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


				// Toggle 'active' class on the clicked pane
				pane.classList.toggle("active");
				if (pane.classList.contains("active")) {
					content.style.maxHeight = content.scrollHeight + "px";
					pane.classList.add('opening');
					//scroll to position of the top of the accordion block + index * height of the pane_header
					// but only if the pane is not in viewport on its new position
					if( oneAtATime ) {
						const paneHeaderHeight = getHeight( header).height; // FIXME : this does not account for margin. 
						const newScrollPosition =  getOffset(block).top + ( index * paneHeaderHeight );
						const currentScroll = document.documentElement.scrollTop; // Check browsersupport for this
						if( newScrollPosition < currentScroll){
							window.scrollTo({ top: newScrollPosition , behavior: "smooth" });
						}
					}
				} else {
					content.style.maxHeight = "0";
					pane.classList.add('closing');

				}

				/**
                 * If you want to change the url when a pane is opened, you can do it here. 
                 * if(pane.classList.contains("active")) {
                 *   const id = header.id;
                 *   window.history.pushState(null, null, `#${id}`);
                 * } else {
                 *   window.history.pushState(null, null, window.location.pathname);
                 * }
                */

				// Check if this block is in another pane
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
