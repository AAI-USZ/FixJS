function(handle, name) {
				var handleElm;

				// Get existing or render resize handle
				handleElm = dom.get('mceResizeHandle' + name);
				if (!handleElm) {
					handleElm = dom.add(editableDoc.documentElement, 'div', {
						id: 'mceResizeHandle' + name,
						'class': 'mceResizeHandle',
						style: 'cursor:' + name + '-resize; margin:0; padding:0',
					});

					dom.bind(handleElm, 'mousedown', function(e) {
						e.preventDefault();

						endResize();

						startX = e.screenX;
						startY = e.screenY;
						startW = selectedElm.clientWidth;
						startH = selectedElm.clientHeight;
						selectedHandle = handle;

						selectedElmGhost = selectedElm.cloneNode(true);
						dom.addClass(selectedElmGhost, 'mceClonedResizable');
						dom.setStyles(selectedElmGhost, {
							left: selectedElmX,
							top: selectedElmY,
							margin: 0
						});

						editableDoc.documentElement.appendChild(selectedElmGhost);

						dom.bind(editableDoc, 'mousemove', resizeElement);
						dom.bind(editableDoc, 'mouseup', endResize);

						if (rootDocument != editableDoc) {
							dom.bind(rootDocument, 'mousemove', resizeElement);
							dom.bind(rootDocument, 'mouseup', endResize);
						}
					});
				} else {
					dom.show(handleElm);
				}

				// Position element
				dom.setStyles(handleElm, {
					left: (targetWidth * handle[0] + selectedElmX) - (handleElm.offsetWidth / 2),
					top: (targetHeight * handle[1] + selectedElmY) - (handleElm.offsetHeight / 2)
				});
			}