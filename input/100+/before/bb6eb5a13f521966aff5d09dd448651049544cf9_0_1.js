function() {
			var outer = this;
			
			this.element.dialog({
				width: 600,
				height: _initialHeight,
				modal: outer.modal,
				close: function(event, ui) {
					piggydb.widget.imageViewer.close();
					window.fileForm = null;
				}
			});
		
			this.buttonsDiv().hide();
			
			this.element.find("input.file").change(function() {
				outer.setDialogHeight(_initialHeight + 15);
				outer.previewDiv().empty().putLoadingIcon("margin: 5px 10px;");
				outer.element.find("form.upload-file").submit();
			});
			this.element.find("button.register").click(function() {
				outer.clearErrors();
				outer.block();
				var values = outer.element.find("form.save-file").serializeArray();
				jQuery.post("partial/save-file.htm", values, function(html) {
					if (outer.checkErrors(html)) {
						piggydb.widget.imageViewer.close();
						outer.unblock();
					}
					else {
						if (jQuery.isFunction(outer.onSaved)) 
							outer.onSaved(html);
						else
							piggydb.widget.Fragment.onAjaxSaved(html, outer.fragment);
						
						outer.close();
					}
				});
			});
			this.element.find("div.preview img").load(function() {
				outer.setDialogHeight(
					_initialHeight + 
					outer.previewDiv().height() +
					5);
			});
		}