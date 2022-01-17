function(line, index) {
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
      		}