function(pgr){
    /*
         * First, we make assumptions.  The Japanese text was probably split 
         * correctly in Japanese.  They rock like that.
         * 1. If there are more English Sentences, show each sentence in the 
         *  paragraph, separated, and have the editor chose one that should 
         *  be pushed up, finally selecting done.  Save the last item of 
         *  each English sentence as an example.
         * 2. If there are still more English sentences, we really screwed up.  
         *  Then we will do the reverse of the following algorithm.
         * 3. If there are more Japanese sentences, we will present the user 
         *  with two English sentences, starting with the first two; we will
         *  also present two japanese sentences, beginning with the second.
         *  We will ask with which sentence this matches.
         *  a) user chooses first sentence, we re-evaluate and continue if
         *      a match has not been made.
         *  b) user chooses second, so we remove the first sentence, and add
         *      the third in English, and move on in the line of Japanese
         *      sentences.
         * 4. We must provide a way of splitting sentences by ';' 
         *  or ','. If user selects split and the sentence, we then re-evaluate
         *  and re-present the fix dialogue if necessary.
         */
    var fixWrapper = document.getElementById('cdFixParagraphs');
    fixWrapper.style.display = 'block';
    if(pgr.tofix.length === 0){
        fixWrapper.style.display = 'none';
        $(this.wrapper).hide();
        return;
    }
    console.log('fixing sentences method start');
    var proto = this;
    
    fixWrapper.style.display = 'block';
    var prevOnkeydown, prevOnkeypress,wellHolder, instructions,message,leftwell, rightwell, leftnav, rightnav,leftHeader, rightHeader, leftNavHeader, rightNavHeader,leftList = [], rightList = [], joinUp, splitSentence, belongsTo, tmp;
    
    background.style.height = document.offsetHeight;
    background.style.width = document.offsetWidth;
    instructions = document.getElementById('fixerInstruction');
    message = document.getElementById('fixerMessage');
    leftnav = document.getElementById('fixLeftNav');
    rightnav =document.getElementById('fixRightNav');
    leftHeader = document.getElementById('fixLeftNavHeader');
    rightHeader = document.getElementById('fixRightNavHeader');
    leftHeader.innerHTML = 'English Sentences:';
    rightHeader.innerHTML = 'Translated Sentences:';
    
    joinUp = docreate('i','icon-hand-up');
    joinUp.style.cursor = 'pointer';
    joinUp.setAttribute('title', 'Recombine With Above Sentence');
    splitSentence = docreate('i','icon-resize-horizontal');
    splitSentence.style.cursor = 'pointer';
    splitSentence.setAttribute('title', 'Split at [,]/[;] or selected point.');
    belongsTo = docreate('i', 'icon-flag');
    fixWrapper.focus();
    
        
    resetLists();
    var i;
    instructions.firstElementChild.innerHTML = 'Do any English sentences need to be Recombined (bad sentence split)? Y/N';
    for(i=0; i<pgr.tofix[0].jp;i++){
        rightList[i].classList.add('greyedOut');
    }
    prevOnkeydown = document.onkeydown;
    prevOnkeypress = document.onkeypress;
    document.onkeypress = function(e){
        if(String.fromCharCode(e.charCode).toLocaleUpperCase() === 'N'){
            for(i=0; i<pgr.tofix[0].jp;i++){
                rightList[i].classList.remove('greyedOut');
            }
            checkSplit();
        }
    }
    document.onkeydown = function(e){
            
    };
    function checkSplit(){
        tmp += '<span class="badge badge-info">Type<i class="icon-arrow-up"></i>to select first sentence</span>\n\
        <span class="badge badge-info">Type<i class="icon-arrow-down"></i>to select second sentence</span>';
        message.innerHTML = tmp;
        if(pgr.tofix[0].en > pgr.tofix[0].jp){
                
            for(i=0; i<pgr.tofix[0].en;i++){
                leftList[i].classList.remove('greyedOut');
            }
            for(i=0; i<pgr.tofix[0].jp;i++){
                rightList[i].classList.remove('greyedOut');
            }
            instructions.firstElementChild.innerHTML = 'Do any sentences need to be split? [type N to move on]';
        }
        if(pgr.tofix[0].en < pgr.tofix[0].jp){
            for(i=0; i<pgr.tofix[0].en;i++){
                leftList[i].classList.remove('greyedOut');
            }
            for(i=0; i<pgr.tofix[0].jp;i++){
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
    function routineFix(arg){
        instructions.firstElementChild.innerHTML = "choose Up or down, corresponding to whether the yellow box goes in the top or bottom red boxes.";
        if(pgr.tofix[0].en == pgr.tofix[0].jp){
            doNextParagraph();
        }
        if(pgr.tofix[0].en > pgr.tofix[0].jp){
            if(pgr.tofix[0].jp-1 == arg.jp){
                while(pgr.tofix[0].en > pgr.tofix[0].jp){
                    pgr.en[pgr.tofix[0].index][pgr.tofix[0].en-2] +=pgr.en[pgr.tofix[0].index].pop();
                }
                routineFix(arg.en, arg.jp);
            }
            if(arg.en === undefined){
                arg.en = 1;
            }
            if(arg.jp === undefined){
                arg.jp = 0;
            }
            for(i=0; i<pgr.tofix[0].en;i++){
                if(i != arg.en && !leftList[i].classList.contains('greyedOut')){
                    leftList[i].classList.add('greyedOut');
                    leftList[i].classList.remove('alert');
                    leftList[i].classList.remove('alert-error');
                }else if (i == arg.en){
                    leftList[i].classList.remove('greyedOut');
                    leftList[i].classList.add('alert');
                    leftList[i].classList.add('alert-error');
                        
                }
            }
            for(i=0; i<pgr.tofix[0].jp;i++){
                if(i != arg.jp && i!= arg.jp+1 && !rightList[i].classList.contains('greyedOut')){
                    rightList[i].classList.add('greyedOut');
                    rightList[i].classList.remove('alert');
                    rightList[i].classList.remove('alert-warning');
                }else if(i == arg.jp || i== arg.jp+1){
                    rightList[i].classList.remove('greyedOut');
                    rightList[i].classList.add('alert');
                    rightList[i].classList.add('alert-warning');
                }
            }
            document.onkeydown = function(e){
                if(e.keyCode === 38){
                    pgr.en[pgr.tofix[0].index][arg.en-1] += pgr.en[pgr.tofix[0].index].splice(arg.en, 1)[0];
                    resetLists();
                    routineFix(arg.en, arg.jp+1);
                }
                if(e.keyCode === 40){
                    routineFix(arg.en+1, arg.jp+1);
                }
            }
        }
        if(pgr.tofix[0].en < pgr.tofix[0].jp){
            if(pgr.tofix[0].en-1 == arg.en){
                while(pgr.tofix[0].jp > pgr.tofix[0].en){
                    pgr.jp[pgr.tofix[0].index][pgr.tofix[0].jp-2] +=pgr.jp[pgr.tofix[0].index].pop();
                }
                routineFix(arg.en, arg.jp);
            }
            if(arg.en === undefined){
                arg.en = 0;
            }
            if(arg.jp === undefined){
                arg.jp = 1;
            }
            console.log(arg.en+":"+arg.jp);
            for(i=0; i<pgr.tofix[0].en;i++){
                if(i != arg.en && i!= arg.en+1 && !leftList[i].classList.contains('greyedOut')){
                    leftList[i].classList.add('greyedOut');
                    leftList[i].classList.remove('alert');
                    leftList[i].classList.remove('alert-warning');
                }else if(i == arg.en || i== arg.en+1){
                    leftList[i].classList.remove('greyedOut');
                    leftList[i].classList.add('alert');
                    leftList[i].classList.add('alert-warning');
                }
                    
            }
            for(i=0; i<pgr.tofix[0].jp;i++){
                if(i != arg.jp && !rightList[i].classList.contains('greyedOut')){
                    rightList[i].classList.add('greyedOut');
                    rightList[i].classList.remove('alert');
                    rightList[i].classList.remove('alert-error');
                }else if (i == arg.jp){
                    rightList[i].classList.remove('greyedOut');
                    rightList[i].classList.add('alert');
                    rightList[i].classList.add('alert-error');
                }
            }
            document.onkeydown = function(e){
                if(e.keyCode === 38){
                    pgr.jp[pgr.tofix[0].index][arg.jp-1] += pgr.jp[pgr.tofix[0].index].splice(arg.jp, 1)[0];
                        
                    resetLists();
                    routineFix(arg.en, arg.jp+1);
                }
                if(e.keyCode === 40){
                        
                    routineFix(arg.en+1, arg.jp+1);
                }
            }
        }
    }
    function doNextParagraph(){
        document.onkeydown = prevOnkeydown;
        document.onkeypress =prevOnkeypress;
        for(i=0;i<leftList.length;i++){
            removeListListeners(leftList[i]);
        }
        for(i=0;i<rightList.length;i++){
            removeListListeners(rightList[i]);
        }
        proto.paragraphs.en[pgIndex] = pgr.en[pgr.tofix[0].index];
        proto.paragraphs.jp[pgIndex] = pgr.jp[pgr.tofix[0].index];
        pgr.tofix = proto.checkLengths();
        if(proto.paragraphs.tofix.length>0){
            proto.fixSentences(pgr);
        }
    }
    function resetLists(){
        leftnav.innerHTML = '';
        rightnav.innerHTML = '';
        leftHeader = leftnav.appendChild(leftHeader);
        rightHeader = rightnav.appendChild(rightHeader);
        
        for(i=0;i<leftList.length;i++){
            removeListListeners(leftList[i]);
        }
        for(i=0;i<rightList.length;i++){
            removeListListeners(rightList[i]);
        }
        leftList = [];
        rightList = [];    
        for(i=0; i<pgr.tofix[0].en;i++){
            leftList[i] = docreate('li', 'enSentence', 'en'+i);
            leftnav.appendChild(docreate('li', 'divider'));
            leftList[i] = leftnav.appendChild(leftList[i]);
            leftList[i].innerHTML = pgr.en[pgr.tofix[0].index].line[i].text;
            setListListeners(leftList[i]);
        }
        console.log(pgr.tofix);
        for(i=0; i<pgr.tofix[0].jp;i++){
            rightList[i] = docreate('li', 'jaSentence', 'ja'+i); 
            rightnav.appendChild(docreate('li', 'divider'));
            rightList[i] = rightnav.appendChild(rightList[i]);
            rightList[i].innerHTML = pgr.jp[pgr.tofix[0].index].line[i].text;
            setListListeners(rightList[i]);
        }
        console.log(i);    
        popdiv.style.height = fixWrapper.offsetHeight+'px';

        $(popdiv).center();
    }
    function setListListeners(li, index){
        var action;
        li.onclick = OnClick;
        li.onkeydown = OnClick;
        li.onmouseover = function(e){
            if(!li.classList.contains('greyedOut')){
                li.appendChild(belongsTo);
                li.appendChild(joinUp);
                li.appendChild(splitSentence);
            }
                
        }
        li.onmouseout =  function(e){
            if (e === null){
                e = window.event;
            }
                
        }
        function OnClick(e){
            if (e === null){
                e = window.event;
            }
            console.log(e.target);
            action = e.target == joinUp ? 1: 
            (e.target == splitSentence ? 2: 3);
            console.log(action);
            switch(action){
                case 1:
                    console.log('join up!');
                    break;
                case 2:
                    console.log('split sentence');
                    break; 
                case 3:
                    console.log('pick this one!');
                    break;
            }
        }
    }
        
    function removeListListeners(li){
        li.onmouseout = null;
        li.onmouseover = null;
        li.click = null;
        li.onkeydown = null;
    }
}