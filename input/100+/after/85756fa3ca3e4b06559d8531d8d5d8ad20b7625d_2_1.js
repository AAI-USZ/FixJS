f
      var content = fs.readFileSync(path.join(scriptsSrc, script)).toString();

      log.verbose('nodify', 'processing %j', { script: script, length: content.length });

      // properly export XRegExp
      if (script === 'XRegExp.js') {
        content += '\nmodule.exports.XRegExp = XRegExp;';
      }

      // fix shCore XRegExp require, global leaks and SyntaxHighlighter reference 
      else if (script === 'shCore.js') {
        content = 
          xregExpReq +
          'var className,\n   gutter;\n' +
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
        
        // fix shBrushXml XRegExp require
        if (script == 'shBrushXml.js') content = xregExpReq + content;
      }
      
      fs.writeFileSync(path.join(scriptsTgt, script), content);
    });
