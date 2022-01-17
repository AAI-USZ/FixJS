function(){
        proto.addBookButton.onmouseover = function(){
            proto.addBooki.classList.add('icon-white');
        };
        proto.addBookButton.onmouseout = function(){
            proto.addBooki.classList.remove('icon-white');
        }
        proto.addBookButton.onclick = addBookListener;
        //proto.addBookButton.onkeydown = addBookListener;
    }