function(){
         var lang = $("#langdata").val();
         if(lang != "")
            {
                $('#tabs').append("<div id='"+lang+"'><center>"+attname+"<input type='text' name='"+lang+"' id='"+lang+"' /></center><br></div>");
                $("#tabs").tabs("add","#"+lang,$("#langdata option:selected").text());   
                $("select#langdata option[value='"+$("#langdata").val()+"']").remove();
            }
        }