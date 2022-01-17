function(name,fig){
        var found = false;
        jQuery.each(json.components, function(idx,comp) {
            if (comp.name === name) {
                found = true;
            }
        });
        if (!found) {
            workflow.removeFigure(fig);
            self.removeChild(fig);
            delete self.figures[name];
        }
    }