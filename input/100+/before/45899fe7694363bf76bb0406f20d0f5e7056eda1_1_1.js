function() {
        var control = MB.Control.URLCleanup();
        var tests = [
                [
                    'artist', 'http://en.wikipedia.org/wiki/Source_Direct_%28band%29',
                    MB.constants.LINK_TYPES.wikipedia.artist
                ],
                [
                    'release_group', 'http://en.wikipedia.org/wiki/Exorcise_the_Demons',
                    MB.constants.LINK_TYPES.wikipedia.release_group
                ],
                [
                    'label', 'http://en.wikipedia.org/wiki/Astralwerks',
                    MB.constants.LINK_TYPES.wikipedia.label
                ],

                [
                    'artist', 'http://www.discogs.com/artist/Source+Direct',
                    MB.constants.LINK_TYPES.discogs.artist
                ],
                [
                    'label', 'http://www.discogs.com/label/Demonic',
                    MB.constants.LINK_TYPES.discogs.label
                ],
                [
                    'release', 'http://www.discogs.com/release/12130',
                    MB.constants.LINK_TYPES.discogs.release
                ],
                [
                    'release_group', 'http://www.discogs.com/Source-Direct-Exorcise-The-Demons/master/126685',
                    MB.constants.LINK_TYPES.discogs.release_group
                ],

                [
                    'artist', 'http://musicmoz.org/Bands_and_Artists/S/Soundgarden/',
                    MB.constants.LINK_TYPES.otherdatabases.artist
                ],
                [
                    'release', 'http://musicmoz.org/Bands_and_Artists/S/Soundgarden/Discography/Superunknown/',
                    MB.constants.LINK_TYPES.otherdatabases.release
                ],

                [
                    'artist', 'http://www.imdb.com/name/nm1539156/',
                    MB.constants.LINK_TYPES.imdb.artist
                ],
                [
                    'release_group', 'http://www.imdb.com/title/tt0421082/',
                    MB.constants.LINK_TYPES.imdb.release_group
                ],

                [
                    'artist', 'http://www.myspace.com/instramentaluk',
                    MB.constants.LINK_TYPES.myspace.artist
                ],
                [
                    'label', 'http://www.myspace.com/hospitalrecords',
                    MB.constants.LINK_TYPES.myspace.label
                ],

                [
                    'artist', 'http://www.purevolume.com/withbloodcomescleansing',
                    MB.constants.LINK_TYPES.purevolume.artist
                ],

                [
                    'release', 'http://www.amazon.co.uk/gp/product/B00005JIWP',
                    MB.constants.LINK_TYPES.amazon.release
                ],

                [
                    'release', 'http://www.archive.org/download/JudasHalo/cover.jpg',
                    MB.constants.LINK_TYPES.coverart.release
                ],

                [
                    'release', 'http://www.jamendo.com/album/16090',
                    MB.constants.LINK_TYPES.downloadfree.release
                ],

                [
                    'release', 'http://www.mange-disque.tv/fs/md_429.jpg',
                    MB.constants.LINK_TYPES.coverart.release
                ],

                [
                    'release', 'http://lyrics.wikia.com/Van_Canto:Hero_(2008)',
                    MB.constants.LINK_TYPES.lyrics.release
                ],
                [
                    'recording', 'https://embed.spotify.com/?uri=spotify:track:7gwRSZ0EmGWa697ZrE58GA',
                    MB.constants.LINK_TYPES.streamingmusic.recording
                ],
                [
                    'recording', 'http://lyrics.wikia.com/Van_Canto:Hero_(2008)',
                    MB.constants.LINK_TYPES.lyrics.release
                ],

                [
                    'recording', 'http://vimeo.com/1109226',
                    MB.constants.LINK_TYPES.streamingmusic.recording
                ],

                [
                    'recording', 'http://www.youtube.com/watch?v=UmHdefsaL6I',
                    MB.constants.LINK_TYPES.streamingmusic.recording
                ],

                [
                    'artist', 'http://youtube.com/user/officialpsy/videos',
                    MB.constants.LINK_TYPES.youtube.artist
                ],

                [
                    'label', 'http://youtube.com/user/officialpsy/videos',
                    MB.constants.LINK_TYPES.youtube.label
                ],

                [
                    'artist', 'http://www.allmusic.com/artist/the-beatles-mn0000754032/credits',
                    MB.constants.LINK_TYPES.allmusic.artist
                ],
                [
                    'release_group', 'http://www.allmusic.com/album/here-comes-the-sun-mw0002303439/releases',
                    MB.constants.LINK_TYPES.allmusic.release_group
                ],
                [
                    'work', 'http://www.allmusic.com/song/help!-mt0043064796',
                    MB.constants.LINK_TYPES.allmusic.work
                ],
                [
                    'work', 'http://www.allmusic.com/composition/le-nozze-di-figaro-the-marriage-of-figaro-opera-k-492-mc0002367338',
                    MB.constants.LINK_TYPES.allmusic.work
                ],
                [
                    'recording', 'http://www.allmusic.com/performance/le-nozze-di-figaro-the-marriage-of-figaro-opera-k-492-mq0000061129/credits',
                    MB.constants.LINK_TYPES.allmusic.recording
                ]

            ];

        $.each(tests, function(i, test) {
            QUnit.equals(control.guessType(test[0], test[1]), test[2], test[1]);
        });
    }