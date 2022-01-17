function(msg) {
			if (!msg){ msg = _("Error: unspecified"); }
			$('.search_results').html('<div id="errormsg" class="alert alert-error"><i class="icon-warning-sign"></i> <strong>' + _("Error") + ':</strong> '+msg+'</div>');
		}