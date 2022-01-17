function() {
  var mode = null,
      pattern_el = null,
      options_el = null,
      subject_el = null,
      tt = null,
      pulse = 50;

  return {
    this: this,
    setup: function() {
      pattern_el = $("#PCREck_pattern"),
      options_el = $("#PCREck_pattern_options");
    },
    /** accepted modes: "simple"|"advanced" */
    set_mode: function(in_mode) {
      mode = in_mode;

      if (in_mode == "simple") {
        subject_el = $("#PCREck_subject");
      }
    },
    pulsate: function() {
      if (tt) { clearTimeout(tt); }
      tt = setTimeout("PCREck.query()", pulse);
    },
    query: function() {
      if (mode == "simple")
        return PCREck.simple.query();
      else if (mode == "advanced")
        return PCREck.advanced.query();
      else
        console.log("Error: no PCREck mode has been set, unable to query.")
    },

    simple: {
      reset_status: function(text) {
        $("#PCREck_match").empty().html(text || "");
        $("#PCREck_capture").empty();        
      },
      query: function() {
        var pattern = pattern_el.attr("value"),
            options = options_el.attr("value"),
            subject = subject_el.attr("value");

        if (pattern.length == 0) {
          PCREck.simple.reset_status();
          return;
        }

        $.ajax({
          url: "/",
          type: "POST",
          data: {
            pattern: "(?" + options + ")" + pattern,
            text: subject
          },
          success: function(result) {
            if (result.length == 0) {
              PCREck.simple.reset_status("No match.");
              return;
            }

            if (!result[0]) {
              PCREck.simple.reset_status("Error: " + result[1]);
              return;
            }

            var match = subject,
                match_begin = result[0] - 1, // subtract 1 because Lua starts indexes @ 1
                match_end = result[1] - 1;

            match = match.split('');
            match[match_begin] = "<em>" + match[match_begin];
            match[match_end] = match[match_end] + "</em>";
            match = match.join('');
            // this is required for highlighting linebreaks and whitespace
            match = match.replace(' ', "&nbsp;").replace(/\n/g, "&nbsp;<br />");

            $("#PCREck_match").html(match);
            $("#PCREck_capture").empty();
            // starting from 2 since the first two elements are the match boundaries
            for (var i = 2; i < result.length; ++i) {
              $("#PCREck_capture").append("  %" + (i-1) + " => " + result[i] + "\n");
            }
          }
        });

        return false;
      },

      gen_permalink: function() {
        var pattern = pattern_el.attr("value"),
            options = options_el.attr("value"),
            subject = subject_el.attr("value");

        if (pattern.length == 0 && subject.length == 0) {
          return;
        }

        $.ajax({
          url: "/permalink",
          type: "POST",
          data: {
            pattern: pattern,
            subject: subject,
            options: options,
            mode: "simple"
          },
          success: function(url) {
            $("#permalink").html("Your regular expression can be viewed at: <a target='_blank' href='" + url + "'>" + url + "</a>");
          }
        });
      }
    },
    advanced: {
      reset_status: function(idx, text) {
        $( "[data-dyn-entity=subjects][data-dyn-index=" + idx + "] .match").empty().html(text || "");
        $( "[data-dyn-entity=subjects][data-dyn-index=" + idx + "] .capture").empty();
      },
      query: function(pattern, options, subjects) {
        if ($("#PCREck_pattern").attr("value").length == 0) {
          PCREck.advanced.reset_status();
          return;
        }

        var params = $("textarea:visible,input[type=text]:visible").serialize();

        $.ajax({
          url: "/modes/advanced",
          type: "POST",
          data: params,
          success: function(master_resultset) {
            master_resultset = JSON.parse(master_resultset);
            // console.log(master_resultset);

            $.each(master_resultset, function(subject_idx, result) {
              console.log(result)
              console.log(typeof result)
              if (result.length == 0) {
                PCREck.advanced.reset_status(subject_idx, "No match.");
                return;
              }

              if (!result[0]) {
                PCREck.advanced.reset_status(subject_idx, "Error: " + result[1]);
                return;
              }

              var subject = $("[data-dyn-entity=subjects][data-dyn-index=" + subject_idx + "]"),
                  match = subject.find(".match:first"),
                  capture = subject.find(".capture:first");

              var matched_subject = subject.find("textarea:first").attr("value");
              var match_begin = result[0] - 1, // subtract 1 because Lua starts indexes @ 1
                  match_end = result[1] - 1;

              matched_subject = matched_subject.split('');
              matched_subject[match_begin] = "<em>" + matched_subject[match_begin];
              matched_subject[match_end] = matched_subject[match_end] + "</em>";
              matched_subject = matched_subject.join('');
              matched_subject = matched_subject.replace(' ', "&nbsp;").replace(/\n/g, "&nbsp;<br />");

              match.html(matched_subject);
              capture.empty();
              for (var i = 2; i < result.length; ++i) {
                capture.append("  %" + (i-1) + " => " + result[i] + "\n");
              }

            });
          }
        });

        return false;
      }, // advanced.query()
      gen_permalink: function() {
        // var pattern = pattern_el.attr("value"),
        //     options = options_el.attr("value"),
        //     subject = subject_el.attr("value");
        var params = $("textarea:visible,input[type=text]:visible").serialize();
        params += "&mode=advanced"
        // console.log(params);
        // $.extend(params, { mode: "advanced" });
        // console.log(params);

        // if (pattern.length == 0 && subject.length == 0) {
          // return;
        // }

        $.ajax({
          url: "/permalink",
          type: "POST",
          data: params,
          success: function(url) {
            $("#permalink").html("Your regular expression can be viewed at: <a target='_blank' href='" + url + "'>" + url + "</a>");
          }
        });
      }
    }
  }
}