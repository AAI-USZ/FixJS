function(index, element) {
      var element_id = $(element).attr('id');
      var progress_stat = element_id.match(/^quota_(.+)/)[1];

      if(progress_stat === undefined) {
        return;
      } else if(progress_stat === 'instances') {
        update_amount = instance_count;
      } else if (scope.selected_flavor) {
        update_amount = (scope.selected_flavor[progress_stat] * instance_count);
      }

      scope.updateUsageFor(element, update_amount);
    }