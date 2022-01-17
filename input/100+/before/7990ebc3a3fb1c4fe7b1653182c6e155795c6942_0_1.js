function createQuestion(category, point, catQuestion, round) {
        var question = document.createElement('button');
        question.className = "question block";
        question.innerHTML = point;
        question.setAttribute('data-q', catQuestion.q);
        question.setAttribute('data-a', catQuestion.a);
        question.setAttribute('data-b', catQuestion.b);
        question.setAttribute('data-c', catQuestion.c);

        var modalId = category + '-' + point;
        question.id = modalId + '-button';

        $.each(answeredQuestions, function( index, value ) {
            if (question.id === value) {
                question.style.visibility = "hidden";
            }
        });

        question.setAttribute('data-reveal-id', modalId);
        question.setAttribute('data-animation', 'fade');
        question.setAttribute('data-onclose', question.id);
        question.setAttribute('data-round', round);

        var questionModal = document.createElement('div');
        questionModal.className = "reveal-modal";
        questionModal.id = modalId;
        $(questionModal).bind('reveal:close', function() {
            // Fire events
            socket.emit('close', {'q': this.id});
        });
        $(questionModal).bind('reveal:open', function() {
            // Fire events
            socket.emit('open', {'q': this.id});
        });
        questionModal.innerHTML = '<h1>' + catQuestion.q.en + '</h1>'
                                 + '<h1>' + catQuestion.q.fr + '</h1>'
                                 + '<ol type="a" id="' + modalId + '-list">'
                                 + '<li>' + catQuestion.a.en + '<br/>' + catQuestion.a.fr + '</li>'
                                 + '<li>' + catQuestion.b.en + '<br/>' + catQuestion.b.fr + '</li>'
                                 + '<li>' + catQuestion.c.en + '<br/>' + catQuestion.c.fr + '</li>'
                                 + '</ol>';
        return [question, questionModal];
    }