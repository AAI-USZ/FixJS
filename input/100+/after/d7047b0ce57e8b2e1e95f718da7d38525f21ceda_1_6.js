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