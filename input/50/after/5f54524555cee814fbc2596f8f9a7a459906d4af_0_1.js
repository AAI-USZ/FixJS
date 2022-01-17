function(flavor) {
    if (flavor == 'Dutch Apple a la mode')
      return "is the very best!";

    if (!flavor || /^\s*$/.test(flavor))
      return '';

    return "is yummy!";
  }