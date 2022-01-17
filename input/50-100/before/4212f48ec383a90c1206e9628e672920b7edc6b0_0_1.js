function() {

                    // The list item that corresponds to the state change
                    var elem = $('li[data-href="' + window.History.getState().title + '"]');

                    if(elem.next(".sub-header").length) {

                        // Show the all of the sub-headers within the current header
                        self.show(elem.next(".sub-header"));

                    }

                }