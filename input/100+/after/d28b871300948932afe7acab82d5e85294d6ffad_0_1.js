function addcondition(newcid)
{
    conditionid++;
    if(typeof optionstring === "undefined") {
        optionstring = "";
    }
    html = "<tr name='joincondition_"+conditionid+"' id='joincondition_"+conditionid+"'><td>\n\
    <select name='join_"+conditionid+"' id='join_"+conditionid+"'>\n\
    <option value='and'>"+andTxt+"</option>\n\
    <option value='or'>"+orTxt+"</option>\n\
    </td><td></td></tr>";
    html2 = "<tr><td><select name='field_"+conditionid+"' id='field_"+conditionid+"'>\n\
    <option>"+selectTxt+"</option>\n\
    <option value='firstname'>"+firstnameTxt+"</option>\n\
    <option value='lastname'>"+lastnameTxt+"</option>\n\
    <option value='email'>"+emailTxt+"</option>\n\
    <option value='blacklisted'>"+blacklistedTxt+"</option>\n\
    <option value='surveys'>"+surveysTxt+"</option>\n\
    <option value='survey'>"+surveyTxt+"</option>\n\
    <option value='language'>"+languageTxt+"</option>\n\
    <option value='owner_uid'>"+owneridTxt+"</option>\n\
    <option value='owner_name'>"+ownernameTxt+"</option>"+optionstring+"\n\
    </select>\n\</td>\n\<td>\n\
    <select name='condition_"+conditionid+"' id='condition_"+conditionid+"'>\n\
    <option>"+selectTxt+"</option>\n\
    <option value='equal'>"+equalsTxt+"</option>\n\
    <option value='contains'>"+containsTxt+"</option>\n\
    <option value='beginswith'>"+beginswithTxt+"</option>\n\
    <option value='notequal'>"+notequalTxt+"</option>\n\
    <option value='notcontains'>"+notcontainsTxt+"</option>\n\
    <option value='greaterthan'>"+greaterthanTxt+"</option>\n\
    <option value='lessthan'>"+lessthanTxt+"</option>\n\
    </select></td>\n\
    <td><input type='text' id='conditiontext_"+conditionid+"' style='margin-left:10px;' /></td>\n\
    <td><img src="+minusbutton+" onClick= $(this).parent().parent().remove();$('#joincondition_"+conditionid+"').remove() id='removebutton'"+conditionid+" alt='"+minusbuttonTxt+"' />\n\
    <img src="+addbutton+" id='addbutton' onclick='addcondition();' style='margin-bottom:4px' alt='"+addbuttonTxt+"' /></td></tr>\n\<tr></tr>";
    //$('#searchtable > tbody > tr').eq(id).after(html);
    $('#searchtable > tbody > tr').eq(conditionid).after(html);
    conditionid++;
    $('#searchtable > tbody > tr').eq(conditionid).after(html2);
}