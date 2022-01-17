function(e) {

                previewElement.hide();



				var sel = rangy.getIframeSelection(iframe);

                try{

                    var pos = sel.getStartDocumentPos();

                var anchor = sel.anchorNode;

                var range = sel.getRangeAt(0);



                //only do this if the selection has zero width

                //so when you're selecting blocks of text, distracting previews don't pop up

                if(range.startOffset != range.endOffset)

                    return;



                }

                catch(e) {

                    return;

                }

                //get the text in th

                var txt = $(anchor).text();



                var i=0;

                var inMath=false;

                var startMath = 0;

                var mathLimit,mathDelimit;

                var otxt = txt;

                while(i<range.startOffset)

                {

                    if(inMath)

                    {

                        if(txt.slice(i,i+mathDelimit.length)==mathDelimit)

                        {

                            inMath = false;

                            i+=mathDelimit.length-1;



                            var ol = txt.length;

                            /*if(i<txt.length-1 && !$(anchor).parents('.wm_maths').length) {

                                txt = 

                                    txt.slice(0,startMath-mathLimit.length) +

                                    '<span class="wm_maths">' +

                                    txt.slice(startMath-mathLimit.length,i+mathDelimit.length) +

                                    '</span><span> </span>' +

                                    txt.slice(i+mathDelimit.length);

                                i+=txt.length-ol.length;

                            }*/

                        }

                    }

                    else if(txt[i]=='$')

                    {

                        inMath = true;

                        startMath = i+1;

                        mathLimit = '$';

                        mathDelimit = '$';

                    }

                    else if(txt.slice(i,i+2)=='\\[')

                    {

                        inMath = true;

                        startMath = i+2;

                        mathLimit = '\\[';

                        mathDelimit = '\\]';

                    }

                    i+=1;

                }

                if(txt!=otxt) {

                    //sel = saveSelection(el[0]);

                    anchor = $(anchor).replaceWith(txt);

                    //restoreSelection(el[0],sel);

                }



                if(!inMath)

                {

                    previewElement.hide();

                    return;

                }



                i = startMath+1;

                while(i<txt.length && inMath)

                {

                    if(txt.slice(i,i+mathDelimit.length)==mathDelimit)

                        inMath = false;

                    i+=1;

                }



                if(inMath && i==txt.length)

                {

                    //try to make a guess at how much of the remaining string is meant to be maths

                    var words = txt.slice(startMath).split(' ');

                    var j = 0;

                    while(j<words.length && !words[j].match(/^([a-zA-Z]{2,})?$/))

                    {

                        j+=1;

                    }

                    i = startMath + words.slice(0,j).join(' ').length;

                    i = Math.max(range.startOffset,i)+1;

                }



                var math = txt.slice(startMath,i-1);





                if(!math.length)

                    return;



                math = mathLimit + math + mathDelimit;



                function positionPreview() {

                    previewElement.position({my: 'left bottom', at: 'left top', of: iframe, offset: pos.x+' '+pos.y, collision: 'fit'})

                }



                previewElement

                    .show()

                    .html(options.cleanMaths(math))

                ;

                positionPreview();



                queue.Push(['Typeset',MathJax.Hub,previewElement[0]]);

                queue.Push(positionPreview);

                queue.Push(options.callback);

            }