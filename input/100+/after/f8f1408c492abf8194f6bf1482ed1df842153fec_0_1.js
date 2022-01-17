function(ed) {
				ed.dom.events.add(ed.getBody(), 'dragstart', function(e) {
					var parent;

					if ( e.target.nodeName == 'IMG' && ( parent = ed.dom.getParent(e.target, 'div.mceTemp') ) ) {
						ed.selection.select(parent);
					}
				});

				// when pressing Return inside a caption move the caret to a new parapraph under it
				ed.dom.events.add(ed.getBody(), 'keydown', function(e) {
					var n, DL, DIV, P, content;

					if ( e.keyCode == 13 ) {
						n = ed.selection.getNode();
						DL = ed.dom.getParent(n, 'dl.wp-caption');

						if ( DL )
							DIV = ed.dom.getParent(DL, 'div.mceTemp');

						if ( DIV ) {
							ed.dom.events.cancel(e);
							P = ed.dom.create('p', {}, '\uFEFF');
							ed.dom.insertAfter( P, DIV );
							ed.selection.setCursorLocation(P, 0);
							return false;
						}
					}
				});
			}