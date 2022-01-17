function(text, ruleset){

        var i       = 0,
            len     = rules.length,
            reporter,
            lines,
            report,
            parser = new parserlib.css.Parser({ starHack: true, ieFilters: true,
                                                underscoreHack: true, strict: false });

        lines = text.replace(/\n\r?/g, "$split$").split('$split$');
        
        if (!ruleset){
            ruleset = {};
            while (i < len){
                ruleset[rules[i++].id] = 1;    //by default, everything is a warning
            }
        }
        
        reporter = new Reporter(lines, ruleset);
        
        ruleset.errors = 2;       //always report parsing errors as errors
        for (i in ruleset){
            if(ruleset.hasOwnProperty(i)){
                if (rules[i]){
                    rules[i].init(parser, reporter);
                }
            }
        }


        //capture most horrible error type
        try {
            parser.parse(text);
        } catch (ex) {
            reporter.error("Fatal error, cannot continue: " + ex.message, ex.line, ex.col, {});
        }

        report = {
            messages    : reporter.messages,
            stats       : reporter.stats
        };
        
        //sort by line numbers, rollups at the bottom
        report.messages.sort(function (a, b){
            if (a.rollup && !b.rollup){
                return 1;
            } else if (!a.rollup && b.rollup){
                return -1;
            } else {
                return a.line - b.line;
            }
        });        
        
        return report;
    }