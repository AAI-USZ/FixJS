function(question) {
    var variable = /\?[a-zA-Z_0-9-]+/g;

    var html = "";
    if(question.yesnoquestion) {
        html = question.question + PM.get_question_widget(question, 0);
    } else {
        var index = -1;
        html = question.question.replace(variable,
                                         function() {
                                             index++;
                                             console.log('get_question_html ' + index);
                                             return PM.get_question_widget(question, index);
                                         });
        
    }
    
    if(_.isNil(IMPACT.rootpath)) {
        html = '<div class="question">{0}&nbsp;&nbsp;<img style="vertical-align: middle;" width="18" height="18" class="minus" src="images/minus.png">&nbsp;&nbsp;</img><img style="vertical-align: middle;" width="18" height="18" class="plus" src="images/plus.png"></img></div>'.format(html);
    } else {
        html = '<div class="question">{0}&nbsp;&nbsp;<img style="vertical-align: middle;" width="18" height="18" class="minus" src="{1}/images/minus.png">&nbsp;&nbsp;</img><img style="vertical-align: middle;" width="18" height="18" class="plus" src="{1}/images/plus.png"></img></div>'.format(html, IMPACT.rootpath);
    }
    
    
    return html;
}