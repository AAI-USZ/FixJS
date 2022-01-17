function(json) {
               json = $.postParseJson(json);
               gdn.inform(json);

               if (json.FormSaved == true) {
                  if (json.RedirectUrl)
                     setTimeout(function() { document.location.replace(json.RedirectUrl); }, 300);

                  settings.afterSuccess(settings, json);
                  $.popup.close(settings, json);
               } else {
                  $.popup.reveal(settings, json) // Setup the form again
               }
            }