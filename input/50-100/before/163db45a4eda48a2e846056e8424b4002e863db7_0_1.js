function(e) {
            this.list.removeClass(this.oCss.e);
            this.list.fireEvent("blur", e);
            document.removeEvent("keydown", this.fnNavigate);
        }