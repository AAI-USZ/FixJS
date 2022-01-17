function(e) {
            this.list.removeClass(this.oCss.e);
            this.list.removeProperty("style");
            this.list.fireEvent("blur", e);
            document.removeEvent("keydown", this.fnNavigate);
        }