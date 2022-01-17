function getTextAndMoveOn(e){
            _gpWrapper.style.display='none';
            proto.text.en = CKEDITOR.instances.entext.getData();
            proto.text.jp = CKEDITOR.instances.jatext.getData();
            proto.paragraphs = proto.splitParagraphs({
                en: proto.text.en,
                jp: proto.text.jp
            });
            proto.paragraphs = proto.splitSentences({
                en: proto.paragraphs.en,
                jp: proto.paragraphs.jp,
                ex: proto.exceptions
            });
            proto.paragraphs.tofix = proto.checkLengths({
                en: proto.paragraphs.en,
                jp: proto.paragraphs.jp
            });
            data.chapter.paragraph = proto.paragraphs.en;
            data.chapter.raw = proto.paragraphs;
            
            totalMisaligned = proto.paragraphs.tofix.length;
            if(args.skip){
                console.log('skipping sentence translation arrangement');
                if(args.toClipper){
                    $(proto.wrapper).hide();
                    $(popdiv).hide();
                    
                    proto.audioclipper.chapter= data.chapter;
                    data = proto.audioclipper.chapter;
                    console.log(data);
                    proto.audioclipper.show();
                    proto.audioclipper.decodeLineSet();
                    proto.audioclipper.setListeners();
                    proto.audioclipper.displayNextTwoLines();
                }
            }else{
                if(proto.paragraphs.tofix == false){
                    proto.fixParagraphs(proto.paragraphs);
                }else{
                    proto.fixSentences(proto.paragraphs);
                }
            }
            
        }