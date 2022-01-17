function render(target, repos){
    var i = 0, t = $(target)[0];
    var fragment = '<li class="nav-header">My GitHub Repos</li>';

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+repos[i].description+'</p></li>';
    }
    t.innerHTML = fragment;
  }