function () {
   $(".menuItem a").click(function () {
      $(".menuItem .active-link").removeClass("active-link");
      $(this).addClass("active-link");
   });

   $("#disconnectBtn").click(function () {
       $(document).trigger("disconnect");
       return false;
   });
}