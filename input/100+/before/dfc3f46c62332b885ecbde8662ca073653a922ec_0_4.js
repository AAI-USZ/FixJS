function(e) {

    lookmarker.updatePreferences(); // get current service Url of the PreferenceMananger..

    // 

    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);

    var selectedText = getCursorSelection();

    var currentUrl = getCurrentURL();

    var title = getCurrentPageTitle();

    if (selectedText == "") {

      // just bookmark this page as a web resource for me..

      lookmarker.onToolbarButtonCommand(e);

    } else {

      var title = getCurrentPageTitle();

      var check = {value: false};                  // default the checkbox to false

      var input = {value: title};                  // default the edit field to Bob

      // FIXME: noteTitle is defined when i wouldn`t expect it.. method call always returns something..

      var noteTitle = promptService.prompt(null, "Title of this Notice", "Give your selection a proper title: ", input, null, check);

      // result is true if OK is pressed, false if Cancel. input.value holds the value of the edit field if "OK" was pressed

      if (noteTitle) {

        // bookmark the resource, take a note and relate both with each other..

        // createRelatedWebTopic(currentUrl, title, selectedText);

        createRelatedWebTopic(currentUrl, input.value, selectedText);

        // Components.utils.reportError("DEBUG: created relate Note: " + input.value + " and Resource ("+currentUrl+") ");

        lookmarker.statusLabel.value = lookmarker.statussavedNote;

      } else {

        Components.utils.reportError("ERROR: associating Note-to-Resource aborted...");

        // lookmarker.statusLabel.value = lookmarker.statusnotsavedNote;

      }

    }

  }