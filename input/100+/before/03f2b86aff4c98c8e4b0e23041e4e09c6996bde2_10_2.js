function (songs, currentSong) {

            _songList.empty();



            //I create the entries as <a> to leverage Google Chrome's context menus. 

            //One of the filter options is 'by link' which allows right click -> song options.

            for (var i = 0; i < songs.length; i++){

                var listItem = $('<li/>').appendTo(_songList);



                var link = $('<a/>', {

                    id: songs[i].id,

                    href: '#' + songs[i].id,

                    text: songs[i].name

                }).appendTo(listItem);



                var removeIcon = $('<div/>', {

                    class: "remove",

                    title: "Remove " + songs[i].name,

                    songid: songs[i].id

                }).appendTo(listItem);



                //jQuery does not support appending paths to SVG elements. You MUST declare element inside of svg's HTML mark-up.

                removeIcon.append('<svg><path d="M0,2 L2,0 L12,10 L10,12z"/> <path d="M12,2 L10,0 L0,10 L2,12z"/></svg>');



                var copyIcon = $('<div/>', {

                    class: "copy",

                    title: "Copy " + songs[i].url,

                    songurl: songs[i].url

                }).appendTo(listItem);



                //jQuery does not support appending paths to SVG elements. You MUST declare element inside of svg's HTML mark-up.

                copyIcon.append('<svg><rect x="4.625" y="0" width="2.75" height="12"/><rect x="0" y="4.625" width="12" height="2.75"/></svg>');

            }



            //Add 'delete' to the 'X'

            _songList.find('li .remove').click(function(){

                Player.removeSongById($(this).attr('songid'));

                return false;

            })



            //Add 'copy' to the '+'

            _songList.find('li .copy').click(function(){

                chrome.extension.sendRequest({ text: $(this).attr('songurl') });

                return false;

            })

                

            //Removes the old 'current' marking and move it to the newly selected row.

            var selectRow = function(id){

                _songList.find('li').removeClass('current');

                $('#' + id).parent().addClass('current');

            }



            //Load and start playing a song if it is clicked.

            _songList.children().click( function(){

                var clickedSongId = $(this).children()[0].id;

                Player.loadSongById(clickedSongId);

            })



            //Since we emptied our list we lost the selection, reselect.

            if (currentSong)

                selectRow(currentSong.id)

        }