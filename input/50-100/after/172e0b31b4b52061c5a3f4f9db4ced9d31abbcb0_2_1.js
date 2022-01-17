function() {
            var v = $(this).attr('value');
            main[v] = $(this).text();
            if ($(this).prop('disabled')) invalid.push(v);
        }