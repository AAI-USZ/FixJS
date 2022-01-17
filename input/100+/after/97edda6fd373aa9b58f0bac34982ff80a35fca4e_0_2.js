function(subject_idx, result) {
              var subject_el = $("[data-dyn-entity=subjects][data-dyn-index=" + subject_idx + "]"),
                  match_el = subject_el.find(".match:first"),
                  capture_el = subject_el.find(".capture:first"),
                  subject = subject_el.find("textarea:first").attr("value");

              format_result(result, 
                            subject,
                            match_el,
                            capture_el,
                            subject_idx);
            }