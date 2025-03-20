/******/ (() => { // webpackBootstrap
/*!*******************************!*\
  !*** ./src/accordion/view.js ***!
  \*******************************/
/**
 * Initialize the accordion block.
 * Add event listeners to the accordion panes.
 * Open first pane when collapsed is false.
 * On opening a pane, close all other panes when oneAtATime is true.
 * On opening and closing a pane, set max-height of the content. This allows for smooth css transitions.
 */

document.addEventListener("DOMContentLoaded", function () {
  const accordionBlocks = document.querySelectorAll(".wp-block-hs-blocks-accordion");

  /**
   * Scrollheight is not correct during transition. So it can not serve during
   * transition of a the max height of a pane.
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
        //content.style.maxHeight = "unset";
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
   * Check if an element is in the viewport
   * @param {Element} element - The element to check
   * @return {boolean} - True if the element is in the viewport, false otherwise
   */
  const isInViewport = element => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  };
  accordionBlocks.forEach(block => {
    const oneAtATime = block.getAttribute("data-one-at-a-time") === "true";
    const collapsed = block.getAttribute("data-collapsed") === "true";
    const accordionPanes = block.querySelectorAll(":scope > .wp-block-hs-blocks-accordion-pane");
    // const allPanes = block.querySelectorAll('.wp-block-hs-blocks-accordion-pane');

    accordionPanes.forEach((pane, index) => {
      const header = pane.querySelector(".pane-header");
      const content = pane.querySelector(".pane-content");
      // If collapsed is false, open the first pane
      if (!collapsed && index === 0) {
        pane.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = "0";
      }
      header.addEventListener("focus", function (event) {
        console.log("focus", pane);
      });
      header.addEventListener("click", function (event) {
        console.log("click", pane);
        if (oneAtATime) {
          // Close other open panes, i.e. remove 'active' class from all sibling panes
          accordionPanes.forEach(siblingPane => {
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
        } else {
          content.style.maxHeight = "0";
        }

        /**
                     * If you want to change the url when a pane is opened, you can do it here. 
                    
                    if(pane.classList.contains("active")) {
                        // get the id of the pane header and change the url to include it
                        const id = header.id;
                        window.history.pushState(null, null, `#${id}`);
                    } else {
                         window.history.pushState(null, null, window.location.pathname);
                    }
                    */

        // Check if this block is in another pane
        checkForParentPane(block, true);
        content.addEventListener("transitionend", function onTransitionEnd(event) {
          if (event.propertyName === "max-height") {
            content.removeEventListener("transitionend", onTransitionEnd);
            checkForParentPane(block, false);
          }
          // TODO: if currently open pane is not in view, scroll it into view
          if (!isInViewport(header)) {
            header.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        });
      });

      // Add keyup event listener to handle spacebar key
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
/******/ })()
;
//# sourceMappingURL=view.js.map