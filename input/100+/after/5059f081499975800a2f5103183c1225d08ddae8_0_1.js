function (tr) {
                var td           = tr.down('td.cardwall-cell', col_index),
                    restorecolor = td.getStyle('background-color'),
                    effect       = null,
                    swimline_id  = tr.id.split('-')[1],
                    accept       = 'drop-into-' + swimline_id + '-' + col.id.split('-')[1];
                Droppables.add(td, {
                    hoverclass: 'cardwall_board_column_hover',
                    accept: accept,
                    onDrop: function (dragged, dropped, event) {
                        //change the classname of the post it to be accepted by the formers columns
                        dragged.addClassName('drop-into-' + swimline_id + '-' + cols[dragged.up('tr').childElements().indexOf(dragged.up('td'))].id.split('-')[1]);
                        dragged.removeClassName(accept);
                        
                        //switch to the new column
                        Element.remove(dragged);
                        td.down('ul').appendChild(dragged);
                        dragged.setStyle({
                            left: 'auto',
                            top: 'auto'
                        });
                        if (effect) {
                            effect.cancel();
                        }
                        effect = new Effect.Highlight(td, {
                            restorecolor: restorecolor
                        });
    
                        //save the new state
                        var parameters = {
                                aid: dragged.id.split('-')[1],
                                func: 'artifact-update'
                            },
                            field_id,
                            value_id = col.id.split('-')[1];
                        if ($('tracker_report_cardwall_settings_column')) {
                             field_id = $F('tracker_report_cardwall_settings_column');
                        } else {
                            field_id = dragged.readAttribute('data-column-field-id');
                            value_id = $F('cardwall_column_mapping_' + value_id + '_' + field_id);
                        }
                        parameters['artifact[' + field_id + ']'] = value_id;
                        var req = new Ajax.Request(codendi.tracker.base_url, {
                            method: 'POST',
                            parameters: parameters,
                            onComplete: function () {
                                //TODO handle errors (perms, workflow, ...)
                                // eg: change color of the post it
                            }
                        });
                    }
                });
            }