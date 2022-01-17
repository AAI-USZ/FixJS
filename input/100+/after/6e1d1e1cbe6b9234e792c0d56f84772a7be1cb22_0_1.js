function(event, jqXHR, ajaxSettings, thrownError) {
			    // do not pile up error handlers upon repeat submissions
			    $(this).off('ajaxError');
			    // remove feedback elements
			    form.removeClass('busy');
			    s.removeAttr('disabled');
			    $('body').removeClass('busy');
			    $('span.spinner').remove();
			    if (options.error) options.error(form, event, jqXHR, ajaxSettings, thrownError);
                textpattern.Relay.callback('txpAsyncForm.error', {'this': form, 'event': event, 'jqXHR': jqXHR, 'ajaxSettings': ajaxSettings, 'thrownError': thrownError});
            }