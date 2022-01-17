function () {
  var sourceFiles = ['Jakefile'];
  collectSourceFilesInDir(sourceFiles, 'src/build');

  return {
    codeAnalysis:codeAnalyzer(sourceFiles, {
      bitwise:true, eqeqeq:true, forin:true, immed:true, strict:false,
      latedef:true, nonew:true, noarg:true, undef:true,
      trailing:true, laxcomma:true, validthis:true,

      newcap:true, browser:false, node:true, jquery:false,
      predef:['complete', 'desc', 'task', 'file', 'directory', 'jake', 'fail']
    })
  };
}