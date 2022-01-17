function(e) {
                    if(e.which===13) { // on enter
                        // add row
                        edit.blur();
                        if (graph_lines[edit.val()] == null) {
                        var new_row = $('<tr class="metricrow"><td><a href=#><span class="metricName">'+edit.val()+'</span></a></td><td><a href=#><span class="yaxis">one</span></a></td><td class="killrow"><img src="../content/img/delete.gif"></td></tr>');
                            setup_row(new_row);
                            graph.find('#newmetricrow').before(new_row);
                            update_metric_row(new_row);
                            // clear input
                        }
                        edit.val('');
                    }
                }