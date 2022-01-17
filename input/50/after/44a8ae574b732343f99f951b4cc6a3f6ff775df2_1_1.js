function () {
            this.on("afterVisibleChange", function (e) {
                this.fire(e.newVal ? "show" : "hide");
            });
        }