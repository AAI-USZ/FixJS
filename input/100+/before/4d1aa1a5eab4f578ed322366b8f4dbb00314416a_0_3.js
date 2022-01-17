function(sections, filename, cb){

  // Decide which path to store the output on.
  var outFile = this.outFile(filename);

  var headings = [];

  // Calculate the location of the input root relative to the output file.
  // This is necessary so we can link to the stylesheet in the output HTML using
  // a relative href rather than an absolute one
  var outDir = path.dirname(outFile);
  var relDir = '';
  while(path.join(outDir, relDir).replace(/\/$/,'') !== this.outDir.replace(/\/$/,'')){
    relDir += '../';
  }

  for(var i = 0; i < sections.length; i += 1){
    sections[i].docHtml = this.addAnchors(sections[i].docHtml, i, headings);
  }

  // Render the html file using our template
  var content = this.codeFileTemplate({
    title: path.basename(filename),
    sections: sections
  });
  var html = this.renderTemplate({
    title: path.basename(filename),
    relativeDir: relDir,
    content: content,
    headings: headings,
    colourScheme: this.colourScheme,
    filename: filename.replace(this.inDir,'').replace(/^\//,'')
  });

  var self = this;

  // Recursively create the output directory, clean out any old version of the
  // output file, then save our new file.
  this.writeFile(outFile, html, 'Generated: ' + outFile.replace(self.outDir,''), cb);
}