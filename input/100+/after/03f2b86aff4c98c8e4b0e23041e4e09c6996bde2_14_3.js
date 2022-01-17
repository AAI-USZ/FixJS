function(){

        //Retrieves all currently open tabs, gets each of their URLs, and looks for a song id.

        //If a song id is found and it is playable -- add it. If it is restricted, add to a list to prompt the user

        //to search for similar videos.

        var addSongsFromOpenTabs = function(){

            chrome.tabs.query({}, function(tabs){

                var tabsProcessed = 0;

                var restrictedSongs = [];

                $(tabs).each(function(){

                    var songId = YTHelper.parseUrl(this.url); 



                    if (songId) {

                        var playable = YTHelper.isPlayable(songId, function (isPlayable) {

                            if (!isPlayable) {

                                var songAfterCreated = function(){

                                    tabsProcessed++;

                                    restrictedSongs.push(song);



                                    //Notify user that all songs in restrictedSongs were unable to be played and prompt for action.

                                    //TODO: Don't repeat code just because there is a callback function.

                                    if(tabsProcessed === tabs.length){

                                        showRestrictedSongDialog(restrictedSongs);

                                    }

                                };



                                var song = new Song(songId, songAfterCreated);

                            }

                            else {

                                tabsProcessed++;

                                Player.addSongById(songId);

                                songListHeader.flashMessage('Thanks!', 2000);

                            }

                        });

                    }

                    else{

                        tabsProcessed++;

                    }



                    if(tabsProcessed === tabs.length){

                        showRestrictedSongDialog(restrictedSongs);

                    }



                });

            });

        };



        //Detect mouse downs on the button and start a timer event. If the user leaves the button

        //before the timer event finishes -- cancel it, otherwise run it.

        var timeoutId = 0;

        var clickEvent = null;

        addInput.mousedown(function() {

            timeoutId = setTimeout( function(){

                //Remove the click event because the add button should not expand after a successful click-and-hold.

                clickEvent = addButton.click;

                addButton.off('click');

                addSongsFromOpenTabs();

            }, 3000);

        }).bind('mouseup mouseleave', function() {

            clearTimeout(timeoutId);

            addButton.on(clickEvent);

        });

    }