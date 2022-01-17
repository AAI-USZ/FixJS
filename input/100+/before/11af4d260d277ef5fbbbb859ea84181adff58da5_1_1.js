function(section) {
			var field_name = section.config.title;
			if(! section.loaded) {
				var spec = this.metadata.fields[field_name];
				if(spec.core_type === "string") {
					section.body.append(this._textFilter_template(spec));
				} else if(spec.core_type === "date") {
					section.body.append(this._dateFilter_template(spec));
					section.body.append(new es.ui.DateHistogram({ printEl: section.body.find("INPUT"), cluster: this.cluster, query: this.query, spec: spec }));
				} else if(spec.core_type === "number") {
					section.body.append(this._numericFilter_template(spec));
				}
				section.loaded = true;
			}
			section.on("animComplete", function(section) { section.body.find("INPUT").focus(); });
		}