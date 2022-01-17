function(jEv) {
			var select = $(jEv.target);
			var spec = select.children(":selected").data("spec");
			select.siblings().remove(".es-op,.es-qual,.es-range,.es-fuzzy");
			var ops = [];
			if(spec.type === 'match_all') {
			} else if(spec.type === '_all') {
				ops = ["query_string"];
			} else if(spec.type === 'string') {
				ops = ["term", "wildcard", "prefix", "fuzzy", "range", "query_string"];
			} else if(spec.type === 'long' || spec.type === 'integer' || spec.type === 'float' ||
					spec.type === 'byte' || spec.type == 'short' || spec.type == 'double') {
				ops = ["term", "range", "fuzzy", "query_string"];
			} else if(spec.type === 'date') {
				ops = ["term", "range", "fuzzy", "query_string"];
			} else if(spec.type === 'ip') {
				ops = ["term", "range", "fuzzy", "query_string"];
			}
			select.after({ tag: "SELECT", cls: "es-op", onchange: this._changeQueryOp_handler, children: ops.map(acx.ut.option_template) });
			select.next().change();
		}