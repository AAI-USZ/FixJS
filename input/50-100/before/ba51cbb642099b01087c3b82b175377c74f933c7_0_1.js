function(data) {
        json = eval('(' + data + ')');

        // Plot is defined inline. (I suck at JavaScript)
        plot(json.data);

        // Update title.
        $('#analytics-new-messages-range').html(v);
        $('#analytics-new-messages-range-type').html(range_type);

        // Hide loading message.
        $("#analytics-new-messages-update-loading").hide();
      }