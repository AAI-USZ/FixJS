function (node) {
			this.release(node);
			delete node.parent.children[node.id];
		}