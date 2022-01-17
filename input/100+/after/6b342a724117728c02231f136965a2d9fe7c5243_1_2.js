function(event) {
                    var address = event.address,
                        lat = event.latitude,
                        lng = event.longitude,
                        venue_hash = (Math.round(lat * 10000) / 10000) + ':' + (Math.round(lng * 10000) / 10000),
                        venue = venue_cache[venue_hash];

                    if (!venue) {
                        var content = document.createElement("div");

                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(lat, lng),
                            map: gmap,
                            icon: standardMarkerImage,
                            shadow: shadowMarkerImage
                        });

                        var panel = new InfoBox({
                            content: content,
                            alignBottom: true,
                            pixelOffset: new google.maps.Size(-50, -100),
                            infoBoxClearance: new google.maps.Size(40, 0),
                            closeBoxURL: '/media/img/close.png'
                        });

                        google.maps.event.addListener(panel, 'closeclick', function () {
                            venue.visible = false;
                        });

                        google.maps.event.addListener(panel, 'domready', function () {
                            var box = this.getContent().parentNode,
                                projection = this.getProjection(),
                                location = projection.fromLatLngToContainerPixel(marker.position),
                                targetX = location.x + box.offsetWidth / 2 + (this.pixelOffset_.width||0),
                                targetY = location.y - box.offsetHeight + (this.pixelOffset_.height||0) + (container.offsetHeight / 2)
                                    - $(search.form.parentNode).offset().top - search.form.parentNode.offsetHeight - 40
                                    + container.parentNode.offsetTop,
                                target = projection.fromContainerPixelToLatLng(new google.maps.Point(targetX, targetY));
                            
                            gmap.panTo(target);
                        });

                        venue = {
                            name: null,
                            address: address,
                            events: [],
                            latitude: lat,
                            longitude: lng,
                            marker: marker,
                            panel: panel,
                            visible: false
                        };

                        geocode(address, function(results) {
                            if (results && results.length) {
                                venue.address = results[0].formatted_address;
                                if (venue.visible) {
                                    google.maps.event.trigger(marker, 'click');
                                }
                            }
                        });

                        google.maps.event.addListener(marker, 'click', function() {
                            for (var key in venue_cache) {
                                if (venue_cache.hasOwnProperty(key)) {
                                    venue_cache[key].visible = false;
                                    venue_cache[key].panel.close();
                                }
                            }

                            venue.visible = true;

                            var html = [];

                            if (venue.name) {
                                html.push('<h3>'+venue.name+'</h3>');
                                html.push('<h4>'+venue.address+'</h4>');
                            } else {
                                // Shouldn't happen, as venues *should* have names, but just in case...
                                html.push('<h3>'+venue.address+'</h3>');
                            }

                            html.push('<ol>');

                            for (var i = 0, l = venue.events.length; i < l; ++i) {
                                var event = venue.events[i],
                                    from_ts = '',
                                    from_date = months[event.from.getMonth()] + ' ' + event.from.getDate() + ', ' + event.from.getFullYear(),
                                    from_h = event.from.getHours(),
                                    from_m = event.from.getMinutes(),
                                    from_time = (from_h % 12 === 0 ? 12 : from_h % 12) + ':' + (from_m < 10 ? '0' : '') + from_m + ' ' + (from_h < 12 ? 'AM' : 'PM'),
                                    from = from_date + ' ' + from_time,
                                    to_ts = '',
                                    to_date = months[event.to.getMonth()] + ' ' + event.to.getDate() + ', ' + event.to.getFullYear(),
                                    to_h = event.to.getHours(),
                                    to_m = event.to.getMinutes(),
                                    to_time = (to_h % 12 === 0 ? 12 : to_h % 12) + ':' + (to_m < 10 ? '0' : '') + to_m + ' ' + (to_h < 12 ? 'AM' : 'PM'),
                                    to = from_date === to_date ? to_time : to_date + ' ' + to_time;

                                // console.log(event.from, event.to);

                                html.push('<li' + (event.official ? ' class="official"' : '') + '>');
                                html.push('<a href="' + event.url + '" class="name">' + event.name + '</a>');
                                html.push('<span class="date"><time class="from" datetime="' + from_ts + '">' + from + '</time><span> to </span><time class="to" datetime="' + to_ts + '">' + to + '</time></span>');
                                html.push('<a href="' + event.type.url + '" class="type">' + event.type.name + '</a>');
                                html.push('</li>');
                            }

                            html.push('</ol>');

                            content.innerHTML = html.join('\n');
                            panel.open(gmap,marker);
                        });

                        venue_cache[venue_hash] = venue;
                    }

                    venue.name = venue.name || event.venue;
                    venue.events.push(event);
                    if (event.official) venue.marker.setIcon(officialMarkerImage);
                    venue.marker.setTitle(venue.name + (venue.events.length > 1 ? ' (' + venue.events.length + ')' : '' ));
                }