function() {
      i = $('#analytics-new-messages-update-range');
      v = parseInt(i.val());
      
      if (v <= 0) {
        return false;
      }

      // Possibly multiply if days or weeks was selected as range.
      if ($('#range_type_days').attr("checked")) {
        range_type = "days";
        range_num = v*24;
      } else if($('#range_type_weeks').attr("checked")) {
        range_type = "weeks";
        range_num = v*24*7;
      } else {
        range_type = "hours";
        range_num = v;
      }

      // Show loading message.
      $("#analytics-new-messages-update-loading").show();

      // Update graph.
      $.post($(this).attr("data-updateurl") + "&hours=" + range_num, function(response) {

        // Plot is defined inline. (I suck at JavaScript)
        plot(response.data);

        // Update title.
        $('#analytics-new-messages-range').html(v);
        $('#analytics-new-messages-range-type').html(range_type);

        // Hide loading message.
        $("#analytics-new-messages-update-loading").hide();
      }, "json");

      return false;
    }