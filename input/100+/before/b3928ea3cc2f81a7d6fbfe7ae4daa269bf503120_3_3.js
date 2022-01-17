function saveOptions() {
  var oldSettings = parseSettings();
  var newSettings = {};

  var hide_source_cb = document.getElementById("hide_source_cb");
  newSettings["hide_source"] = hide_source_cb.checked;
  
  var show_notice_cb = document.getElementById("show_notice_cb");
  newSettings["show_notice"] = show_notice_cb.checked;
  
  var show_words_cb = document.getElementById("show_words_cb");
  newSettings["show_words"] = show_words_cb.checked;
  
  var pagetracker_cb = document.getElementById("pagetracker_cb");
  newSettings["no_pagetracker"] = pagetracker_cb.checked;
  
  var match_words_cb = document.getElementById("match_words_cb");
  newSettings["match_words"] = match_words_cb.checked;
  
  var promoted_tags_cb = document.getElementById("promoted_tags_cb");
  newSettings["promoted_tags"] = promoted_tags_cb.checked;
  
  var promoted_posts_cb = document.getElementById("promoted_posts_cb");
  newSettings["promoted_posts"] = promoted_posts_cb.checked;
  
  var context_menu_cb = document.getElementById("context_menu_cb");
  newSettings["context_menu"] = context_menu_cb.checked;
  
  var toolbar_butt_cb = document.getElementById("toolbar_butt_cb");
  newSettings["toolbar_butt"] = toolbar_butt_cb.checked;
  
  var white_notice_cb = document.getElementById("white_notice_cb");
  newSettings["white_notice"] = white_notice_cb.checked;
  
  var black_notice_cb = document.getElementById("black_notice_cb");
  newSettings["black_notice"] = black_notice_cb.checked;

  var hide_pinned_cb = document.getElementById("hide_pinned_cb");
  newSettings["hide_pinned"] = hide_pinned_cb.checked;
  
  var auto_unpin_cb = document.getElementById("auto_unpin_cb");
  newSettings["auto_unpin"] = auto_unpin_cb.checked;

  newSettings["listWhite"] = [];
  newSettings["listBlack"] = [];
  newSettings["version"] = defaultSettings["version"]; //always update version info from default.

  var options = document.getElementsByTagName("input");
  for (var i = 0; i< options.length; i++) {
    if (options[i].value != "") {
      if (options[i].name.substring(0,11) == "optionWhite") {
        newSettings["listWhite"].push(options[i].value);
      } else if (options[i].name.substring(0,11) == "optionBlack") {
        newSettings["listBlack"].push(options[i].value);
      }
    }
  }

  if (newSettings["context_menu"]){
    if (oldSettings["context_menu"]==false) {
      if (typeof chrome != "undefined") {
        var cmAddToBlackList = chrome.contextMenus.create({
          "type":"normal",
          "title":"Add '%s' to Tumblr Savior black list",
          "contexts": ["selection"],
          "documentUrlPatterns": ["http://*.tumblr.com/*"],
          "onclick": chromeAddToBlackList
        });
      }
    }
  } else {
    if (typeof chrome != "undefined") {
      chrome.contextMenus.removeAll();
    }
  }

  if (newSettings["toolbar_butt"]!=oldSettings["toolbar_butt"]) {
    if (typeof opera != "undefined") {
      opera.extension.postMessage("toolbar");
    }
  }

  localStorage["settings"] = JSON.stringify(newSettings);
  notifyBrowsers(newSettings);
  location.reload();
}