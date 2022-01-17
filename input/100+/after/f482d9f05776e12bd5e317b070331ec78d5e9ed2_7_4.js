function init(){

    //variables
    var toggleFlag = false;
    var endFlag = false;
    var mode = true;
    questionArray = new Array();  
    var popupFlag = false
    var flagForSelect = false;    
    
    $("#wgt_display").text(sankoreLang.display);
    $("#wgt_edit").text(sankoreLang.edit);
    $("#wgt_name").text(sankoreLang.wgt_name);
    $("#wgt_reload").text(sankoreLang.reload);
    $(".style_select option[value='1']").text(sankoreLang.slate);
    $(".style_select option[value='2']").text(sankoreLang.pad);
    
    
    //popup message
    var popupText = $("<div id='popupWordInfo' class='popupWordInfo'></div>").appendTo("#data");
    
    // adding question block
    var addQstDiv = $("<div id='addQstDiv' class='addQstDiv'>").appendTo("#data");
    var addQstButton = $("<button id='addQstButton' class='addQstButton'>").appendTo("#addQstDiv");    
    var addQsqSpan1 = $("<span id='addQsqSpan1'>" + sankoreLang.q + "1</span>").appendTo("#addQstButton");
    var addQsqSpan2 = $("<span id='addQsqSpan2'>" + sankoreLang.add_new_question + "</span>").appendTo("#addQstButton");
    
    //import saved data
    if(window.sankore){
        if(sankore.preference("qstArrayData","") && sankore.preference("qstArrayData","") != "[]"){
            questionArray = jQuery.parseJSON(sankore.preference("qstArrayData",""));
            for(var i in questionArray){
                addQstBlock(questionArray[i].id, questionArray[i].text, questionArray[i].type,"style='display: none;'");
                for(var j in questionArray[i].answers)
                    addAnsBlock(questionArray[i].answers[j].id, questionArray[i].id, questionArray[i].answers[j].text, true, questionArray[i].rightAns, questionArray[i].type);
            }
            displayData(true);
        } 
        else{ 
            displayData(false);
            begin = false;
        }
    }
    else{ 
        displayData(false);
        begin = false;
    }
    
    //saving widget data into sankore object for a correct import
    if (window.widget) {
        window.widget.onleave = function(){
            sankore.setPreference("qstArrayData", JSON.stringify(questionArray));
            sankore.setPreference("choisir_style", $(".style_select").find("option:selected").val());
        }
    }
    
    if(window.sankore)
        if(sankore.preference("choisir_style","")){
            changeStyle(sankore.preference("choisir_style",""));
            $(".style_select").val(sankore.preference("choisir_style",""));
        } else
            changeStyle(1)

    $("#wgt_display, #wgt_edit").click(function(event){
        if(this.id == "wgt_display"){
            if(!$(this).hasClass("selected")){                
                $(this).addClass("selected");
                $("#wgt_edit").removeClass("selected");
                $(".style_select").css("display","none");                
                $(this).css("display", "none");
                $("#wgt_edit").css("display", "block");
                displayData(true);
                mode = true;
                if(window.sankore){
                    sankore.setPreference("qstArrayData", JSON.stringify(questionArray));
                    sankore.setPreference("choisir_style", $(".style_select").find("option:selected").val());
                }
            }
        } else {            
            if(!$(this).hasClass("selected")){
                $(this).addClass("selected");
                $("#wgt_display").removeClass("selected");
                $(".style_select").css("display","block");                
                $(this).css("display", "none");
                $("#wgt_display").css("display", "block");
                editData();
                mode = false;
            }
        }
    });

    $("#wgt_reload").text(sankoreLang.reload).click(function(){
        if($("#wgt_edit").css("display") == "none")
            $("#wgt_display").trigger("click");
        else{
            editData();
            mode = false;
            displayData(true);
            mode = true;
        }
    });
    
    $(".style_select option[value='1']").text(sankoreLang.slate);
    $(".style_select option[value='2']").text(sankoreLang.pad);
    
    $(".style_select").change(function (event){
        changeStyle($(this).find("option:selected").val());
    })
    
    // add question
    addQstButton.click(function(){        
        //question block
        var id = Math.round(Math.random()*1000);       
        var obj = new Question();
        obj.id = id;
        questionArray.push(obj);
        
        addQstBlock(id, sankoreLang.template_question, "","");
                
        if(window.sankore)
            sankore.setPreference("qstArrayData", JSON.stringify(questionArray));
    });
    
    //set used at this moment question id into the variable 
    $(".qstDiv").live('mouseover', function() {
        currentQstId = this.id;
    });
    
    //set used at this moment question id into the variable 
    $(".qstDivDisplay").live('mouseover', function() {
        if(!flagForSelect)
            currentQstId = this.id.replace("qstDivDisplay","");
    });
       
    //adding new answer
    $(".ansAdd").live('click', function(){
        
        var id = Math.round(Math.random()*1000);        
        var obj = new Answer();
        obj.id = id;
        getNeededElement(questionArray, currentQstId).answers.push(obj);
        
        addAnsBlock(id, currentQstId, sankoreLang.template_answer);
    });
    
    //set answer text
    $(".ansContent").live('keyup', function(event){
        var id = $(event.target).attr("id").replace("ansContent","");
        getNeededElement(getNeededElement(questionArray, currentQstId).answers,id).text = $(event.target).text();
    });
    
    //set question text
    $(".qstContent").live('keyup', function(event){
        var id = $(event.target).attr("id").replace("qstContent","");
        getNeededElement(questionArray, id).text = $(event.target).text();
    });
    
    //question div border
    $(".qstContent").live('mouseover', function(event){
        $(event.target).css({
            border:"3px solid #00C6FF"
        });
    });
    
    // deleting question div border
    $(".qstContent").live('mouseout', function(event){
        $(event.target).css({
            border:"3px solid #ccc"
        });
    });
    
    //answer div border
    $(".ansContent").live('mouseover', function(event){
        $(event.target).css({
            border:"3px solid #00C6FF"
        });
    });
    
    // deleting answer div border
    $(".ansContent").live('mouseout', function(event){
        $(event.target).css({
            border:"3px solid #ccc"
        });
    });
    
    //delete answer
    $(".ansDelete").live('click', function(){
        popupText.hide();
        var id = this.id.replace("ansDelete","");
        $("#" + currentQstId + " #" + id).remove();
        for(var i in questionArray)
            if(questionArray[i].id == currentQstId){
                questionArray[i].rightAns = questionArray[i].rightAns.replace($("#" + currentQstId + " #" + id + " input:checkbox").val(),"");
                for(var j in questionArray[i].answers)
                    if(questionArray[i].answers[j].id == id){
                        if(j == 0)
                            questionArray[i].answers.shift();
                        else
                        if((j+1) == questionArray[i].answers.length)
                            questionArray[i].answers.pop();
                        else
                            questionArray[i].answers = questionArray[i].answers.slice(0,j).concat(questionArray[i].answers.slice(j+1));  
                        break;
                    }
            }
        refreshAns();
    });
    
    //delete question
    $(".qstDelete").live('click', function(){
        popupText.hide();
        $("#" + currentQstId).remove();
        for(var i in questionArray)
            if(questionArray[i].id == currentQstId){
                if(i == 0)
                    questionArray.shift();
                else
                if((i+1) == questionArray.length)
                    questionArray.pop();
                else
                    questionArray = questionArray.slice(0,i).concat(questionArray.slice(i+1));                
                break;
            }
        refreshQst();
    });
    
    //change options
    $(".changeOptions").live('click', function(){
        $("#" + currentQstId + "qstOptions .changeOptions").hide();
        $("#" + currentQstId + "qstOptions .applyChanges").show();
        $("#" + currentQstId + "qstOptChoice").show('fast');
    });
    
    //apply changes
    $(".applyChanges").live('click', function(){
        $("#" + currentQstId + "qstOptions .applyChanges").hide();
        $("#" + currentQstId + "qstOptions .changeOptions").show();
        $("#" + currentQstId + "qstOptChoice").hide('fast');
    });
    
    //select option
    $(".qstOptChoice input:radio").live('click', function(event){
        if(!mode){
            $("#" + currentQstId + "qstOptChoice input:radio").removeAttr("checked");
            $(event.target).attr("checked", "checked");
            getNeededElement(questionArray, currentQstId).type = $(event.target).attr("value");
        }
    });
    
    //select right ansver in edit mode and answer question in display mode
    $(".newAnswer input").live('click', function(event){

        if(!mode){
            if(getNeededElement(questionArray, currentQstId).type == "1" || getNeededElement(questionArray, currentQstId).type == "3"){
                $("#" + currentQstId + "ansDiv input").removeAttr("checked");
                $(event.target).attr("checked", "checked");
                getNeededElement(questionArray, currentQstId).rightAns = $(event.target).attr("value");
            } else {
                (event.target.checked) ? $(event.target).attr("checked", "checked") : $(event.target).removeAttr("checked", "checked");
                getNeededElement(questionArray, currentQstId).rightAns = "";
                for(var i in $("#" + currentQstId + "ansDiv input")){
                    if($("#" + currentQstId + "ansDiv input")[i].checked)
                        getNeededElement(questionArray, currentQstId).rightAns += $("#" + currentQstId + "ansDiv input")[i].value + ", ";
                }
            }
        } else {
            if(event.target.type == "radio"){
                checkingAnswers("radio", getNeededElement(questionArray, currentQstId).answers, event.target.value);
                if(event.target.value == getNeededElement(questionArray, currentQstId).rightAns)
                    $(event.target).next().next().css("background-color","#6c0");
                else
                    $(event.target).next().next().css("background-color","red");
            } else {
                checkingAnswers("box", getNeededElement(questionArray, currentQstId).answers, event.target.value, event.target.checked);
                if(getNeededElement(questionArray, currentQstId).rightAns.replace(/,/g,"").indexOf(event.target.value + " ", 0) != -1)
                    $(event.target).next().next().css("background-color","#6c0");
                else
                    $(event.target).next().next().css("background-color","red");
            }
        }
    });
    
    //popup messages
    $(".qstDelete").live('mouseover', function(evt){
        popupFlag = true;
        popupText.text(sankoreLang.delete_question)
        .css("top", evt.pageY + 15)
        .css("left", evt.pageX - 40)
        .css({
            width:"130px"
        })
        .show("fast", function(){
            if(!popupFlag)
                popupText.hide();
        });
    });
    
    $(".ansDelete").live('mouseover', function(evt){
        popupFlag = true;
        popupText.text(sankoreLang.delete_answer)
        .css("top", evt.pageY + 15)
        .css("left", evt.pageX - 40)
        .css({
            width:"130px"
        })
        .show("fast", function(){
            if(!popupFlag)
                popupText.hide();
        });
    });
    
    $(".newAnswer input").live('mouseover', function(evt){
        if(!mode){
            popupFlag = true;
            popupText.text(sankoreLang.right_answer)
            .css("top", evt.pageY + 15)
            .css("left", evt.pageX - 40)
            .css({
                width:"130px"
            })
            .show("fast", function(){
                if(!popupFlag)
                    popupText.hide();
            });
        }
    });
    
    $(".qstDelete, .ansDelete, .newAnswer input").live('mousemove', function(evt){
        if(!mode){
            popupText.css("top", evt.pageY + 15)
            .css("left", evt.pageX - 40);
        }
    });
    
    $(".qstDelete, .ansDelete, .newAnswer input").live('mouseout', function(evt){
        if(!mode){
            popupFlag = false;
            popupText.hide();
        }
    });

    //answer the questions
    
    $("select").live('change', function(evt){
        if(mode){
            checkingAnswers("sel", getNeededElement(questionArray, currentQstId).answers, event.target.value);
            if(event.target.value == getNeededElement(questionArray, currentQstId).rightAns)
                $(event.target).css("background-color","#6c0");
            else
                $(event.target).css("background-color","red");
            if(event.target.value == 0)
                $(event.target).css("background-color","");
            flagForSelect = false;
        }
    });
    
    $("select").live('mousedown', function(evt){
        if(mode){
            flagForSelect = true;
        }
    });
    
    //toggle button click trigger
    //toggleButton.trigger("click");
    //show data in display mode
    function displayData(flag){
        $("#addQstDiv").hide();
        $(".qstDiv").hide();
        addToPage(questionArray, flag);
    }
    
    //set widget in edit mode
    function editData(){
        for(var i in questionArray)            
            for(var j in questionArray[i].answers){
                questionArray[i].answers[j].state = "";
                questionArray[i].answers[j].was = false
            }               
                
        $(".qstDivDisplay").remove();
        
        $("#addQstDiv").show('fast');
        $(".qstDiv").show('fast');
    }
    
    // show questions and answers in display mode
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
                            var ansContent = $("<div class='ansContentDisplay' " + local_color + "><span id='answerText'>" + array[i].answers[j].text + "</span></div>").appendTo(newAnswer);
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
                            ansContent = $("<div class='ansContentDisplay' " + local_color + "><span id='answerText'>" + array[i].answers[j].text + "</span></div>").appendTo(newAnswer);
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
}