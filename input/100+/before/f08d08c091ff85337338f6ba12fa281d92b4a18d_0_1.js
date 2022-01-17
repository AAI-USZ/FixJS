function() {
                
                var nextYear = Number(year) + 1;
                rolloverResponses = rolloverResponses.sort(
                    function(a, b) {
                        if(a.code() > b.code())
                            return 1;
                        return -1;
                    }
                )

                dojo.byId('acq-fund-list-rollover-summary-header').innerHTML = 
                    dojo.string.substitute(
                        localeStrings.FUND_LIST_ROLLOVER_SUMMARY,
                        [nextYear]
                    );

                dojo.byId('acq-fund-list-rollover-summary-funds').innerHTML = 
                    dojo.string.substitute(
                        localeStrings.FUND_LIST_ROLLOVER_SUMMARY_FUNDS,
                        [nextYear, count]
                    );

                dojo.byId('acq-fund-list-rollover-summary-rollover-amount').innerHTML = 
                    dojo.string.substitute(
                        localeStrings.FUND_LIST_ROLLOVER_SUMMARY_ROLLOVER_AMOUNT,
                        [nextYear, amount_rolled]
                    );

                if(!dryRun) {
                    openils.Util.hide('acq-fund-list-rollover-summary-dry-run');
                    
                    // add the new year to the year selector if it's not already there
                    fundFilterYearSelect.store.fetch({
                        query : {year : nextYear}, 
                        onComplete:
                            function(list) {
                                if(list && list.length > 0) return;
                                fundFilterYearSelect.store.newItem({year : nextYear});
                            }
                    });
                }

                openils.Util.show('acq-fund-list-rollover-summary');
                progressDialog.hide();
                gridDataLoader();
            }