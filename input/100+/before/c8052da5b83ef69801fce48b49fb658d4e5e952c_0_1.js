function(e, d) {
				e.preventDefault();
				
				var id, self = this;
				
				id = this.find(':input[name=ID]').val();
	
				if(!id) return false;

				var button, url, selected, to, from, compare, data;
				
				compare = (this.find(":input[name=CompareMode]").is(":checked"));
				selected = this.find("table input[type=checkbox]").filter(":checked");
				
				if(compare) {
					if(selected.length != 2) return false;
					
					to = selected.eq(0).val();
					from = selected.eq(1).val();
					button = this.find(':submit[name=action_doCompare]');
					url = ss.i18n.sprintf(this.data('linkTmplCompare'), id,from,to);
				}
				else {
					to = selected.eq(0).val();
					button = this.find(':submit[name=action_doShowVersion]');
					url = ss.i18n.sprintf(this.data('linkTmplShow'), id,to);
				}
				
				$('.cms-container').loadPanel(url, '', {selector: '.cms-edit-form'});
			}