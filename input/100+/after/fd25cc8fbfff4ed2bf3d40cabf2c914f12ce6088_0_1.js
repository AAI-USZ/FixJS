function() {

                    // Local variables

                    // Stores how far the user has scrolled
                    var winScrollTop = $(window).scrollTop(),

                        // Stores the height of the window
                        winHeight = $(window).height(),

                        // Stores the height of the document
                        docHeight = $(document).height(),

                        scrollHeight = $("body")[0].scrollHeight,

                        // Instantiates a variable that will be used to hold a selected HTML element
                        elem,

                        lastElemOffset;

                    if(self.options.extendPage) {

                        // If the user has scrolled to the bottom of the page and the last toc item is not focused
                        if(($.browser.webkit && winScrollTop >= scrollHeight - winHeight) || (!$.browser.webkit && winHeight + winScrollTop === docHeight)) {

                            self.element.scrollTop(winScrollTop);

                            if(!$(".tocify-extend-page").length) {

                                // Gets the top offset of the page header that is linked to the last toc item
                                lastElemOffset = $('div[data-unique="' + $(".item").last().attr("data-unique") + '"]').offset().top;

                                // Appends a div to the bottom of the page and sets the height to the difference of the window scrollTop and the last element's position top offset
                                $(self.options.context).append($("<div />", {

                                    "class": "tocify-extend-page",

                                    "height": Math.abs(lastElemOffset - winScrollTop) + "px"

                                }));

                                if($("." + self.focusClass).length) {

                                    // Animates the html and body element scrolltops
                                    $("html, body").animate({

                                        // Sets the jQuery `scrollTop` to the top offset of the HTML div tag that matches the current list item's `data-href` tag
                                        "scrollTop": $('div[data-unique="' + $("." + self.focusClass).attr("data-unique") + '"]').offset().top + "px"
                        
                                        }, {

                                        // Sets the smoothScroll animation time duration to the smoothScrollSpeed option
                                        "duration": duration

                                    });

                                }

                            }

                        }

                    }

                    // The zero timeout ensures the following code is run after the scroll events
                    setTimeout(function() {

                        // Loops through each anchor tag on the page with a `name` attribute
                        $(self.options.context).find("div[name]").next().each(function() {

                            // If the user has scrolled to within x (the highlightOffset option) distance of the currently traversed anchor tag
                            if ((Math.abs($(this).offset().top - winScrollTop) < self.options.highlightOffset)) {

                                // Stores the list item HTML element that corresponds to the currently traversed anchor tag
                                elem = $('li[data-unique="' + $(this).prev("div").attr("data-unique") + '"]');

                                // If the `highlightOnScroll` option is true
                                if(self.options.highlightOnScroll) {

                                    // Removes highlighting from all of the list item's
                                    $("." + self.focusClass).removeClass(self.focusClass);

                                    // Highlights the corresponding list item
                                    elem.addClass(self.focusClass);

                                }

                                // If the `showAndHideOnScroll` option is true
                                if(self.options.showAndHideOnScroll) {

                                     // If the current element's parent is a header element
                                     if(elem.parent().hasClass("header")) {


                                         // Shows the next sub-header element
                                         self.show(elem.next(".sub-header"));

                                     }

                                     // If the current element's parent is a subheader element
                                     else if(elem.parent().hasClass("sub-header")) {
 
                                         // Shows the parent sub-header element
                                         self.show(elem.parent());

                                     }
                                 }

                                 return false;

                            }

                        });

                    }, 0);

                }