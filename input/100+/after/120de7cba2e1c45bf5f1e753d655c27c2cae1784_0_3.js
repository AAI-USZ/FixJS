function(node, html, data) {
				var self = this, newNode = $(html), origClasses = node.attr('class'),
					parentNode = data.ParentID ? this.find('li[data-id='+data.ParentID+']') : false;

				// Copy attributes. We can't replace the node completely
				// without removing or detaching its children nodes.
				for(var i=0; i<newNode[0].attributes.length; i++){
					var attr = newNode[0].attributes[i];
					node.attr(attr.name, attr.value);
				}

				// Replace inner content
				node.addClass(origClasses).html(newNode.html());

				// Set correct parent
				this.jstree('move_node', node, parentNode.length ? parentNode : -1, data.Sort);
			}