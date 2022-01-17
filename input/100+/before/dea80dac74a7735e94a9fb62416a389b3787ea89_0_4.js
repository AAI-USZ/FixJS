function(event){
        var new_pos = header_nav.intro;
        switch($(this).attr("id")) {
          case "nav-intro":
            new_pos = header_nav.intro;
            break;
          case "nav-who-we-are":
            new_pos = header_nav.who_we_are;
            break;
          case "nav-what-we-do":
            new_pos = header_nav.what_we_do;
            break;
          case "nav-what-we-did":
            new_pos = header_nav.what_we_did;
            break;
          case "nav-contact":
            new_pos = header_nav.contact;
            break;
          case "nav-thanks":
            new_pos = header_nav.thanks;
            break;
          default:
            new_pos = header_nav.intro;
        }
        $("body").animate({scrollTop:new_pos}, 1000);

        event.preventDefault();
      }