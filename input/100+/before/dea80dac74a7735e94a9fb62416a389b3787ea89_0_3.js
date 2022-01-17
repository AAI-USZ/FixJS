function(){
        if(window.pageYOffset >= header_nav.intro && window.pageYOffset < header_nav.who_we_are)            //Intro
          header_nav.add_class_to_one("#nav-intro","current");
        else if(window.pageYOffset >= header_nav.who_we_are && window.pageYOffset < header_nav.what_we_do)  // Who we are
          header_nav.add_class_to_one("#nav-who-we-are","current");
        else if(window.pageYOffset >= header_nav.what_we_do && window.pageYOffset < header_nav.what_we_did) // What we do
          header_nav.add_class_to_one("#nav-what-we-do","current");
        else if(window.pageYOffset >= header_nav.what_we_did && window.pageYOffset < header_nav.contact)    // What we did
          header_nav.add_class_to_one("#nav-what-we-did","current");
        else if(window.pageYOffset >= header_nav.contact && window.pageYOffset < header_nav.thanks)         // Contact
          header_nav.add_class_to_one("#nav-contact","current");
        else if(window.pageYOffset >= header_nav.thanks)                                                    // Thanks
          header_nav.add_class_to_one("#nav-thanks","current");
      }