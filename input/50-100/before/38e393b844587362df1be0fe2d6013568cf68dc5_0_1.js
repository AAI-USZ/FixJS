function(data){
                var ul = $(".thread[data-id="+editor.find('input#rootID').val()+"]>ul");
                if (ul.length == 1){
                    ul.append($("<li>",{text: data}));
                } else {
                    console.log(data);
                    comments.append(data);
                }
            }