function(resp) { 
				if(!resp) {
					alert('Berta says:\n\nServer produced an error while adding new section! Something went sooooo wrong...');
				} else if(resp && !resp.error_message) {
					var li = new Element('li', { 'class': 'xSection-'+resp.real, 'html': resp.update }).inject(this.sectionsMenu);
					this.sectionsSortables.addItems(li);
					this.editablesInit();
					li.getElement('a.xSectionDelete').addEvent('click', this.sectionOnDeleteClick.bindWithEvent(this));
				} else {
					alert(resp.error_message);
				}
				this.sectionsEditor.removeClass('xSaving');
			}