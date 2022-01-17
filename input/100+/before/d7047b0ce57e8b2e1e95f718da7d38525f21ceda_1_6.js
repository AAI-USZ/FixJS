function resetLists(){
        leftnav.innerHTML = '';
        rightnav.innerHTML = '';
        leftHeader = leftnav.appendChild(leftHeader);
        rightHeader = rightnav.appendChild(rightHeader);
        //removeListListeners
        for(i=0;i<leftList.length;i++){
            removeListListeners(leftList[i]);
        }
        for(i=0;i<rightList.length;i++){
            removeListListeners(rightList[i]);
        }
        leftList = [];
        rightList = [];
            
        for(i=0; i<args.tofix[0].en;i++){
            leftList[i] = docreate('li', 'enSentence', 'en'+i);
            leftnav.appendChild(docreate('li', 'divider'));
            leftList[i] = leftnav.appendChild(leftList[i]);
            leftList[i].innerHTML = args.en[args.tofix[0].index].line[i].text;
            setListListeners(leftList[i]);
        }
        for(i=0; i<args.tofix[0].jp;i++){
            rightList[i] = docreate('li', 'jaSentence', 'ja'+i); 
            rightnav.appendChild(docreate('li', 'divider'));
            rightList[i] = rightnav.appendChild(rightList[i]);
            rightList[i].innerHTML = args.jp[args.tofix[0].index].line[i].text;
            setListListeners(rightList[i]);
        }
            
        popdiv.style.height = fixWrapper.offsetHeight+'px';

        $(popdiv).center();
    }