function link_fed_conn(name) {
    return _link_to(fmt_escape_html(name), '#/federation-upstreams/' + esc(name))
}