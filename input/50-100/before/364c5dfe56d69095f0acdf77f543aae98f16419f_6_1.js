function () {

        var result = '';

        $.each(this.data, function (i,e) {

            if (e.isSelected()) {

                result += (result ? ',' : '') + this.key;

            }

        });

        return result;

    }