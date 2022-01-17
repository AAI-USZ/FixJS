function(){

                                    tabsProcessed++;

                                    restrictedSongs.push(song);



                                    //Notify user that all songs in restrictedSongs were unable to be played and prompt for action.

                                    //TODO: Don't repeat code just because there is a callback function.

                                    if(tabsProcessed == tabs.length)

                                        _showRestrictedSongDialog(restrictedSongs);

                                }