function(){
   $("ul.lista").each(function(index,element){ 
        $(element).find("li").each(function(index2,element2){    
           if(index2>0) $(element2).hide();
         });
   });
   $("ul.lista").click(function(){
       var first = $(this).find("li:visible").last();
       $(first).next().show("fast");
        
   }); 
    
    $("p.code").each(function(index,element){
       var codigo = $(element).html();
       var pre = '<div class="send-console">Send</div><script type="syntaxhighlighter" class="brush: php;toolbar: false"><![CDATA[';
       var fin = ']]></script>';
       ///console.log(pre+codigo+fin);
       $(element).after(pre+codigo+fin);
    });
    
     SyntaxHighlighter.all()
    //añado boton para enviar a mi debugger
    
    $(".send-console").click(function(){
        var code = $(this).prev().html();
        
        editAreaLoader.setValue("textarea_1", '<?php '+code+'?>');
        $("#code-php-button").click();
        //my_save("",'<?php '+code+'?>');
    });
    
    
    
    $("#list-links").click(function(){
       $("#list-links-container").show(); 
    });
    $("#list-links-container a").click(function(){
        $("#list-links-container").hide(); 
    });
////editor    
    $("#code-php-button").click(function(){
       $("#code-php").show(); 
    });
    $("#hide-code").click(function(){
       $("#code-php").hide();
       
    });

    editAreaLoader.init({
	id : "textarea_1"		// textarea id
	,syntax: "php"			// syntax to be uses for highgliting
	//,start_highlight: true
        ,min_width: "670"
        ,min_height: "170"
        ,allow_toggle:true
        ,toolbar: " load, save , search, go_to_line, |, undo, redo, |, select_font, |, change_smooth_selection, highlight, reset_highlight, |, help"
	,save_callback: "my_save"
        ,load_callback: "my_load"
        ,allow_resize: "x"
        ,display: "later"
    });
///fin editor    
    
}