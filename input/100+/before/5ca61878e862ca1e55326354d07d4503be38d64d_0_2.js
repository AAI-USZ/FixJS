function(e) {
						var doc = editor.getDoc();

						e.preventDefault();

						endResize();

						startX = e.screenX;
						startY = e.screenY;
						startW = selectedElm.clientWidth;
						startH = selectedElm.clientHeight;
						marginLeft = parseInt(dom.getStyle(selectedElm, 'margin-left', true), 10);
						marginTop = parseInt(dom.getStyle(selectedElm, 'margin-top', true), 10);
						selectedHandle = handle;

						selectedElmGhost = selectedElm.cloneNode(true);
						dom.addClass(selectedElmGhost, 'mceClonedResizable');
						dom.setStyles(selectedElmGhost, {
							left: selectedElmX - marginLeft,
							top: selectedElmY - marginTop
						});

						doc.documentElement.appendChild(selectedElmGhost);

						dom.bind(doc, 'mousemove', resizeElement);
						dom.bind(doc, 'mouseup', endResize);

						if (rootDocument != doc) {
							dom.bind(rootDocument, 'mousemove', resizeElement);
							dom.bind(rootDocument, 'mouseup', endResize);
						}
					}