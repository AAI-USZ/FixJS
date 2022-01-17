function Typewriter() {

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var currentChar = null;

    var results = {};

    var startTime = null;

    var stopTime = null;



    function _init() {

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

        currentChar = _randomCharacter.call(this);

        this._startTimer();

        return currentChar;

    }



    function _randomCharacter() {

        return characters.charAt(Math.floor(Math.random() * characters.length));

    }



    this.verifyInput = function(inputKey) {

        this._stopTimer();

        if ( inputKey == currentChar ) {

            this._trackCorrect(currentChar);

            return true;

        } else {

            this._trackWrong(currentChar);

            return false;

        }

    }



    this._trackCorrect = function(char) {

        results[char].correctKeystroke(_millis.call(this));

    }



    this._trackWrong = function(char) {

        results[char].wrongKeystroke(_millis.call(this));

    }



    this.getStatus = function(char) {

        return results[char];

    }



    this._startTimer = function() {

        startTime = new Date().getTime();

        stopTime = null;

    }



    this._stopTimer = function() {

        stopTime = new Date().getTime();

    }



    function _millis() {

        return stopTime - startTime;

    }



    this.getCharacters = function() {

        return characters;

    }



    _init.call(this);

}