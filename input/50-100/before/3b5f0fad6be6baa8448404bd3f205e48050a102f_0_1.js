function(code, lang) {
      if (!highlight) {
        return code;
      }

      if (lang && hl.LANGUAGES[lang]) {
        return hl.highlight(lang, code).value;
      } else {
        return hl.highlightAuto(code).value;
      }
    }