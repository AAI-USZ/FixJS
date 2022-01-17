function() {
                    /** Get a response from the server in plain text */
                    var myFrame = document.getElementById(iframe.attr('name'));
                    var response = $(myFrame.contentWindow.document.body).text();

                    /** Do something on complete */
                    self.onComplete(response);
                    //done :D
                }