function Gettext(params) {
      return {
        gettext: function (msgid) {
          if (json_locale_data && json_locale_data["client"]) {
          var dict = json_locale_data["client"];
            if (dict[msgid] && dict[msgid].length >= 2 &&
                dict[msgid][1].trim() != "") {
              return dict[msgid][1];
            }
        }
        return msgid;
        },
        // See lib/i18n.js format docs
        format: function (fmt, obj, named) {
          if (!fmt) return "";
          if (!fmt.replace) {
            return fmt;
          }
          if (_.isArray(obj) || named === false) {
            return fmt.replace(/%s/g, function(match){return String(obj.shift())});
          } else if (_.isObject(obj) || named === true) {
            return fmt.replace(/%\(\s*([^)]+)\s*\)/g, function(m, v){
              return String(obj[v]);
            });
          }
        }
      };
  }