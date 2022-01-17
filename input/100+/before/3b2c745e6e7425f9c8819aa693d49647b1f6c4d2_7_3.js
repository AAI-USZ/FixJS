function(){

			_playlistList.empty();



			var playlists = Player.getPlaylists();



            //Build up each row.

            $(playlists).each(function(){

                var listItem = $('<li/>', {

                    id: this.id

                }).appendTo(_playlistList);



                var link = $('<a/>', {

                    href: '#' + this.id,

                    text: this.title

                }).appendTo(listItem);



                var removeIcon = $('<div/>', {

                    class: "remove",

                    playlistid: this.id

                }).appendTo(listItem);



                //jQuery does not support appending paths to SVG elements. You MUST declare element inside of svg's HTML mark-up.

                removeIcon.append('<svg><path d="M0,2 L2,0 L12,10 L10,12z"/> <path d="M12,2 L10,0 L0,10 L2,12z"/></svg>');



                if(this.selected)

                    _selectRow(this.id);

            });



            //Add 'delete' to the 'X'

            _playlistList.find('li .remove').click(_removePlaylist);



            //Clicking on a playlist will select that playlist.

            _playlistList.children().click( function(){

                _selectRow(this.id);

            });

		}