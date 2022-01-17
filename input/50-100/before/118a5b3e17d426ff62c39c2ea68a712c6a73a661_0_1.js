function(el, ev) {
            this.options.andVor.attr("andVor", el.val());
            CourseData.workspace.attr("display.andVor", el.val());
        }