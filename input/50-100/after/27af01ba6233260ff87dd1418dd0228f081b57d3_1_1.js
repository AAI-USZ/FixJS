function(){
    
	$("#btn").click(function(){
        //удаляем лишние пробелы из текста, и обромляем каждое слово тэгом, чтобы потом 
        //каждый из них можно было отдельно анимировать со своим timeout
		var content = $("textarea").remove_spaces().split(" ").add_tags("<span>", "</span>")
		$("#processing-result").html(content)
	})

}