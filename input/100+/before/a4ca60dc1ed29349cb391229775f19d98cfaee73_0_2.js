function(settings) {
                var self = this;
                /* Detects if designMode is available */
                if (typeof(document.designMode) != "string" && document.designMode != "off") return;
                this.locked = true;
                this.cleaning = false;
                this.DOMCache = "";
                this.wysiwyg = true;
                this.createDOM();
                this.writeDocument(); // Fill editor with old textarea content
                this.makeEditable();
                this.modifyFormSubmit();
                this.autogrow();

                $(window).scroll( function() {
                    self.autogrow();
                });
            }