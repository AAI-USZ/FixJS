function() {
        this.toolbarEl = this.containerEl.append(
            $("<div />", {class: 'sympy-live-completions-toolbar'})
            .append($("<button><span>&#x25BC;</span></button>",
                      {id: 'sympy-live-completions-toggle'}))
            .append($("<button>&lt;</button>",
                      {class: 'disabled', id: 'sympy-live-completions-prev'}))
            .append($("<button>&gt;</button>",
                      {class: 'disabled', id: 'sympy-live-completions-next'}))
        ).children('div');
        this.expandEl = this.toolbarEl.children("button:nth(0)");
        this.prevEl = this.toolbarEl.children("button:nth(1)");
        this.nextEl = this.toolbarEl.children("button:nth(2)");
        this.expandEl.click($.proxy(function(e) {
            if (this.isButtonEnabled("expand")) {
                this.toggleAllCompletions();
            }
            this.shell.focus();
        }, this));
        this.nextEl.click($.proxy(function(event){
            if (this.isButtonEnabled("next")) {
                this.showNextGroup();
            }
            this.shell.focus();
        }, this));
        this.prevEl.click($.proxy(function(event){
            if (this.isButtonEnabled("prev")) {
                this.showPrevGroup();
            }
            this.shell.focus();
        }, this));
        this.outputEl = $("<ol />", {class: 'sympy-live-completions'})
            .append($("<em>Completions here</em>"));
        this.containerEl.append(this.outputEl);
        this.disableButtons(["prev", "next", "expand"]);
    }