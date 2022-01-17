function(code, lang) {
      if (!highlight) {
        return code;
      }

      if (lang && hl.LANGUAGES[lang]) {
        var ret = hl.highlight(lang, code).value;

        // Work around a rendering bug in highlight js where gt are not being escaped.
        if (lang === 'html') {
          ret = ret.replace(/>>/g, '>&gt;');
        }

        return ret;
      } else {
        return hl.highlightAuto(code).value;
      }
    }