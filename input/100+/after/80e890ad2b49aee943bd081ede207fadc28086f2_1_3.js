function() {

    jQuery("<style type='text/css'> .wm_preview { z-index: 1; position: absolute; display: none; border: 1px solid; padding: 0.2em; width: auto; margin: 0 auto; background: white;} </style>").appendTo("head");



	jQuery.fn.writemaths = function(options) {

		options = jQuery.extend({

			cleanMaths: function(m){ return m; },

			callback: function() {},

            iFrame: false,

		},options);



        jQuery(this).each(function() {



            var textarea = jQuery(this).is('textarea,input');



            var root = this;

            if(options.iFrame) {

    			var iframe = jQuery(this).find('iframe')[0];

                var el = jQuery(iframe).contents().find('body');

            }

            else

            {

                el = jQuery(this);

            }

            el.addClass('writemaths tex2jax_ignore');

            var previewElement = jQuery('<div class="wm_preview"/>');

			jQuery('body').append(previewElement);



            var queue = MathJax.Callback.Queue(MathJax.Hub.Register.StartupHook("End",{}));

            el

			.on('blur',function(e) {

				previewElement.hide();

			})

			.on('keyup click',function(e) {

                previewElement.hide();



                var pos, txt, sel, range;

                if(textarea) {

                    pos = jQuery(this).getCaretPosition();

                    var fontHeight = parseInt(jQuery(this).css('font-size').replace('px',''));

                    pos = {x: pos.left, y: pos.top - fontHeight};

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

                    var anchor = sel.anchorNode;



					while(anchor.parentNode && anchor.nodeType == anchor.TEXT_NODE) {	//find the tag containing the anchor text node, so we can get all of its text.

						anchor = anchor.parentNode

					}



                    if(jQuery(anchor).parents('code,pre,.wm_ignore').length)

                        return;

                    txt = jQuery(anchor).text();

                    range = sel.getRangeAt(0);

                }



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

            });



        });

		return this;

	}

}