function( event ) {
            if( !this.tab.hit )
                this.newtab(event);
            
            this.chomp();
            this.tab.index++;
            
            if( this.tab.index >= this.tab.matched.length )
                this.tab.index = -1;
            
            if( this.tab.index == -1 ) {
                this.unchomp(this.tab.prefix[this.tab.type] + this.tab.cache);
                return;
            }
            suf = this.input.val() == '' && this.tab.type == 0 ? ': ' : ' ';
            this.unchomp(this.tab.prefix[this.tab.type] + this.tab.matched[this.tab.index] + suf);
        }