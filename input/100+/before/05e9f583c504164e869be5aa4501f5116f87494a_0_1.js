function() {
        var mappedarray = {};
        $.each(tokencurrentarray, function(index,value) {
            if(value[0]=='c') {
                    mappedarray[tokencurrentarray[index-1].substring(2)] = value.substring(2);
            }
        });
           $.each(newcurrentarray, function(index,value) {
                newcurrentarray[index] = value.substring(2);
            });
        $("#processing").dialog({
        height: 90,
            width: 50,
            modal: true

        });

    $("#processing").load(copyUrl, {
        mapped: mappedarray,
        newarr: newcurrentarray,
        surveyid: surveyId,
        participant_id : participant_id
        }, function(msg){
            $(this).dialog("close");
            alert(msg);
            $(location).attr('href',redUrl);
        });
    }