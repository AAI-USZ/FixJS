function (e, ui) {

            var getIds = function(){

                //TODO: This is a very long, ugly selector..

                var listItems = _songList.children('li');

                var spans = listItems.children('span');

                var songRows = spans.children('a');



                var ids = [];

                for( var index = 0; index < songRows.length; index++)

                    ids.push(songRows[index].id);

                return ids;

            }



            var songIds = getIds();

            Player.sync(songIds);

        }