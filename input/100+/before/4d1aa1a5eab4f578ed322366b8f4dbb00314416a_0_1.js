function(filename){
  var ext = path.extname(filename);
  switch(ext.toLowerCase()){
    // The language params can have the following keys:
    //
    //  * `name`: Name of Pygments lexer to use
    //  * `comment`: String flag for single-line comments
    //  * `multiline`: Two-element array of start and end flags for block comments
    //  * `commentsIgnore`: Regex of comments to strip completely (don't even doc)
    //  * `dox`: Whether to run block comments through Dox (only JavaScript)
    //  * `type`: Either `'code'` (default) or `'markdown'` - format of page to render
    //
    case '.js':
      return { name: 'javascript',   comment: '//', multiLine: [ /\/\*\*?/, /\*\// ], commentsIgnore: /^\s*\/\/=/, dox: true };
    case '.coffee':
      return { name: 'coffeescript', comment: '#',  multiLine: [ /^#{3}\s*$/m, /^#{3}\s*$/m ], dox: true };
    case '.rb':
      return { name: 'ruby',         comment: '#',  multiLine: [ /\=begin/, /\=end/ ] };
    case '.py':
      return { name: 'python',       comment: '#'   }; // Python has no block commments :-(
    case '.pl':
    case '.pm':
      return { name: 'perl',         comment: '#'   }; // Nor (really) does perl.
    case '.c':
    case '.h':
      if(ext !== '.C') // Sneakily fall through to C++ for .C files.
        return { name: 'c',          comment: '//', multiLine: [ /\/\*/, /\*\// ]     };
    case '.cc':
    case '.cpp':
      return { name: 'cpp',          comment: '//', multiLine: [ /\/\*/, /\*\// ]     };
    case '.cs':
      return { name: 'csharp',       comment: '//', multiLine: [ /\/\*/, /\*\// ]     };
    case '.java':
      return { name: 'java',         comment: '//', multiLine: [ /\/\*/, /\*\// ], dox: true };
    case '.php':
    case '.php3':
    case '.php4':
    case '.php5':
      return { name: 'php',          comment: '//', multiLine: [ /\/\*/, /\*\// ], dox: true };
    case '.as':
      return { name: 'actionscript', comment: '//', multiLine: [ /\/\*/, /\*\// ]     };
    case '.sh':
      return { name: 'sh',           comment: '#'   };
    case '.yaml':
    case '.yml':
      return { name: 'yaml',         comment: '#'   };
    case '.md':
    case '.mkd':
    case '.markdown':
      return { name: 'markdown', type: 'markdown' };
    default:
      return false;
  }
}