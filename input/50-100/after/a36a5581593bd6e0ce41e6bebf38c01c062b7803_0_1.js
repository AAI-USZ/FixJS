function(){
        var questionPattern = /^Question \d+$/;
        for (var i = 0; i < questionnaireViewModel.questions().length; i++){
            var question = questionnaireViewModel.questions()[i];
            if (questionPattern.test(question.title()) )
                question.title("Question " + (i + 1));
        }
    }