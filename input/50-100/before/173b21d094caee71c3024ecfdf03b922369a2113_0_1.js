function(string) {
    var u = url.parse(string);
    if (u.pathname == '/') {
        u.path_as_array = [];
    }
    else {
        u.path_as_array = u.pathname.split('/');
        u.path_as_array.shift();
    }
    return u;
}