function(value) {            
            var newProtocol = this.getProtocol(value);
            var oldProtocol = this.getProtocol(this.get('url'));
            var sourceType;
            
            if (newProtocol == oldProtocol)
               return value;
            else if( newProtocol == 'json') {
               sourceType = window.BSourceJson;
            }
            else if ( newProtocol == 'das' )
               sourceType = window.BSourceDas;
            
            // create new chart but keep old callbacks
            var callbacks = this.center.chart._callbacks;
            delete this.center.chart
            this.center.chart = new sourceType({ trackId: this.cid });
            this.center.chart._callbacks = callbacks;
            this.left.chart = new sourceType({ trackId: this.cid });
            this.right.chart = new sourceType({ trackId: this.cid });
            
            return value;
         }