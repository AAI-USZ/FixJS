function (e, ui) {

            var getIds = function(){

                var songRows = _songList.children();

                var ids = [];

                for( var index = 0; index < songRows.length; index++)

                    ids.push(songRows[index].id);

                return ids;

            }



            Player.sync(getIds());

        }