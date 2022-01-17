function( ) {
            this.wrap.css({'padding-top': 0});
            // Height.
            //console.log('head height: ' + this.window.find("header").height() + '; outer: ' + this.window.find("header").outerHeight());
            wh = this.client.chatbook.height();
            //console.log(h);
            this.window.height(wh);
            // Width.
            cw = this.window.width();
            cu = this.window.find('div.chatusers');
            // Header height
            title = this.window.find('header div.title');
            topic = this.window.find('header div.topic');
            
            // Log width.
            if( cu.css('display') != 'none')
                cw = cw - cu.outerWidth();
            
            //console.log('> lheight',wh);
            
            if( title.css('display') == 'block' )
                wh = wh - title.outerHeight(true);
            //console.log('> wh - th',wh);
                
            // Log panel dimensions
            this.logpanel.css({
                height: wh + 1,
                width: cw});
            
            // Scroll again just to make sure.
            this.scroll();
            
            // User list dimensions
            cu.css({height: this.logpanel.innerHeight() - 3});
        }