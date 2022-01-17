function updateFullImage(href) {
    $("body").css("cursor", "wait");
    
    $('#largeImg').prop("src", href)
        .css("max-width", $("body").width())
        .css("max-height", $("body").height()).load(function() {  
          $("body").css("cursor", "auto")
        })
    
    
}