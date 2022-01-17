function( fileName ) {
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
            computeRate( elementCoverage );
            computeRate( branchCoverage );
            return {
                line : lineCoverage,
                element : elementCoverage,
                branch : branchCoverage,
                unlines : unlines
            };
        }