function(result)
    {
      var notice = result.notice
      me.trigger("reset");
      me.effect("highlight");
      $("#work_unit_client_id").children().remove();
      $.get("/dashboard/json_index", { id: this.value }, function(data){
        $.each(data, function(){
          $.each(this, function(k, v){
           $("#work_unit_client_id").append( new Option(v.name, v.id) )
          });
        });
      }, "json");
      // Ask the calendar to update itself
      update_calendar_block();
      $('#scheduled_at').datepicker('setDate', new Date());
      $('#work_unit_scheduled_at').val(new Date());
      $('#schedule_modal_link').text($('#scheduled_at').val());
      if(notice) {
        $("#work_unit_errors").data('notice', notice);
        $("#work_unit_errors").dialog('open');
      };
      $("#work_unit_submit").attr('disabled', false);
    }