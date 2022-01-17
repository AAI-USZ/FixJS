function() {
                    var frame  = $(this);
                    var doc    = frame.contents();
                    var msg    = doc.find('#container > .messagelist');
                    var url    = document.location.href + ' #'+ block.attr('id');
                    var errors = doc.find('.errornote').get(0);

                    $self.cleanDocument(doc);

                    if (inject && value) {
                        doc.find('#'+inject).val(value);
                    }

                    // Save button has been clicked
                    if ($(this).hasClass('saving')) {
                        if (!errors) {
                            content.load(url, function() {
                                content.find('.frontadmin-toolbar-frame').remove();
                                content = $(this).children().unwrap();
                                //$self.bindToolbarEvents(content.parent().find('iframe'))
                                //$.frontendMessage(msg.find('li:first').text())
                            });

                            if (!frame.hasClass('continue')) {
                                $self.closeActiveFrame();
                            } else {
                                frame.parent().removeClass('saving');
                                frame.removeClass('saving').removeClass('continue');
                            }
                        }
                        else {
                            $(this).parent().removeClass('saving');
                            $(this).removeClass('saving');
                        }
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