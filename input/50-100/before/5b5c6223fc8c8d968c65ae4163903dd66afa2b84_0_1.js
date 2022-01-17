function(data) {
				        $(o_prev).before(data.content);
				        $.sn.comments.waterMark();
				        $('div[id^=sn-ap-entry]:hidden').slideDown('slow');
				        $(o_loader).hide();
				        if (data.more === false) {
					        $(o_more).remove();
				        }
			        }