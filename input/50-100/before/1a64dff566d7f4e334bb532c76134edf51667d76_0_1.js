function (msgid) {
          if (json_locale_data && json_locale_data["client"]) {
          var dict = json_locale_data["client"];
            if (dict[msgid] && dict[msgid].length >= 2 &&
                dict[msgid][1].trim() != "") {
              return dict[msgid][1];
            }
        }
        return msgid;
        }