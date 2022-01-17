function( $ ) {


  $.fn.collagePlus = function( options ) {
  
    // Defaults
    var settings = $.extend( {
        // the ideal height you want your images to be
        'targetHeight'    : 400,
        // width of the area the collage will be in
        'albumWidth'      : this.width(),
        // padding between the images
        'padding'         : 5,
        // object that contains the images to collage
        'images'          : $('img', $(this)),
        // how quickly you want images to fade in once ready can be in ms, "slow" or "fast"
        'fadeSpeed'       : "fast"
    }, options);

    return this.each(function() {
        
        /*
        * 
        * set up vars
        *
        */
        
        // track row width
        var row         = 0;
        
        // collect elements to be resized in current row
        var elements    = [];


        settings.images.each(
            function(index){

            
                /*
                * 
                * get the current image size
                *
                */
                var w = $(this).width();
                var h = $(this).height();
                


                /*
                * 
                * caculate the w/h based on target height
                * this is out ideal size, but later we'll resize to make it fit
                *
                */
                var nw = Math.ceil(w/h*settings.targetHeight);
                var nh = Math.ceil(settings.targetHeight);


                /*
                * 
                * if a single image is wider than a row force a new row 
                * then also complete the existing row this larger image was meant to be part of
                *
                */
                if( nw > settings.albumWidth ){
                
                    // call the method that caclulates the final image sizes
                    resizeRow(elements, row, settings);

                    // reset our row
                    delete row;
                    delete elements;
                    row         = 0;
                    elements    = [];
                }
                
                
                /*
                * 
                * Keep track of what's in our row so far
                *
                */
                elements.push( [this, nw, nh] );
                

                /*
                * 
                * what is the total width of our row so far
                *
                */
                row += ( index < elements.length - 1 ) ? nw + settings.padding : nw;
                

                /*
                * 
                * if the current row width is wider than the parent container
                * it's time to make a row out of our images
                *
                */
                if( row > settings.albumWidth ){

                    
                    // call the method that caclulates the final image sizes
                    resizeRow(elements, row, settings);
    
                    // reset our row
                    delete row;
                    delete elements;
                    row         = 0;
                    elements    = [];
                }
                

                /*
                * 
                * if the images left are not enough to make a row
                * then we'll force them to make one anyway
                *
                */
                if ( settings.images.length-1 == index && elements.length != 0){
                    resizeRow(elements, row, settings);
                }
            }
        );
        
    });



    /*
    * 
    * This is the private function that does the resizing of the images in the row
    *
    */
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
            $(obj[i][0]).fadeIn(settings.fadeSpeed);
        }

                
    }



  };
}