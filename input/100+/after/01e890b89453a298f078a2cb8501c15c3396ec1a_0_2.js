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