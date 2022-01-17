function Typewriter() {

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var currentChar = null;

    var results = {};

    var startTime = null;

    var stopTime = null;



    function init() {

        for( var i=0; i<characters.length; i++ ) {

            results[characters.charAt(i)] = {

                correct: 0,

                wrong: 0,

                overall: 0,

                minimumTime: undefined,

                maximumTime: undefined,

                overallTime: 0,



                correctKeystroke: function(millis) {

                    this.correct++;

                    this.keystroke(millis);

                },



                wrongKeystroke: function(millis) {

                    this.wrong++;

                    this.keystroke(millis);

                },



                keystroke: function(millis) {

                    this.overall++;

                    this.overallTime += millis;



                    if ( this.minimumTime == null || millis < this.minimumTime ) {

                        this.minimumTime = millis;

                    }



                    if ( this.maximumTime == null || millis > this.maximumTime ) {

                        this.maximumTime = millis;

                    }

                },



                hitRate: function() {

                    if (this.overall == 0)

                        return 0;

                    return Math.round(this.correct / this.overall * 100);

                },



                averageTime: function() {

                    if (this.overall == 0)

                        return 0;

                    return this.overallTime / this.overall;

                }

            }

        }

    }



    this.currentChar = function() {

        return currentChar;

    };



    this.nextCharacter = function() {

        currentChar = randomCharacter.call(this);

        this.startTimer();

        return currentChar;

    }



    function randomCharacter() {

        return characters.charAt(Math.floor(Math.random() * characters.length));

    }



    this.verifyInput = function(inputKey) {

        this.stopTimer();

        if ( inputKey == currentChar ) {

            this.trackCorrect(currentChar);

            return true;

        } else {

            this.trackWrong(currentChar);

            return false;

        }

    }



    this.trackCorrect = function(char) {

        results[char].correctKeystroke(millis.call(this));

    }



    this.trackWrong = function(char) {

        results[char].wrongKeystroke(millis.call(this));

    }



    this.getStatus = function(char) {

        return results[char];

    }



    this.startTimer = function() {

        startTime = new Date().getTime();

        stopTime = null;

    }



    this.stopTimer = function() {

        stopTime = new Date().getTime();

    }



    function millis() {

        return stopTime - startTime;

    }



    this.getCharacters = function() {

        return characters;

    }



    init.call(this);

}