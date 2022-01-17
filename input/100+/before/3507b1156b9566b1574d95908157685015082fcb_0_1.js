function() {
        var qs = new QueryStringClass(),
            val = (qs && qs.vars && qs.vars.searchtext) ? qs.vars.searchtext : 'Search',
            displayVal = decodeURIComponent(val).replace(/\+/g, ' ');
        pl('#searchtext').attr({value: displayVal});
        console.log(val, displayVal);
        pl('#searchtext').bind({
            focus: function() {
                if (pl('#searchtext').attr('value') === 'Search') {
                    pl('#searchtext').attr({value: ''});
                }
            },
            keyup: function(e) {
                var evt = new EventClass(e);
                if (evt.keyCode() === 13) {
                    pl('#searchform').get(0).submit();
                    return false;
                }
                return true;
            }
        });
/*
        pl('#searchbutton').bind({
            click: function() {
                pl('#searchform').get(0).submit();
            }
        });
*/
    }