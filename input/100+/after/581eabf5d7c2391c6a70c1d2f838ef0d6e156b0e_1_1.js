function collectStyles () {
  styles = fs.readdirSync(stylesDir)
    .filter(function (fileName) {
      return fileName.match(/shCore.+\.css/);
    })
    .map(function (fileName) {
      var normalizedFileName =  fileName.replace(/shCore/, '')
        , extLength          =  path.extname(normalizedFileName).length
        , nameLength         =  normalizedFileName.length - extLength
        , styleName          =  normalizedFileName.substr(0, nameLength).toLowerCase()
        , fullFilePath       =  path.join(stylesDir, fileName)
        ;

      return { name: styleName, sourcePath: fullFilePath };
      
    });
}