function () {
                this.list.html(this.template(this.taskFilter()));
                try {
                    this.list.listview("refresh");
                    $("button", this.list).button();
                    $('[type="checkbox"]', this.list).checkboxradio();
                } catch (e) {
                    App.log(e);
                }
            }