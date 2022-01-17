function(pDdata){

    

    /* подключаем модуль uglify-js

     * если его нет - дальнейшая 

     * работа функции не имеет смысла

     */

    var jsp;

    var pro;

    try{

        jsp = require("uglify-js").parser;

        pro = require("uglify-js").uglify;

    }catch(error){

        console.log('can\'n load uglify-js\n'                  +

            'to use js-minification you need to install uglify-js\n'    +

                'npm install uglify-js\n'                               +

                'https://github.com/mishoo/UglifyJS');

        return false;

    }

                

    var orig_code = pDdata.toString();

    var ast = jsp.parse(orig_code); // parse code and get the initial AST

    ast = pro.ast_mangle(ast); // get a new AST with mangled names

    ast = pro.ast_squeeze(ast); // get an AST with compression optimizations

    var result_code = pro.gen_code(ast); // compressed code here

    return result_code;

}