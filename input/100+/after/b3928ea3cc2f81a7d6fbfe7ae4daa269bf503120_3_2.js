function loadOptions() {
  var loadSettings;
  
  loadSettings = parseSettings();
  
  var hide_source_cb = document.getElementById("hide_source_cb");
  hide_source_cb.checked = loadSettings["hide_source"];
  
  var show_notice_cb = document.getElementById("show_notice_cb");
  show_notice_cb.checked = loadSettings["show_notice"];
  
  var show_Words_cb = document.getElementById("show_words_cb");
  show_words_cb.checked = loadSettings["show_words"];
  
  var pagetracker_cb = document.getElementById("pagetracker_cb");
  pagetracker_cb.checked = loadSettings["no_pagetracker"];
  
  var match_words_cb = document.getElementById("match_words_cb");
  match_words_cb.checked = loadSettings["match_words"];
  
  var promoted_tags_cb = document.getElementById("promoted_tags_cb");
  promoted_tags_cb.checked = loadSettings["promoted_tags"];
  
  var promoted_posts_db = document.getElementById("promoted_posts_cb");
  promoted_posts_cb.checked = loadSettings["promoted_posts"];
  
  var context_menu_cb = document.getElementById("context_menu_cb");
  context_menu_cb.checked = loadSettings["context_menu"];

  var toolbar_butt_cb = document.getElementById("toolbar_butt_cb");
  toolbar_butt_cb.checked = loadSettings["toolbar_butt"];
  
  var white_notice_cb = document.getElementById("white_notice_cb");
  white_notice_cb.checked = loadSettings["white_notice"];

  var black_notice_cb = document.getElementById("black_notice_cb");
  black_notice_cb.checked = loadSettings["black_notice"];

  var hide_pinned_cb = document.getElementById("hide_pinned_cb");
  hide_pinned_cb.checked = loadSettings["hide_pinned"];
  
  var auto_unpin_cb = document.getElementById("auto_unpin_cb");
  auto_unpin_cb.checked = loadSettings["auto_unpin"];
  
  var show_tags_cb = document.getElementById("show_tags_cb");
  show_tags_cb.checked = loadSettings["show_tags"];
  
  for (var itemBlack in loadSettings["listBlack"]) {
    addInput("Black", loadSettings["listBlack"][itemBlack]);
  }
  
  for (var itemWhite in loadSettings["listWhite"]) {
    addInput("White", loadSettings["listWhite"][itemWhite]);
  }
  
  addInput("Black"); //prepare a blank input box.
  addInput("White"); //prepare a blank input box.
  
  var version_div = document.getElementById("version_div");
  version_div.innerHTML = "v"+defaultSettings["version"]; //use default so we're always showing current version regardless of what people have saved.

  if (typeof opera != "undefined") {
    var context_menu_div = document.getElementById("context_menu_div");
    context_menu_div.setAttribute("style", "display:none;");
    
    var browser_span = document.getElementById("browser_span");
    browser_span.innerHTML = "for Opera&trade;";
  }
  
  if (typeof chrome != "undefined" || typeof safari != "undefined") {
    var toolbar_butt_div = document.getElementById("toolbar_butt_div");
    toolbar_butt_div.setAttribute("style", "display:none;");
    
    var browser_span = document.getElementById("browser_span");
    browser_span.innerHTML = "for Chrome&trade;";          
  }
  
  if (typeof safari != "undefined") {
    var browser_span = document.getElementById("browser_span");
    browser_span.innerHTML = "for Safari&trade;";
  }
}