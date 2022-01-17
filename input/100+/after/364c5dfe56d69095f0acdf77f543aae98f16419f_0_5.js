function (i,e) {

                var img, map, usemap, map_data;



                // save ref to this image even if we can't access it yet. commands will be queued

                img = $(e);



                // sorry - your image must have border:0, things are too unpredictable otherwise.

                img.css('border', 0);



                map_data = m.getMapData(e);

                // if already bound completely, do a total rebind

                if (map_data) {

                    me.unbind.apply(img);

                    if (!map_data.complete) {

                        // will be queued

                        img.bind();

                        return true;

                    }

                    map_data = null;

                }



                // ensure it's a valid image

                // jQuery bug with Opera, results in full-url#usemap being returned from jQuery's attr.

                // So use raw getAttribute instead.

                usemap = this.getAttribute('usemap');

                map = usemap && $('map[name="' + usemap.substr(1) + '"]');

                if (!(img.is('img') && usemap && map.size() > 0)) {

                    return true;

                }



                if (!map_data) {

                    map_data = new m.MapData(this, options);



                    map_data.index = addMap(map_data);

                    map_data.map = map;

                    map_data.bindImages(true);

                }

            }