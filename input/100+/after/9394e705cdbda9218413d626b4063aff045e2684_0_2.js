function(ed, url) {
			var t = this, mouse = {};

			t.url = url;
			t.editor = ed;
			t._createButtons();

			ed.addCommand('WP_EditImage', t._editImage);

			ed.onInit.add(function(ed) {
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
			});

			// resize the caption <dl> when the image is soft-resized by the user (only possible in Firefox and IE)
			ed.onMouseUp.add(function(ed, e) {
				if ( tinymce.isWebKit || tinymce.isOpera )
					return;

				if ( mouse.x && (e.clientX != mouse.x || e.clientY != mouse.y) ) {
					var n = ed.selection.getNode();

					if ( 'IMG' == n.nodeName ) {
						window.setTimeout(function(){
							var DL = ed.dom.getParent(n, 'dl.wp-caption'), width;

							if ( n.width != mouse.img_w || n.height != mouse.img_h )
								n.className = n.className.replace(/size-[^ "']+/, '');

							if ( DL ) {
								width = ed.dom.getAttrib(n, 'width') || n.width;
								width = parseInt(width, 10);
								ed.dom.setStyle(DL, 'width', 10 + width);
								ed.execCommand('mceRepaint');
							}
						}, 100);
					}
				}
				mouse = {};
			});

			// show editimage buttons
			ed.onMouseDown.add(function(ed, e) {
				var target = e.target;

				if ( target.nodeName != 'IMG' ) {
					if ( target.firstChild && target.firstChild.nodeName == 'IMG' && target.childNodes.length == 1 )
						target = target.firstChild;
					else
						return;
				}

				if ( ed.dom.getAttrib(target, 'class').indexOf('mceItem') == -1 ) {
					mouse = {
						x: e.clientX,
						y: e.clientY,
						img_w: target.clientWidth,
						img_h: target.clientHeight
					};

					ed.plugins.wordpress._showButtons(target, 'wp_editbtns');
				}
			});

			ed.onBeforeSetContent.add(function(ed, o) {
				o.content = ed.wpSetImgCaption(o.content);
			});

			ed.onPostProcess.add(function(ed, o) {
				if (o.get)
					o.content = ed.wpGetImgCaption(o.content);
			});

			ed.wpSetImgCaption = function(content) {
				return t._do_shcode(content);
			};

			ed.wpGetImgCaption = function(content) {
				return t._get_shcode(content);
			};
		}