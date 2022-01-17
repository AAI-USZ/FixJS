function(e) {
                    if(e.which===13) { // on enter
                        // add row
                        edit.blur();
                        if (graph_lines[edit.val()] == null) {
                        var new_row = $('<tr class="g_metricrow"><td><a href=#><span class="g_metricname">'+edit.val()+'</span></a></td><td><a href=#><span class="g_yaxis">one</span></a></td><td class="g_killrow"><img src="../content/img/delete.gif"></td></tr>');
                            setup_row(new_row);
                            wrap.find(id('newmetricrow', graph)).before(new_row);
                            update_metric_row(new_row);
                            // clear input
                        }
                        edit.val('');
                    }
                }