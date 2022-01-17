function loadLogStatistics(opts) {
        var tableStr = '';
        var logRequest = null;

        if (! opts.removeVariables) {
            opts.removeVariables = false;
        }
        if (! opts.limitTypes) {
            opts.limitTypes = false;
        }
        
        $('#emptyDialog').html(PMA_messages['strAnalysingLogs'] + 
                                ' <img class="ajaxIcon" src="' + pmaThemeImage + 
                                'ajax_clock_small.gif" alt="">');
        var dlgBtns = {};

        dlgBtns[PMA_messages['strCancelRequest']] = function() {
            if (logRequest != null) {
                logRequest.abort();
            }

            $(this).dialog("close");
        }

        $('#emptyDialog').dialog({
            width: 'auto',
            height: 'auto',
            buttons: dlgBtns
        });


        logRequest = $.get('server_status.php?' + url_query,
            {   ajax_request: true,
                log_data: 1,
                type: opts.src,
                time_start: Math.round(opts.start / 1000),
                time_end: Math.round(opts.end / 1000),
                removeVariables: opts.removeVariables,
                limitTypes: opts.limitTypes
            },
            function(data) { 
                var logData;
                try {
                    logData = $.parseJSON(data);
                } catch(err) {
                    return serverResponseError();
                }
                
                if (logData.rows.length != 0) {
                    runtime.logDataCols = buildLogTable(logData);

                    /* Show some stats in the dialog */
                    $('#emptyDialog').attr('title', PMA_messages['strLoadingLogs']);
                    $('#emptyDialog').html('<p>' + PMA_messages['strLogDataLoaded'] + '</p>');
                    $.each(logData.sum, function(key, value) {
                        key = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                        if (key == 'Total') {
                            key = '<b>' + key + '</b>';
                        }
                        $('#emptyDialog').append(key + ': ' + value + '<br/>');
                    });

                    /* Add filter options if more than a bunch of rows there to filter */
                    if (logData.numRows > 12) {
                        $('div#logTable').prepend(
                            '<fieldset id="logDataFilter">' +
                            '	<legend>' + PMA_messages['strFiltersForLogTable'] + '</legend>' +
                            '	<div class="formelement">' +
                            '		<label for="filterQueryText">' + PMA_messages['strFilterByWordRegexp'] + '</label>' +
                            '		<input name="filterQueryText" type="text" id="filterQueryText" style="vertical-align: baseline;" />' +
                            '	</div>' +
                            ((logData.numRows > 250) ? ' <div class="formelement"><button name="startFilterQueryText" id="startFilterQueryText">' + PMA_messages['strFilter'] + '</button></div>' : '') +
                            '	<div class="formelement">' +
                            '       <input type="checkbox" id="noWHEREData" name="noWHEREData" value="1" /> ' +
                            '       <label for="noWHEREData"> ' + PMA_messages['strIgnoreWhereAndGroup'] + '</label>' +
                            '   </div' +
                            '</fieldset>'
                        );

                        $('div#logTable input#noWHEREData').change(function() {
                            filterQueries(true);
                        });

                        if (logData.numRows > 250) {
                            $('div#logTable button#startFilterQueryText').click(filterQueries);
                        } else {
                            $('div#logTable input#filterQueryText').keyup(filterQueries);
                        }

                    }

                    var dlgBtns = {};
                    dlgBtns[PMA_messages['strJumpToTable']] = function() {
                        $(this).dialog("close");
                        $(document).scrollTop($('div#logTable').offset().top);
                    };
                    
                    $('#emptyDialog').dialog( "option", "buttons", dlgBtns);
                    
                } else {
                    $('#emptyDialog').html('<p>' + PMA_messages['strNoDataFound'] + '</p>');
                    
                    var dlgBtns = {};
                    dlgBtns[PMA_messages['strClose']] = function() { 
                        $(this).dialog("close"); 
                    };
                    
                    $('#emptyDialog').dialog( "option", "buttons", dlgBtns );
                }
            }
        );

        /* Handles the actions performed when the user uses any of the log table filters 
         * which are the filter by name and grouping with ignoring data in WHERE clauses
         * 
         * @param boolean Should be true when the users enabled or disabled to group queries ignoring data in WHERE clauses
        */
        function filterQueries(varFilterChange) {
            var odd_row = false, cell, textFilter;
            var val = $('div#logTable input#filterQueryText').val();

            if (val.length == 0) {
                textFilter = null;
            } else {
                textFilter = new RegExp(val, 'i');
            }
            
            var rowSum = 0, totalSum = 0, i = 0, q;
            var noVars = $('div#logTable input#noWHEREData').attr('checked');
            var equalsFilter = /([^=]+)=(\d+|((\'|"|).*?[^\\])\4((\s+)|$))/gi;
            var functionFilter = /([a-z0-9_]+)\(.+?\)/gi;
            var filteredQueries = {}, filteredQueriesLines = {};
            var hide = false, rowData;
            var queryColumnName = runtime.logDataCols[runtime.logDataCols.length - 2];
            var sumColumnName = runtime.logDataCols[runtime.logDataCols.length - 1];
            var isSlowLog = opts.src == 'slow';
            var columnSums = {};
            
            // For the slow log we have to count many columns (query_time, lock_time, rows_examined, rows_sent, etc.)
            var countRow = function(query, row) {
                var cells = row.match(/<td>(.*?)<\/td>/gi);
                if (!columnSums[query]) {
                    columnSums[query] = [0, 0, 0, 0];
                }

                // lock_time and query_time and displayed in timespan format
                columnSums[query][0] += timeToSec(cells[2].replace(/(<td>|<\/td>)/gi, ''));
                columnSums[query][1] += timeToSec(cells[3].replace(/(<td>|<\/td>)/gi, ''));
                // rows_examind and rows_sent are just numbers
                columnSums[query][2] += parseInt(cells[4].replace(/(<td>|<\/td>)/gi, ''));
                columnSums[query][3] += parseInt(cells[5].replace(/(<td>|<\/td>)/gi, ''));
            };
            
            // We just assume the sql text is always in the second last column, and that the total count is right of it
            $('div#logTable table tbody tr td:nth-child(' + (runtime.logDataCols.length - 1) + ')').each(function() {
                // If query is a SELECT and user enabled or disabled to group queries ignoring data in where statements, we 
                // need to re-calculate the sums of each row
                if (varFilterChange && $(this).html().match(/^SELECT/i)) {
                    if (noVars) {
                        // Group on => Sum up identical columns, and hide all but 1
                        
                        q = $(this).text().replace(equalsFilter, '$1=...$6').trim();
                        q = q.replace(functionFilter, ' $1(...)');

                        // Js does not specify a limit on property name length, so we can abuse it as index :-)
                        if (filteredQueries[q]) {
                            filteredQueries[q] += parseInt($(this).next().text());
                            totalSum += parseInt($(this).next().text());
                            hide = true;
                        } else {
                            filteredQueries[q] = parseInt($(this).next().text());;
                            filteredQueriesLines[q] = i;
                            $(this).text(q);
                        }
                        if (isSlowLog) {
                            countRow(q, $(this).parent().html());
                        }

                    } else {
                        // Group off: Restore original columns

                        rowData = $(this).parent().data('query');
                        // Restore SQL text
                        $(this).text(rowData[queryColumnName]);
                        // Restore total count
                        $(this).next().text(rowData[sumColumnName]);
                        // Restore slow log columns
                        if (isSlowLog) {
                            $(this).parent().children('td:nth-child(3)').text(rowData['query_time']);
                            $(this).parent().children('td:nth-child(4)').text(rowData['lock_time']);
                            $(this).parent().children('td:nth-child(5)').text(rowData['rows_sent']);
                            $(this).parent().children('td:nth-child(6)').text(rowData['rows_examined']);
                        }
                    }
                }

                // If not required to be hidden, do we need to hide because of a not matching text filter?
                if (! hide && (textFilter != null && ! textFilter.exec($(this).text()))) {
                    hide = true;
                }

                // Now display or hide this column
                if (hide) {
                    $(this).parent().css('display', 'none');
                } else {
                    totalSum += parseInt($(this).next().text());
                    rowSum++;

                    odd_row = ! odd_row;
                    $(this).parent().css('display', '');
                    if (odd_row) {
                        $(this).parent().addClass('odd');
                        $(this).parent().removeClass('even');
                    } else {
                        $(this).parent().addClass('even');
                        $(this).parent().removeClass('odd');
                    }
                }

                hide = false;
                i++;
            });
                       
            // We finished summarizing counts => Update count values of all grouped entries
            if (varFilterChange) {
                if (noVars) {
                    var numCol, row, $table = $('div#logTable table tbody');
                    $.each(filteredQueriesLines, function(key, value) {
                        if (filteredQueries[key] <= 1) {
                            return;
                        }
                        
                        row =  $table.children('tr:nth-child(' + (value + 1) + ')');
                        numCol = row.children(':nth-child(' + (runtime.logDataCols.length) + ')');
                        numCol.text(filteredQueries[key]);
                        
                        if (isSlowLog) {
                            row.children('td:nth-child(3)').text(secToTime(columnSums[key][0]));
                            row.children('td:nth-child(4)').text(secToTime(columnSums[key][1]));
                            row.children('td:nth-child(5)').text(columnSums[key][2]);
                            row.children('td:nth-child(6)').text(columnSums[key][3]);
                        }
                    });
                }
                
                $('div#logTable table').trigger("update"); 
                setTimeout(function() {                    
                    $('div#logTable table').trigger('sorton', [[[runtime.logDataCols.length - 1, 1]]]);
                }, 0);
            }

            // Display some stats at the bottom of the table
            $('div#logTable table tfoot tr')
                .html('<th colspan="' + (runtime.logDataCols.length - 1) + '">' +
                      PMA_messages['strSumRows'] + ' ' + rowSum + '<span style="float:right">' +
                      PMA_messages['strTotal'] + '</span></th><th align="right">' + totalSum + '</th>');
        }
    }