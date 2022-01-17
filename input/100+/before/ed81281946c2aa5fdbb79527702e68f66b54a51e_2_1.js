function(){
    if(window.sankore)
        if(sankore.preference("ord_words_style","")){
            changeStyle(sankore.preference("ord_words_style",""));
            $(".style_select").val(sankore.preference("ord_words_style",""));
        } else
            changeStyle("3")
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
	
            // create new set of letters
            var letters;
            letters = shuffle( createWordLetters( word ) );
    
            for( i in letters ){
                $("#mp_word").append( letters[i] );
            }
	
            // in sankore api there would be a function to check 
            // the answer, so no update parameter would be needed
            if( !isSankore ){
                $( "#mp_word" ).sortable( {
                    update: checkWord
                } );
            } else $( "#mp_word" ).sortable();

            // adjustWidth
            var totalLettersWidth = 0;
            for( i in letters ){
                var currentWidth = $( letters[i] ).outerWidth( true );
                totalLettersWidth += currentWidth;
            }
            totalLettersWidth += 1;

            var width = Math.max(
                totalLettersWidth,
                min_view_width
                );
	
            // shift the words to the right to center them
            if( width > totalLettersWidth ){
                $( "#mp_word" ).css( "margin-left", Math.round( (width - totalLettersWidth)/2 ) );
            }
            else{
                $( "#mp_word" ).css( "margin-left", 0 );
            }
        }
    });
    
    $(".style_select option[value='1']").text(sankoreLang.slate);
    $(".style_select option[value='2']").text(sankoreLang.pad);
    $(".style_select option[value='3']").text(sankoreLang.none);
    
    $(".style_select").change(function (event){
        changeStyle($(this).find("option:selected").val());
    })
}