function(actualDataSet, x) {
			// z dimension slider: set proper length and min/max for dimension
			// sadly a separate routine is necessary for the active page slider.
			// for reasons unknown the active page slider does not refresh until after a page change has been performed 
			if ((TissueStack.desktop || TissueStack.tablet)) {
				$('.ui-slider-vertical').css({"height": TissueStack.canvasDimensions.height - 50});
			} 
			$(TissueStack.phone ? ('.canvasslider') : ('#dataset_' + (x+1) + '_canvas_main_slider')).each(
				function() {
					var id = extractCanvasId(this.id, actualDataSet);
					
					if (!id) {
						return;
					}
					
					$(this).attr("min", 0);
					$(this).attr("max", actualDataSet.planes[id].data_extent.max_slices);
					$(this).attr("value", actualDataSet.planes[id].data_extent.slice);
					$(this).blur();
				}
			);
			// avoid potential double binding by un-binding at this stage
			$(TissueStack.phone ? ('.canvasslider') : ('#dataset_' + (x+1) + '_canvas_main_slider')).unbind("change");
			// rebind
			$(TissueStack.phone ? ('.canvasslider') : ('#dataset_' + (x+1) + '_canvas_main_slider')).bind ("change", function (event, ui)  {
				var id = extractCanvasId(this.id, actualDataSet);
				if (!id) {
					return;
				}
	
				triggerQueuedRedraw(id, this.value, actualDataSet);
			});
	
			// rebind
			if (TissueStack.phone) {
				// avoid potential double binding by un-binding at this stage
                $('.canvasslider').die("slidercreate");			
				// rebind
				$('.canvasslider').live ("slidercreate", function () {
					var res = $('#' + this.id).data('events');
					// unbind previous change
					$('#' + this.id).unbind("change");
					//if (!res.change || res.change.length == 0) {
						$('#' + this.id).bind("change", function (event, ui)  {
							var id = extractCanvasId(this.id);
							if (!id) {
								return;
							}
							triggerQueuedRedraw(id, this.value, actualDataSet);
						});
					//}
				});
			}
		}