function on_doc_ready()
{   
    new Navigation().init("#navigationDiv",".specialNavDiv","assets/cloudsBackground.jpg","#leftButton","#rightButton","navRad1");

    /*$('input[name=navRad1]:radio').change(function()
                                                 {
                                                     alert("test");
                                                 });*/
    $(".radioSpan").click(function(ev){
        var radGroupName = $(ev.target).prev().attr("name");
        if(radGroupName!=null)
        {
            $('input[name='+ radGroupName + ']:radio').removeAttr("checked");

        }
        $(ev.target).prev().trigger('click');
        $(ev.target).prev().attr("checked","checked");

    });
    
    $.getJSON('js/recentWork.json', function(json){
            new Navigation2().init("#recentWorkColumnsDiv","recentWork columnThird droidFont greyFont",json,"navRad2");
    });
    
    $.getJSON('js/testimonials.json',
        function(json) {
            $(json.testimonials).each(function (i,testimonial)
                 {
                     var testimonialDiv = $(".testimonialDiv:first");
                     if(i>0){
                        testimonialDiv.clone().appendTo(testimonialDiv.parent());   
                     }
                     testimonialDiv.find(".testimonialQuote").html(testimonial.quote);
                     testimonialDiv.find(".testimonialAuthor").html(testimonial.author);
                     testimonialDiv.find(".testimonialTitle").html(testimonial.title);
                 });
            if(json.testimonials.length == 0)
                $(".testimonialDiv:first").remove();
        });
    
    /*$.get("https://api.twitter.com/1/statuses/user_timeline.rss?screen_name=MadManMathew", function(data)
          {
              alert(data);
          }
    );*/

}