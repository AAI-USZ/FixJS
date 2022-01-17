function(settings) {
                var self = this;
                /* Detects if designMode is available */
                if (typeof(document.designMode) != "string" && document.designMode != "off") return;
                self.locked = true;
                self.cleaning = false;
                self.DOMCache = "";
                self.wysiwyg = true;
                self.createDOM();
                self.writeDocument(); // Fill editor with old textarea content
                self.makeEditable();
                self.modifyFormSubmit();
                self.autogrow();

                $(window).scroll(function() {
                    self.autogrow();
                });
            }