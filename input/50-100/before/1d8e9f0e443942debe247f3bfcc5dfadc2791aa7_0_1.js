function u_iswalpha(c, _) {
    return [1,0,[(c >= 65 && c <= 90) || (c >= 97 && c <= 122) ||
                 c == 229 || c == 228 || c == 246 ||
                 c == 197 || c == 196 || c == 214]];
}