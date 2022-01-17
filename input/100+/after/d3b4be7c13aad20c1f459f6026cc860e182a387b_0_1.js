function(context) {
      var isProfileBack = false;
      var isProfileSearch = false;
      var isSchool = false;
      //alert(typeof Drupal.settings.lic_profile);

      if (typeof Drupal.settings.lic_profile != 'undefined'){
        isProfileBack = Drupal.settings.lic_profile.back;
      }
      if (typeof Drupal.settings.lic != 'undefined'){
        isSchool = Drupal.settings.lic.school;
      }
      if (typeof Drupal.settings.lic_search != 'undefined'){
        isProfileSearch = Drupal.settings.lic_search.profile;
      }
      
      if (isProfileSearch) {
        $('#region-content h1#page-title').append('<a class="back" href="'+ Drupal.settings.lic_search.url +'"> ' + Drupal.t('Promote profile') + '</a>');
      }

      if (isProfileBack) {
        $('#region-content h1#page-title', context).append('<a class="back" href="#"> << ' + Drupal.t('Back to Search Results') + '</a>');
        $('a.back').click(function(){
          parent.history.back();
          return false;
        });
      }

      if (isSchool){
        $('#region-content h1#page-title').append('<a class="back" href="'+ Drupal.settings.lic.url +'"> ' + Drupal.t('Promote my School') + '</a>');
      }

      $(".show-menu").click(function(e){
          e.preventDefault();
          if($(".show-menu").hasClass("menu-open")){
               $(".show-menu").removeClass("menu-open");
               $("ul#display-menu.children").hide();
           
          } else {
             $("ul#display-menu.children").show();
             $(".show-menu").addClass("menu-open");
          }
      });

      $("ul#display-menu.children").mouseup(function() {
        return false
      });
      $(".show-menu").mouseup(function() {
        return false
      });
      $(document).mouseup(function(e){
        if($(e.target).parent("a.show-menu").length==0){
          $(".show-menu").removeClass("menu-open");
          $("ul#display-menu.children").hide();
        }
      });
    }