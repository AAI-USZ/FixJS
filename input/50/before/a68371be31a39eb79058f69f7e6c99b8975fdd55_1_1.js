function fmt_string(str) {
    if (str == undefined) return UNKNOWN_REPR;
    return fmt_escape_html("" + str);
}