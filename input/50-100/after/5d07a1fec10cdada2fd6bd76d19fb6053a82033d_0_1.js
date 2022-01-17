function (err, template) {
    if (err) throw err

    template = jade.compile(template)
    var html = template({
        exports: sections[0]
      , types: sections[1]
      , extensions: sections[2]
      , package: require('../package.json')
      , markdown: markdown
      , highlight: highlight
    })

    fs.writeFile(__dirname + '/index.html', html, function (err) {
      if (err) throw err
    })
  }