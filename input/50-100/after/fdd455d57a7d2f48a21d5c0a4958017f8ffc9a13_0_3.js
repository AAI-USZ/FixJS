function(event, ui) {
				var p = self._fc.globalToLocal( event.pageX - o.left, event.pageY - o.top);
				if( (p.x*p.x + p.y*p.y) < F.joinRadius * F.joinRadius )
				{
					self.join($jf);
                    return false;
				}
                return true;
			}