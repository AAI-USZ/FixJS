function (p) {
      return !p.match(/^[\._-]/)
          && (!context.explicit || names.indexOf(p) === -1)
    }