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
               
            this.center.chart = new sourceType({ trackId: this.cid });
            this.left.chart = new sourceType({ trackId: this.cid });
            this.right.chart = new sourceType({ trackId: this.cid });
            
            return value;
         }