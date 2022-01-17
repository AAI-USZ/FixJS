function jsScripts(pJSFiles_a, pMoreProcessing_o, pCache_b){

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

    

    /* if passed string, or object 

     * putting it to array

     */

    if(typeof pJSFiles_a !== "array")

        pJSFiles_a=[pJSFiles_a];

    

    var dataReaded_f=function(pFileName, pData){

        /*

         * if postProcessing function exist

         * getting it from pFileName object

         */

        var lMoreProcessing_f;

        if(typeof pFileName === 'object'){

            var lName;

            for(lName in pFileName){

                break;

            }

            lMoreProcessing_f = pFileName[lName];            

            pFileName = lName;

        }

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

        

        /* if lMoreProcessing_f seeted up 

         * and function associated with

         * current file name exists -

         * run it

         */

        if(lMoreProcessing_f                    &&    

            typeof lMoreProcessing_f === "function"){

                final_code = lMoreProcessing_f(final_code);

        }                   

                    

        minFileName = path.basename(minFileName);

        /* записываем сжатый js-скрипт

         * в кэш если установлен pCache_b

         * или на диск, если не установлен

         */

        if(pCache_b){

            exports.Cache[minFileName] = final_code;

            console.log('file ' + minFileName + ' saved to cache...');

        }

        else{

            /* minimized file will be in min file

             * if it's possible if not -

             * in root

             */

            minFileName = MinFolder + minFileName;

            

            fs.writeFile(minFileName, final_code, fileWrited(minFileName));

        }

    };

    

    /* moving thru all elements of js files array */

    for(var i=0; pJSFiles_a[i]; i++){

        /* if postProcessing function exist

         * getting file name and passet next

         */

        var lName;

        if(typeof pJSFiles_a[i] === 'object'){

            for(lName in pJSFiles_a[i]){

                break;

            }

        }else lName = pJSFiles_a[i];

        console.log('reading file ' + lName + '...');        

        

        fs.readFile(lName, fileReaded(pJSFiles_a[i],dataReaded_f));

    }

        

    return true;

}