function(event){

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
    }