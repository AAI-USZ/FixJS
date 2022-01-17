function(err, resp) {
    if (typeof err === "function" ? err(console.log(err)) : void 0) {

    } else {
      console.log(resp);
      return console.log('Done.');
    }
  }