function(){
    if(window.sankore)
        if(sankore.preference("ord_phrases_style","")){
            changeStyle(sankore.preference("ord_phrases_style",""));
            $(".style_select").val(sankore.preference("ord_phrases_style",""));
        } else
            changeStyle(1)
    $("#wgt_display").text(sankoreLang.view);
    $("#wgt_edit").text(sankoreLang.edit);
    $("#wgt_display, #wgt_edit").click(function(event){
        if(this.id == "wgt_display"){
            if(!$(this).hasClass("selected")){                
                $(this).addClass("selected");
                $("#wgt_edit").removeClass("selected");
                $(".style_select").css("display","none");                
                $(this).css("display", "none");
                $("#wgt_edit").css("display", "block");
                modeView();
            }
        } else {            
            if(!$(this).hasClass("selected")){
                $(this).addClass("selected");
                $("#wgt_display").removeClass("selected");
                $(".style_select").css("display","block");                
                $(this).css("display", "none");
                $("#wgt_display").css("display", "block");
                modeEdit();
            }
        }
    });
    $("#wgt_name").text(sankoreLang.wgt_name);
    
    $("#wgt_reload").text(sankoreLang.reload).click(function(){
        if(wgtState)
            $("#wgt_display").trigger("click");
        else
        {
            $( "#mp_word" ).empty();
	
            var phrases;
            phrases = shuffle( createElements( sentence ) );
    
            for( i in phrases ){
                $("#mp_word").append( phrases[i] );
            }
	
            // in sankore api there would be a function to check 
            // the answer, so no update parameter would be needed
            $( "#mp_word" ).sortable();
            if( !isSankore ){
                $( "#mp_word" ).sortable( {
                    update: checkSentence
                } );
            } else 
                $( "#mp_word" ).sortable();
        }
    });
    
    $(".style_select option[value='1']").text(sankoreLang.slate);
    $(".style_select option[value='2']").text(sankoreLang.pad);
    
    $(".style_select").change(function (event){
        changeStyle($(this).find("option:selected").val());
    })
}