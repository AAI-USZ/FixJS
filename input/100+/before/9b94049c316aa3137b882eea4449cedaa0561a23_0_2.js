function(e) {
                      jQuery(this).hide();
                      e.preventDefault();
                      jQuery(".chatterLoader", jQuery(context)).show();
                      jQuery.getJSON("/chatter/" + id + ".json", function(data) {
                        data.me = $this.options.me;
                        jQuery(".chatter ul", jQuery(context)).html(ich.chatter(data));
                        jQuery(".chatterLoader", jQuery(context)).hide();
                        
                        jQuery("input.comment", jQuery(context)).keypress(function(e) {
                          if (e.charCode == 13) {
                            
                            var newComment = jQuery(this).val();
                            var box = this;
                            var id = jQuery(context).attr('id');
                            
                            jQuery.ajax({
                              type: 'POST',
                              url: '/chatter',
                              data: {id: id, text: newComment},
                              success: function(e) {
                                var cdata = {author: $this.options.me, body: newComment}
                                jQuery("li.comment", jQuery(context)).after(ich.chatterComment(cdata));
                                jQuery(".noposts", jQuery(context)).hide();
                                jQuery(box).val("");
                                $this.setupBlocks($this)
                              }
                            });
                            
                          }
                        });
                        
                        $this.setupBlocks();
                      });
                  }