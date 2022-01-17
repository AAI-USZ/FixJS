function (options) {

    /* Default settings */
    this.settings = {
      secure: false,
      mt: []
    };
    /* Merge given options with default settings */
    if (options) {
      $.extend(this.settings, options);
    }

    /* Initialize variables */
    this.units = {};
    this.store = $("#pootle_path").text();
    this.directory = $("#directory").text();
    this.currentPage = 1;
    this.currentNumPages = 0;
    this.pagesGot = {};
    this.filter = "all";
    this.checks = [];
    this.ctxGap = 0;
    this.ctxQty = parseInt($.cookie('ctxQty')) || 1;
    this.ctxStep= 1;
    this.keepState = false;
    this.preventNavigation = false;

    this.isLoading = true;
    this.showActivity();

    /* Currently active search fields */
    this.searchFields = [];
    /* Valid search field options */
    this.searchOptions = ['source', 'target', 'notes', 'locations'];

    /* Regular expressions */
    this.cpRE = /^(<[^>]+>|\[n\|t]|\W$^\n)*(\b|$)/gm;
    this.escapeRE = /<[^<]*?>|\r\n|[\r\n\t&<>]/gm;
    this.whitespaceRE = /^ +| +$|[\r\n\t] +| {2,}/gm;
    this.searchRE = /^in:.+|\sin:.+/i;

    /* History requests handler */
    this.historyReq = null;

    /* TM requests handler */
    this.tmReq = null;

    /* Differencer */
    this.differencer = new diff_match_patch();

    /* Compile templates */
    this.tmpl = {vUnit: $.template($("#view_unit").html()),
                 tm: $.template($("#tm_suggestions").html()),
                 editCtx: $.template($("#editCtx").html())}

    /* Set initial focus on page load */
    this.focused = $(".translate-original-focus textarea").get(0);

    /*
     * Bind event handlers
     */

    /* Fuzzy / unfuzzy */
    $(document).on("keyup blur", "textarea.translation", function () {
      if (!PTL.editor.keepState &&
          $(this).attr("defaultValue") != $(this).val()) {
        PTL.editor.ungoFuzzy();
      }
    });
    $(document).on("click", "input.fuzzycheck", function () {
      if (PTL.editor.isFuzzy()) {
        PTL.editor.doFuzzyArea();
      } else {
        PTL.editor.undoFuzzyArea();
      }
    });

    /* Suggest / submit */
    $(document).on("click", ".switch-suggest-mode a", function () {
      PTL.editor.toggleSuggestMode();
      return false;
    });

    /* Update focus when appropriate */
    $(document).on("focus", ".focusthis", function (e) {
      PTL.editor.focused = e.target;
    });

    /* Write TM results, special chars... into the currently focused element */
    $(document).on("click", ".js-editor-copytext", this.copyText);

    /* Copy original translation */
    $(document).on("click", ".js-copyoriginal", function () {
      var sources = $(".translation-text", $(this).parent().parent().parent());
      PTL.editor.copyOriginal(sources);
    });

    /* Copy suggestion */
    $(document).on("click", "div.suggestion", function () {
      // Don't copy if text has been selected
      if (PTL.editor.getSelectedText() != "") {
        return;
      }
      if ($("#id_target_f_0").attr("disabled")) {
        return;
      }
      // When clicking on a suggestion, fill in text/comment if it exists
      var sources = $(".suggestion-translation", this);
      if (sources.length) {
        PTL.editor.copyOriginal(sources);
      }
      var comments = $(".suggestion-comment", this);
      if (comments.length) {
        comment_textarea = $("#id_translator_comment");
        comment_textarea.val(comments.text());
      }
    });

    /* Editor navigation/submission */
    $(document).on("editor_ready", "table.translate-table", this.ready);
    $(document).on("click", "tr.view-row", this.gotoUnit);
    $(document).on("keypress", "#item-number", function (e) {
        // Perform action only when the 'Enter' key is pressed
        if (e.keyCode == 13) {
          PTL.editor.gotoPage(parseInt($("#item-number").val()));
        }
    });
    $(document).on("click", "input.submit, input.suggest", this.processSubmit);
    $(document).on("click", "input.previous, input.next", this.gotoPrevNext);
    $(document).on("click", "#extras-container .rejectsugg", this.rejectSuggestion);
    $(document).on("click", "#extras-container .acceptsugg", this.acceptSuggestion);
    $(document).on("click", "#extras-container .clearvote", this.clearVote);
    $(document).on("click", "#extras-container .voteup", this.voteUp);
    $(document).on("click", "#show-history", this.showHistory);
    $(document).on("click", "#hide-history", this.hideHistory);
    $(document).on("click", "#translate-checks-block .rejectcheck", this.rejectCheck);

    /* Filtering */
    $(document).on("change", "#filter-status select", this.filterStatus);
    $(document).on("change", "#filter-checks select", this.filterChecks);
    $(document).on("click", ".js-more-ctx", function () {
      PTL.editor.moreContext(false)
    });
    $(document).on("click", ".js-less-ctx", this.lessContext);
    $(document).on("click", ".js-show-ctx", this.showContext);
    $(document).on("click", ".js-hide-ctx", this.hideContext);

    /* Search */
    $(document).on("keypress", "#id_search", function (e) {
        if (e.keyCode == 13) {
          e.preventDefault();
          PTL.editor.search();
        }
    });

    /* Bind hotkeys */
    shortcut.add('ctrl+return', function () {
      if (PTL.editor.isSuggestMode()) {
        $("input.suggest").trigger("click");
      } else {
        $("input.submit").trigger("click");
      }
    });
    shortcut.add('ctrl+space', function (e) {
      // To prevent the click event which occurs in Firefox
      // but not in Chrome (and not in IE)
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      // Prevent automatic unfuzzying on keyup
      PTL.editor.keepState = true;

      if (PTL.editor.isFuzzy()) {
        PTL.editor.ungoFuzzy();
      } else {
        PTL.editor.goFuzzy();
      }
    });
    shortcut.add('ctrl+shift+space', function () {
      PTL.editor.toggleSuggestMode();
    });
    shortcut.add('ctrl+up', function () {
      $("input.previous").trigger("click");
    });
    shortcut.add('ctrl+down', function () {
      $("input.next").trigger("click");
    });
    shortcut.add('ctrl+shift+home', function () {
      PTL.editor.gotoFirstPage();
    });
    shortcut.add('ctrl+shift+end', function () {
      PTL.editor.gotoLastPage();
    });
    shortcut.add('ctrl+shift+pageup', function () {
      PTL.editor.gotoPrevPage();
    });
    shortcut.add('ctrl+shift+pagedown', function () {
      PTL.editor.gotoNextPage();
    });
    shortcut.add('ctrl+shift+u', function () {
      $("#item-number").focus().select();
    });
    shortcut.add('ctrl+shift+s', function () {
      $("#id_search").focus().select();
    });
    $("#id_search").focus(function() {
      $(this).attr("focused", true);
    });
    $("#id_search").blur(function() {
      $(this).attr("focused", "");
    });
    shortcut.add('escape', function () {
      if ($("#id_search").attr("focused")) {
        $("#id_search").blur();
      }
    });

    /* XHR activity indicator */
    $(document).ajaxStart(function () {
      clearTimeout(PTL.editor.delayedActivityTimer);
      PTL.editor.delayedActivityTimer = setTimeout(function () {
        PTL.editor.showActivity();
      }, 3000);
    });
    $(document).ajaxStop(function () {
      clearTimeout(PTL.editor.delayedActivityTimer);
      if (!PTL.editor.isLoading) {
        PTL.editor.hideActivity();
      }
    });

    /* Load MT backends */
    $.each(this.settings.mt, function () {
      var backend = this.name;
      var key = this.key;

      $.ajax({
        url: m('js/mt/' + backend + '.js'),
        async: false,
        dataType: 'script',
        success: function () {
          setTimeout(function () {
            PTL.editor.mt[backend].init(key);
          }, 0);
          $(document).on("mt_ready", "table.translate-table",
                         PTL.editor.mt[backend].ready);
        }
      });
    });

    /* Load lookup backends */
    $.each(this.settings.lookup, function () {
      var backend = this;

      $.ajax({
        url: m('js/lookup/' + backend + '.js'),
        async: false,
        dataType: 'script',
        success: function () {
          setTimeout(function () {
            PTL.editor.lookup[backend].init();
          }, 0);
          $(document).on("lookup_ready", "table.translate-table",
                         PTL.editor.lookup[backend].ready);
        }
      });
    });

    /* History support */
    setTimeout(function () {
      $.history.init(function (hash) {
        var params = PTL.utils.getParsedHash(hash);

        var withUid = false;
        var pageNumber = undefined;

        // Walk through known filtering criterias and apply them to the editor object

        if ('unit' in params) {
          var uid = parseInt(params['unit']);

          if (uid && !isNaN(uid)) {
            if (PTL.editor.activeUid != uid &&
                PTL.editor.units[uid] == undefined) {
              PTL.editor.activeUid = uid;
              withUid = true;
            } else {
              // if uid is already preloaded, just switch to it
              PTL.editor.activeUid = uid;
              PTL.editor.displayEditUnit(uid);
              return;
            }
          }
        } else if ('page' in params) {
          var p = parseInt(params['page']);

          if (p && !isNaN(p) && p > 0) {
            pageNumber = p;
          }
        }

        if ('filter' in params) {
          var a = params['filter'].split(',');

          // Set current state
          PTL.editor.filter = a.shift();
          PTL.editor.checks = (PTL.editor.filter == "checks") ? a : [];
        }

        if ('search' in params) {
          // Note that currently the search, if provided along with the other filters,
          // would override them
          PTL.editor.filter = "search";
          PTL.editor.searchText = params['search'];
          if ('sfields' in params) {
            PTL.editor.searchFields = params['sfields'].split(',');
          }
        }

        // Update the filter UI to match the current filter

        // disable navigation on UI toolbar events to prevent data reload
        PTL.editor.preventNavigation = true;

        $("#filter-status select [value='" + PTL.editor.filter + "']").attr("selected", "selected");
        if (PTL.editor.filter == "checks") {
          // if the checks selector is empty (i.e. the 'change' event was not fired
          // because the selection did not change), force the update to populate the selector
          if ($("#filter-checks").length == 0) {
            PTL.editor.filterStatus();
          }
          $("#filter-checks select [value='" + PTL.editor.checks[0] + "']").attr("selected", "selected");
        }

        if (PTL.editor.filter == "search") {
          $("#id_search").triggerHandler('focus');
          $("#id_search").val(PTL.editor.searchText);

          $("div.advancedsearch input").each(function () {
            if ($.inArray($(this).val(), PTL.editor.searchFields) >= 0) {
              $(this).attr("checked", "checked");
            } else {
              $(this).removeAttr("checked");
            }
          });
        }
        // re-enable normal event handling
        PTL.editor.preventNavigation = false;

        // Load the units that match the given criterias

        PTL.editor.getViewUnits({pager: true, page: pageNumber, withUid: withUid});

        if (PTL.editor.hasResults) {
          // ensure all the data is preloaded before rendering the table
          // otherwise, when the page is reloaded, some pages will not yet be there
          PTL.editor.fetchPages(false);

          // now we can safely render the table
          PTL.editor.displayEditUnit(PTL.editor.activeUid);
        }

      }, {'unescape': true});
    }, 1); // not sure why we had a 1000ms timeout here

  }