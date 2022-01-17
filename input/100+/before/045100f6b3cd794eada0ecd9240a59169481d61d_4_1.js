function($elem) {
            var docViewTop = 0; // $(this).scrollTop();
            var docViewBottom = docViewTop + $(this).height();
            var docOffset = $(this).offset().top;

            var elemTop = $elem.offset().top - docOffset;
            var elemBottom = elemTop + $elem.outerHeight();

            // NEWSBLUR.log(['isScrollVisible', docViewTop, docViewBottom, docOffset, elemTop, elemBottom]);
            
            return ((elemTop >= docViewTop) && (elemBottom <= docViewBottom));
        }