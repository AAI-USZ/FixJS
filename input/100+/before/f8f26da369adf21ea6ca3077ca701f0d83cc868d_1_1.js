function( coverageSummary ) {
            if ( coverageSummary.count ) {
                coverageSummary.rate = 1.0 - coverageSummary.missed / coverageSummary.count;
            }
            else {
                coverageSummary.rate = 0;
            }
        }