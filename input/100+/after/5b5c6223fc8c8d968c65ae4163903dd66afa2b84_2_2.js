function() {
				    $.sn.up.tabCurrent = $('#sn-up-profileTabs').tabs('option', 'selected');
				    if ($.sn.up.tabReportUser != -1) {
					    $('#sn-up-profileTabs').tabs('select', $.sn.up.tabReportUser);
					    return false;
				    }
				    $.sn.up.tabReportUser = $('#sn-up-profileTabs').tabs('length');
				    var tabTitle = $(this).text();
				    $('#sn-up-profileTabs').tabs('add', '#sn-up-profileTabs-reportUser', tabTitle).tabs('url', $.sn.up.tabReportUser, $(this).attr('href')).tabs('select', $.sn.up.tabReportUser);
				    var tabReportUser = $('#sn-up-profileTabs .ui-tabs-nav li a[href$=reportUser]');
				    tabReportUser.find('span').css({'float': $.sn.rtl?'right':'left'});
				    tabReportUser.prepend('<span class="ui-icon ui-icon-alert">'+tabTitle+'</span>');
				    tabReportUser.append('<span class="ui-icon ui-icon-secondary ui-icon-close sn-action-tabClose"></span>');
				    $('#sn-up-profileTabs').tabs('select', $.sn.up.tabReportUser);
				    tabReportUser.prev('.ui-icon.ui-icon-close').css('cursor', 'pointer').click(function() {
					    $('#sn-up-reportUser input[name=cancel]').trigger('click');
				    });
				    return false;
			    }