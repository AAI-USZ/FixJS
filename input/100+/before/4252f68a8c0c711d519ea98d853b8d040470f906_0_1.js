function(key) {
      console.log("aaaaaaaaaaaaaa");
      setGalleriesEnabled(false);
      if(sectionCache[key]) {
        $('#demo-sections > div.section').hide();
        sectionCache[key].fadeIn('slow');

        activeSectionKey = key;
        setGalleriesEnabled(true);

        var flowgallery = sectionCache[key].find('div.demo ul').data('flowgallery');
        flowgallery.goto(0, false);

        console.log("flowgall: ", flowgallery, flowgallery.getOptions());
        // refocus selected demo
        $('#nav a[href=#demos]').click();
      } else {
        loadContent(key);
      }
    }