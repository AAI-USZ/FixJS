function TypewriterController() {

    var typewriter = new Typewriter();



    this.init = function() {

        this.initStatusbar();

        this.displayNextCharacter();

    }



    this.initStatusbar = function() {

        for( var i=0; i<typewriter.getCharacters().length; i++ ) {

            var char = typewriter.getCharacters().charAt(i);

            var entry = '';

            entry += '<tr id="status_' + char + '">';

            entry += '</tr>';

            $("#statusbar_table").append(entry);

            this.updateStatus(char);

        }

    }



    this.updateStatus = function(char) {

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

        this.setCssClass(correctInput);

        this.updateStatus(typewriter.currentChar());

    };



    this.setCssClass = function(correctInput) {

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



    this.init();

}