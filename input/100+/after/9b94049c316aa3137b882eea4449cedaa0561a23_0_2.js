function(e) {
                          
                          var $pinBtn = jQuery(this);
                          e.stopPropagation();
                          e.preventDefault();
                          
                          var unpinId = $pinBtn.attr("data-unpinId");
                          
                          if (unpinId == "") {
                            jQuery.ajax({
                              type: 'POST',
                              url: $pinBtn.attr("href"),
                              success: function(a,b,c,d) {
                             
                                
                                $pinBtn.text("Unpin");
                                
                              }
                            });
                          }
                          else {
                            if ($this.options.object == '___Pinned') {
                                jQuery(context).remove();
                                 $this.setupBlocks($this)
                            }
                            jQuery.ajax({
                              type: 'DELETE',
                              url: "/sobjects/pin/" + unpinId,
                              success: function(a,b,c,d) {
                                
                                
                                $pinBtn.text("Pin");
                                
                              },
                              error: function(a,b,c,d) {
                              }
                            });
                            
                          }
                    }