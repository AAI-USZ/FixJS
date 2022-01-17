function process_tags(element) {
        var data = [];
        $(element.val().split(',')).each(function () {
            data.push({id: this, text: this});
        });
        return data;
    }