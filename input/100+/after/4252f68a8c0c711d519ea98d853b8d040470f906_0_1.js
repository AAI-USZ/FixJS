function(key) {
      setGalleriesEnabled(false);
      if(sectionCache[key]) {
        $('#demo-sections > div.section').hide();
        sectionCache[key].fadeIn('slow');

        activeSectionKey = key;
        setGalleriesEnabled(true);

        var flowgallery = sectionCache[key].find('div.demo ul').data('flowgallery');
        flowgallery.jump(0, false);

        // refocus selected demo
        $('#nav a[href=#demos]').click();
      } else {
        loadContent(key);
      }
    }