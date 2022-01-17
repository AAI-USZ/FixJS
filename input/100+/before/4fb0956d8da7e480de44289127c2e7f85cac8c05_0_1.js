function(options) {

                this.flicker.settings = $.extend({}, this.flicker.defaults, options);
                
                return this.each(function() {

                    var $element = $(this), // reference to the jQuery version of the current DOM element
                         element = this;    // reference to the actual DOM element
                    
                    $element.data("flicker", {
                        active: true
                    });

                    methods.flick($element);
                });

            }