function(item,index,self) {
                var expr = this.get('searchExpression');
                if( expr !== '' ) {
                    if( item.get('path').indexOf(expr) != -1 ) {
                        return true;
                    }
                }
            }