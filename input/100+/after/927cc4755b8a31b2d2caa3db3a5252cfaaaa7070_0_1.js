function CoffeeHighlightRules() {
        var identifier = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";
        var stringfill = {
            token : "string",
            merge : true,
            regex : ".+"
        };

        var keywords = lang.arrayToMap((
            "this|throw|then|try|typeof|super|switch|return|break|by)|continue|" +
            "catch|class|in|instanceof|is|isnt|if|else|extends|for|forown|" +
            "finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|" +
            "or|on|unless|until|and|yes").split("|")
        );
        
        var langConstant = lang.arrayToMap((
            "true|false|null|undefined").split("|")
        );
        
        var illegal = lang.arrayToMap((
            "case|const|default|function|var|void|with|enum|export|implements|" +
            "interface|let|package|private|protected|public|static|yield|" +
            "__hasProp|extends|slice|bind|indexOf").split("|")
        );
        
        var supportClass = lang.arrayToMap((
            "Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|" +
            "RangeError|String|SyntaxError|Error|EvalError|TypeError|URIError").split("|")
        );
        
        var supportFunction = lang.arrayToMap((
            "Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|" +
            "encodeURIComponent|decodeURI|decodeURIComponent|RangeError|String|" +
            "SyntaxError|Error|EvalError|TypeError|URIError").split("|")
        );

        this.$rules = {
            start : [
                {
                    token : "identifier",
                    regex : "(?:(?:\\.|::)\\s*)" + identifier
                }, {
                    token : "variable",
                    regex : "@(?:" + identifier + ")?"
                }, {
                    token: function(value) {
                        if (keywords.hasOwnProperty(value))
                            return "keyword";
                        else if (langConstant.hasOwnProperty(value))
                            return "constant.language";
                        else if (illegal.hasOwnProperty(value))
                            return "invalid.illegal";
                        else if (supportClass.hasOwnProperty(value))
                            return "language.support.class";
                        else if (supportFunction.hasOwnProperty(value))
                            return "language.support.function";
                        else
                            return "identifier";
                    },
                    regex : identifier
                }, {
                    token : "constant.numeric",
                    regex : "(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"
                }, {
                    token : "string",
                    merge : true,
                    regex : "'''",
                    next : "qdoc"
                }, {
                    token : "string",
                    merge : true,
                    regex : '"""',
                    next : "qqdoc"
                }, {
                    token : "string",
                    merge : true,
                    regex : "'",
                    next : "qstring"
                }, {
                    token : "string",
                    merge : true,
                    regex : '"',
                    next : "qqstring"
                }, {
                    token : "string",
                    merge : true,
                    regex : "`",
                    next : "js"
                }, {
                    token : "string.regex",
                    merge : true,
                    regex : "///",
                    next : "heregex"
                }, {
                    token : "string.regex",
                    regex : "/(?!\\s)[^[/\\n\\\\]*(?: (?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[/\\n\\\\]*)*/[imgy]{0,4}(?!\\w)"
                }, {
                    token : "comment",
                    merge : true,
                    regex : "###(?!#)",
                    next : "comment"
                }, {
                    token : "comment",
                    regex : "#.*"
                }, {
                    token : "punctuation.operator",
                    regex : "\\?|\\:|\\,|\\."
                }, {
                    token : "keyword.operator",
                    regex : "(?:[\\-=]>|[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|[!*+-=><])"
                }, {
                    token : "paren.lparen",
                    regex : "[({[]"
                }, {
                    token : "paren.rparen",
                    regex : "[\\]})]"
                }, {
                    token : "text",
                    regex : "\\s+"
                }],
            
            qdoc : [{
                token : "string",
                regex : ".*?'''",
                next : "start"
            }, stringfill],
            
            qqdoc : [{
                token : "string",
                regex : '.*?"""',
                next : "start"
            }, stringfill],
            
            qstring : [{
                token : "string",
                regex : "[^\\\\']*(?:\\\\.[^\\\\']*)*'",
                merge : true,
                next : "start"
            }, stringfill],
            
            qqstring : [{
                token : "string",
                regex : '[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',
                merge : true,
                next : "start"
            }, stringfill],
            
            js : [{
                token : "string",
                merge : true,
                regex : "[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",
                next : "start"
            }, stringfill],
            
            heregex : [{
                token : "string.regex",
                regex : '.*?///[imgy]{0,4}',
                next : "start"
            }, {
                token : "comment.regex",
                regex : "\\s+(?:#.*)?"
            }, {
                token : "string.regex",
                merge : true,
                regex : "\\S+"
            }],
            
            comment : [{
                token : "comment",
                regex : '.*?###',
                next : "start"
            }, {
                token : "comment",
                merge : true,
                regex : ".+"
            }]
        };
    }