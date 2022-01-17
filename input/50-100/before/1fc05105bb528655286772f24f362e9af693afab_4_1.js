function() {
					var id = extractCanvasId(this.id, actualDataSet);
					
					if (!id) {
						return;
					}
					
					$(this).attr("min", 0);
					$(this).attr("max", actualDataSet.planes[id].data_extent.max_slices);
					$(this).attr("value", actualDataSet.planes[id].data_extent.slice);
				}