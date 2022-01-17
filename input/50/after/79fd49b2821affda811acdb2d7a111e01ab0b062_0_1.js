function () {
			var jid = jQuery(this).attr('jid');
			if (jid != '[object object]') {
				Client.roster.push(jid);
			}
		}