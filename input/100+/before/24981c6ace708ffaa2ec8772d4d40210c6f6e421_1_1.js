function(el){
			$(el).html('//editor/pagecreator/views/init.tmpl', {runtime: this.options.runtime});
//			this.element.find("select[name=layout]").val(this.options.page.getTemplate());
			
			var pageData = new Object();
			this.parent = null;
			
			// TODO Load AvailableTags
			Workbench.suggestTags({}, $.proxy(function(tags) {
				if(tags == null || tags == undefined) return;
//				var availableTags = ["ActionScript","Scheme"];
				this.element.find("input[name=tags]").autocomplete({
					source: function(request, response) {
						// delegate back to autocomplete, but extract the last term
						response($.ui.autocomplete.filter(tags, request.term.split(/,\s*/).pop()));
					},
					focus: function() {
						// prevent value inserted on focus
						return false;
					},
					select: function(ev, ui) {
						var terms = this.value.split(/,\s*/);
						// remove the current input
						terms.pop();
						// add the selected item
						terms.push(ui.item.value);
						// add placeholder to get the comma-and-space at the end
						terms.push("");
						this.value = terms.join(", ");
						return false;
					}
				});
			}, this));
			
			// Dialog
			this.element.dialog({
				modal: true,
				title: 'Neue Seite anlegen',
				autoOpen: true,
				resizable: true,
				draggable: true,
				width: 700,
				height: 650,
				buttons: {
					Abbrechen: $.proxy(function() {
						this.element.dialog('close');
					}, this),
					Fertig: $.proxy(function() {
						if(this.parent == null) return;
						
						this.element.find("form#wbl-validate").submit();
						if(!this.element.find("form#wbl-validate").valid()) return;
						
						var url = this.element.find('input[name=url]').val();
						if(url != url.match(/[a-zA-Z0-9_-]*/)) {
							this.validator.showErrors({"url": jQuery.validator.messages.friendlyUrl});
							return;
						};
						
						$.each(this.element.find('form#wbl-validate :input'), function(i, input) {
							pageData[$(input).attr('name')] = $(input).val();
						});
						
						pageData.url = this.parent + pageData.url;
						
						// Create page and update pageData
						Page.create({path: pageData.url}, $.proxy(function(page) {
							var path = page.getPath(); // Let this line at this position!!
							page.saveMetadata(pageData, this.options.language, $.proxy(function() {
								page.lock(this.options.runtime.getUserLogin(), function() {
									location.href = path + window.currentLanguage + "?edit&_=" + new Date().getTime();
								});
							}, this));
						}, this));
						
						this.destroy();
					}, this)
				},
				close: $.proxy(function () {
					this.destroy();
				},this)
			});
			this.nextButton = this.element.parent().find(".ui-dialog-buttonpane span.ui-button-text:contains('Fertig')").parent();
			this.nextButton.button('option', 'disabled', true);
			this.validator = this.element.find("form#wbl-validate").validate();
		}