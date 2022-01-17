function (i, index) {
                        indexname = index.name;
                        $('<li class=\"index\" id=\"index_' + indexname + '\" title=\"Scroll to Top\"><a name=\"index_' + indexname + '\">' + indexname + '</a><span class=\"floatright\">&uarr;</span></li>').appendTo("#ArtistContainer");
                        indexlist += '<li><a href=\"#' + indexname + '\">' + indexname + '</a></li>';
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