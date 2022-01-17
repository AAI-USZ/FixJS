function () {
                this.list.html(this.template(this.taskFilter()));
                this.list.listview("refresh");
                $("button", this.list).button();
                try {
                    $('[type="checkbox"]', this.list).checkboxradio();
                }catch (e) {
                }
            }