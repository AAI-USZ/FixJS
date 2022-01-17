function (i, e) {

                    if (this) {

                        index = u.indexOfProp(map_areas, "key", this.key);

                        if (index >= 0) {

                            $.extend(map_areas[index], this);

                        }

                        else {

                            map_areas.push(this);

                        }

                        ar = map_data.getDataForKey(this.key);

                        if (ar) {

                            $.extend(ar.options, this);

                        }

                    }

                }