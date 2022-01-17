function() {
    const animationDuration = 1000;
    const globalDuration = animationDuration * ($('.header-photo', '#header').size() * 2);
    launchAnimation();
    var animation = setInterval(launchAnimation, globalDuration);
    
    function launchAnimation() {
        $('#photo-1', '#header').fadeTo(animationDuration, 0.0, function() {
            $('#photo-2', '#header').fadeTo(animationDuration, 1.0, function() {
                $('#photo-2', '#header').fadeTo(animationDuration, 0.0, function() {
                    $('#photo-3', '#header').fadeTo(animationDuration, 1.0, function() {
                        $('#photo-3', '#header').fadeTo(animationDuration, 0.0, function() {
                            $('#photo-4', '#header').fadeTo(animationDuration, 1.0, function() {
                                $('#photo-4', '#header').fadeTo(animationDuration, 0.0, function() {
                                    $('#photo-5', '#header').fadeTo(animationDuration, 1.0, function() {
                                        $('#photo-5', '#header').fadeTo(animationDuration, 0.0, function() {
                                            $('#photo-1', '#header').fadeTo(animationDuration, 1.0);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}