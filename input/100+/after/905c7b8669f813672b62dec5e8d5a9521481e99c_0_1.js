f	if ( bbbCheckOneMeetingAvailabilityId != null ) clearInterval(bbbCheckOneMeetingAvailabilityId);
	if ( bbbCheckAllMeetingAvailabilityId != null ) clearInterval(bbbCheckAllMeetingAvailabilityId);
	if ( bbbCheckRecordingAvailabilityId != null ) clearInterval(bbbCheckRecordingAvailabilityId);
	if ( bbbRefreshRecordingListId != null ) clearInterval(bbbRefreshRecordingListId);
	
    // Make sure we have the correct server time (needed if user duplicated tab/window)
	bbbServerTimeStamp = BBBUtils.updateServerTime();
	bbbServerTimeZoneOffset = bbbServerTimeStamp.defaultOffset;
	
    BBBUtils.hideMessage();
    if('currentMeetings' === state) {
        $('#bbb_recordings_link').parent().parent().show();

        // show permissions links only if site maintainer
        if(bbbUserPerms.bbbAdmin) {
            $('#bbb_permissions_link').parent().parent().show();
        }else{
            $('#bbb_permissions_link').parent().parent().hide();
        }
        
        // show links if user has appropriate permissions
        if(bbbUserPerms.bbbCreate) {   
            $('#bbb_create_meeting_link').parent().parent().show();     
        }else{
            $('#bbb_create_meeting_link').parent().parent().hide();       
        }
        if(bbbUserPerms.bbbDeleteAny) {   
            $('#bbb_end_meetings_link').parent().parent().show();        
        }else{
            $('#bbb_end_meetings_link').parent().parent().hide();         
        }
        
        // show meeting list
        if(bbbUserPerms.bbbViewMeetingList) {
            // Get meeting list
            refreshMeetingList();
            
            // watch for permissions changes, check meeting dates
            for(var i=0,j=bbbCurrentMeetings.length;i<j;i++) {
            	BBBUtils.setMeetingPermissionParams(bbbCurrentMeetings[i]);
                BBBUtils.setMeetingInfoParams(bbbCurrentMeetings[i]);
                BBBUtils.setMeetingJoinableModeParams(bbbCurrentMeetings[i]);
            }
            
            BBBUtils.render('bbb_rooms_template',{'meetings':bbbCurrentMeetings},'bbb_content');

            // show tool footer message only if site maintainer
            //if(bbbUserPerms.bbbAdmin) {
            if(bbbUserPerms.siteUpdate) {
            	bbbToolVersion = BBBUtils.getToolVersion();
            	BBBUtils.render('bbb_toolfooter_template',{'bbbTool':bbbToolVersion},'bbb_footer');
            }

            $(document).ready(function() {
                // auto hide actions
                jQuery('.meetingRow')
                    .bind('mouseenter', function() {
                        jQuery(this).find('div.itemAction').show();
                        jQuery(this).addClass('bbb_even_row');
                    })
                    .bind('mouseleave', function() {
                        jQuery(this).find('div.itemAction').hide();
                        jQuery(this).removeClass('bbb_even_row');
                    }
                );
                
                // Add parser for customized date format
            	$.tablesorter.addParser({
            	    id: "bbbDateTimeFormat",
            	    is: function(s) {
            	        return false; 
            	    },
            	    format: function(s,table) {
            	        return $.tablesorter.formatFloat(new Date(s).getTime());
            	    },
            	    type: "numeric"
            	});
                
                // add sorting capabilities
                $("#bbb_meeting_table").tablesorter({
                    cssHeader:'bbb_sortable_table_header',
                    cssAsc:'bbb_sortable_table_header_sortup',
                    cssDesc:'bbb_sortable_table_header_sortdown',
                    headers: { 2: { sorter: 'bbbDateTimeFormat'}, 3: { sorter: 'bbbDateTimeFormat'} },
                    // Sort DESC status:
                    sortList: (bbbCurrentMeetings.length > 0) ? [[0,0]] : []
                });
                
                BBBUtils.adjustFrameHeight();
            });

            if(bbbInterval.meetings > 0) bbbCheckAllMeetingAvailabilityId = setInterval("BBBUtils.checkAllMeetingAvailability()", bbbInterval.meetings);

        }else{
            // warn about lack of permissions
            if(bbbUserPerms.siteUpdate) {
                BBBUtils.showMessage(bbb_err_no_tool_permissions_maintainer);
            }else{
                BBBUtils.showMessage(bbb_err_no_tool_permissions);
            }
            $('#bbb_content').empty();
        }
        
    } else if('addUpdateMeeting' === state) {
        $('#bbb_recordings_link').parent().parent().hide();
        $('#bbb_create_meeting_link').parent().parent().hide();
        $('#bbb_end_meetings_link').parent().parent().hide();
        $('#bbb_permissions_link').parent().parent().hide();
        
        var isNew = !(arg && arg.meetingId); 
        var meeting = isNew ? {} : BBBUtils.getMeeting(arg.meetingId);
        var contextData = {
                'isNew':        isNew,
                'meeting':      meeting,
                'selTypes':     BBBUtils.getUserSelectionTypes(),
                'selOptions':   BBBUtils.getUserSelectionOptions(),
                'siteId':       bbbSiteId,
                'isRecording': 	bbbAddUpdateFormConfigParameters.recording,
                'actionUrl':    isNew ? "/direct/bbb-meeting/new" : "/direct/bbb-meeting/"+meeting.id+"/edit",
                'timeZoneOffset': bbbUserTimeZoneOffset
        };
        
        BBBUtils.render('bbb_addUpdate_meeting_template', contextData, 'bbb_content');

        $(document).ready(function() {
            // Focus on meeting name/title
            $('#bbb_meeting_name_field').focus();
            
            // Setup description/welcome msg editor
            BBBUtils.makeInlineFCKEditor('bbb_welcome_message_textarea', 'Basic', '480', '200');
            
            // Setup dates
            var now = new Date(); 
            var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            var now_local = new Date(parseInt(now_utc.getTime()) + parseInt(bbbUserTimeZoneOffset));
            var now_local_plus_1 = new Date(parseInt(now_utc.getTime()) + parseInt(bbbUserTimeZoneOffset) + 3600000);

            var startDate = (!isNew && meeting.startDate) ? new Date(parseInt(meeting.startDate) - parseInt(bbbBrowserTimeZoneOffset) + parseInt(bbbUserTimeZoneOffset)) : now_local;
            var endDate = (!isNew && meeting.endDate) ? new Date(parseInt(meeting.endDate) - parseInt(bbbBrowserTimeZoneOffset) + parseInt(bbbUserTimeZoneOffset)) : now_local_plus_1;
            
            // Setup time picker
            var zeropad = function (num) { return ((num < 10) ? '0' : '') + num; }
            jQuery('#startTime').val(zeropad(startDate.getHours()) +':'+ zeropad(startDate.getMinutes()));
            jQuery('#endTime').val(zeropad(endDate.getHours()) +':'+ zeropad(endDate.getMinutes()));
            jQuery(".time-picker").remove();
            jQuery("#startTime, #endTime").timePicker({separator:':'});
            
            // Setup date picker
            jQuery.datepick.setDefaults({
                dateFormat:         jQuery.datepick.W3C,
                defaultDate:        '+0',
                showDefault:        true,
                showOn:             'both', 
                buttonImageOnly:    true,
                buttonImage:        '/library/calendar/images/calendar/cal.gif'
            });
            jQuery('#startDate2, #endDate2').datepick();
            jQuery('#startDate2').datepick('setDate', startDate);
            jQuery('#endDate2').datepick('setDate', endDate);
            
            // Add meeting participants
            addParticipantSelectionToUI(meeting, isNew);
            
            // Setup form submission
            jQuery("#bbb_add_update_form").submit(function() {
                BBBUtils.addUpdateMeeting();
                return false;
            });
            
            // User warnings
            if(!allSiteMembersCanParticipate()) {
                 BBBUtils.showMessage(bbb_err_not_everyone_can_participate);
            }

            BBBUtils.adjustFrameHeight();
        });
        
    } else if('permissions' === state) {
        $('#bbb_recordings_link').parent().parent().hide();
        $('#bbb_create_meeting_link').parent().parent().hide();
        $('#bbb_end_meetings_link').parent().parent().hide();
        $('#bbb_permissions_link').parent().parent().hide();

        BBBUtils.render('bbb_permissions_template', {'permissions': BBBUtils.getSitePermissions()}, 'bbb_content');
        
        $(document).ready(function() {
            $('#bbb_permissions_save_button').bind('click', function() {
               BBBUtils.setSitePermissions('.bbb_permission_checkbox', function() {
                   // success callback
                   bbbUserPerms = new BBBPermissions(BBBUtils.getUserPermissions());
                   if(bbbUserPerms.bbbViewMeetingList)
                       refreshMeetingList();
                   switchState('currentMeetings');
                   if(bbbUserPerms.bbbViewMeetingList) 
                        BBBUtils.showMessage(bbb_permissions_saved, 'success');
               })
            });

            BBBUtils.adjustFrameHeight();
        });
    } else if('joinMeeting' === state || 'meetingInfo' === state) {
        $('#bbb_recordings_link').parent().parent().hide();
        $('#bbb_create_meeting_link').parent().parent().hide();
        $('#bbb_end_meetings_link').parent().parent().hide();
        $('#bbb_permissions_link').parent().parent().hide();

        if(arg && arg.meetingId) {
			var meeting = BBBUtils.getMeeting(arg.meetingId);
			BBBUtils.setMeetingPermissionParams(meeting);
			BBBUtils.setMeetingInfoParams(meeting);
			BBBUtils.setMeetingJoinableModeParams(meeting);

			if (meeting) {
				BBBUtils.render('bbb_meeting-info_template', {
					'meeting' : meeting
				}, 'bbb_content');
				$(document).ready(function() {
					BBBUtils.checkOneMeetingAvailability(arg.meetingId);
					BBBUtils.checkRecordingAvailability(arg.meetingId);
					BBBUtils.adjustFrameHeight();
				});

				if (bbbInterval.meetings > 0)
					bbbCheckOneMeetingAvailabilityId = setInterval(	"BBBUtils.checkOneMeetingAvailability('" + arg.meetingId + "')", bbbInterval.meetings);
				    //bbbCheckRecordingAvailabilityId = setInterval( "BBBUtils.checkRecordingAvailability('" + arg.meetingId + "')" , bbbInterval.recordings);

			} else {
				BBBUtils.hideMessage();
				BBBUtils.showMessage(bbb_err_meeting_unavailable_instr,	'warning', bbb_err_meeting_unavailable, false);
				BBBUtils.adjustFrameHeight();
			}
        }else{
        	switchState('currentMeetings');
        }
    } else if('recordings' === state) {
        $('#bbb_create_meeting_link').parent().parent().hide();
        $('#bbb_end_meetings_link').parent().parent().hide();
        $('#bbb_permissions_link').parent().parent().hide();

        // show meeting list
        if(bbbUserPerms.bbbViewMeetingList) {
            // Get recording list
        	refreshRecordingList();
        	
        	// watch for permissions changes, check meeting dates
            for(var i=0,j=bbbCurrentRecordings.length;i<j;i++) {
                BBBUtils.setRecordingPermissionParams(bbbCurrentRecordings[i]);
            }
            
            BBBUtils.render('bbb_recordings_template',{'recordings':bbbCurrentRecordings,'stateFunction':'recordings'},'bbb_content');

            $(document).ready(function() {
                // auto hide actions
                jQuery('.recordingRow')
                    .bind('mouseenter', function() {
                        jQuery(this).find('div.itemAction').show();
                        jQuery(this).addClass('bbb_even_row');
                    })
                    .bind('mouseleave', function() {
                        jQuery(this).find('div.itemAction').hide();
                        jQuery(this).removeClass('bbb_even_row');
                    }
                );
                
                // Add parser for customized date format
                $.tablesorter.addParser({
                    id: "bbbDateTimeFormat",
                    is: function(s) {
                        return false; 
                    },
                    format: function(s,table) {
                        return $.tablesorter.formatFloat(new Date(s).getTime());
                    },
                    type: "numeric"
                });

                // add sorting capabilities
                $("#bbb_recording_table").tablesorter({
                    cssHeader:'bbb_sortable_table_header',
                    cssAsc:'bbb_sortable_table_header_sortup',
                    cssDesc:'bbb_sortable_table_header_sortdown',
                    headers: { 2: { sorter: 'bbbDateTimeFormat'} },
                    // Sort DESC status:
                    sortList: (bbbCurrentRecordings.length > 0) ? [[0,0]] : []
                });
                
                BBBUtils.adjustFrameHeight();
            });

            if(bbbInterval.recordings > 0) bbbRefreshRecordingListId = setInterval("switchState('recordings')", bbbInterval.recordings);
        }else{
            // warn about lack of permissions
            if(bbbUserPerms.siteUpdate) {
                BBBUtils.showMessage(bbb_err_no_tool_permissions_maintainer);
            }else{
                BBBUtils.showMessage(bbb_err_no_tool_permissions);
            }
            $('#bbb_content').empty();
        }
    } else if('recordings_meeting' === state) {
    	$('#bbb_create_meeting_link').parent().parent().hide();
    	$('#bbb_end_meetings_link').parent().parent().hide();
    	$('#bbb_permissions_link').parent().parent().hide();

    	if(arg && arg.meetingId) {
    	    if(bbbUserPerms.bbbViewMeetingList) {
                // Get meeting list
            	refreshRecordingList(arg.meetingId);

            	// watch for permissions changes, check meeting dates
                for(var i=0,j=bbbCurrentRecordings.length;i<j;i++) {
                	bbbCurrentRecordings[i].ownerId = "";
                    BBBUtils.setRecordingPermissionParams(bbbCurrentRecordings[i]);
                }
    	        
                BBBUtils.render('bbb_recordings_template',{'recordings':bbbCurrentRecordings, 'stateFunction':'recordings_meeting'},'bbb_content');

    	        $(document).ready(function() {
    	            // auto hide actions
    	            jQuery('.recordingRow')
    	                .bind('mouseenter', function() {
    	                    jQuery(this).find('div.itemAction').show();
    	                    jQuery(this).addClass('bbb_even_row');
    	                })
    	                .bind('mouseleave', function() {
    	                    jQuery(this).find('div.itemAction').hide();
    	                    jQuery(this).removeClass('bbb_even_row');
    	                }
    	            );
    	            
    	            // add sorting capabilities
    	            $("#bbb_recording_table").tablesorter({
    	                cssHeader:'bbb_sortable_table_header',
    	                cssAsc:'bbb_sortable_table_header_sortup',
    	                cssDesc:'bbb_sortable_table_header_sortdown',
                        headers: { 2: { sorter: 'bbbDateTimeFormat'} },
                        // Sort DESC status:
                        sortList: (bbbCurrentRecordings.length > 0) ? [[0,0]] : []
    	            });

    	            BBBUtils.adjustFrameHeight();
    	        });

    	        if(bbbInterval.recordings > 0) bbbRefreshRecordingListId = setInterval("switchState('recordings_meeting',{'meetingId':'" + arg.meetingId + "'})", bbbInterval.recordings);
            }else{
                // warn about lack of permissions
                if(bbbUserPerms.siteUpdate) {
                    BBBUtils.showMessage(bbb_err_no_tool_permissions_maintainer);
                }else{
                    BBBUtils.showMessage(bbb_err_no_tool_permissions);
                }
                $('#bbb_content').empty();
            }
    	}else{
    		switchState('recordings');
    	}
    }
}
