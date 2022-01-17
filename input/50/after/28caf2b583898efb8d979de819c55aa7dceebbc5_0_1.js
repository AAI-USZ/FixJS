function() {
    var github = document.createElement('script');
    github.type = 'text/javascript';
    github.async = true;
    github.src = 'https://api.github.com/repos/bozhu/bozhu.github.com?callback=display_last_update_time';
    document.getElementsByTagName('body')[0].appendChild(github);
}