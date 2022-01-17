function(responseXML){
                txt='';
                // construct the html from the xml data
                x=responseXML.documentElement.getElementsByTagName("smiley");
                for (i=0;i<x.length;i++) {
                    xx=x[i].getElementsByTagName("bbcode"); 
                    try {
                        txt=txt +'<a class="bb_smiley" title="' + xx[0].firstChild.nodeValue + '" href="javascript:insert(\' ' + xx[0].firstChild.nodeValue + ' \', \'' + textID + '\' );">';
                    } catch (er) { }
                    xx=x[i].getElementsByTagName("url"); 
                    try {
                        txt=txt + xx[0].firstChild.nodeValue + '</a>';
                    } catch (er) { }
                }
                x=responseXML.documentElement.getElementsByTagName("maxsmilies");
                try {
                    maxSmilies = x[0].firstChild.nodeValue;
                } catch (er) {}
                $(smiley_overflow_area).raw().innerHTML += txt;
                //$(smiley_overflow_area).show();
                $(open_overflow_button).raw().innerHTML = "Hide smilies";
                numLoaded = opento;
                Toggle_Load_Button(numLoaded < maxSmilies, textID);
                $('#smiley_max' + textID).raw().innerHTML = maxSmilies;
                $('#smiley_count' + textID).raw().innerHTML = numLoaded;
                $(smiley_overflow_area).show();
          }