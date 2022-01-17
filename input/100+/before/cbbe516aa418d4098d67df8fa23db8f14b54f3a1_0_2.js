function hovering( elem, x, y, flag ) {
                        o = elem.offset();
                        eb = elem.outerHeight(true) + o.top;
                        er = elem.outerWidth(true) + o.left;
                        
                        if( x >= o.left
                            && x <= er
                            && y >= o.top
                            && y <= eb)
                            return true;
                            
                        if( flag === true ) {
                            if( x <= (er + 30)
                                && x >= o.left
                                && y >= o.top
                                && y <= (o.top + 30) )
                                return true;
                        }
                        
                        return false;
                    }