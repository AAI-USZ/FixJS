function link_policy(name) {
    return _link_to(fmt_escape_html(name), '#/policies/' + esc(name))
}