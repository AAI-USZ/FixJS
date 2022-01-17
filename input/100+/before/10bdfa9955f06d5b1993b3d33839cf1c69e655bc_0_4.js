function(leaf){
							bucket_label = leaf.label;
							var minmax_regex = /(-?\d+(\.\d*)?)\s*,\s*(-?\d+(\.\d*)?)/;
							var match = minmax_regex.exec(bucket_label);
							var bmin, bmax;
							if (match != null){
								bmin = parseFloat(match[1]);
								bmax = parseFloat(match[3]);
							}
							else{
								return;
							}

							var unfiltered_bucket = {
								bucket: leaf.label,
								min: bmin,
								max: bmax,
								count: leaf.data[1].value
							};
							base_histogram.push(unfiltered_bucket);

							var filtered_bucket = _.extend({}, unfiltered_bucket);
							filtered_bucket.count = leaf.data[0].value;
							filtered_histogram.push(filtered_bucket);

						}