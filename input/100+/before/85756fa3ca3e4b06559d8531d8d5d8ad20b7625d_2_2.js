f    var scriptsSrc = path.join(repo, 'scripts')
      , scriptsTgt = path.join(lib, 'scripts')
      ;

    fs.mkdirSync(scriptsTgt);

    // Pull scripts into lib folder while fixing require statements
    fs.readdirSync(scriptsSrc).forEach(function (script) {

      var content = fs.readFileSync(path.join(scriptsSrc, script)).toString();

      log.verbose('nodify', 'processing %j', { script: script, length: content.length });

      // properly export XRegExp
      if (script === 'XRegExp.js') {
        content += '\nmodule.exports.XRegExp = XRegExp;';
      }

      // fix shCore XRegExp require
      else if (script === 'shCore.js') {
        content = 
          'var XRegExp = require("./XRegExp").XRegExp;\n' +
          content
            .replace(
              /if +\(typeof\(SyntaxHighlighter\) +== +'undefined'\) +var +SyntaxHighlighter += +function\(\) +\{/,
              'var SyntaxHighlighter = function() {'
            )
            .replace(/.+require *\( *['"]XRegExp['"] *\).+/g, '// No op since required properly at top of file\n')
            ;
      }

      // fix Brushes SyntaxHighlighter requires
      else {
        content = 
          'var SyntaxHighlighter;\n' +
          content.replace(/require *\( *['"]shCore['"] *\)/g, 'require("./shCore")');
      }
      
      fs.writeFileSync(path.join(scriptsTgt, script), content);
    });

    log.info('nodify', 'Everything is OK');
  }
