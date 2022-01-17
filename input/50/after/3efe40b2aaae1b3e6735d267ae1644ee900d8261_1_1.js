function(result, request) {
					log.error('Impossible to get Node', this.logAuthor);
					global.notify.notify(_('Issue'), _("The selected selector can't be found"),'info');
				}