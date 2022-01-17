function(){
            var self = this,
            options = self.options,
            title = options.title || "No Title",
            // chatbox
            uiChatbox = (self.uiChatbox = $('<div></div>'))            
            .appendTo(document.body)
            .addClass('ui-widget ' + 
                'ui-corner-top ' + 
                'ui-chatbox'
            )
            .attr('outline', 0)
            .draggable()
            .focusin(function(){
                // ui-state-highlight is not really helpful here
                //self.uiChatbox.removeClass('ui-state-highlight');
                self.uiChatboxTitlebar.addClass('ui-state-focus');
            })
            .focusout(function(){
                self.uiChatboxTitlebar.removeClass('ui-state-focus');
                }),
                // titlebar
                uiChatboxTitlebar = (self.uiChatboxTitlebar = $('<div></div>'))
                .addClass('ui-widget-header ' +
                'ui-corner-top ' +
                'ui-chatbox-titlebar ' +
                'ui-dialog-header' // take advantage of dialog header style
            )
            .click(function(event) {
                self.toggleContent(event);
            })
            .appendTo(uiChatbox),
            uiChatboxTitle = (self.uiChatboxTitle = $('<span></span>'))
            .html(title)
            .appendTo(uiChatboxTitlebar),
            uiChatboxTitlebarClose = (self.uiChatboxTitlebarClose = $('<a href="#"></a>'))
                .addClass('ui-corner-all ' +
                'ui-chatbox-icon '
            )
            .attr('role', 'button')
            .hover(function() {uiChatboxTitlebarClose.addClass('ui-state-hover');},
            function() {uiChatboxTitlebarClose.removeClass('ui-state-hover');})
            // .focus(function() {
                //     uiChatboxTitlebarClose.addClass('ui-state-focus');
                // })
                // .blur(function() {
                    //     uiChatboxTitlebarClose.removeClass('ui-state-focus');
                    // })
                    .click(function(event) {
                        uiChatbox.hide();
                        self.options.boxClosed(self.options.id);
                        return false;
                    })
                    .appendTo(uiChatboxTitlebar),
                    uiChatboxTitlebarCloseText = $('<span></span>')
                    .addClass('ui-icon ' +
                    'ui-icon-closethick')
                    .text('close')
                    .appendTo(uiChatboxTitlebarClose),
                    uiChatboxTitlebarMinimize = (self.uiChatboxTitlebarMinimize = $('<a href="#"></a>'))
                    .addClass('ui-corner-all ' + 
                    'ui-chatbox-icon'
                )
                .attr('role', 'button')
                .hover(function() {uiChatboxTitlebarMinimize.addClass('ui-state-hover');},
                function() {uiChatboxTitlebarMinimize.removeClass('ui-state-hover');})
                // .focus(function() {
                    //     uiChatboxTitlebarMinimize.addClass('ui-state-focus');
                    // })
                    // .blur(function() {
                        //     uiChatboxTitlebarMinimize.removeClass('ui-state-focus');
                        // })
                        .click(function(event) {
                        self.toggleContent(event);
                        return false;
                    })
                    .appendTo(uiChatboxTitlebar),
                    uiChatboxTitlebarMinimizeText = $('<span></span>')
                    .addClass('ui-icon ' +
                    'ui-icon-minusthick')
                    .text('minimize')
                    .appendTo(uiChatboxTitlebarMinimize),
                    // content
                    uiChatboxContent = (self.uiChatboxContent = $('<div></div>'))
                    .addClass('ui-widget-content ' +
                    'ui-chatbox-content '
                )
                .appendTo(uiChatbox),
                uiChatboxLog = (self.uiChatboxLog = self.element)
                //.show()
                .addClass('ui-widget-content '+
                'ui-chatbox-log'
            )
            .appendTo(uiChatboxContent),
            uiChatboxInput = (self.uiChatboxInput = $('<div></div>'))
                .addClass('ui-widget-content ' + 
                'ui-chatbox-input'
            )
            .click(function(event) {
                // anything?
            })
            .appendTo(uiChatboxContent),
            uiChatboxInputBox = (self.uiChatboxInputBox = $('<textarea></textarea>'))
                .addClass('ui-widget-content ' + 
                'ui-chatbox-input-box ' +
                'ui-corner-all'
            )
            .appendTo(uiChatboxInput)
            .keydown(function(event) {
                if(event.keyCode && event.keyCode == $.ui.keyCode.ENTER) {
                    msg = $.trim($(this).val());
                    if(msg.length > 0) {
                        self.options.messageSent(self.options.id, self.options.user, msg);
                    }
                    $(this).val('');
                    return false;
                }
            })
            .focusin(function() {
                uiChatboxInputBox.addClass('ui-chatbox-input-focus');
                var box = $(this).parent().prev();
                box.scrollTop(box.get(0).scrollHeight);
            })
            .focusout(function() {
                uiChatboxInputBox.removeClass('ui-chatbox-input-focus');
            });

            // disable selection
            uiChatboxTitlebar.find('*').add(uiChatboxTitlebar).disableSelection();

            // switch focus to input box when whatever clicked
            uiChatboxContent.children().click(function(){
                // click on any children, set focus on input box
                self.uiChatboxInputBox.focus();
            });

            self._setWidth(self.options.width);
            self._setHeight(self.options.height);
            self._position(self.options.offset);

            self.options.boxManager.init(self);

            if (!self.options.hidden) {
                uiChatbox.show();
            }
        }