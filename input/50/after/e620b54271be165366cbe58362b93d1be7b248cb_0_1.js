function () {
            this.search.show();
            this.parent.opening.apply(this, arguments);
            this.dropdown.removeClass("select2-offscreen");
        }