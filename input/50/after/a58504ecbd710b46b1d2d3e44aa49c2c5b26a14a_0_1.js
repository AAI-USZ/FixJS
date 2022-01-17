function (r) {
    if (message.match(r.route)) { console.log('Match', r.route); handleRoute(r); };
  }