function (data) {
            if (!data) {
                return;
            }
            that.messageBar.show(data.message, Date.today(), data.isError);
        }