function() {

    CKEDITOR.plugins.wordcount = {

    };

    

    var plugin = CKEDITOR.plugins.wordcount;

    

    /**

    * Shows the word count in the DIV element created via setTimeout()

    * 

    * @param obj CKEditor Editor Object

    */

    function ShowWordCount(evt) {

        var editor = evt.editor;

        if ($('div#cke_wordcount_'+editor.name).length > 0) { // Check element exists

            // Because CKEditor uses Javascript to load parts of the editor, some of its elements are not immediately available in the DOM

            // Therefore, I use setTimeout.  There may be a better way of doing this.

            setTimeout(function() {

                var wordCount = GetWordCount(editor.getData());

                if (editor.config.wordcount_maxWords > 0) {

                    // Display with limit

                    $('div#cke_wordcount_'+editor.name).html('Word Count: '+wordCount+'/'+editor.config.wordcount_maxWords);

                } else {

                    // Just display word count

                    $('div#cke_wordcount_'+editor.name).html('Word Count: '+wordCount); 

                }

                

                // Check we are within word limit

                if (wordCount > editor.config.wordcount_maxWords) {

                    $('div#cke_wordcount_'+editor.name).css('color', 'red');

                    editor.execCommand('undo'); 

                } else if (wordCount == editor.config.wordcount_maxWords)  {

                    // Create an undo snapshot as we are on the word limit - next word entered will be undone to return

                    // to this snapshot point.

                    editor.fire('saveSnapshot');

                    $('div#cke_wordcount_'+editor.name).css('color', 'red');

                } else {

                    $('div#cke_wordcount_'+editor.name).css('color', 'black');

                }

            }, 500);

        }

    }

    

    /**

    * Takes the given HTML data, replaces all its HTML tags with nothing, splits the result by spaces, 

    * and outputs the array length i.e. number of words.

    * 

    * @param string htmlData HTML Data

    * @return int Word Count

    */

    function GetWordCount(htmlData) {

        return htmlData.replace(/<(?:.|\s)*?>/g, '').split(' ').length;    

    }

   

    /**

    * Adds the plugin to CKEditor

    */

    CKEDITOR.plugins.add('wordcount', {

        init: function(editor) {

            // Word Count Limit

            editor.config.wordcount_maxWords = $('input[name='+editor.name+'WordCount]').val();

            

            // Word Count Label - setTimeout used as this element won't be available until after init

            setTimeout(function() {

                if (editor.config.wordcount_maxWords > 0) { 

                    // Display with limit

                    $('td#cke_bottom_'+editor.name).append('<div id="cke_wordcount_'+editor.name+'" style="display: inline-block; float: right; text-align: right; margin-top: 5px; cursor:auto; font:12px Arial,Helvetica,Tahoma,Verdana,Sans-Serif; height:auto; padding:0; text-align:left; text-decoration:none; vertical-align:baseline; white-space:nowrap; width:auto;">Word Count: '+GetWordCount(editor.getData())+'/'+editor.config.wordcount_maxWords+'</div>');

                } else {

                    // Just display word count

                    $('td#cke_bottom_'+editor.name).append('<div id="cke_wordcount_'+editor.name+'" style="display: inline-block; float: right; text-align: right; margin-top: 5px; cursor:auto; font:12px Arial,Helvetica,Tahoma,Verdana,Sans-Serif; height:auto; padding:0; text-align:left; text-decoration:none; vertical-align:baseline; white-space:nowrap; width:auto;">Word Count: '+GetWordCount(editor.getData())+'</div>');

                }

            }, 4000);

                                                                                                                        

            editor.on('key', ShowWordCount);

        }

    });

}