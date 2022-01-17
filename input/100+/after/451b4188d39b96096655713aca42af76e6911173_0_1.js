function (pos_list) {
                    if (headword) {
                        // if we already started a look up and not we're doing another one, 
                        // cancel the first!
                        if (Annotator._senseRequest) {
                            Annotator._senseRequest.abort();
                        }
                        Annotator._senseRequest = $.getJSON('/lingwo_korpus/lookup_senses', {
                            'language': Drupal.settings.lingwo_korpus.text.language,
                            'headword': headword,
                        }, function (res) {
                            Annotator._buildPosInternal(pos_list, res.senses, current_pos, current_sense, animate);
                            // clear the sense request, to indicate that the control is ready!
                            Annotator._senseRequest = null;
                        });
                    }
                    else {
                        Annotator._buildPosInternal(pos_list, null, current_pos, current_sense, animate);
                    }
                }