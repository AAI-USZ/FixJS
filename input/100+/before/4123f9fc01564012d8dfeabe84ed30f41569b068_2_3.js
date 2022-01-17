function(){
        var mappedarray = {};
        var anewcurrentarray = {};
        $.each(tokencurrentarray, function(index,value) {
            if(value[0]=='t') {
                mappedarray[encodeURI(tokencurrentarray[index-1].substring(2))] = value.substring(2);
            }
        });
        $.each(newcurrentarray, function(index,value) {
            if(value[0]=='t') {
                anewcurrentarray[value.substring(2)] = $("#td_"+value).val();
            }
        });
        /* $("#processing").dialog({
	        height: 90,
	        width: 50,
	        modal: true
        }); */

        $("#processing").load(copyUrl, {
            mapped: mappedarray,
            newarr: anewcurrentarray,
            surveyid: surveyId,
            overwrite: attoverwrite
        }, function(msg){
            alert(msg);
            $(this).dialog("close");
            $(location).attr('href',redUrl);
        });
    }