function (i, val) {
            if ((typeof(val.enabled) == "undefined") || (val.enabled)) {
                var option = $(document.createElement('option'))
                                .attr('value', i)
                                .html(val.title);
                if (i == selectedvalue) {
                    option.attr('selected', 'selected');
                }
                if (typeof(val.group) != "undefined") {
                    var optgroup = select.find("optgroup[label=" + val.group + "]");
                    if (optgroup.length == 0) {
                        optgroup = $(document.createElement('optgroup'))
                                    .attr('label', val.group);
                        optgroup.append(option);
                        select.append(optgroup);
                    } else {
                        optgroup.append(option);
                    }
                } else {
                    select.append(option);
                }
            }
        }