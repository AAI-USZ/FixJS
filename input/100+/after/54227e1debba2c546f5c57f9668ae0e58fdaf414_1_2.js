function(args){
        var proto = this;
        var prevonkeydown;
        var instructionDiv = document.getElementById('cdinstructions'), 
        instruction= "Enter Text: English on the left, Translation on the right.", 
        submit = document.getElementById('cdEnterTextButton'),
        _gpWrapper = document.getElementById('cdenterText');
        _gpWrapper.style.display='block';
        background.style.display='block';
        this.wrapper.style.display='block';
        if(CKEDITOR.instances.entext !=null){
            CKEDITOR.instances.entext.destroy();
            CKEDITOR.instances.jatext.destroy();
        }
        
        CKEDITOR.replace('entext', {
            uiColor: '#34DFA1',
            extraPlugins : 'uicolor',
            toolbar : [ [ 'Source' ], [ 'UIColor' ] ],
            width: '400px'
        });
        CKEDITOR.instances.entext.focus();
        CKEDITOR.replace( 'jatext',
        {
            uiColor: '#14B8C4',
            extraPlugins : 'uicolor',
            toolbar : [ [ 'Source' ], [ 'UIColor' ] ],
            width: '400px'
        });
        popdiv.style.display='block';
        popdiv.style.height = this.wrapper.offsetHeight+250+'px';
        
        $(background).center();
        $(popdiv).center();
        submit.onkeydown = getTextAndMoveOn;
        submit.onclick = getTextAndMoveOn;
        prevonkeydown = document.onkeydown;
        
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
            totalMisaligned = proto.paragraphs.tofix.length;
            data.chapter.paragraph = proto.paragraphs.en;
            data.chapter.raw = proto.paragraphs;
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
                proto.fixSentences(proto.paragraphs);
            }
            
        }
    }