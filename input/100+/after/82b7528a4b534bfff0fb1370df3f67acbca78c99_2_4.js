function(doc, req) {
    var d = doc;
    d.title = 'Voltage Monitoring';

    d.temp = d.temp.toFixed(4);
    d.cald = d.cald.toFixed(4);
    d.hvt = d.hvt.toFixed(4);
    var v_all_bad = true;
    var v_bad_count = 0;
    for (var i=0; i<d.voltages.length; i++) {
       d.voltages[i].value = d.voltages[i].value.toFixed(4);
       if (d.voltages[i].ok == true) {
          v_all_bad = false;
       }
       v_bad_count++;
    }

    // debugging hints
    if (d.pass == false) {
        d.hints = [];
        if (d.voltages[0].value <= -43 &&
            d.voltages[1].value <= -24 && 
            d.voltages[17].value <= -24) {
            d.hints.push({
                issue: 'Voltages are railed',
                advice: 'Check voltages with multimeter. If okay, ensure R208 is 100K.'
            });
        }
        if (v_all_bad) {
            d.hints.push({
                issue: 'All voltages are bad',
                advice: 'Check blue wire to U130 pin 4. It may have detached.'
            });
        }
        if (v_bad_count == 1) {
            d.hints.push({
                issue: 'One voltage is bad',
                advice: 'Check page 20A of schematics to find the correct regulator, then check all resistor values.'
            });
        }
    }

    return {
        title: d.title,
        content: templates.render('vmon.html', req, d)
    };
}