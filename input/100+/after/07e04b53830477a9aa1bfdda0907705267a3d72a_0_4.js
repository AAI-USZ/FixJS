function (data) {
        if (data.captcha) {
          $.fancybox(data.captcha);
          $("input#id_captcha_answer").focus();
        } else {
          // If it has been a successful submission, update the data
          // stored in the client
          if (type == 'submission') {
            PTL.editor.units[uid].isfuzzy = PTL.editor.isFuzzy();
            $("textarea[id^=id_target_f_]").each(function (i) {
              PTL.editor.units[uid].target[i].text = PTL.editor.cleanEscape($(this).val());
            });
          }

          // Try loading the next unit
          var newUid = parseInt(PTL.editor.units[uid].next);
          if (newUid) {
            var newHash = PTL.utils.updateHashPart("unit", newUid, ["page"]);
            $.history.load(newHash);
          } else {
            PTL.editor.displayError(gettext("Congratulations, you walked through all items"));
          }
        }
      }