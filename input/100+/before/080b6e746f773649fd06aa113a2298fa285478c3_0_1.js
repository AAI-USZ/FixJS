function jsScripts(pJSFiles_a, pMoreProcessing_o){

    'use strict';

    /* подключаем модуль uglify-js

     * если его нет - дальнейшая 

     * работа функции не имеет смысла

     */

    try{

        var jsp = require("uglify-js").parser;

        var pro = require("uglify-js").uglify;

    }catch(error){

        console.log('can\'n load uglify-js\n'                  +

            'to use js-minification you need to install uglify-js\n'    +

                'npm install uglify-js\n'                               +

                'https://github.com/mishoo/UglifyJS');

        return false;

    }

    /* Константы */        

    var CLIENT_JS='client.js';

    var CLOUDFUNC_JS='lib/cloudfunc.js';        

    

    if(typeof pJSFiles_a === "string")

        pJSFiles_a=[pJSFiles_a];

    

    var dataReaded_f=function(pFileName, pData){

            console.log('file ' + pFileName + ' readed');

            

            /*********************************/

            /* сжимаем код через uglify-js */

            var uglify_js=function(pDdata){

                var orig_code = pDdata.toString();

                var ast = jsp.parse(orig_code); // parse code and get the initial AST

                ast = pro.ast_mangle(ast); // get a new AST with mangled names

                ast = pro.ast_squeeze(ast); // get an AST with compression optimizations

                var result_code = pro.gen_code(ast); // compressed code here

                return result_code;

            };

            /*********************************/

            var final_code=uglify_js(pData);

            

            var minFileName=pFileName.replace('.js','.min.js');

            

            /* если мы сжимаем client.js -

             * меняем строку cloudfunc.js на

             * cloudfunc.min.js и выводим сообщение

             *

             * меняем строку keyBinding.js на

             * keyBinding.min.js

             * если другой файл - ничего не деалем

             */             

            

            /* if pMoreProcessing_o seeted up 

             * and function associated with

             * current file name exists -

             * run it

             */

            if(pMoreProcessing_o                    &&    

                pMoreProcessing_o.Name===pFileName  && 

                pMoreProcessing_o.Func              &&

                typeof pMoreProcessing_o.Func === "function"){

                    final_code=pMoreProcessing_o.Func(final_code);

            }                   

            

            /* minimized file will be in min file

             * if it's possible if not -

             * in root

             */

            minFileName = MinFolder + path.basename(minFileName);

            /* записываем сжатый js-скрипт*/

            fs.writeFile(minFileName, final_code, fileWrited(minFileName));

        };

    

    /* moving thru all elements of js files array */

    for(var i=0;pJSFiles_a[i];i++){

        console.log('reading file ' + pJSFiles_a[i]+'...');

        fs.readFile(pJSFiles_a[i],fileReaded(pJSFiles_a[i],dataReaded_f));

    }

        

    return true;

}