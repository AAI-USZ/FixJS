function add_item(ol, item) {
    var s;

    if (item.src)
        s = "<li><a href='"+item.src+"'>"+emphasize_name(item.src);
    else if (item.count)
        s = "<li><a href='#'>"+data.url;
    else
        s = "<li><a href='#'>INLINE: <span></span>";
    s += "</a><p></p></li>";

    var li = $(s);
    if (!item.src) {
        li.addClass("inline");
        li.find("span").text(item.inline.substr(0,80));
    }
    if (item.dynamic)
        li.addClass("dynamic");
    if (item.src && config_is_hilighted(item.src))
        li.addClass("hi");

    item.li = li;

    ol.append(li);
}