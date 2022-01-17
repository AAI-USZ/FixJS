function (er, m) {
    // errors are fine here.  generally just means login expired.
    var locals = {
      content: "index.ejs",
      index: m.index,
      profile: m.myprofile
    }
    res.template("layout.ejs", locals)
  }