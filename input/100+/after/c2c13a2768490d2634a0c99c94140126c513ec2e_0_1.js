function(){

 // $('#videolist a').live('click', function(e) {
 //    var click, data;
 //    e.preventDefault();
 //    click = $(this);
 //    data = click.data('yt-id');
 //    log(data);

 //    $('#videolist a').removeClass('active');

 //  });

    $('#videolist a:first-child').addClass('active');

    $('#videolist a').live('click', function(e) {
    var click, data;
    e.preventDefault();
    click = $(this);
    data = click.data('yt-id');
    // log(data);
    $('#video-wrap').html('<iframe frameborder="0" allowfullscreen="" id="yt-video-player" class="yt" title="YouTube video player" height="308" width="533" src="https://www.youtube.com/embed/'+ data +'?wmode=transparent&amp;rel=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fe3-2012.herokuapp.com"></iframe>');

    $('#videolist a').removeClass('active');
    $(click).addClass('active');

    });
  


    $('.terms-main').click(function(e){
        // var $target = $('html,body'); 
        e.preventDefault();
        $('.legal-text').toggle('slow');
        FB.Canvas.setAutoResize();
        

        // $target.animate({scrollTop: $target.height()}, 1000, function(){
        //     FB.Canvas.setAutoResize();
        // });
         
    });

    var pc_font_swap;
    pc_font_swap = function() {
      if (navigator.appVersion.indexOf("Win") !== -1) {
        return $('body').addClass('pc');
      }
    };
    return pc_font_swap();

}