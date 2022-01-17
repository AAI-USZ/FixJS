function(event, ui) {
						PNWMOTHS.Filters.filters[name] = [ui.values.min, ui.values.max];

                                                var minDate = new Date(bounds.min);
                                                minDate.setDate(minDate.getDate()+1);
                                                var maxDate = new Date(bounds.max);
                                                maxDate.setDate(maxDate.getDate()-1);
                                                if (ui.values.min < minDate && ui.values.max > maxDate) {
                                                      delete PNWMOTHS.Filters.filters[name];
                                                }
						jQuery(document).trigger("requestData");
					}