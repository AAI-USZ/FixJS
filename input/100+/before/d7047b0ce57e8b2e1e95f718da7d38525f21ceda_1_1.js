function checkSplit(){
        tmp += '<span class="badge badge-info">Type<i class="icon-arrow-up"></i>to select first sentence</span>\n\
        <span class="badge badge-info">Type<i class="icon-arrow-down"></i>to select second sentence</span>';
        message.innerHTML = tmp;
        if(args.tofix[0].en > args.tofix[0].jp){
                
            for(i=0; i<args.tofix[0].en;i++){
                leftList[i].classList.remove('greyedOut');
            }
            for(i=0; i<args.tofix[0].jp;i++){
                rightList[i].classList.remove('greyedOut');
            }
            instructions.firstElementChild.innerHTML = 'Do any sentences need to be split? [type N to move on]';
        }
        if(args.tofix[0].en < args.tofix[0].jp){
            for(i=0; i<args.tofix[0].en;i++){
                leftList[i].classList.remove('greyedOut');
            }
            for(i=0; i<args.tofix[0].jp;i++){
                rightList[i].classList.remove('greyedOut');
            }
            instructions.firstElementChild.innerHTML = 'Do any sentences need to be split? Y/N';
        }
        document.onkeypress = function(e){
            if(String.fromCharCode(e.charCode).toLocaleUpperCase() === 'N'){
                routineFix();
            }
        }
    }