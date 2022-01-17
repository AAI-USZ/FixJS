function( nodeCoverage ) {
        this.nodeCoverage = nodeCoverage;
        this.coverageByFile = {};
        this.conditionsByLine = {};
        var self = this;

        var tokenRegx = /\d*_/;
        var lineNumberForToken = function( token ) {
            var x = tokenRegx.exec( token );
            return parseInt( x, 0 );
        };

        var lineCoverageForFile = function( fileName ) {
            var coveredLines = 0;
            var lines = nodeCoverage.lines[fileName];
            var lineNumbers = [];
            var lineCoverages = {};
            var firstLine = 1000000000;
            var lastLine = -1;
            var runLines = nodeCoverage.runLines[fileName];
            $.each( lines, function( j, token ) {
                var lnum = lineNumberForToken( token );
                lineNumbers.push( lnum );
                lineCoverages[lnum] = { covered:false };
                if ( runLines[token] > 0 ) {
                    ++coveredLines;
                    lineCoverages[lnum].covered = true;
                }
                else {
                    firstLine = Math.min( lnum, firstLine );
                    lastLine = Math.max( lnum, lastLine );
                }
            } );
            if ( firstLine > lastLine ) {
                firstLine = lastLine = undefined;
            }
            var result = new CoverageSummary( lines.length, lines.length - coveredLines,
                                              firstLine, lastLine );
            result.lineNumbers = lineNumbers;
            result.lineCoverages = lineCoverages;
            return result;
        };

        var coverageForFile = function( fileName ) {
            var firstLine = 1000000000;
            var lastLine = -1;          
            var unlines = { };
            var lineCoverage = lineCoverageForFile( fileName );
            var branchCoverage = new CoverageSummary();
            var elementCoverage = new CoverageSummary();
            var allConds = nodeCoverage.allConditions[ fileName ];
            var conditionCoverage = {};
            $.each( allConds, function( i, token ) {
                var ln = lineNumberForToken( token );
                var cov = { name:token };
                conditionCoverage[token] = cov;
                var conds = lineCoverage.lineCoverages[ ln ];
                if ( conds ) {
                    conds.conditions = conds.conditions || [];
                    conds.conditions.push( cov );
                }
                else {
                    unlines[ln] = unlines[ln] || [];
                    unlines[ln].push( cov );
                }
            } );
            $.each( nodeCoverage.conditions[fileName], function( x, pair ) {
                var condToken = pair[0];
                var side = pair[1] ? "t" : "f";
                var cc = conditionCoverage[condToken];
                if ( cc ) {
                    cc[side] = true;
                }
            } ); 
            var analyzeConditionCoverageEntry = function( ln, cov ) {
                elementCoverage.count += 2;
                branchCoverage.count += 2;
                if ( ! cov.t ) {
                    ++elementCoverage.missed;
                    ++branchCoverage.missed;
                    firstLine = Math.min( firstLine, ln );
                    lastLine = Math.max( lastLine, ln );
                }
                if ( ! cov.f ) {
                    ++elementCoverage.missed;
                    ++branchCoverage.missed;
                    firstLine = Math.min( firstLine, ln );
                    lastLine = Math.max( lastLine, ln );
                }

            };
            $.each( lineCoverage.lineCoverages, function( ln, cov ) {
                var lnum = parseInt( ln, 0 );
                if ( cov.conditions ) { // multibranch line
                    $.each( cov.conditions, 
                            function( j, x ) {
                                analyzeConditionCoverageEntry( lnum, x);
                            } );
                }               
                else { // simple line
                    ++elementCoverage.count;
                    if ( ! cov.covered ) {
                        ++elementCoverage.missed;
                        firstLine = Math.min( firstLine, lnum );
                        lastLine = Math.max( lastLine, lnum );
                    }
                }
            } );
             
            if ( firstLine > lastLine ) {
                firstLine = lastLine = undefined;
            }

            elementCoverage.firstLine = firstLine;
            elementCoverage.lastLine = lastLine;
            $.each( unlines, analyzeConditionCoverageEntry );
            elementCoverage.computeRate();
            branchCoverage.computeRate();
            return {
                line : lineCoverage,
                element : elementCoverage,
                branch : branchCoverage,
                unlines : unlines
            };
        };

        $.each( nodeCoverage.lines, function( fileName, lineTokens ) {
            self.coverageByFile[fileName] = coverageForFile( fileName );
        } );

    }