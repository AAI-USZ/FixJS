function() {
      			var node;
      			if (stack.length < 2) {
      				throw new Error("Could not pop node from stack");
      			}
      		
      			node = stack.pop();
      			peekNode().appendChild(node);
      			return node;
      		}