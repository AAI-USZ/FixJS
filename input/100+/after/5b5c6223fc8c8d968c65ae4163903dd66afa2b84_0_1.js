function(opts) {
		    if (!$.sn._inited) { return false; }
		    if ($.sn.enableModules.ap == undefined || !$.sn.enableModules.ap) { return false; }
		    $.sn._settings(this, opts);

		    if (this.blockOnlineUsers) {
			    if ($.sn.allow_load) {
				    $(document).everyTime($.sn.ap.tikTakOnline, $.sn.ap.tiktakName, function(i) {
					    $.sn.ap.onlineList(i);
				    });
				    // $.sn.ap.onlineList(0);
			    }
		    }

		    $('.sn-ap-getMore').click(function() {
		    	if ($('.ui-dialog').is(':visible')){ return;}
			    var o_more = $(this)
			    var o_loader = o_more.next('.sn-ap-statusLoader');
			    $(o_loader).show();
			    var o_prev = o_more.parents('.sn-more');
			    var i_obj = $(o_prev).prev('div[id^=sn-ap-entry]');
			    var i_lEntry = $.sn.getAttr($(i_obj), 't');

			    $.ajax({
			        url : $.sn.ap.url,
			        data : {
			            mode : 'snApOlderEntries',
			            lEntryTime : i_lEntry
			        },
			        error : function() {
				        $(o_loader).hide();
			        },
			        success : function(data) {
				        $(o_prev).before(data.content);
				        $.sn.comments.waterMark();
				        $('div[id^=sn-ap-entry]:hidden').slideDown('slow');
				        $(o_loader).hide();
				        if (data.more === false) {
					        $(o_more).remove();
				        }
				        $.sn._textExpander();
			        }
			    });
		    });

		    $('.sn-ap-search input.inputbox').bind('focusin focusout', function() {
			    $('.sn-ap-search').toggleClass('sn-inputbox-focus');
		    });

		    $.sn.ap.urlUsersAutocomplete = $.sn.ap.urlUsersAutocomplete.replace(/&amp;/g, '&');

		    $("#sn-ap-searchUsersAutocomplete").autocomplete({
		        source : $.sn.ap.urlUsersAutocomplete,
		        minLength : 3,
		        appendTo: '#sn-ap-searchAutocompleteContainer',
		        delay : 300
		    }).parents('form').submit(function() {
			    if ($('#sn-ap-searchUsersAutocomplete').val() == '') { return false; }
		    });

		    $('a.sn-ap-loadNews').click(function() {
			    $.sn.ap.loadNews();
			    return false;
		    });
		    $.sn._textExpander();
		    /**
			 * $(document).focusin(function() { $.sn.ap.loadNews(); });
			 */
		    /*
			 * if ($('.sn-ap-search').size() > 0) {
			 * //$('.sn-ap-search').fadeIn('fast').removeAttr('style');
			 * $(document).oneTime(100, 'sn-ap-search', function() {
			 * $.sn.ap._resize(); }); }
			 */
	    }