function(){
    var imageflow = new ImageFlow();
    imageflow.init({ 
        ImageFlowID:'instance_imageflow', 
        captions:false, 
        slider:false, 
        reflections:false, 
        imageFocusMax:2,
        reflectionP:0.4, 
        opacity:true, 
        startID:3, 
        startAnimation:true, 
        imageFocusM:1.5 ,
        circular:true,
        slideshow:true,
        slideshowAutoplay:true,
        animationSpeed:100,
        slideshowSpeed:3000,
        
        onClick: function(){
//            imageflow.Slideshow.start();
            return false;
        }
    });
}