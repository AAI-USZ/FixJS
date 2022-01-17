function(e) {
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
                        }