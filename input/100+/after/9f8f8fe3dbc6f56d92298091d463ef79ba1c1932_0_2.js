function() {
                    var frame  = $(this);
                    var doc    = frame.contents();
                    var msg    = doc.find('#container > .messagelist');
                    var url    = document.location.href + ' #'+ block.attr('id');
                    var errors = doc.find('.errornote').get(0);

                    // Save button has been clicked
                    if (frame.hasClass('saving')) {
                        if (!errors) {
                            if (!frame.hasClass('continue')) {
                                $self.closeActiveFrame();
                            }
                            content.load(url, function() {
                                content.find('.frontadmin-toolbar-frame').remove()
                                content = frame.children().unwrap();
                                //$self.bindToolbarEvents(content.parent().find('iframe'))
                                //$.frontendMessage(msg.find('li:first').text())
                            });
                        }
                        else {
                            frame.parent().removeClass('saving');
                            frame.removeClass('saving').removeClass('continue');
                        }
                        frame.removeClass('saving').removeClass('continue');
                    }
                    else if ($(this).hasClass('deleting')) {
                        // Delete button has been clicked
                        // User can now either cancel or confirm
                        var cancel = doc.find('.left.cancel-button-container').removeClass('left').remove();
                        doc.find('.cancel-button-container').replaceWith(cancel);
                        doc.find('.cancel-link').unbind('click')
                            .bind('click.adminToolbar', function(){
                                frame.removeClass('deleting').removeClass('deleted');
                            }).end().remove();
                        // Confirm delete
                        doc.find('.footer input[type=submit]').bind('click.adminToolbar', function() {
                            frame.removeClass('deleting').addClass('deleted');
                        })

                    }
                    else if (frame.hasClass('deleted')) {
                        frame.removeClass('deleted');
                        var errors = doc.find('.errornote').get(0);
                        if (!errors) {
                            $self.closeActiveFrame();
                            $.frontendMessage(msg.find('li:first').text());
                            block.slideUp('slow', function() {
                                $(this).remove();
                            })
                        }
                    }
                    else {
                        msg.find('li').css('border', 0);
                    }
                }