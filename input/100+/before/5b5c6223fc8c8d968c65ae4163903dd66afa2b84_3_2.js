function() {
		    var dbg = $('<div />').attr('title', 'DEBUG');

		    var dbg_IM = $('<div />').attr('id', 'IM_timer');
		    var dbg_NTF = $('<div />').attr('id', 'NTF_timer');
		    var dbg_browser = $('<div />').attr('id', 'browser').html('Browser');

		    $.each($.browser, function(idx, val) {
			    dbg_browser.html(dbg_browser.html() + '<br />&nbsp; &nbsp;' + idx + ': ' + val);
		    })

		    var IM_downcount = 1;
		    var IM_counter = $.sn.im.opts._imCounter;
		    var NTF_downcount = $.sn.ntf.checkTime / 1000 - 1;
		    var NTF_counter = $.sn.ntf.checkTime / 1000 - 1;

		    dbg.appendTo('body');
		    dbg_browser.appendTo(dbg);
		    dbg_IM.appendTo(dbg);
		    dbg_NTF.appendTo(dbg);
		    dbg.dialog({
		        position : "left bottom",
		        buttons : {
			        "Close debug" : function() {
				        $(this).dialog("close");
			        }
		        }

		    });

		    $(document).scroll(function() {
			    dbg.dialog({
				    position : 'left bottom'
			    });
		    });
		    $(window).resize(function() {
			    dbg.dialog({
				    position : 'left bottom'
			    });
		    });

		    $(document).everyTime(1000, 'sn-debug', function() {
			    if ($.sn.im.opts._imCounter != IM_counter || IM_counter - IM_downcount < 0) {
				    IM_counter = $.sn.im.opts._imCounter;
				    IM_downcount = 0;
			    }
			    if (NTF_downcount < 0) {
				    NTF_downcount = NTF_counter;
			    }

			    dbg_IM.html('IM check: ' + $.sn.im.opts._imCounter + 's<br />IM check after: ' + (IM_counter - IM_downcount) + 's');
			    dbg_NTF.html('NTF check after: ' + (NTF_downcount) + 's');
			    IM_downcount++;
			    NTF_downcount--;
		    })
	    }