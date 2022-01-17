function calc(t, val, dir, anim, orig) {
        var i = t.closest('.dwwr').find('ul').index(t);

        val = val > max ? max : val;
        val = val < min ? min : val;

        var cell = $('li', t).eq(val);
        // Set selected scroller value
        inst.temp[i] = cell.data('val');

        // Validate
        //val = inst.validate(i, val, cell);

        // Call scroll with animation (calc animation time)
        //inst.scroll(t, val, anim ? (val == orig ? 0.1 : Math.abs((val - orig) * 0.1)) : 0, orig, i);
        inst.validate(anim ? (val == orig ? 0.1 : Math.abs((val - orig) * 0.1)) : 0, orig, i, dir);

        // Set value text
        //inst.change(true);
    }