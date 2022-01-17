function() {
  var ul = $(".site ul.pagehead-actions");
  if (!ul ||

      // Thou shalt not Flattreth thyself.
      ($("li.text", ul) && ($("li.text", ul).textContent == "This is you!")) ||

      // Thou canst not Flattreth organizations.
      // http://blog.flattr.net/2012/02/winter-update-github-tweets-extensions/#comment-8471
      $(".pagehead > .avatared > .organization-bit") ||

      $("li a.minibutton.btn-back", ul)

     ) return;

  var username = $(".username");
  var repoName = location.href.match(/[^(\.com\/)]\w+\/.[^\/]*/);
  if (!(repoName || username)) return;

  var permalink = $(".js-current-repository");
  var url = permalink ? permalink.href : location.href;

  var name = repoName ? repoName.toString() : username.textContent;

  if (!$("li.for-owner", ul)) { // Thou shalt not Flattreth thine own repo.
    var li = ul.insertBefore(document.createElement("li"),
                             $("li.text", ul) ? $("li.text", ul).nextSibling
                                              : ul.firstChild);
    li.appendChild(flattrButton(url, "Flattr " + name, "minibutton"));
  }

  var container = $("#js-repo-pjax-container");
  var committer = $(".authorship .author-name a", container);
  var user = $("#user .name"); // Logged in.

  // Thou shalt not Flattreth thine own commit.
  if (user && committer && (user.href == committer.href)) return;

  var bb = $(".commit > .browse-button", container);
  bb && (bb.style.marginLeft = ".5em")
     && bb.parentNode.insertBefore(flattrButton(location.href,
                                                "Flattr this commit!",
                                                "browse-button"),
                                   bb.nextSibling);

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }

  // Flattr button
  function flattrButton(aURL, aTitle, aClassName) {
    var link = document.createElement("a");
    link.href = "https://flattr.com/submit/auto?url="
              + encodeURIComponent(aURL);
    link.title = aTitle;
    link.className = aClassName;
    link.target = "_blank";
    link.setAttribute("data-flattr-uid", "flattr");
    link.setAttribute("data-flattr-category", "software");
    link.setAttribute("data-flattr-tags", "software, github, opensource");
    link.innerHTML = '<img src="'
                   + 'https://api.flattr.com/button/flattr-badge-small.png"'
                   + ' alt="Flattr!" style="width: 12px; height: 12px;'
                   + ' vertical-align: -1px; margin-right: .5em; "/>Flattr!';
    return link;
  }
}