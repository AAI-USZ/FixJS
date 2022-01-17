function (content) {
        this.set_input_prompt(content.execution_count);
        this.element.removeClass("running");
    }