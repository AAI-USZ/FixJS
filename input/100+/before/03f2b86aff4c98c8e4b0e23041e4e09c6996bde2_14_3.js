function(){

            chrome.tabs.query({}, function(tabs){

                var tabsProcessed = 0;

                var restrictedSongs = [];

                $(tabs).each(function(){

                    var songId = YTHelper.parseUrl(this.url); 



                    if (songId) {

                        var playable = YTHelper.isPlayable(songId, function (isPlayable) {

                            if (!isPlayable) {

                                var song = new Song(songId, songAfterCreated);



                                songAfterCreated = function(){

                                    tabsProcessed++;

                                    restrictedSongs.push(song);



                                    //Notify user that all songs in restrictedSongs were unable to be played and prompt for action.

                                    //TODO: Don't repeat code just because there is a callback function.

                                    if(tabsProcessed == tabs.length)

                                        _showRestrictedSongDialog(restrictedSongs);

                                };

                            }

                            else {

                                tabsProcessed++;

                                Player.addSongById(songId);

                                songListHeader.flashMessage('Thanks!', 2000);

                            }

                        });

                    }

                    else

                        tabsProcessed++;



                    if(tabsProcessed == tabs.length)

                        _showRestrictedSongDialog(restrictedSongs);

                });

            });

        }