function (pos_list) {
                    if (headword) {
                        $.getJSON('/lingwo_korpus/lookup_senses', {
                            'language': Drupal.settings.lingwo_korpus.text.language,
                            'headword': headword,
                        }, function (res) {
                            Annotator._buildPosInternal(pos_list, res.senses, current_pos, current_sense, animate);
                        });
                    }
                    else {
                        Annotator._buildPosInternal(pos_list, null, current_pos, current_sense, animate);
                    }
                }