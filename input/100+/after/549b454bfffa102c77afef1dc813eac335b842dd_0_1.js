function() {
    if (window.File && window.FileReader) {
      $('#image-loader').change(onFileSelected);
      $('#offset').change(onOffsetChange);
      $('#ratio').change(onRatioChange);
      $('#dropdown-height, #dropdown-width').children('.dropdown-menu').find('a').click(onDimensionChange);
      $('a', '#heightmaps').click(function(event) {
        event.preventDefault();
        return setActiveField($(event.target).parent('li'));
      });
      $('#clear').click(onClearClick);
      $('#export').click(onExportClick);
      $('#output-text').focus(function() {
        return $(this).select();
      });
      alertBox("info", "Hi there!", "To get generating heightmaps, pick a map size, select a field, and import some images! The preview box will update to show you\nwhat the map will look like - feel free to change some of the advanced variables to get closer to what you want. When you're done, hit Export, and copy the wall of text into data/init/world_gen.txt");
      return clearWorldState();
    } else {
      return alertBox("error", "Uh oh", "- your browser doesn't support features that this app requires! Please switch to something more modern and we can get on with it.");
    }
  }