function (i, e) {

                    

                    // Issue #68 - ignore invalid data in areas array

                    

                    if (!e || !e.key) { 

                        return;

                    }



                    index = u.indexOfProp(map_areas, "key", e.key);

                    if (index >= 0) {

                        $.extend(map_areas[index], e);

                    }

                    else {

                        map_areas.push(e);

                    }

                    ar = map_data.getDataForKey(e.key);

                    if (ar) {

                        $.extend(ar.options, e);

                    }

                }