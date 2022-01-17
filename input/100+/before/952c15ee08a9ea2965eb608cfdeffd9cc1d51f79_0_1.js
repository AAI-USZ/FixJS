function() {
    var activated = $(this);
    var action = activated.attr("data-onsubmit");
    switch(action) {
      case "add-question":
        var text = $("#new-question-textarea").val();
        var data = {link: "#",
                    text: text};
        var html = $(Mustache.to_html(new_question_template, data));

        $("#questions-list").append(html).listview('refresh');
        break;
      case "save-questions":
        // alert(
        var questions_array=[]
        var questions = $("#questions-list li a").toArray();
        for (var i = questions.length - 1; i >= 0; i--) {
          questions_array.push(questions[i].innerHTML);
        };

        $.ajax({
          type: 'POST',
          url: "localhost:8000",
          data: array,
          success: null,
          dataType: "jsonp"
        });
        break;
    }
  }