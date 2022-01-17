function( ) {
            if( this.built )
                return;
            
            var selector = this.info['selector']
            ns = this.info['namespace']
            
            // Draw.
            this.client.tabul.append(wsc_html_chattab.replacePArg('{selector}', selector).replacePArg('{ns}', ns));
            this.client.chatbook.append(wsc_html_channel.replacePArg('{selector}', selector).replacePArg('{ns}', ns));
            // Store
            this.tab = this.client.tabul.find('#' + selector + '-tab')
            this.window = this.client.chatbook.find('#' + selector + '-window')
            this.logpanel = this.client.view.find('#' + selector + "-log");
            this.wrap = this.logpanel.find('div.logwrap');
            this.userpanel = this.client.view.find('#' + selector + "-users");
            
            this.client.view.find('a[href="#' + selector + '"]').click(function () {
                channel.client.toggleChannel(selector);
                return false;
            });
            
            var focus = true;
            
            this.window.click(
                function( e ) {
                    if( focus )
                        channel.client.control.focus();
                    else
                        focus = true;
                }
            );
            
            this.logpanel.select(
                function( ) {
                    focus = false;
                }
            );
            
            if( this.hidden ) {
                this.tab.toggleClass('hidden');
                console.log('hey');
            }
            
            this.built = true;
        }