function(el) {
            SymPy.MobileShell.superclass.render.call(this, el);
            this.renderSearches();
            this.promptEl.set({autocorrect: 'off', autocapitalize: 'off'});
            var shell = Ext.get("shell");
            $("#settings .content .sympy-live-toolbar").
                insertBefore($(shell.dom)).
                children("br").
                remove();
            $("#output-format").next().remove();
            $("#settings").remove();
            $("#autocomplete").next().remove();
            $("#autocomplete").remove();
            $(".sympy-live-toolbar").children("span").last().remove();
            $("#sympy-live-toolbar-main").
                appendTo(".sympy-live-completions-toolbar");
            $("#fullscreen-button").remove();
            this.completeButtonEl = Ext.DomHelper.insertAfter(
                this.evaluateEl,
                {
                    'tag': 'button',
                    'html': 'Complete'
                }
            , true);
            this.historyPrevEl.on("click", function(event){
                this.promptEl.focus(1000);
                this.prevInHistory();
            }, this);
            this.historyNextEl.on("click", function(event){
                this.promptEl.focus(1000);
                this.nextInHistory();
            }, this);
            this.completeButtonEl.on("click", function(event){
                this.completer.complete(
                    this.getStatement(),
                    this.getSelection());
            }, this);
            Ext.getBody().on("orientationchange", this.orientationUpdate, this);
            this.orientationUpdate();
            Ext.get("menu").on("click", function(event){
                Ext.get("main-navigation").toggle(true);
                Ext.get("main-navigation").down("ul").toggle(true);
            });
            Ext.get(document.body).scrollTo("top", this.outputEl.getTop());
        }