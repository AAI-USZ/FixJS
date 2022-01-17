function(data) {
			$('#rifcs_plain_content').val(data);
	        $.blockUI({
	            message: $('#rifcs_plain'),
	            css: {
	                width: '600px',
	                top:'20%',
	                left:'20%',
	                textAlign: 'left',
	                padding: '10px'
	                },
	                overlayCSS: { backgroundColor: '#000', opacity:   0.6}
            	});
            $('.blockOverlay').attr('title','Click to unblock').click($.unblockUI);
            $('.closeBlockUI').click($.unblockUI);
	       }