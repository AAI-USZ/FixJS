function(pFileName, pData){

        console.log('file ' + pFileName + ' readed');                

        /*********************************/

        /* сжимаем код через clean-css */

        var clean_css=function(pData){

            /* Сохраняем весь стиль в одну переменную*/            

            return cleanCSS.process(pData);

        };

        /*********************************/

        var final_code=clean_css(pData);

        

        lAllStyle+=final_code;

        

        var minFileName=pFileName.replace('.css','.min.css');           

           

        if(pFileName===STYLE_CSS)lStyleCssDone=true;

        if(pFileName===RESET_CSS)lResetCssDone=true;

        /* if all files writed we

         * save all minimized css 

         * to one file all.min.css

         */

        /* если включена конвертация картинок в base64

         * вызываем её

         */

        if(lStyleCssDone && lResetCssDone)

            if(pImgConvertToBase64_b)

                base64_images(lAllStyle);

        else

            fs.writeFile(CSSDIR+'all.min.css', lAllStyle, fileWrited('all.min.css'));

         

         /* записываем сжатый css файл*/        

        else fs.writeFile(minFileName, final_code, fileWrited(minFileName));

    }