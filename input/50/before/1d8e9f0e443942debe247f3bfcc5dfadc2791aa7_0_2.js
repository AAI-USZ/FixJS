function u_iswalnum(c, _) {
    return [1,0,[(c >= 48 && c <= 57) || u_iswalpha(c)[0]]];
}