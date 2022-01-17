function() {
  var mode = null,
      pattern_el = null,
      options_el = null,
      subject_el = null,
      tt = null,
      pulse = 50;

  /**
   * format_result():
   *  Decodes the PCREck response, injects (and highlights) matched and captured values
   *  in the respective elements.
   *
   * Parameters:
   *  1. result; a JSON object containing the PCREck result
   *  2. subject; the subject (text) the result applies to
   *  3. match_el; jQuery handle to the element that contains the matches
   *  4. capture_el; jQuery handle to the element that contains the captures
   *  5. subject_idx; the index of the subject (ONLY IN ADVANCED MODE)
   */
  function format_result(result, subject, match_el, capture_el, subject_idx) {
    if (result.length == 0) {
      mode == "simple"
        ? PCREck.simple.reset_status("No match.")
        : PCREck.advanced.reset_status(subject_idx, "No match.");

      return;
    }

    if (!result[0]) {
      mode == "simple"
        ? PCREck.simple.reset_status("Error: " + result[1])
        : PCREck.advanced.reset_status(subject_idx, "Error: " + result[1]);

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

    match_el.html(match);
    capture_el.empty();
    // starting from 2 since the first two elements are the match boundaries
    for (var i = 2; i < result.length; ++i) {
      capture_el.append("  %" + (i-1) + " => " + result[i] + "\n");
    }
  }

  return {
    this: this,
    setup: function() {
      // these are constant across all modes
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
            result = JSON.parse(result);

            return format_result(result, subject, $("#PCREck_match"), $("#PCREck_capture"));
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

            $.each(master_resultset, function(subject_idx, result) {
              var subject_el = $("[data-dyn-entity=subjects][data-dyn-index=" + subject_idx + "]"),
                  match_el = subject_el.find(".match:first"),
                  capture_el = subject_el.find(".capture:first"),
                  subject = subject_el.find("textarea:first").attr("value");

              format_result(result, 
                            subject,
                            match_el,
                            capture_el,
                            subject_idx);
            });
          }
        });

        return false;
      }, // advanced.query()
      gen_permalink: function() {
        var params = $("textarea:visible,input[type=text]:visible").serialize();
        params += "&mode=advanced"

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