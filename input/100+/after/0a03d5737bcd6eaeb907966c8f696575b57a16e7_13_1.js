function (that) {
        function getClass(name) {
            return that.options.selectors[name].substr(1);
        }
        function getStyle(name) {
            return that.options.styles[name];
        }
        
        var node = that.locate("repeat");
        if (!node.is("tr, li")) {
            node = node.removeClass(getClass("repeat"))
                       .addClass(getStyle("content"))
                       .wrap($("<ul></ul>").addClass(getStyle("repeatable")))
                       .wrap($("<li/>").addClass(getClass("repeat"))
                                       .addClass(getStyle("clearfix"))
                                       .addClass(getStyle("repeat"))
                                       .css("display", "block"))
                       .parent("li");
        }
    
        if (that.locate("add").length === 0 && !that.options.disableAdd) {
            that.container.prepend($(that.options.markup.addControl).addClass(getClass("add")));
        }
        if (that.locate("primary").length === 0) {
            var primary = $(that.options.markup.primaryControl).addClass(getClass("primary"))
                                                               .attr("name", "primary-" + that.options.fullPath)
                                                               .prop("disabled", that.options.disablePrimary)
                                                               .css("display", that.options.hidePrimary ? "none" : "block");
            node.prepend(primary);
        }
        if (that.locate("delete").length === 0 && !that.options.disableDelete) {
            var remove = $(that.options.markup.deleteControl).addClass(getClass("delete"));
            node.append(remove);
        }
                
        if (!node.is("tr")) {
            return;
        }
        primary.wrap("<td/>");
        remove.wrap("<td/>");
        var headerRow = that.locate("headerRow");
        if (headerRow.length < 1) {
            return;
        }
        var headerCols = headerRow.children();
        if (headerCols.length < 1) {
            return;
        }
        var newCol = $(headerCols[0]).clone().empty();
        headerRow.prepend(newCol.clone());
        headerRow.append(newCol);
    }