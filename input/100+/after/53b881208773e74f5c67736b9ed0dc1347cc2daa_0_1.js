function(range, container, offset){
			//text node
			var atmrange = range.duplicate(), node, len;
			if(container.nodeType != 3){ //normal node
				if(offset > 0){
					node = container.childNodes[offset - 1];
					if(node){
						if(node.nodeType == 3){
							container = node;
							offset = node.length;
							//pass through
						}else{
							if(node.nextSibling && node.nextSibling.nodeType == 3){
								container = node.nextSibling;
								offset = 0;
								//pass through
							}else{
								atmrange.moveToElementText(node.nextSibling ? node : container);
								var parent = node.parentNode;
								var tempNode = parent.insertBefore(node.ownerDocument.createTextNode(' '), node.nextSibling);
								atmrange.collapse(false);
								parent.removeChild(tempNode);
							}
						}
					}
				}else{
					atmrange.moveToElementText(container);
					atmrange.collapse(true);
				}
			}
			if(container.nodeType == 3){
				var prevnodeobj = dijit.range.adjacentNoneTextNode(container);
				var prevnode = prevnodeobj[0];
				len = prevnodeobj[1];
				if(prevnode){
					atmrange.moveToElementText(prevnode);
					atmrange.collapse(false);
					//if contentEditable is not inherit, the above collapse won't make the end point
					//in the correctly position: it always has a -1 offset, so compensate it
					if(prevnode.contentEditable != 'inherit'){
						len++;
					}
				}else{
					atmrange.moveToElementText(container.parentNode);
					atmrange.collapse(true);

					// Correct internal cursor position
					// http://bugs.dojotoolkit.org/ticket/15578
					atmrange.move('character', 1);
					atmrange.move('character', -1);
				}

				offset += len;
				if(offset > 0){
					if(atmrange.move('character', offset) != offset){
						console.error('Error when moving!');
					}
				}
			}

			return atmrange;
		}