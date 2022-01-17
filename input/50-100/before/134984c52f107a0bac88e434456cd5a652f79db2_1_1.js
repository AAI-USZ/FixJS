function (event, ui)  {
							var id = extractCanvasId(this.id);
							if (!id) {
								return;
							}
							triggerQueuedRedraw(id, this.value, actualDataSet);
						}