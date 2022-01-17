function showLoading (e) {
		    var $row = $.single(e.target);
		    
			$row.find('.loadingDiv').show();
			$row.find('.caaLoad').hide();
			$row.find('.caaDiv').slideUp();
		}