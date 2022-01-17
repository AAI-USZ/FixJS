function (evt) {

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

            } // if ((evt.keyCode... 
            else if (evt.keyCode === downKeyCode && elements.first().length) {
                scrollToMiddle(elements.first(), settings.scrollDuration) 
            } 
            else if (evt.keyCode === upKeyCode && elements.last().length) {
                scrollToMiddle(elements.last(), settings.scrollDuration) 
            } 
            
        }