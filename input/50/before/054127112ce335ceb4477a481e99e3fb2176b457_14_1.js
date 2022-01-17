function write (data, cb) {
  fs.writeFile( path.join(process.cwd(), "package.json")
              , new Buffer(JSON.stringify(data, null, 2))
              , cb )
}