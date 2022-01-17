function resizeRow( obj, row, settings ) {

        /*
        * 
        * how much over the row width are we?
        * we'll need to reduce the total image width by this amount
        * account for padding - but not on the last image
        *
        */
        var overBy = (row - settings.albumWidth) + (settings.padding*(obj.length-1)); 


        /*
        * 
        * How much do we change each image in this row by
        *
        */
        var changeBy = Math.floor( overBy / obj.length );


        /*
        * 
        * Keep track of our final row width
        * needs to be pixel perfect
        *
        */
        var trackWidth = 0;
        
        
        
        /*
        * 
        * Loop through the images in our row and resize them
        *
        */
        for (var i = 0; i < obj.length; i++) {
            

            /*
            * 
            * This is the final calculated width of this image
            *
            */
            var fw = obj[i][1] - changeBy;


            /*
            * 
            * This is the final calculated height of this image
            * all images in the row should be the same height so we only need to calculate it on the first image
            * the height is calculated using the % change of row width
            * i.e. if we had to resize the row to make it smaller by 20% then this image needs to be 20% smaller
            *
            */
            var fh = (typeof fn == 'undefined') ? Math.round(obj[i][2]*(settings.albumWidth/row)) : fh;
            


            /*
            * 
            * Fine tune the width of the last image in the row
            * not ideal, but this one may need to shrink or expand by a pixel to get it perfect
            *
            */
            if( i == obj.length - 1 && (trackWidth + fw) > settings.albumWidth && obj.length ){
                fw = fw - ( (trackWidth + fw) - settings.albumWidth  );
            }
            
            
            
            /*
            * 
            * Tracking the width of the current row
            *
            */
            trackWidth += fw + settings.padding;


            /*
            * 
            * Set the width of the image
            *
            */
            $(obj[i][0]).width(fw);


            /*
            * 
            * Set the height of the image
            *
            */
            $(obj[i][0]).height(fh);
            
            
            
            /*
            * 
            * Apply the padding, but not to the last image in the row
            *
            */
            if( i < obj.length - 1 ){
                $(obj[i][0]).css("padding-right", settings.padding + "px");
            }
            
            $(obj[i][0]).css("padding-bottom", settings.padding + "px");
            
            
            /*
            * 
            * Fade the image in
            *
            */
            $(obj[i][0]).animate({opacity: '1'},{duration: settings.fadeSpeed});
            //$(obj[i][0]).fadeIn(settings.fadeSpeed);
        }
    
    }