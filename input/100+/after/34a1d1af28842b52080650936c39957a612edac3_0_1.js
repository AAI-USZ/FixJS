function(obj) {
			if(!this.id) { // we are adding an entry and want a response back from the server.
				this.id = 'new';
				console.log('OC.Journal.Entry.saveproperty: We need to add a new one.');
				//return;
			}
			var container = OC.Journal.propertyContainerFor(obj);
			var params = {'id':this.id};
			params['type'] = container.data('type');
			params['parameters'] = {};
			switch(params['type']) {
				case 'ORGANIZER':
				case 'LOCATION':
				case 'CATEGORIES':
					params['value'] = $(obj).val();
					break;
				case 'SUMMARY':
					if(this.id == 'new' && $(obj).val().trim() == '') {
						$(obj).focus();
						$(obj).addClass('required');
						$(obj).on('blur', OC.Journal.required);
						return;
					}
					params['value'] = $(obj).val();
					break;
				case 'DESCRIPTION':
					// Check if we get the description from the textarea or the contenteditable.
					var format = ($(obj).get(0).nodeName == 'DIV' ? 'html' : 'text'); // FIXME: should check rte instead.
					var value = $('#description').rte(format); // calls either the 'text' or 'html' method of the rte.
					//var value = ($(obj).get(0).nodeName == 'DIV' ? $(obj).html() : $(obj).text());
					console.log('nodeName: ' + $(obj).get(0).nodeName);
					params['value'] = value;
					params['parameters']['FORMAT'] = format.toUpperCase();
					break;
				case 'DTSTART':
					var datetime = $('#dtstartdate').datepicker('getDate');
					if(datetime == null) {
						datetime = new Date();
					}
					datetime.setHours($('#dtstarttime').timepicker('getHour'));
					datetime.setMinutes($('#dtstarttime').timepicker('getMinute'));
					params['value'] = datetime.getTime()/1000;
					break;
				default:
					$.extend(1, $(obj).serializeArray(), params);
					break;
			}
			self = this;
			$.post(OC.filePath('journal', 'ajax', 'saveproperty.php'), params, function(jsondata) {
				if(jsondata.status == 'success') {
					if(self.id == 'new') {
						self.loadEntry(jsondata.data.id, jsondata.data);
					} else {
						$('#leftcontent li[data-id="'+self.id+'"]').remove();
					}
					var item = self.createEntry(jsondata.data);
					$('#leftcontent').append(item);
					OC.Journal.Journals.doSort();
					OC.Journal.Journals.scrollTo(self.id);
					console.log('successful save');
				} else if(jsondata.status == 'error') {
					OC.dialogs.alert(jsondata.data.message, t('contacts', 'Error'));
				} else {
					console.log('saveproperty: Unknown return value');
				}
			});
		}