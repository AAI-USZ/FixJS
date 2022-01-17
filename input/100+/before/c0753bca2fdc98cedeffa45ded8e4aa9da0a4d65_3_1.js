function () {
  var sourceFiles = ['src/main/zepto_jquery/zepto-api-fix.js'];

  return {
    codeAnalysis:codeAnalyzer(sourceFiles, {
      bitwise:true, eqeqeq:true, forin:true, immed:true, strict:false,
      latedef:true, nonew:true, noarg:true, undef:true,
      trailing:true, laxcomma:true, validthis:true,

      newcap:false, browser:true, node:false, jquery:true,
      predef:['Zepto']
    }),
    sources:function () {
      return sourceFiles.slice(0);
    }
  };
}