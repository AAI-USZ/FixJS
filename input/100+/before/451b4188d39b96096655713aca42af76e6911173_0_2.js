function (pos) {
                    var name = 'anno-form-pos',
                        has_senses = pos.value && sense_list && sense_list[pos.value],
                        link = pos.value ? $('<a class="lingwo-korpus-pos-link automodal"></a>') : null,
                        item = {
                            'name': name,
                            'type': 'radio',
                            'label': pos.label,
                            'id': name + '-' + cleanNodeId(pos.value),
                            'value': pos.value,
                            'prefix': '<div class="lingwo-korpus-pos-seperator">',
                            'suffix': '</div>',
                            'checked': pos.checked,
                            'attributes': {'class': 'lingwo-korpus-pos'}
                        },
                        html = buildForm(item);
                    
                    // finish building the link if it's needed
                    if (link) {
                        link.text(Drupal.t(has_senses ? 'Edit' : 'Add'))
                        if (has_senses) {
                            link.attr('href', Drupal.settings.basePath + 'node/' + sense_list[pos.value][0].nid + '/edit');
                        }
                        else {
                            link.attr('href',
                                Drupal.settings.basePath + 'node/add/' + Drupal.settings.lingwo_korpus.entry_type +
                                '?language=' + Drupal.settings.lingwo_korpus.text.language + '&pos=' + pos.value);
                        }
                    }

                    $(html).appendTo(pos_div).append(link);

                    if (pos.value && sense_list && sense_list[pos.value]) {
                        $.each(sense_list[pos.value], function (i, sense) {
                            var label = '<div class="sense-data">'+
                                   ((!sense.difference && !sense.example) ? sense.id : (
                                   (sense.difference ? ('<div><b>'+Drupal.t('Difference')+'</b>: '+sense.difference+'</div>') : '') +
                                   (sense.example    ? ('<div><b>'+Drupal.t('Example')+'</b>: '+sense.example+'</div>') : ''))) +
                                   '</div>',
                                item = {
                                    'name': name,
                                    'type': 'radio',
                                    'label': label,
                                    'id': name + '-' + cleanNodeId(pos.value) + '-' + sense.id,
                                    'value': pos.value + '-' + sense.id,
                                    'attributes': {'class': 'lingwo-korpus-pos-sense'},
                                },
                                html = buildForm(item);

                            $(html).appendTo(pos_div);
                        });
                    }
                }