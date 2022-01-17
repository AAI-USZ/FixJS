function(data)
	{
		try {
			var def_comp = data[wot.default_component];

			var r = (def_comp && def_comp.r != null) ? def_comp.r : -1;

			if (this.settings.search_type == wot.searchtypes.trustworthiness) {
				return r;
			}

			wot.components.forEach(function(item) {
				if (!wot.search.settings["show_application_" + item.name] ||
						wot.search.settings["search_ignore_" + item.name]) {
					return;
				}

				var comp_obj = data[item.name];

				switch (wot.search.settings.search_type) {
				case wot.searchtypes.optimized:
					var type = wot.getwarningtypeforcomponent(item.name, data,
									wot.search.settings);

						if (type && comp_obj && r > comp_obj.r) {
							r = comp_obj.r;
					}
					break;
				case wot.searchtypes.worst:
						if (comp_obj && comp_obj.r >= 0 && r > comp_obj.r) {
							r = comp_obj.r;
					}
					break;
				default:
					wot.log("search.getreputation: unknown search type: " +
							wot.search.settings.search_type);
					return;
				}
			});

			return r;
		} catch (e) {
			console.log("search.getreputation: failed with " + e);
		}

		return -1;
	}