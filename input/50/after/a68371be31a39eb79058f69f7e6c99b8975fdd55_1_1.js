function fmt_string(str, unknown) {
    if (unknown == undefined) unkown = UNKNOWN_REPR;
    if (str == undefined) return unknown;
    return fmt_escape_html("" + str);
}