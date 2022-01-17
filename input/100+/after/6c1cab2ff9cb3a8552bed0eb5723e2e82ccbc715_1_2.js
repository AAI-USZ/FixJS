function(it, inState) {
		while (it.next()) {
			var node = it.value, obj;
			if (node.kind == "comment") {
				this.cook_comment(node.token);
			}
			else if (node.kind == "block") {
				obj = this.make("block", node);
				obj.properties = this.cook_block(node.children);
				return obj;
			}
			else if (node.kind == "array") {
				return this.cook_array(it);
			}
			else if (node.kind == "function") {
				return this.cook_function(it);
			}
			else {
				obj = this.make("expression", node);
				var t = node.token;
				while (it.next()) {
					t += it.value.token;
				}
				obj.token = t;
				return obj;
			}
		}
	}