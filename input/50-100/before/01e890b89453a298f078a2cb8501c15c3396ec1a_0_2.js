function() {

        for( var i=0; i<typewriter.getCharacters().length; i++ ) {

            var char = typewriter.getCharacters().charAt(i);

            var entry = '';

            entry += '<tr id="status_' + char + '">';

            entry += '</tr>';

            $("#statusbar_table").append(entry);

            this.updateStatus(char);

        }

    }