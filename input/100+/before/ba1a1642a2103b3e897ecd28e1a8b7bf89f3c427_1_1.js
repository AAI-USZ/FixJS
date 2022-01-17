function() {
                var args = Array.prototype.slice.call(arguments),
                    method = 'open';
                if (args.length > 0 && $.inArray(args[0], ['open', 'close']) !== -1) {
                    method = args.shift();
                }
                switch (method) {
                    case 'open' :
                        if (this.is('.ui-dialog')) {
                            this.wijdialog('open');
                            return this;
                        }

                        var arg = args[0] || {},
                            options = $.extend(true, {}, {
                                destroyOnClose : true,
                                width: window.innerWidth - 200,
                                height: window.innerHeight - 100,
                                modal: true,
                                captionButtons: {
                                    pin: {visible: false},
                                    refresh: {visible: arg.contentUrl != null && !arg.ajax},
                                    toggle: {visible: false},
                                    minimize: {visible: false},
                                    maximize: {visible: false}
                                }
                            }, arg),
                            oldCallbacks = {
                                open : options.open,
                                close : options.close,
                                focus : options.focus
                            },
                            $container = this.closest('.nos-dispatcher, body'),
                            self = this,
                            $dialog = $('<div></div>').addClass('nos-dispatcher')
                                .appendTo($container);


                        $.extend(options, {
                                close : function(e, ui) {
                                    dialogEvent.close($dialog);
                                    if ($.isFunction(oldCallbacks.close)) {
                                        oldCallbacks.close.apply($dialog, arguments);
                                    }
                                    if (options.destroyOnClose) {
                                        $dialog.wijdialog('destroy')
                                            .remove();
                                    } else {
                                        $dialog.closest('.ui-dialog').hide().appendTo($container);
                                    }
                                },
                                focus : function(e, ui) {
                                    dialogEvent.focus($dialog);
                                    if ($.isFunction(oldCallbacks.focus)) {
                                        oldCallbacks.focus.apply($dialog, arguments);
                                    }
                                },
                                open : function(e, ui) {
                                    dialogEvent.open($dialog);
                                    if ($.isFunction(oldCallbacks.open)) {
                                        oldCallbacks.open.apply($dialog, arguments);
                                    }
                                    if (!options.destroyOnClose) {
                                        $dialog.closest('.ui-dialog').appendTo('body');
                                    }
                                }
                            });

                        if (options['content'] !== undefined) {
                            $dialog.append(options.content);
                        }

                        if (options['class'] !== undefined) {
                            $dialog.addClass(options['class']);
                        }

                        var proceed = true;
                        if (options.ajax && options.contentUrl) {
                            var contentUrl = options.contentUrl;
                            delete options.contentUrl;
                            options.autoOpen = false;
                            $dialog.wijdialog(options);

                            // Request the remote document
                            $.ajax({
                                url: contentUrl,
                                type: 'GET',
                                dataType: "html",
                                data : options.ajaxData || {},
                                // Complete callback (responseText is used internally)
                                complete: function( jqXHR, status, responseText ) {
                                    // Store the response as specified by the jqXHR object
                                    responseText = jqXHR.responseText;
                                    // If successful, inject the HTML into all the matched elements
                                    if ( jqXHR.isResolved() ) {
                                        // #4825: Get the actual response in case
                                        // a dataFilter is present in ajaxSettings
                                        jqXHR.done(function( r ) {
                                            responseText = r;
                                        });

                                        try {
                                            var json = $.parseJSON(responseText);
                                            // If the dialog ajax URL returns a valid JSON string, don't show the dialog
                                            proceed = false;
                                        } catch (e) {}

                                        if (proceed) {
                                            $dialog.wijdialog('open')
                                                .html( responseText );
                                            $.isFunction(options['dialogRendered']) && options['dialogRendered']($dialog);
                                        } else {
                                            $dialog.empty()
                                                .wijdialog('destroy')
                                                .remove();
                                            self.nosAjaxSuccess(json);
                                        }
                                    }
                                }
                            });
                        } else {
                            $dialog.wijdialog(options);
                            $.isFunction(options['dialogRendered']) && options['dialogRendered']($dialog);
                        }
                        if (proceed && $.isFunction(options.onLoad)) {
                            options.onLoad();
                        }

                        return $dialog;
                        break;

                    case 'close' :
                        this.closest(':wijmo-wijdialog')
                            .wijdialog('close');
                        break;
                }
                return this;
            }