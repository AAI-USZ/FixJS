function(d) {
    var html = [
        '<ul>',
        '<li class="wysiwyg-menu-style" title="Style">',
        '<a id="wt-style" href="#">',
        '<span class="wysiwyg-menu-style">Style</span>',
        '<span class="wysiwyg-menu-paragraph">Normal</span>',
        '<span class="wysiwyg-menu-heading1">Header 1</span>',
        '<span class="wysiwyg-menu-heading2">Header 2</span>',
        '<span class="wysiwyg-menu-heading3">Header 3</span>',
        '<span class="wysiwyg-menu-heading4">Header 4</span>',
        '<span class="wysiwyg-menu-heading5">Header 5</span>',
        '<span class="wysiwyg-menu-heading6">Header 6</span>',
        '<span class="wysiwyg-menu-code">Code block</span>',
        '<span class="wysiwyg-menu-quote">Quote</span>',
        '</a></li>',
        '<li title="Bold (Ctrl+B)"><a id="wt-strong" href="#"></a></li>',
        '<li title="Italic (Ctrl+I)"><a id="wt-em" href="#"></a></li>',
        '<li title="Monospace"><a id="wt-monospace" href="#"></a></li>',
        '<li><a id="wt-decorationmenu" href="#"></a></li>',
        '<li title="Remove format"><a id="wt-remove" href="#"></a></li>',
        '<li title="Link"><a id="wt-link" href="#"></a></li>',
        '<li title="Unlink"><a id="wt-unlink" href="#"></a></li>',
        '<li title="Ordered list"><a id="wt-ol" href="#"></a></li>',
        '<li title="List"><a id="wt-ul" href="#"></a></li>',
        '<li title="Outdent"><a id="wt-outdent" href="#"></a></li>',
        '<li title="Indent"><a id="wt-indent" href="#"></a></li>',
        '<li title="Table"><a id="wt-table" href="#"></a></li>',
        '<li><a id="wt-tablemenu" href="#"></a></li>',
        '<li title="Horizontal rule"><a id="wt-hr" href="#"></a></li>',
        '<li title="Line break (Shift+Enter)"><a id="wt-br" href="#"></a></li>',
        '</ul>' ];
    var div = d.createElement("div");
    div.className = "wysiwyg-toolbar";
    div.innerHTML = html.join("").replace(/ href="#">/g, ' href="#" onmousedown="return false" tabindex="-1">');
    return div;
}