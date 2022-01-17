function(key, val) {
            var checked = 'checked=checked';
            if (key == 'cadence') 
                checked = ''
            if (key == 'temp') 
                checked = ''
            if (key == 'power') 
                checked = ''

            if (key != 'lon' && key != 'lat') {

                that.choiceContainer.append('<button class="btn" name="' + key + '" ' + checked + ' id="chk_' + key + '">' + val.label + '</button>');
            }
        }