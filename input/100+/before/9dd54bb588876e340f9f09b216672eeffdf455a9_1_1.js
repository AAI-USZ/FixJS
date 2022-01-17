function(){
        //удаляем лишние пробелы из текста, и обромляем каждое слово тэгом, чтобы потом 
        //каждый из них можно было отдельно анимировать со своим timeout
        var content = $("textarea").remove_spaces().split(" ").add_tags("<span class='show_word'>", "</span>")
        var output_block = $("#processing-result")
                
        var speed = document.getElementById("speed").value
        //alert(document.getElementById("speed").value)
                
        
        //Прячем всё содержимое, и последовательно отображаем слова с задержкой 100 
        output_block.html(content).children().hide()        
        //Прячем форму ввода текста и показываем блок, где по очереди отображаются слова
        usr_inpt.style.visibility = 'hidden'
        rslt.style.visibility = 'visible'
        
        output_block.children().each(function(i){
             //180 мс это задержка между словами, 200 мс это время отображения первого слова из всего текста
             $(this).delay(200 + (speed * i)).fadeIn(0)
             $(this).delay(speed).fadeOut(0)
        })

	}