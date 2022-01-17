function( jEv ) {
			var jEl = $(jEv.target).closest("SELECT");
			var val = jEl.val();
			var spec = jEl.data("spec");
			var uqid = jEl.data("uqid") || null;
			uqid && this.query.removeClause(uqid);
			if(val !== 'any') {
				jEl.data("uqid", this.query.addClause(val, spec.field_name, "term", "must") );
			}
			this.requestUpdate(jEv);
		}