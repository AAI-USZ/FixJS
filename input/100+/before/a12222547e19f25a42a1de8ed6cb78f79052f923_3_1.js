function(){
        if (comments.find(".thread").length > 0 && editor.find('input#rootID').length == 0){
            alert("enter the thread!");
            return false;
        }
        $.post(
            "http://localhost:3000/add/",
            editor.serialize(),
            function(data){
                var ul = $(".thread[data-id="+editor.find('input#rootID').val()+"]>ul");
                console.log(ul);
                if (ul.length == 1){
                    ul.append($("<li>",{html: data}));
                } else {
                    console.log(data);
                    comments.append(data);
                }
            }
        );
    }