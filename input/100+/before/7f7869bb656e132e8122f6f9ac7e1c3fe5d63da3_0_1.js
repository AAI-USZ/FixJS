function(){
  $("section h1, section h2").each(function(){
    $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
    $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
    $("nav ul li:first-child a").parent().addClass("active");
  });
  
  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 20;
    var scroll = function(element) {
      $(element).animate({scrollTop: position}, 400);
    };
    scroll("html");
    scroll("body");
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();    
  });
  
  sectionHeight();
  
  $('img').load(sectionHeight);
}