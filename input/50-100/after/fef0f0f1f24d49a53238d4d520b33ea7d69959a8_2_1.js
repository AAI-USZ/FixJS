function() {
            var v = $(this).attr('value');
            main['_' + v] = $(this).text();
            if ($(this).prop('disabled')) invalid.push(v);
        }