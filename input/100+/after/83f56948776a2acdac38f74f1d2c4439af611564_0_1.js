function(){
				$modal.jqmHide();
				if ($(this).is('.save')){
					var $activeField = $('#' + activeField, iframeContext);
					var assetVal = jQuery.trim($activeField.val());
					var selectedVal = $assetSelect.val();
					var separator = $activeField.attr('data-separator');
					var multiple = parseInt($activeField.attr('data-multiple')) == 1;
					if (multiple){
						if (assetVal.length) assetVal += separator;
						assetVal += selectedVal;
					} else {
						assetVal = selectedVal;
					}
					$('#' + activeField).val(assetVal);
				}
				return false;
			}