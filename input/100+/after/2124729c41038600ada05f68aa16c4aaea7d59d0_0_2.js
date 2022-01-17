function updatePreview(e) {

                previewElement.hide();



                var pos, txt, sel, range;

                if(textarea) {

                    pos = jQuery(this).getCaretPosition();

                    var fontHeight = parseInt(jQuery(this).css('font-size').replace('px',''));

                    pos = {x: pos.left, y: pos.top - fontHeight - 4};

                    sel = jQuery(this).getSelection();

                    range = {startOffset: sel.start, endOffset: sel.end};

                    txt = jQuery(this).val();

                }

                else {

                    sel = options.iFrame ? rangy.getIframeSelection(iframe) : rangy.getSelection();

                    try{

                        pos = sel.getStartDocumentPos();

                    }

                    catch(e) {

                        return;

                    }

					if(options.iFrame) {

						pos.y -= $(iframe).contents().scrollTop();

						previewElement.html(pos.y+','+$(iframe).contents().scrollTop()+','+$(iframe).position().y);

					}

                    var anchor = sel.anchorNode;



                    range = sel.getRangeAt(0);



					if(anchor.nodeType == anchor.TEXT_NODE) {	

						while(anchor.previousSibling) {

							anchor = anchor.previousSibling;

							range.startOffset += anchor.textContent.length;

							range.endOffset += anchor.textContent.length;

						}

						anchor = anchor.parentNode;

					}



                    if(jQuery(anchor).parents('code,pre,.wm_ignore').length)

                        return;

                    txt = jQuery(anchor).text();

                }

				if(pos.y<0)

					return;



                //only do this if the selection has zero width

                //so when you're selecting blocks of text, distracting previews don't pop up

                if(range.startOffset != range.endOffset)

                    return;



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

                    anchor = jQuery(anchor).replaceWith(txt);

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

                    var of = options.iFrame ? iframe : textarea ? root : document;

                    previewElement.position({my: 'left bottom', at: 'left top', of: of, offset: pos.x+' '+pos.y, collision: 'fit'})

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