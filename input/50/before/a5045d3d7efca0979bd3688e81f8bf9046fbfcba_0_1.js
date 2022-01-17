function (er, m) {
    if (er) return res.error(er)
    var locals = {
      content: "index.ejs",
      index: m.index,
      profile: m.myprofile
    }
    res.template("layout.ejs", locals)
  }