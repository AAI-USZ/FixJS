function(event) {

                // If the History.js plugin has been included on the page
                if(window.History) {

                    // Adds a new state and url to the history
                    window.History.pushState(null, $(this).attr("data-href"), "?" + $(this).attr("data-href"));

                }

                // Removes highlighting from all of the list item's
                $("." + self.focusClass).removeClass(self.focusClass);

                // Highlights the current list item that was clicked
                $(this).addClass(self.focusClass);

                // If the History.js plugin has not been included on the page
                if(!window.History) {

                    // Show the all of the sub-headers within the current header
                    self.show($(this).closest(".header").find(".sub-header"));

                }

                // Saves the currently clicked list item's context in the `$self` variable
                $self = $(this);

                // If the `smoothScroll` option is true
                if (self.options.smoothScroll) {
                    
                    // Sets the `duration` local variable to the `smoothScrollSpeed` option
                    duration = self.options.smoothScrollSpeed;
                    
                }

                else {

                    // Sets the `duration` local variable to 0
                    duration = 0;

                }

                // Animates the html and body element scrolltops
                $("html, body").animate({

                    // Sets the jQuery `scrollTop` to the top offset of the HTML div tag that matches the current list item's `data-href` tag
                    "scrollTop": $('div[data-unique="' + $self.attr("data-unique") + '"]').offset().top - self.options.scrollTo + "px"
                        
                }, {

                    // Sets the smoothScroll animation time duration to the smoothScrollSpeed option
                    "duration": duration

                });

                // Animates the table of contents scrolltop
                self.element.animate({

                    // Sets the jQuery `scrollTop` to the top offset of the current HTML li tag
                    "scrollTop": $self.offset().top + "px"
                        
                }, {

                    // Sets the smoothScroll animation time duration to the smoothScrollSpeed option
                    "duration": duration

                });

            }