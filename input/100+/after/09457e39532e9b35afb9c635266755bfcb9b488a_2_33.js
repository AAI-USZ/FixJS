function styleToClass(style) {
        if (!style) return null;
        return "cm-" + style.replace(/ +/g, " cm-");
      }