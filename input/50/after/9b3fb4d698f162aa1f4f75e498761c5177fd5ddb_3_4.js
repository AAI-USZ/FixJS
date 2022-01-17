function (wp) {
           var wpView = new WorkingPointView({ model: wp });
           $(this.el).append(wpView.render().el);
        }