function () {
                $('#data_save_form form').load('/region/saveData?id=' + this.id + '&metric=' + that.currentMetric, function () {
                    $('#data_save_form').modal('show');
                });
            }