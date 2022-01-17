function() {
            // Focus on meeting name/title
            $('#bbb_meeting_name_field').focus();
            
            // Setup description/welcome msg editor
            BBBUtils.makeInlineFCKEditor('bbb_welcome_message_textarea', 'Basic', '480', '200');
            
            // Setup dates
            var startDate = (!isNew && meeting.startDate) ? new Date(meeting.startDate) : new Date();
            var endDate = (!isNew && meeting.endDate) ? new Date(meeting.endDate) : new Date();
            
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
        }