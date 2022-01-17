function() {
            var a = {
                content: ko.observable('Answer '+(this.multiplechoice.answers().length+1))
            };
            var p = this;
            a.remove = function() {
                p.removeAnswer(a);
            }

            for(var i=0;i<this.multiplechoice.choices().length;i++)
            {
                this.multiplechoice.choices()[i].answers.push({
                    marks: ko.observable(0),
                    distractor: ko.observable('')
                });
            }
            this.multiplechoice.answers.push(a);
            return a;
        }