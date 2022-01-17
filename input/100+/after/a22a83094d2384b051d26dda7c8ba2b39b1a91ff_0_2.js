function (node){
			var
				  list = node.getElementsByTagName('span')
				, i = list.length
				, val
				, node
				, next
				, parent
				, __highlight = ' '+this.__highlightClassName+' '
			;

			while( i-- ){
				node = list[i];
				if( ~(' '+node.className+' ').indexOf(__highlight) ){
					val		= node.innerHTML;
					parent	= node.parentNode;

					parent.insertBefore(node.firstChild, node);
					parent.removeChild(node);

					node = parent.firstChild;

					do {
						if( next = node.nextSibling ){
							if( utils.isText(node) && utils.isText(next) ){
								node.nodeValue += next.nodeValue;
								parent.removeChild(next);
							} else {
								node = next;
							}
						} else {
							break;
						}
					} while( 1 );

					break;
				}
			}
		}