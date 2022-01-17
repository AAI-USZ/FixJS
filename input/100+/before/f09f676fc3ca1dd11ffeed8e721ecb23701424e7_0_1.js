function(i) {
        var $answer = $(this);
        $answer.show();
        var data = $answer.getFormData();
        data.blank_id = $answer.find(".blank_id").text();
        data.answer_text = $answer.find("input[name='answer_text']:visible").val();
        data.answer_html = $answer.find(".answer_html").html();
        data.answer_misconception_id = $answer.find("select option:selected").val()
        if (questionData.question_type == "true_false_question") {
          data.answer_text = (i == 0) ? I18n.t('true', "True") : I18n.t('false', "False");
        }
        if ($answer.hasClass('correct_answer')) {
          data.answer_weight = 100;
        } else {
          data.answer_weight = 0;
        }
        if (only_add_for_blank_ids && data.blank_id && !blank_ids_hash[data.blank_id]) {
          return;
        }
        question.answers.push(data);
      }