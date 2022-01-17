function(result, request) {
					log.error('Impossible to get', this.logAuthor);
					global.notify.notify(_('No SLA available'), _('Currently there is no SLA for this selector, please try later'),'info');
				}