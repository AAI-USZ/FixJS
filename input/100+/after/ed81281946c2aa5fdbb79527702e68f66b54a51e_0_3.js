function(){
        sankore.setPreference("ord_words_style", $(".style_select").find("option:selected").val());
        if($( "#mp_word .wgt_cont" ).val())
        {
            modeView();
            var str = "";
            $( "#mp_word .letter" ).each( function(){
                str += $(this).text() + "*";
            });        
            str = str.substr(0, str.length - 1);        
            sankore.setPreference("currentOrdWords", str);           
            modeEdit();
        }
        else{
            str = "";
            $( "#mp_word .letter" ).each( function(){
                str += $(this).text() + "*";
            });        
            str = str.substr(0, str.length - 1);        
            sankore.setPreference("currentOrdWords", str);
        }
        sankore.setPreference("rightOrdWords", word);
    }