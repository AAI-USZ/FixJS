function() {
                if (!self.$s.$feed_list.hasClass('NB-feed-sorting')) {
                    var $this = $(this);
                    // _.defer(function() { $('.NB-hover', $folder).not($this).removeClass('NB-hover'); });
                    // NEWSBLUR.log(['scroll', $this.scrollTop(), $this.offset(), $this.position()]);
                    if ($this.offset().top > $(window).height() - 270) {
                        $this.addClass('NB-hover-inverse');
                    } 
                }
            }