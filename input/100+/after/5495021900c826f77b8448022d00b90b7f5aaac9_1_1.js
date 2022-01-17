function jsScripts(pJSFiles_a){

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

    var CLIENT_KEYBINDING_JS='lib/client/keyBinding.js';

              

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

            /*                            

             * temporary changed dir path,

             * becouse directory lib is write

             * protected by others by default

             * so if node process is started

             * from other user (root for example

             * in nodester) we can not write

             * minified versions

             */

            if(pFileName===CLIENT_JS)

                console.log('file name of ' +

                    CLOUDFUNC_JS            +

                    ' in '                  +

                    CLIENT_JS               +

                    ' changed. size:',

                    (final_code=final_code

                        .replace('cloudfunc.js','cloudfunc.min.js')

                            .replace('keyBinding.js','keyBinding.min.js')

                                .replace('/lib/', MinFolder)

                                    .replace('/lib/client/', MinFolder)).length);

            

            

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