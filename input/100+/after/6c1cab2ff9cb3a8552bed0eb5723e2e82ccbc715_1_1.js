function(it, inState) {
		var objects = [], node, obj;
		while (it.next()) {
			node = it.value;
			if (node.kind == "comment") {
				this.cook_comment(node.token);
			} 
			else if (node.token == "enyo.kind" && it.future.kind == "association") {
				obj = this.cook_kind(it);
			}
			else if (node.kind == "assignment") {
				obj = this.cook_assignment(it);
			}
			else if (node.kind == "association") {
				// closure? [( [function] [()] [{...}] [()]) ]
				if (node.children && node.children.length == 1 && node.children[0].kind == "function") {
					// closure
					var fn = node.children[0];
					if (fn.children && fn.children.length == 2) {
						var body = fn.children[1];
						var objs = this.walk(new Iterator(body.children));
						// add whatever was in the closure to the main object list
						objects = objects.concat(objs);
					}
					// skip the closure invocation [()]
					it.next();
				}
			}
			if (obj) {
				objects.push(obj);
				obj = null;
			}
		}
		return objects;
	}