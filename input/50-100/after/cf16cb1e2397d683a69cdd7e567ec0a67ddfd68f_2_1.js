function (e) {
        			options.errorDialog.removeClass('in');
					$.webSocket('send', {name: 'showQueue', text: 'initialize: {"queueType": "shortQueue", "session": "' + options.session + '" }'});
					if ($this.data('payDesk'))
					    _setPayDesk($this, $this.data('payDesk'));
        		}