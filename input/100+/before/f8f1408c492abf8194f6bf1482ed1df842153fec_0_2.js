function(ed, url) {
			var t = this, mouse = {};

			t.url = url;
			t.editor = ed;
			t._createButtons();

			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('...');
			ed.addCommand('WP_EditImage', function() {
				var el = ed.selection.getNode(), vp, H, W, cls = ed.dom.getAttrib(el, 'class');

				if ( cls.indexOf('mceItem') != -1 || cls.indexOf('wpGallery') != -1 || el.nodeName != 'IMG' )
					return;

				vp = tinymce.DOM.getViewPort();
				H = 680 < (vp.h - 70) ? 680 : vp.h - 70;
				W = 650 < vp.w ? 650 : vp.w;

				ed.windowManager.open({
					file: url + '/editimage.html',
					width: W+'px',
					height: H+'px',
					inline: true
				});
			});

			ed.onInit.add(function(ed) {
				ed.dom.events.add(ed.getBody(), 'dragstart', function(e) {
					var parent;

					if ( e.target.nodeName == 'IMG' && ( parent = ed.dom.getParent(e.target, 'div.mceTemp') ) ) {
						ed.selection.select(parent);
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

			// when pressing Return inside a caption move the caret to a new parapraph under it
			ed.onKeyPress.add(function(ed, e) {
				var n, DL, DIV, P;

				if ( e.keyCode == 13 ) {
					n = ed.selection.getNode();
					DL = ed.dom.getParent(n, 'dl.wp-caption');

					if ( DL )
						DIV = ed.dom.getParent(DL, 'div.mceTemp');

					if ( DIV ) {
						P = ed.dom.create('p', {}, '<br>');
						ed.dom.insertAfter( P, DIV );
						ed.selection.select(P.firstChild);

						if ( tinymce.isIE ) {
							ed.selection.setContent('');
						} else {
							ed.selection.setContent('<br _moz_dirty="">');
							ed.selection.setCursorLocation(P, 0);
						}

						ed.dom.events.cancel(e);
						return false;
					}
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