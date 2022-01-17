function($elem, partial) {
            var docViewTop = 0; // $(this).scrollTop();
            var docViewBottom = docViewTop + $(this).height();
            var docOffset = $(this).offset().top;

            var elemTop = $elem.offset().top - docOffset;
            var elemBottom = elemTop + $elem.outerHeight();

            // NEWSBLUR.log(['isScrollVisible', docViewTop, docViewBottom, elemTop, elemBottom]);
            
            if (partial) {
                var topVisible = ((elemTop >= docViewTop) && (elemTop <= docViewBottom));
                var bottomVisible = ((elemBottom <= docViewBottom) && (elemBottom >= docViewTop));
                var centerVisible = (elemTop <= docViewTop) && (elemBottom >= docViewBottom);
                return topVisible || bottomVisible || centerVisible;
            } else {
                return ((elemTop >= docViewTop) && (elemBottom <= docViewBottom));
            }
        }