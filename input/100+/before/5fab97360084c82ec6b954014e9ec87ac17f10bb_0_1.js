function (i, index) {
                        if (index.name === '#') {
                            indexname = '0-9';
                        } else {
                            indexname = index.name;
                        }
                        $('<li class=\"index\" id=\"index_' + indexname + '\" title=\"Scroll to Top\">' + indexname + '<span class=\"floatright\">&uarr;</span></li>').appendTo("#ArtistContainer");
                        indexlist += '<li><a href=\"#\">' + indexname + '</a></li>';
                        var artists = [];
                        if (index.artist.length > 0) {
                            artists = index.artist;
                        } else {
                            artists[0] = index.artist;
                        }
                        $.each(artists, function (i, artist) {
                            if (artist.name !== undefined) {
                                var html = "";
                                html += '<li id=\"' + artist.id + '\" class=\"item\">';
                                html += '<span>' + artist.name + '</span>';
                                html += '</li>';
                                $(html).appendTo("#ArtistContainer");
                            }
                        });
                    }