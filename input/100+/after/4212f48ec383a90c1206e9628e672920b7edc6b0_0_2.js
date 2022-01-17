function() {

                            // If the user has scrolled to within x (the highlightOffset option) distance of the currently traversed anchor tag
                            if ((Math.abs($(this).offset().top - winScrollTop) < self.options.highlightOffset)) {

                                // Stores the list item HTML element that corresponds to the currently traversed anchor tag
                                elem = $('li[data-unique="' + $(this).prev("div[data-unique]").attr("data-unique") + '"]');

                                // If the `highlightOnScroll` option is true
                                if(self.options.highlightOnScroll && elem.length) {

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

                        }