function() {
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
                        }