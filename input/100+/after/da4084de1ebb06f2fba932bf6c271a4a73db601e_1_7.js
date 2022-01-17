function(first, tail) {
      		var stack = [new ContainerNode()],
      			nodeCount = 0,
      			lines, peekNode, pushNode, popNode;
      			
      		if (!first) {
      			return stack[0];
      		}
      			
      		/* Node stack helpers */
      		
      		peekNode = function() {
      			return stack[stack.length - 1];
      		};
      	
      		pushNode = function(node) {
      			nodeCount++;
      			stack.push(node);
      		};
      	
      		popNode = function(lineNumber) {
      			var node;
      			if (stack.length < 2) {
      				throw new Error("Could not pop node from stack");
      			}
      		
      			node = stack.pop();
      			peekNode().appendChild(node);
      			
      			return node;
      		};
      		
      		// Remove newlines
      		lines = tail.map(function(item) { return item.pop(); });
      		lines.unshift(first);
      	
      		lines.forEach(function(line, index) {
      			var indent = line.indent,
      				item = line.item,
      				lineNumber = line.num,
      				err;
      				
      			if (indent[0] instanceof Error) {
      				throw indent;
      			}
      			
      			if (nodeCount > 0) {
      				if (indent[0] === UNCHANGED) {
      					// Same indent: previous node won't have any children
      					popNode();
      				} else if (indent[0] === DEDENT) {
      					// Pop nodes in their parent
      					popNode();
      				
      					while (indent.length > 0) {
      						indent.pop();
      						popNode();
      					}
      				} else if (indent[0] === INDENT && peekNode() instanceof TextNode) {
      					err = new Error("Cannot add children to text node");
      					err.line = lineNumber;
      					throw err;
      				}
      			}
      			
      			pushNode(item);
      		});
      		
      		// Collapse remaining stack
      		while (stack.length > 1) {
      			popNode();
      		}
      		
      		return peekNode();
      	}