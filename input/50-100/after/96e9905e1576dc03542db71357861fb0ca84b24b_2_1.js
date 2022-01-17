function cpac_initialise() {

		jQuery('#respond_title').after(
		
			'<div id="error" style="background: #761d19; margin: 0 0 0.4em 0; padding: 0.4em; -moz-border-radius: 6px; -khtml-border-radius: 6px; -webkit-border-radius: 6px; border-radius: 6px; color: #fff; line-height: 1.3em;"></div>'
			
		);
		jQuery('#commentform').after(
			'<img src="' + cpac_spinner_url + '" id="loading" alt="' + cpac_lang[0] + '" />'
		);
		jQuery('#loading').hide();
		form = jQuery('#commentform');
		err = jQuery('#error');
		err.hide();

	}