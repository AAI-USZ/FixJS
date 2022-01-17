function doNextParagraph(){
        document.onkeydown = prevOnkeydown;
        document.onkeypress =prevOnkeypress;
        for(i=0;i<leftList.length;i++){
            removeListListeners(leftList[i]);
        }
        for(i=0;i<rightList.length;i++){
            removeListListeners(rightList[i]);
        }
        proto.paragraphs.en[pgIndex] = args.en[args.tofix[0].index];
        proto.paragraphs.jp[pgIndex] = args.jp[args.tofix[0].index];
        args.tofix = proto.checkLengths();
        if(proto.paragraphs.tofix.length>0){
            proto.fixSentences(args);
        }
    }