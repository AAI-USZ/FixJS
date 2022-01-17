function(el, ev) {
            this.options.andVor.attr("andVor", (el.val() === "all"? "and" : "or"));
            CourseData.workspace.attr("display.andVor", (el.val() === "all"? "and" : "or"));
        }