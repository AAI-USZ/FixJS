function () {
            if (status.name == 'slide') {
                layer.hide();
                visibility = false;
            }
            else {
                visibility = true;
                layer.show();
                this.adjust();
            }
        }