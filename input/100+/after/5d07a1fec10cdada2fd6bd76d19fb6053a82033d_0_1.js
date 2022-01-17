function (err, data) {
  if (err) throw err

  // don't depend on dox for parsing the Markdown (raw: true)
  var docs = dox.parseComments(data, { raw: true })
  var base = 0
  var sections = []
  docs.forEach(function (doc, i) {
    if (doc.tags[0] && doc.tags[0].type === 'section') {
      sections.push(docs.slice(base, i))
      base = i
    }
  })
  sections.push(docs.slice(base))

  // get the 3 sections
  var exports = sections[0]
  var types = sections[1]
  var extensions = sections[2]

  // move NULL_POINTER from "types" to "exports"
  var null_pointer = types.pop()
  assert.equal(null_pointer.ctx.name, 'NULL_POINTER')
  exports.push(null_pointer)

  // sort
  exports = exports.sort(sort)

  ;[exports, types, extensions].forEach(function (docs) {
    docs.forEach(function (doc) {
      var desc = doc.description
      desc.full = markdown(desc.full)
      desc.summary = markdown(desc.summary)
      desc.body = markdown(desc.body)
    })
  })

  // get a reference to the ref export doc object for every Buffer extension doc
  extensions.forEach(function (doc) {
    var name = doc.ctx.name
    doc.ref = exports.filter(function (ref) {
      return ref.ctx.name === name
    })[0]
  })

  fs.readFile(__dirname + '/index.jade', 'utf8', function (err, template) {
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
  })
}