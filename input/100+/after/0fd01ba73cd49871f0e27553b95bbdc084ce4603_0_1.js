function rate_plugin(id, rate, url) {
    /*  register the rate given to a plugin marked with id.
        it tries to register the rate at the given url.
    */
    var post_url = url+"?plugin_id=" + id + "&rate=" + rate;
    var elem = $("#plugin_"+id.toString());

    if (!elem) {
      alert("Error founding the plugin you want to vote. :S");
    } else {
      // the rate container
      var rate_container = elem.find(".rate-container");

      jQuery.ajax({
        url: post_url,
        dataType: 'json',
        success: function(data) {
          // send the rate & update the rate of this plugin

          var modal = $("<div class='msg'>");
          modal.css('display', 'block');
          elem.prepend(modal);

          var new_div = $('<div>');
          new_div.addClass('message');

          if (data.ok) {
            // hiding rate container
            rate_container.fadeOut();

            // update plugin avg. rate
            rate_container
              .find('.plugin-rate')
              .html(twoDecimals(data.plugin_rate.toString()));

            // update plugin rates count
            rate_container
              .find('.plugin-rate-times')
              .html("( "+data.plugin_rate_times+" )");

            // showing rate container
            rate_container.fadeIn();

          } else {
            alert("error");
            new_div.addClass('error');
          }

          // message to user
          var p = "<p>" + data.msg + "</p>";
          new_div.append(p);

          // nice message shown up
          modal.append(new_div)
            .delay(4000)
            .slideUp(1000);
        }
      });
    }
}