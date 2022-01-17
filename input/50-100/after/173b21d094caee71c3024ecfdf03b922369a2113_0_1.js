function(string,parse_query_string) {
    var u = url.parse(string,parse_query_string);
    if (u.pathname == '/') {
        u.path_as_array = [];
    }
    else {
        u.path_as_array = u.pathname.split('/');
        u.path_as_array.shift();
    }
    return u;
}