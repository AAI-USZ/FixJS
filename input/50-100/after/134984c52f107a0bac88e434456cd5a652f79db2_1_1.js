function () {
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
				}