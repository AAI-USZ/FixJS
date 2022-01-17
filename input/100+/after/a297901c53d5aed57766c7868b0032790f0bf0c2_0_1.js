function() {
        var modelsvg;
        var fillcolor = {};
        var blocks = ['seg', 'val', 'act', 'res', 'par', 'rev', 'cos', 'cha', 'rel', 'ind', 'tre', 'mac', 'mar'];

        jQuery(this).css('border', 'none');
        jQuery(this).css('padding', '15px 5px 5px 100px');
        jQuery(this).css('position', 'relative');
        jQuery(this).css('min-height', '50px');

        for (var key in blocks) {
            if (jQuery(this).hasClass(blocks[key])) {
                fillcolor[blocks[key]] = "000000";
            }
            else if (jQuery(this).hasClass(blocks[key]+'-h')) {
                fillcolor[blocks[key]] = "ED1F24";
            }
            else {
                if (jQuery.inArray(blocks[key], ['ind', 'tre', 'mac', 'mar']) > -1) {
                    fillcolor[blocks[key]] = "f0f0f0";
                } else {
                    fillcolor[blocks[key]] = "d0d0d0";
                }
            }
        }
        
        modelsvg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80.875px" height="72.501px" viewBox="-17.188 -18.029 80.875 72.501" enable-background="new -17.188 -18.029 80.875 72.501" xml:space="preserve">';
        
        //par
        modelsvg += '<rect fill="#'+fillcolor['par']+'" width="7.375" height="25.625"/>';
        //seg
        modelsvg += '<rect x="38.375" fill="#'+fillcolor['seg']+'" width="7.375" height="25.625"/>';
        //val
        modelsvg += '<rect x="19.062" y="0.125" fill="#'+fillcolor['val']+'" width="7.375" height="25.625"/>';
        modelsvg += '<rect x="9.5" fill="#'+fillcolor['act']+'" width="7.375" height="11.625"/>';
        //act
        modelsvg += '<rect x="9.5" y="14.125" fill="#'+fillcolor['res']+'" width="7.375" height="11.625"/>';
        //cha
        modelsvg += '<rect x="28.625" y="14.125" fill="#'+fillcolor['cha']+'" width="7.375" height="11.625"/>';
        //rel
        modelsvg += '<rect x="28.5" fill="#'+fillcolor['rel']+'" width="7.375" height="11.625"/>';
        //cos
        modelsvg += '<rect y="27.875" fill="#'+fillcolor['cos']+'" width="21.875" height="7.188"/>';
        //rev
        modelsvg += '<rect x="24" y="27.875" fill="#'+fillcolor['rev']+'" width="21.875" height="7.188"/>';
        //ind
        modelsvg += '<path fill="#'+fillcolor['ind']+'"" d="M-5.995,20.749l0.024,0.024l5.229-5.377l-5.377-5.228l-0.024,0.024c-2.706-2.15-6.655-1.941-9.116,0.59 c-2.623,2.697-2.562,7.011,0.135,9.634C-12.593,22.877-8.64,22.974-5.995,20.749z"/>';
        //mar
        modelsvg += '<path fill="#'+fillcolor['mar']+'" d="M52.494,10.314l-0.023-0.024l-5.229,5.377l5.377,5.229l0.023-0.024c2.707,2.15,6.656,1.941,9.117-0.59 c2.622-2.697,2.562-7.011-0.136-9.634C59.093,8.186,55.14,8.089,52.494,10.314z"/>';
        //tre
        modelsvg += '<path fill="#'+fillcolor['tre']+'" d="M17.45-6.934l-0.025,0.023l5.278,5.329l5.329-5.277l-0.024-0.024c2.201-2.666,2.066-6.619-0.418-9.127 c-2.647-2.672-6.961-2.694-9.635-0.045C15.447-13.572,15.275-9.621,17.45-6.934z"/>';
        //mac
        modelsvg += '<path fill="#'+fillcolor['mac']+'" d="M28.05,43.377l0.024-0.022l-5.278-5.329l-5.329,5.277l0.024,0.024c-2.201,2.666-2.066,6.618,0.418,9.127 c2.647,2.673,6.961,2.694,9.635,0.046C30.053,50.015,30.225,46.064,28.05,43.377z"/>';
        
        modelsvg += '</svg>';

        div = jQuery("<div>");
        div.html(modelsvg);
        div.css('position', 'absolute');
        div.css('top', 0);
        div.css('left', '0px');
      
        jQuery(this).append(div);

    }