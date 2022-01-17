function (evt) {
                var other = map.getLayersByName('Others Layer')[0];
                if ($(this).attr('checked') === 'checked') {
                    if (others_feature_collected === false) {
                        gnt.geo.get_features('@others',
                                             data_group,
                                             '',
                            {
                                'success': function (data) {
                                    if (data.features) {
                                        var gf = new OpenLayers.Format.GeoJSON(),
                                            user,
                                            comment;
                                        for (var i = 0; i < data.features.length; i++) {
                                            var feature = gf.parseFeature(data.features[i]);
                                            //add values losed in parsing should be added again
                                            feature['private'] = data.features[i]['private'];
                                            feature.lonlat = gnt.questionnaire.get_popup_lonlat(feature.geometry);
                                            other.addFeatures(feature);
                                            comment = feature.attributes.form_values[0]['value'];
                                            user = feature.attributes.user;
                                            // set the right content
                                            var anonymous_regexp = new RegExp('T[0-9]+.[0-9]+R[0-9]+.[0-9]+');
                                            if (!anonymous_regexp.test(user)) {
                                                $('#other .username').text(user);
                                            }
                                            $('#other .comment').text(comment);
                                            //get the content
                                            var popupcontent = $('#other').html();
                                            feature.popupClass = OpenLayers.Popup.FramedCloud;
                                            feature.popup = new OpenLayers.Popup.FramedCloud(
                                                feature.id,
                                                feature.lonlat,
                                                null,
                                                popupcontent,
                                                null,
                                                false
                                            );
                                        }
                                    }
                                }
                            });
                        others_feature_collected = true;
                        other.setVisibility(true);
                        featureFilter(event);
                    } else if (others_feature_collected === true) {
                        other.setVisibility(true);
                        featureFilter(event);
                    }
                } else {
                    other.setVisibility(false);
                    featureFilter(event);
                }            
            }