function updateFullImage(id) {
    $("body").css("cursor", "wait");
    img = "Image__"+id ;
    
    imgTag = $('#largeImg').prop("src", img)
        .css("max-width", $("body").width())
        .css("max-height", $("body").height()).load(function() {  
          $("body").css("cursor", "auto")
        })
    
    
}