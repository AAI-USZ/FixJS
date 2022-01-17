function addToPage(array, flag){
        if(flag){
            var counter = 1;
            for(var i in array){

                var qstDiv = $("<div class='qstDivDisplay' id='" + array[i].id + "qstDivDisplay'>");        
                var spanOptConn = $("<div class='spanOptConn'>").appendTo(qstDiv);             
                var qstNumber = $("<span class='qstNumber'>" + sankoreLang.question + " " + counter + "</span>").appendTo(spanOptConn);        
                var qstContent = $("<div class='qstContentDisplay'>" + array[i].text + "</div>").appendTo(qstDiv);        
                var ansDiv = $("<div class='ansDiv' id='" + array[i].id + "ansDiv'>").appendTo(qstDiv);

                var ansCount = 1;
                var type = array[i].type;
                var selInput = $("<select>");
                if(type == 3){
                    var newAnswer = $("<div class='newAnswer'>"); 
                    newAnswer.appendTo(ansDiv);
                    var selectSpan = $("<span id='answerText'>").appendTo(newAnswer);
                    selInput.appendTo(selectSpan);
                    $("<option value='0'>" + sankoreLang.select_text + "</option>").appendTo(selInput);
                }
                for(var j in array[i].answers){  
                    switch(type){
                        case "1":
                            var local_state = "";
                            var local_color = "";
                            if(begin){
                                local_state = array[i].answers[j].state;
                                local_color = (array[i].answers[j].value == array[i].rightAns)?((array[i].answers[j].was)?"style='background-color: #6c0;'":""):((array[i].answers[j].was)?"style='background-color: red;'":"");
                            }
                            newAnswer = $("<div class='newAnswer'>");
                            var ansInput = $("<input type='radio' name='" + counter + "' value='" + array[i].answers[j].value + "' " + local_state + " style='float: left; margin-right: 10px;'/>").appendTo(newAnswer);
                            var ansSpan = $("<span class='ansSpanDisplay'>" + ansCount + ".</span>").appendTo(newAnswer);                        
                            var ansContent = $("<div class='ansContentDisplay'><span id='answerText' " + local_color + ">" + array[i].answers[j].text + "</span></div>").appendTo(newAnswer);
                            newAnswer.appendTo(ansDiv);
                            break;
                        case "2":
                            local_state = "";
                            local_color = "";
                            if(begin){
                                local_state = (array[i].answers[j].state)?"checked":"";
                                local_color = (array[i].rightAns.replace(/,/g,"").indexOf(array[i].answers[j].value + " ", 0) != -1)?((array[i].answers[j].was)?"style='background-color: #6c0;'":""):((array[i].answers[j].was)?"style='background-color: red;'":"");
                            }
                            newAnswer = $("<div class='newAnswer'>");
                            ansInput = $("<input type='checkbox' value='" + array[i].answers[j].value + "' " + local_state + " style='float: left; margin-right: 10px;'/>").appendTo(newAnswer);
                            ansSpan = $("<span class='ansSpanDisplay'>" + ansCount + ".</span>").appendTo(newAnswer);                        
                            ansContent = $("<div class='ansContentDisplay'><span id='answerText' " + local_color + ">" + array[i].answers[j].text + "</span></div>").appendTo(newAnswer);
                            newAnswer.appendTo(ansDiv);
                            break;
                        case "3":
                            local_state = "";
                            local_color = "";
                            if(begin){
                                local_state = (array[i].answers[j].state)?"selected":"";
                                local_color = (array[i].answers[j].value == array[i].rightAns)?((array[i].answers[j].was)?"#6c0":""):((array[i].answers[j].was)?"red":"");
                            }
                            ansInput = $("<option value='" + array[i].answers[j].value + "' " + local_state + ">" + array[i].answers[j].text + "</option>").appendTo(selInput);
                            if(local_state && local_color)
                                selInput.css("background-color",local_color);
                            break;
                    }               
                    ansCount++;
                }
                qstDiv.appendTo("#data");
                counter++;
            }
            begin = false;
        } else {
            counter = 1;
            qstDiv = $("<div class='qstDivDisplay'>");        
            spanOptConn = $("<div class='spanOptConn'>").appendTo(qstDiv);             
            qstNumber = $("<span class='qstNumber'>" + sankoreLang.question + " " + counter + "</span>").appendTo(spanOptConn);        
            qstContent = $("<div class='qstContentDisplay'>" + sankoreLang.example_question + "</div>").appendTo(qstDiv);        
            ansDiv = $("<div class='ansDiv'>").appendTo(qstDiv);
            
            ansCount = 1;
            for(j = 0; j < 3; j++){  
                newAnswer = $("<div class='newAnswer'>");
                ansInput = $("<input type='radio' name='1' style='float: left; margin-right: 10px;'/>").appendTo(newAnswer);
                ansSpan = $("<span class='ansSpanDisplay'>" + ansCount + ".</span>").appendTo(newAnswer);                        
                ansContent = $("<div class='ansContentDisplay'>" + sankoreLang.answer + " " + ansCount + ".</div>").appendTo(newAnswer);
                newAnswer.appendTo(ansDiv);                        
                ansCount++;
            }
            qstDiv.appendTo("#data");
        }
    }