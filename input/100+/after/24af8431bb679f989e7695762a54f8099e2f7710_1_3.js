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
                    $('#emptyDialog').dialog({title: PMA_messages['strLoadingLogs']});
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
                    $('#emptyDialog').dialog({title: PMA_messages['strNoDataFoundTitle']});
                    $('#emptyDialog').html('<p>' + PMA_messages['strNoDataFound'] + '</p>');
                    
                    var dlgBtns = {};
                    dlgBtns[PMA_messages['strClose']] = function() { 
                        $(this).dialog("close"); 
                    };
                    
                    $('#emptyDialog').dialog( "option", "buttons", dlgBtns );
                }
            }