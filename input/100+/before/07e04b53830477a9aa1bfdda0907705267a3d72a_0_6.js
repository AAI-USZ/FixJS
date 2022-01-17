function () {
    // this function can be executed in different contexts,
    // so using the full selector here
    var filterBy = $("div#filter-status option:selected").val();

    // Filtering by failing checks
    if (filterBy == "checks") {
      // Get actual failing checks
      var optGroups = PTL.editor.getCheckOptions();

      // If there are any failing checks, add them in a dropdown
      if (optGroups.length) {
        var dropdown = '<div id="filter-checks" class="toolbar-item">';
        dropdown += '<select name="filter-checks">';
        dropdown += '<option selected="selected" value="none">------</option>';

        $.each(optGroups, function () {
          dropdown += '<optgroup label="' + this.category_display + '">';
          $.each(this.checks, function () {
            dropdown += '<option value="' + this.name + '">' + this.name + ' (' + this.count + ')</option>';
          });
          dropdown += '</optgroup>';
        });

        dropdown += '</select></div>';

        $("div#filter-status").first().after(dropdown);
      } else { // No results
        // TODO: i18n
        PTL.editor.displayError("No results.");
        $("#filter-status option[value=" + PTL.editor.filter + "]")
          .attr("selected", "selected");
      }
    } else { // Normal filtering options (untranslated, fuzzy...)
      $("div#filter-checks").remove();
      if (!PTL.editor.preventNavigation) {
        var newHash = "filter=" + filterBy;
        $.history.load(newHash);
      }
    }
  }