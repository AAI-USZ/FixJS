function(event, ui) {
						PNWMOTHS.Filters.filters[name] = [ui.values.min, ui.values.max];
                                                if (ui.values.min < new Date(bounds.min + (1 * 1000 * 60 * 60 * 24)) &&
                                                    ui.values.max > new Date(bounds.max - (1 * 1000 * 60 * 60 * 24))) {
							delete PNWMOTHS.Filters.filters[name];
						}
						jQuery(document).trigger("requestData");
					}