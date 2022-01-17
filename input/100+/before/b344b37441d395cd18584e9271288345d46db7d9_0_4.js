function(result)
    {
      var notice = result.notice
      me.trigger("reset");
      me.effect("highlight");
      // Ask the calendar to update itself
      update_calendar_block();
      $('#scheduled_at').datepicker('setDate', new Date());
      $('#schedule_modal_link').text($('#scheduled_at').val());
      if(notice) {
        $("#work_unit_errors").data('notice', notice);
        $("#work_unit_errors").dialog('open');
      };
      $("#work_unit_submit").attr('disabled', false);
    }