function() {		
        // Consolidate date + time fields
        var startDate = null, endDate = null;
        var startMillis = 0, endMillis = 0;
        if(jQuery('#startDate1').attr('checked')) {
            var date = jQuery('#startDate2').datepick('getDate');
            var time = jQuery('#startTime').val().split(':');
            startMillis = date.getTime();
            startMillis += time[0] * 60 * 60 * 1000;
            startMillis += time[1] * 60 * 1000;
            date.setTime(startMillis);
            startMillis -= date.getTimezoneOffset() * 60 * 1000;
            startMillis += (parseInt(bbbUserTimeZoneOffset) * -1);
            date.setTime(startMillis);
            jQuery('#startDate').val(startMillis);
        }else{
            jQuery('#startDate').removeAttr('name');
            jQuery('#addToCalendar').removeAttr('checked');
        }
        if(jQuery('#endDate1').attr('checked')) {
            var date = jQuery('#endDate2').datepick('getDate');
            var time = jQuery('#endTime').val().split(':');
            endMillis = date.getTime();
            endMillis += time[0] * 60 * 60 * 1000;
            endMillis += time[1] * 60 * 1000;
            date.setTime(endMillis);
            endMillis -= date.getTimezoneOffset() * 60 * 1000;
            endMillis += (parseInt(bbbUserTimeZoneOffset) * -1);
            date.setTime(endMillis);
            jQuery('#endDate').val(endMillis);
        }else{
            jQuery('#endDate').removeAttr('name');
            jQuery('#endDate').val(null);
        }
        
        // Validation
        BBBUtils.hideMessage();
        var errors = false;
        
        // Validate title field
        var meetingTitle = jQuery('#bbb_meeting_name_field').val().replace(/^\s+/, '').replace(/\s+$/, '');
        if(meetingTitle == '') {
            BBBUtils.showMessage(bbb_err_no_title, 'warning');
        	errors = true;
        }
        
        // Validate participants list
        if(jQuery('#selContainer tbody tr').length == 0) {
            BBBUtils.showMessage(bbb_err_no_participants, 'warning');
            errors = true;
        }
        
        // Validate date fields
        if(jQuery('#startDate1').attr('checked') && jQuery('#endDate1').attr('checked')) {
            if(endMillis == startMillis) {
                BBBUtils.showMessage(bbb_err_startdate_equals_enddate, 'warning');
                errors = true;
            }else if(endMillis < startMillis) {
                BBBUtils.showMessage(bbb_err_startdate_after_enddate, 'warning');
                errors = true;
            }
        }
        
        // Get description/welcome msg from FCKEditor
        BBBUtils.updateFromInlineFCKEditor('bbb_welcome_message_textarea');

        // Validate description length
        var maxLength = bbbAddUpdateFormConfigParameters.descriptionMaxLength;
        var descriptionLength = jQuery('#bbb_welcome_message_textarea').val().length;
        if( descriptionLength > maxLength ) {
            BBBUtils.showMessage(bbb_err_meeting_description_too_long(maxLength, descriptionLength), 'warning');
            errors = true;
        }
        
        if(errors) return false
        
        $('.bbb_site_member,.bbb_site_member_role').removeAttr('disabled');
        
        // Submit!
        var isNew = $("#isNew").val() == true || $("#isNew").val() == 'true';
        var actionUrl = $("#bbb_add_update_form").attr('action');
        var meetingId = $("#meetingId").val();
        jQuery.ajax( {
            url : actionUrl,
            type : 'POST',
            dataType: 'text',
            async : true,
            data : jQuery("#bbb_add_update_form").serializeArray(),
            beforeSend: function(xmlHttpRequest) {
                BBBUtils.hideMessage();
                jQuery('#bbb_save,#bbb_cancel').attr('disabled','disabled');
                BBBUtils.showAjaxIndicator('#bbb_addUpdate_ajaxInd');
            },
            success : function(returnedMeetingId) {
            	var _meetingId = returnedMeetingId ? returnedMeetingId : meetingId;
                var meeting = BBBUtils.getMeeting(_meetingId);
                bbbCurrentMeetings.addUpdateMeeting(meeting);                  
                BBBUtils.hideAjaxIndicator('#bbb_addUpdate_ajaxInd');
                switchState('currentMeetings');
            },
            error : function(xmlHttpRequest, status, error) {
                BBBUtils.hideAjaxIndicator('#bbb_addUpdate_ajaxInd');
                jQuery('#bbb_save,#bbb_cancel').removeAttr('disabled');
                if(isNew) {
                    BBBUtils.handleError(bbb_err_create_meeting, xmlHttpRequest.status, xmlHttpRequest.statusText);
                }else{
                    BBBUtils.handleError(bbb_err_update_meeting, xmlHttpRequest.status, xmlHttpRequest.statusText);
                }
            }
        });
    }