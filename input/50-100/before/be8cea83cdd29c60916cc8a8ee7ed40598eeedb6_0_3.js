function(event, ui) {
                    console.log('drag at: ('+event.pageX+', '+event.pageY+')');
                    var p = self._fc.globalToLocal( event.pageX - o.left, 
                                                   event.pageY - o.top);
                    if( (p.x*p.x + p.y*p.y) < F.joinRadius * F.joinRadius )
                    {
                        self.join(jf);
                    }
                }