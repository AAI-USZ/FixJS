function () {
            // Create a 'otherLayer' to collect public feedback from other users and add it to the map.
            //The layer also is added to the existing select feature control 'selectcontrol'
            var otherLayer = new OpenLayers.Layer.Vector("Others Layer", {
                    styleMap: new OpenLayers.StyleMap({
                        'default': {
                            strokeWidth: 3,
                            strokeColor: '#aaaaff',
                            cursor: 'pointer',
                            fillColor: '#aaaaff',
                            fillOpacity: 0.3,
                            pointRadius: 5
                        },
                        'highlight': {
                            strokeWidth: 3,
                            strokeColor: '#555555',
                            cursor: 'pointer',
                            fillColor: '#555555',
                            fillOpacity: 0.3,
                            pointRadius: 5
                        }
                    })
                });
            otherLayer.setVisibility(false);
            map.addLayer(otherLayer);
            map.events.register("moveend", null, featureFilter);
            var all_layers = map.layers,
                //new_select_control,
                others_feature_collected = false;
            //new_select_control = map.getControl('selectcontrol');
            //new_select_control.setLayer((new_select_control.layers).concat(otherLayer));
            
            //This function collects all the onscreen features currently visible
            function featureFilter(event) {
                var onscreen_features = [];
                function getOnScreenFeatures(layer_features) {
                    for (var i = 0; i < layer_features.length; i++) {
                        var feature = layer_features[i];
                        if (feature.getVisibility() === true && feature.onScreen() === true) {
                            onscreen_features.push(feature);
                        }
                    }
                }
                //var vector_layers = map.getLayersByName(('Others Layer'|'Route Layers'|green));
                var layer = map.getLayersByName('Route Layer')[0],
                    layer_features = layer.features;
                getOnScreenFeatures(layer_features);
                layer = map.getLayersByName('Area Layer')[0];
                layer_features = layer.features;
                getOnScreenFeatures(layer_features);
                layer = map.getLayersByName('Point Layer')[0];
                layer_features = layer.features;
                getOnScreenFeatures(layer_features);
                layer = map.getLayersByName('Others Layer')[0];
                layer_features = layer.features;
                getOnScreenFeatures(layer_features);
            }
            //This function will get the feedback (features and properties) of the other users when he checks 
            //the checkbox to display 'others' feedback
            $('form.feedback input:checkbox').change(function (evt) {
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
            });
        // set on hover hightlight on others layer
        if($('html').hasClass('no-touch')) {
            var highlightCtrl = new OpenLayers.Control.SelectFeature(
                map.getLayersByName('Others Layer')[0], {
                    hover: true,
                    highlightOnly: true,
                    renderIntent: 'highlight',
                    eventListeners: {
                        featurehighlighted: function (e) {
                            for(i = 0; i < e.feature.attributes.form_values.length; i++) {
                                if(e.feature.attributes.form_values[i].name === 'comment') {
                                    var show_list_item = $('ul.feature_comments li.' + e.feature.id);
                                    if(show_list_item.length === 0) {
                                        var username = e.feature.attributes.user;
                                        var anonymous_regexp = new RegExp('T[0-9]+.[0-9]+R[0-9]+.[0-9]+');
                                        if (anonymous_regexp.test(username)) {
                                            username = '';
                                        }
                                        $('ul.feature_comments').prepend('<li class="' +
                                                                     e.feature.id +
                                                                     '">' +
                                                                     e.feature.attributes.form_values[i].value +
                                                                     '<br />' +
                                                                     username +
                                                                     ' ' +
                                                                     $.datepicker.parseDate('yy-mm-dd', e.feature.attributes.time.create_time.split('T')[0]).toDateString() +
                                                                     '</li>');
                                        show_list_item = $('ul.feature_comments li.' + e.feature.id);
                                    }
                                    if(!show_list_item.hasClass('highlight')) {
                                        show_list_item.addClass('highlight');
                                    }
                                    show_list_item.stop(true, true);
                                    show_list_item.fadeIn(750);
                                }
                            }
                        },
                        featureunhighlighted: function(e) {
                            var hide_list_item = $('ul.feature_comments li.' + e.feature.id);
                            if(hide_list_item.hasClass('highlight')) {
                                hide_list_item.removeClass('highlight');
                            }
                            hide_list_item.stop(true, true);
                            hide_list_item.delay(2000).fadeOut(750);
                        }
                    }
                });
            map.addControl(highlightCtrl);
            highlightCtrl.activate();
        }
    }