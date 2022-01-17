function(e, ui) {
				        $('#sn-us-wallInput').trigger('focusin').trigger('focusout');
				        $('.sn-up-editable').snEditable({
				            datePicker : {
				                dateFormat : $.sn.up.dateFormat,
				                monthNames : $.sn.up.monthNames,
				                monthNamesShort : $.sn.up.monthNamesShort
				            },
				            ajaxOptions : {
				                url : $.sn.up.urlAJAX,
				                cache : false
				            }
				        });

				        $('.sn-us-inputComment').watermark($.sn.us.watermark, {
				            useNative : false,
				            className : 'sn-us-watermark'
				        }).TextAreaExpander(22, 100).css({
					        height : '22px'
				        });
				        $("#sn-us-wallInput").watermark($.sn.us.watermark, {
				            useNative : false,
				            className : 'sn-us-watermark'
				        }).TextAreaExpander(22, 150).trigger('focusout');
				        $.sn._resize();
				        $.sn._textExpander();

			        }