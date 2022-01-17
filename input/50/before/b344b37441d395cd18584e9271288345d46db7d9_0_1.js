function(response){
      $('.calendar').html(response.data);
      $('.week_pagination').html(response.week_pagination);
      // We have to reload the triggers since they are regenerated on each request
      set_week_pagination_triggers();
      set_trigger_for_work_unit();
    }