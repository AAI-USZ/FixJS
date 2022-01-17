function(pReq, pRes)

{

    /* Читаем содержимое папки,

        переданное в url

    */

    var url = require("url");

    var pathname = url.parse(pReq.url).pathname;

    console.log('pathname: '+pathname);

    

     /* получаем поддерживаемые браузером кодировки*/

     var lAcceptEncoding = pReq.headers['accept-encoding'];

    /* запоминаем поддерживает ли браузер

     * gzip-сжатие при каждом обращении к серверу

     * и доступен ли нам модуль zlib

     */ 

    if (lAcceptEncoding && 

        lAcceptEncoding.match(/\bgzip\b/) &&

        Zlib){

        this.Gzip=true;

    }else 

        this.Gzip=false;

    /* путь в ссылке, который говорит

     * что js отключен

     */

    var lNoJS_s=CloudFunc.NOJS;

    var lFS_s=CloudFunc.FS;

    

    if(pathname!=='/favicon.ico')

    {    

        console.log("request for " + pathname + " received...");

        var lName;

                        

        /* если в пути нет информации ни о ФС,

         * ни об отсутствии js,

         * ни о том, что это корневой

         * каталог - загружаем файлы проэкта

         */

        if(pathname.indexOf(lFS_s)<0 &&

            pathname.indexOf(lNoJS_s)<0 &&

            pathname!=='/'){

            /* если имена файлов проекта - загружаем их*/  

            /* убираем слеш и читаем файл с текущец директории*/

            

            /* добавляем текующий каталог к пути */

            lName='.'+pathname;

            console.log('reading '+lName);

            /* сохраняем указатель на responce и имя */

            CloudServer.Responses[lName]=pRes;

            

            /* Берём значение из кэша

             * сжатый файл - если gzip-поддерживаеться браузером

             * не сжатый - в обратном случае

             */

            var lFileData=CloudServer.Cache.get(

                CloudServer.Gzip?(lName+'_gzip'):lName);

            console.log(Path.basename(lName));

                        

            var lMinify=CloudServer.Minify;

            

            /* object thet contains information

             * about the source of file data

             */

            var lFromCache_o={'cache': true};

            

            /* if cache is empty and Cache allowed and Minify_allowed 

             * and in Minifys cache is files, so save it to

             * CloudServer cache

             */

            if(!lFileData &&  

                lMinify._allowed){

                    console.log('trying to read data from Minify.Cache');

                    lFromCache_o.cache=false;

                    lFileData = CloudServer.Minify.Cache[

                        Path.basename(lName)];                    

            }

            var lReadFileFunc_f=CloudServer.getReadFileFunc(lName);

            /* если там что-то есть передаём данные в функцию

             * readFile

             */

            if(lFileData){                

                /* if file readed not from cache - 

                 * he readed from minified cache 

                 */

                if(lFromCache_o.cache===false)

                    lFromCache_o.minify=true;

                else

                    lFromCache_o.minify=false;

                    

                console.log(lName + ' readed from cache');

                /* передаём данные с кэша,

                 * если gzip включен - сжатые

                 * в обратном случае - несжатые

                 */

                lReadFileFunc_f(undefined,lFileData,lFromCache_o);

            }

            else Fs.readFile(lName,lReadFileFunc_f);

            

        }else{/* если мы имеем дело с файловой системой*/

            /* если путь не начинаеться с no-js - значит 

             * js включен

             */

            /* убираем пометку cloud, без которой c9.io

             * не работает поскольку путь из двух слешей

             * (/fs/no-js/) - очень короткий, нужно

             * длиннее

             */

            

            if(pathname.indexOf(lNoJS_s)!==lFS_s.length && pathname!=='/'){

                CloudServer.NoJS=false;

            }else pathname=pathname.replace(lNoJS_s,'');

            

            /* убираем индекс файловой системы */

            if(pathname.indexOf(lFS_s)===0){

                pathname=pathname.replace(lFS_s,'');

                /* если посетитель только зашел на сайт

                 * no-js будет пустым, как и fs

                 */                       

            /* если в пути нету fs - посетитель только зашел на сайт

             * загружаем его полностью.

             */

            }else CloudServer.NoJS=true;

            /* если в итоге путь пустой

             * делаем его корневым

             */                         

            if(pathname==='')pathname='/';

            

            RightDir=pathname;

            LeftDir=pathname;

            

            /* если встретиться пробел - 

             * меня код символа пробела на пробел

             */

            

            LeftDir=CloudFunc.replaceSpaces(LeftDir);

            RightDir=CloudFunc.replaceSpaces(RightDir);

            

            /* Проверяем с папкой ли мы имеем дело */

            

            /* читаем сновные данные о файле */

            var lStat;

            try{

                lStat=Fs.statSync(LeftDir);

            }catch(error){

                console.log(error);

                CloudServer.Responses[LeftDir]=pRes;

                CloudServer.sendResponse('OK',error.toString(),LeftDir);

            }

            /* если это каталог - 

             * читаем его содержимое

             */

            try{                    

                /* если установлено сжатие

                 * меняем название html-файла и

                 * загружаем сжатый html-файл в дальнейшем

                 */

                CloudServer.INDEX=(CloudServer.Minify._allowed.html?

                    '.' + CloudServer.Minify.MinFolder + 'index.min.html'

                    :CloudServer.INDEX);

                /*

                 * сохраним указатель на response

                 */            

                CloudServer.Responses[CloudServer.INDEX]=pRes;

                

                if(lStat.isDirectory())

                    Fs.readdir(LeftDir,CloudServer._readDir);

                /* отдаём файл */

                else if(lStat.isFile()){

                    CloudServer.Responses[LeftDir]=pRes;

                    Fs.readFile(LeftDir,CloudServer.getReadFileFunc(LeftDir));

                    console.log('reading file: '+LeftDir);

                }

            }catch(error){console.log(error);}

        }

    }

}