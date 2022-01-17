function(e) {
                                var cdata = {author: $this.options.me, body: newComment}
                                jQuery("li.comment", jQuery(context)).before(ich.chatterComment(cdata));
                                jQuery(".noposts", jQuery(context)).hide();
                                jQuery(box).val("");
                                $this.setupBlocks($this)
                              }