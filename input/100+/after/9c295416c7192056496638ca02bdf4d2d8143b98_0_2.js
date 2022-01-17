function(){ /* function loads CodeMirror js and css files */

          

        /* function loads css files

         * of CodeMirror

         */

        var load_all = function(pParent) {

            return function(){

                CloudCommander.cssLoad({

                    src     : 'http://codemirror.net/lib/codemirror.css',

                    element : document.head

                });

              

                CloudCommander.cssLoad({

                    src     : 'http://codemirror.net/theme/night.css',

                    element : document.head

                });

              

                CloudCommander.cssSet({id:'editor',

                    inner : '.CodeMirror{'                          +

                                'font-family:\'Droid Sans Mono\';'  +

                                'font-size:15px;'                   +

                                'resize:vertical;'                  +

                                'padding:20px;'                     +

                            '}'                                     +

                            '.CodeMirror-scroll{'                   +

                                'height: 660px;'                    +

                            '}'                                     +                           

                            '.CodeMirror-scrollbar{'                +

                                 'overflow-y:auto'                  +

                            '}'

                });  

                          

                var lShowEditor_f = function (){

                    if (!document.getElementById('CloudEditor')) {

                        var lEditor=document.createElement('div'); 

                        lEditor.id ='CloudEditor';

                        lEditor.className = 'hidden';

                        var lFM = document.getElementById('fm');

                        

                        if(lFM){

                          lFM.appendChild(lEditor);

                        

                            CodeMirror(lEditor,{

                                mode        : "xml",  

                                htmlMode    : true,

                                theme       : 'night',

                                lineNumbers : true,

                                //переносим длинные строки

                                lineWrapping: true,

                                extraKeys: {

                                  //Сохранение

                                  "Esc": pParent.hide(pParent)

                                }

                            });

                        }else console.log('Error. Something went wrong FM not found');

                    }

                };

                CloudCommander.jsload('http://codemirror.net/mode/xml/xml.js', lShowEditor_f);

            };

        }

        

        /* load CodeMirror main module */

        CloudCommander.jsload('http://codemirror.net/lib/codemirror.js', load_all(this));

    }