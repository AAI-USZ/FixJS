function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];
    //var fragment = '<li class="nav-header">GitHub Repos</li>';

    for(i = 0; i < repos.length; i++) {
      if (repos[i].name != "timofei7.github.com") {
         fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+repos[i].description+' ('+repos[i].language+') '+'</p></li>';
      }
    }
    t.innerHTML = fragment;
  }