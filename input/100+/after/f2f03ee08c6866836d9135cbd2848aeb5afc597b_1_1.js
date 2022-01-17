function(event) {
        var data = event.data,
            length = data.length,
            i = 0;
        el.options.length = 0;
        for (; i < length; i ++) {
            var elmOption = document.createElement('OPTION');
            elmOption.value = data[i].value;
            elmOption.text = data[i].text;
            el.add(elmOption);
        }
    }