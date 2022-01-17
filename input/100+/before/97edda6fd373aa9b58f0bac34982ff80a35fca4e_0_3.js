function(master_resultset) {
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