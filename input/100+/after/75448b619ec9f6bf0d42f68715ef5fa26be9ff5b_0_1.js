function (options) {
 
        var settings = {
            downKeyCode     : 74,   // 'j'
            upKeyCode       : 75,   // 'k'
            scrollDuration  : 100   // in milliseconds
        };
        $.extend(settings, options);

        function scrollTo(coordinate, scrollDuration) {
		    $('html,body').animate({ scrollTop: coordinate }, scrollDuration);
        } // scrollTo

        function scrollToMiddle(scrolledElement, scrollDuration) {
            var offset = $(window).height() / 2 - scrolledElement.height() / 2;
            var middleOfElement = scrolledElement.offset().top - offset;
            scrollTo(middleOfElement, scrollDuration);
        } // scrollToMiddle

        function isMiddleElement() {
            // Returns true if 'this' is the most middle element on the screen.
            // Space between elements must not exceed the heigt of the element.
            // All elements must be the same height.
            // True for element2, false for element1 and element3:
            // ---------------  <- topFold
            // |              |           
            // |   --------   |           
            // |  |element1|  |           
            // |   --------   |           
            // |              | <- topLimit           
            // |   --------   |     <- topOfElement
            // |  |element2|  | <- bottomLimit          
            // |   --------   |     <- bottomOfElement
            // |              |           
            // |   --------   |
            // |  |element3|  |
            // ---------------  <- bottomFold
            var topFold = $(window).scrollTop();
            var bottomFold = topFold + $(window).height();
            var topOfElement = $(this).offset().top;
            var bottomOfElement = topOfElement + $(this).height();

            var topLimit = Math.floor((topFold + bottomFold) / 2 - $(this).height() / 2);
            var bottomLimit = Math.ceil((topFold + bottomFold) / 2 + $(this).height() / 2);

            if (bottomOfElement >= topLimit && topOfElement < bottomLimit)
                return true;
            else 
                return false; 
        } // isMiddleElement() 

        var elements = this;
        $(document).keydown(function (evt) {

            var downKeyCode = settings.downKeyCode;
            var upKeyCode = settings.upKeyCode;
            var element = elements.filter(isMiddleElement).first();
            if ((evt.keyCode === downKeyCode || evt.keyCode === upKeyCode) &&
                element.length) {

                var topFold = $(window).scrollTop();
                var bottomFold = topFold + $(window).height();
                var topOfElement = element.offset().top;
                var topLimit = Math.floor((topFold + bottomFold) / 2 - element.height() / 2);

                var scrolledElement;
                var tolerence = 5; //for innacurate topFold/bottomFold values
                if (evt.keyCode === downKeyCode) { 
                    if ( topOfElement > (topLimit + tolerence)) {
                        scrolledElement = element;
                        scrollToMiddle(scrolledElement, settings.scrollDuration) 
                    }
                    else if (!element.is(elements.last())){
                        scrolledElement = element.next(elements);
                        scrollToMiddle(scrolledElement, settings.scrollDuration) 
                    }
                } // if (evt.keyCode === downKeyCode) 
                else if (evt.keyCode === upKeyCode) { 
                    if ( topOfElement < (topLimit - tolerence)) {
                        scrolledElement = element;
                        scrollToMiddle(scrolledElement, settings.scrollDuration) 
                    }
                    else if (!element.is(elements.first())){
                        scrolledElement = element.prev(elements);
                        scrollToMiddle(scrolledElement, settings.scrollDuration) 
                    }
                } // else if (evt.keyCode === upKeyCode) 

            } // ((evt.keyCode === downKeyCode || evt.keyCode === upKeyCode) && element.length) 
            else if (evt.keyCode === downKeyCode && elements.first().length) {
                scrollToMiddle(elements.first(), settings.scrollDuration) 
            } 
            else if (evt.keyCode === upKeyCode && elements.last().length) {
                scrollToMiddle(elements.last(), settings.scrollDuration) 
            } 
            // else do nothing
            
        }); // $(document).keydown(function (evt) 

    }