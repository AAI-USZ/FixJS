function fakeImageResize() {
		var selectedElmX, selectedElmY, selectedElm, selectedElmGhost, selectedHandle, startX, startY, startW, startH,
			resizeHandles, width, height, rootDocument = document, editableDoc = editor.getDoc();

		if (!settings.object_resizing || settings.webkit_fake_resize === false) {
			return;
		}

		// Try disabling object resizing if WebKit implements resizing in the future
		setEditorCommandState("enableObjectResizing", false);

		// Details about each resize handle how to scale etc
		resizeHandles = {
			// Name: x multiplier, y multiplier, delta size x, delta size y
			n: [.5, 0, 0, -1],
			e: [1, .5, 1, 0],
			s: [.5, 1, 0, 1],
			w: [0, .5, -1, 0],
			nw: [0, 0, -1, -1],
			ne: [1, 0, 1, -1],
			se: [1, 1, 1, 1],
			sw : [0, 1, -1, 1]
		};

		function resizeElement(e) {
			var deltaX, deltaY, ratio;

			// Calc new width/height
			deltaX = e.screenX - startX;
			deltaY = e.screenY - startY;
			ratio = Math.max((startW + deltaX) / startW, (startH + deltaY) / startH);

			if (VK.modifierPressed(e)) {
				// Constrain proportions
				width = Math.round(startW * ratio);
				height = Math.round(startH * ratio);
			} else {
				// Calc new size
				width = deltaX * selectedHandle[2] + startW;
				height = deltaY * selectedHandle[3] + startH;
			}

			// Never scale down lower than 5 pixels
			width = width < 5 ? 5 : width;
			height = height < 5 ? 5 : height;

			// Update ghost size
			dom.setStyles(selectedElmGhost, {
				width: width,
				height: height
			});

			// Update ghost X position if needed
			if (selectedHandle[2] < 0 && selectedElmGhost.clientWidth <= width) {
				dom.setStyle(selectedElmGhost, 'left', selectedElmX + deltaX);
			}

			// Update ghost Y position if needed
			if (selectedHandle[3] < 0 && selectedElmGhost.clientHeight <= height) {
				dom.setStyle(selectedElmGhost, 'top', selectedElmY + deltaY);
			}
		}

		function endResize() {
			function setSizeProp(name, value) {
				if (value) {
					// Resize by using style or attribute
					if (selectedElm.style[name] || !editor.schema.isValid(selectedElm.nodeName.toLowerCase(), name)) {
						dom.setStyle(selectedElm, name, value);
					} else {
						dom.setAttrib(selectedElm, name, value);
					}
				}
			}

			// Set width/height properties
			setSizeProp('width', width);
			setSizeProp('height', height);

			dom.unbind(editableDoc, 'mousemove', resizeElement);
			dom.unbind(editableDoc, 'mouseup', endResize);

			if (rootDocument != editableDoc) {
				dom.unbind(rootDocument, 'mousemove', resizeElement);
				dom.unbind(rootDocument, 'mouseup', endResize);
			}

			// Remove ghost and update resize handle positions
			dom.remove(selectedElmGhost);
			showResizeRect(selectedElm);
		}

		function showResizeRect(targetElm) {
			var position, targetWidth, targetHeight;

			hideResizeRect();

			// Get position and size of target
			position = dom.getPos(targetElm);
			selectedElmX = position.x;
			selectedElmY = position.y;
			targetWidth = targetElm.offsetWidth;
			targetHeight = targetElm.offsetHeight;

			// Reset width/height if user selects a new image/table
			if (selectedElm != targetElm) {
				selectedElm = targetElm;
				width = height = 0;
			}

			tinymce.each(resizeHandles, function(handle, name) {
				var handleElm;

				// Get existing or render resize handle
				handleElm = dom.get('mceResizeHandle' + name);
				if (!handleElm) {
					handleElm = dom.add(editableDoc.documentElement, 'div', {
						id: 'mceResizeHandle' + name,
						'class': 'mceResizeHandle',
						style: 'cursor:' + name + '-resize; margin:0',
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
			});

			// Only add resize rectangle on WebKit and only on images
			if (!tinymce.isOpera && selectedElm.nodeName == "IMG") {
				selectedElm.setAttribute('data-mce-selected', '1');
			}
		}

		function hideResizeRect() {
			if (selectedElm) {
				selectedElm.removeAttribute('data-mce-selected');
			}

			for (var name in resizeHandles) {
				dom.hide('mceResizeHandle' + name);
			}
		}

		// Add CSS for resize handles, cloned element and selected
		editor.contentStyles.push(
			'.mceResizeHandle {' +
				'position: absolute;' +
				'border: 1px solid black;' +
				'background: #FFF;' +
				'width: 5px;' +
				'height: 5px;' +
				'z-index: 10000' +
			'}' +
			'.mceResizeHandle:hover {' +
				'background: #000' +
			'}' +
			'img[data-mce-selected] {' +
				'outline: 1px solid black' +
			'}' +
			'img.mceClonedResizable, table.mceClonedResizable {' +
				'position: absolute;' +
				'outline: 1px dashed black;' +
				'opacity: .5;' +
				'z-index: 10000' +
			'}'
		);

		function updateResizeRect() {
			var controlElm = dom.getParent(selection.getNode(), 'table,img');

			if (controlElm) {
				showResizeRect(controlElm);
			} else if (selectedElm) {
				// Remove mceResizeSelected from all elements since they might have been copied using Ctrl+c/v
				dom.removeClass(dom.select('img.mceResizeSelected'), 'mceResizeSelected');
				hideResizeRect();
			}
		}

		// Show/hide resize rect when image is selected
		editor.onNodeChange.add(updateResizeRect);

		// Fixes WebKit quirk where it returns IMG on getNode if caret is after last image in container
		dom.bind(editableDoc, 'selectionchange', updateResizeRect);

		// Remove the internal attribute when serializing the DOM
		editor.serializer.addAttributeFilter('data-mce-selected', function(nodes, name) {
			var i = nodes.length;

			while (i--) {
				nodes[i].attr(name, null);
			}
		});
	}