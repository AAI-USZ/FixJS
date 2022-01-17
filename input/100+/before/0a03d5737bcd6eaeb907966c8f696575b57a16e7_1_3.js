function () {
            that.renderer.refreshView();
            
            var activatables = that.locate("authorityItem").add(that.locate("matchItem"));
            fluid.activatable(activatables, activateFunction);
            
            var selectables = $(activatables).add(input);
            that.selectable.selectables = selectables;
            that.selectable.selectablesUpdated();
            var container = that.container;
            container.show();
            container.dialog("open");
// NB: on IE8, the above creates a cyclically linked DOM structure! The following
// or variant may help with styling issues            
//            container.appendTo(document.body);
            container.position({
                my: "left top",
                at: "left bottom",
                of: that.options.inputField,
                collision: "none"
            });
        }