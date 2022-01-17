function(result) {
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