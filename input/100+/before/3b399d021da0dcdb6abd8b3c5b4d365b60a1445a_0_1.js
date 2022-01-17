function bind(x) {
			var j = free_context[x];
			delete free_context[x];
			return j;
		}