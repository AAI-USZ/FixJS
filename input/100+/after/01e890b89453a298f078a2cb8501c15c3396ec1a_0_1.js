function TypewriterController() {

    var typewriter = new Typewriter();



    this._init = function() {

        this._initStatusbar();

        this.displayNextCharacter();

    }



    this._initStatusbar = function() {

        for( var i=0; i<typewriter.getCharacters().length; i++ ) {

            var char = typewriter.getCharacters().charAt(i);

            var entry = '';

            entry += '<tr id="status_' + char + '">';

            entry += '</tr>';

            $("#statusbar_table").append(entry);

            this._updateStatus(char);

        }

    }



    this._updateStatus = function(char) {

        var charStatus = typewriter.getStatus([char]);

        $("#status_" + char).empty()

        var status = '';

        status += '<th class="char">' + char + '</th>';

        status += '<td class="rate">' + charStatus.hitRate().toFixed(2) + '%</td>';

        status += '<td class="count">' + charStatus.overall + ' Tries</td>';

        status += '<td class="time">' + charStatus.averageTime().toFixed(0) + ' ms</td>';

        $("#status_" + char).append(status);

    }



    this.processKey = function (key) {

        var correctInput = typewriter.verifyInput(key);

        this._setCssClass(correctInput);

        this._updateStatus(typewriter.currentChar());

    };



    this._setCssClass = function(correctInput) {

        $("#currentChar").removeClass();

        if (correctInput) {

            $("#currentChar").addClass("correct");

        } else {

            $("#currentChar").addClass("wrong");

        }

    }



    this.displayNextCharacter = function() {

        $("#currentChar").text(typewriter.nextCharacter());

    }



    this._init();

}