function doNextParagraph(){
        document.onkeydown = prevOnkeydown;
        document.onkeypress =prevOnkeypress;
        for(i=0;i<leftList.length;i++){
            removeListListeners(leftList[i]);
        }
        for(i=0;i<rightList.length;i++){
            removeListListeners(rightList[i]);
        }
        proto.paragraphs.en[pgr.tofix[0].index] = pgr.en[pgr.tofix[0].index];
        proto.paragraphs.jp[pgr.tofix[0].index] = pgr.jp[pgr.tofix[0].index];
        pgr.tofix = proto.checkLengths(pgr);
        if(proto.paragraphs.tofix.length>0){
            proto.fixSentences(pgr);
        }
    }