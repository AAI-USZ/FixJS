function() {
  var isGist = location.hostname == "gist.github.com";
  var buttons = isGist ? $("#repos .repo.public .path") // public gist
                       : $(".site ul.pagehead-actions");
  if (!buttons ||

      // Thou shalt not Flattreth thyself.
      ($("li.text", buttons) && ($("li.text", buttons).textContent == "This is you!")) ||

      // Thou canst not Flattreth organizations.
      // http://blog.flattr.net/2012/02/winter-update-github-tweets-extensions/#comment-8471
      $(".pagehead > .avatared > .organization-bit") ||

      $("li a.minibutton.btn-back", buttons)

     ) return;

  var url = location.href;

  if (isGist) {
    var owner = $("#owner .name a"), user = $(".userbox .name");
    if (user && (user.href == owner.href)) return; // Thou shalt not Flattreth thine own snippet.

    var button = insertBefore(flattrButton(url.match(/^https:\/\/gist.github.com\/\w+/)),
                              buttons.lastChild, buttons);
    button.setAttribute("style",
                        "color: rgba(0, 0, 0, .8); width: 80px; "
                      + "height: 18px; font-size: 13px; font-weight: bold; "
                      + "margin-left: .75em; vertical-align: 1px; "
                      + "padding: 0 1em 0 2em; border: 1px solid #8b8b8b; "
                      + "-moz-border-radius: 2em; -o-border-radius: 2em; "
                      + "-webkit-border-radius: 2em; border-radius: 2em; "
                      + "background-image: url('https://api.flattr.com/button/"
                      + "flattr-badge-small.png'), " + getCSSPrefix()
                      + "linear-gradient(top, #fff, #ddd); "
                      + "background-position: .75em center, 0 0; "
                      + "background-repeat: no-repeat, repeat-x; "
                      + "background-size: 10px 10px, 80px 18px; "
                      + "text-decoration: none;");
    return;
  }

  var username = $(".username");
  var repoName = url.match(/[^(\.com\/)]\w+\/.[^\/]*/);
  if (!(repoName || username)) return;

  var permalink = $(".js-current-repository");
  var url = permalink ? permalink.href : url;

  var name = repoName ? repoName.toString() : username.textContent;

  if (!$("li.for-owner", buttons)) { // Thou shalt not Flattreth thine own repo.
    var li = insertBefore(document.createElement("li"),
                          $("li.text", buttons) ? $("li.text", buttons).
                                                  nextSibling
                                                : buttons.firstChild,
                          buttons);
    li.appendChild(flattrButton(url, "Flattr " + name, "minibutton"));
  }

  var container = $("#js-repo-pjax-container");
  var committer = $(".authorship .author-name a", container);
  var user = $("#user .name"); // Logged in.

  // Thou shalt not Flattreth thine own commit.
  if (user && committer && (user.href == committer.href)) return;

  var browse = $(".commit > .browse-button", container);
  browse && (browse.style.marginLeft = ".5em")
         && insertBefore(flattrButton(url, "Flattr this commit!", "browse-button"),
                         browse.nextSibling,
                         browse.parentNode);

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }

  function insertBefore(aNode, aSibling, aParent) {
    return aParent.insertBefore(aNode, aSibling);
  }

  function getCSSPrefix() {
    var ua = navigator.userAgent;
    if (/Firefox/.test(ua)) return "-moz-";
    if (/Opera/.test(ua)) return "-o-";
    if (/AppleWebKit/.test(ua)) return "-webkit-";
  }

  // Flattr button
  function flattrButton(aURL, aTitle, aClassName) {
    var link = document.createElement("a");
    link.href = "https://flattr.com/submit/auto?url="
              + encodeURIComponent(aURL);
    link.title = aTitle ? aTitle : "";
    link.className = aClassName ? aClassName : "";
    link.target = "_blank";
    link.setAttribute("data-flattr-uid", "flattr");
    link.setAttribute("data-flattr-category", "software");
    link.setAttribute("data-flattr-tags", "software, github, opensource");
    link.innerHTML = isGist
                     ? "Flattr"
                     : '<img src="'
                     + 'https://api.flattr.com/button/flattr-badge-small.png"'
                     + ' alt="Flattr!" style="width: 12px; height: 12px;'
                     + ' vertical-align: -1px; margin-right: .5em; "/>Flattr!';
    return link;
  }
}