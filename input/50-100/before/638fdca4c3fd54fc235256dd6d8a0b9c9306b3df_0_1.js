function (feature) {
                        var place_id = feature.attributes.place_id
                        place_ids.push(place_id)
                        var place = plugin.places[place_id]
                        var place_data = place.data
                        if (place_data.station_name != undefined) {
                            place_names.push(place_data.station_name)
                        }
                        else {
                            place_names.push(
                                '('+place_data.latitude+','+place_data.longitude+')'
                            )
                        }
                    }