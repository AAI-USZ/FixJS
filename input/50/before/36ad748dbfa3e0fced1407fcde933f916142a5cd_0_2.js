function(event) {
                    event.preventDefault();
                    $(window).on('mousemove.layout', this.resize.bind(this));
                }