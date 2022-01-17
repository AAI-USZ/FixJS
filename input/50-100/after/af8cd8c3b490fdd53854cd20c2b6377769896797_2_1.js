function( ) {
            //console.log("show  " + this.info.selector);
            this.window.css({'display': 'block'});
            this.tab.addClass('active');
            this.tab.find('a').css({'font-weight': 'normal'});
            this.resize();
        }