function calc_update() {
    // Reset error status
    clear_errors();

    // Get input values and check them
    var mb = document.getElementById('mb').value;
    var mp = get_value('mp');
    var tar = get_value('tar');
    var tba = get_value('tba');
    var mp_set = 0;
    var tar_set = 0;
    var tba_set = 0;

    if(document.getElementById('mp').value)
        mp_set = 1;
    if(document.getElementById('tar').value)
        tar_set = 1;
    if(document.getElementById('tba').value)
        tba_set = 1;

    if(sanity_check_inputs(mb, mp, mp_set, tar, tba, tar_set, tba_set))
        return;

    // Get constants and check them
    var rho_g = find_rho_g();
    var rho_a = get_value('rho_a');
    var adm = get_value('adm');
    var ga = get_value('ga');
    var bd = find_bd(mb);
    var cd = find_cd(mb);

    if(sanity_check_constants(rho_g, rho_a, adm, ga, bd, cd))
        return;
    
    // Do some maths
    mb = parseFloat(mb.substr(1)) / 1000.0;
    mp = mp / 1000.0;

    var ascent_rate = 0;
    var burst_altitude = 0;
    var time_to_burst = 0;
    var neck_lift = 0;
    var launch_radius = 0;
    var launch_volume = 0;

    var burst_volume = (4.0/3.0) * Math.PI * Math.pow(bd / 2.0, 3);

    if(tba_set) {
        launch_volume = burst_volume * Math.exp((-tba) / adm);
        launch_radius = Math.pow((3*launch_volume)/(4*Math.PI), (1/3));
    } else if(tar_set) {
        var a = ga * (rho_a - rho_g) * (4.0 / 3.0) * Math.PI;
        var b = -0.5 * Math.pow(tar, 2) * cd * rho_a * Math.PI;
        var c = 0;
        var d = - (mp + mb) * ga;

        var f = (((3*c)/a) - (Math.pow(b, 2) / Math.pow(a,2)) / 3.0);
        var g = (
            ((2*Math.pow(b,3))/Math.pow(a,3)) -
            ((9*b*c)/(Math.pow(a,2))) + ((27*d)/a) / 27.0
        );
        var h = (Math.pow(g,2) / 4.0) + (Math.pow(f,3) / 27.0);

        if(h>0) {
            // One real root. This is what should happen.
            var R = (-0.5 * g) + Math.sqrt(h);
            var S = Math.pow(R, 1.0/3.0);
            var T = (-0.5 * g) - Math.sqrt(h);
            var U = Math.pow(T, 1.0/3.0);
            launch_radius = (S+U) - (b/(3*a));
        } else if(f==0 && g==0 && h==0) {
            // Three real and equal roots
            // Will this ever even happen?
            launch_radius = -1 * Math.pow(d/a, 1.0/3.0);
        } else if(h <= 0) {
            // Three real and different roots
            // What the hell do we do?!
            // It needs trig! fffff
            var i = Math.sqrt((Math.pow(g,2)/4.0) - h);
            var j = Math.pow(i, 1.0/3.0);
            var k = Math.acos(-g / (2*i));
            var L = -1 * j;
            var M = Math.cos(K/3.0);
            var N = Math.sqrt(3) * Math.sin(K/3.0);
            var P = (b/(3*a)) * -1;
            var r1 = 2*j*Math.cos(k/3.0) - (b/(3*a));
            var r2 = L * (M + N) + P;
            var r3 = L * (M - N) + P;

            alert("Three possible solutions found: "
                + r1 + ", " + r2 + ", " + r3);
            
            if(r1 > 0) {
                launch_radius = r1;
            } else if(r2 > 0) {
                launch_radius = r2;
            } else if(r3 > 0) {
                launch_radius = r3;
            }
        } else {
            // No real roots
        }
    }

    var launch_area = Math.PI * Math.pow(launch_radius, 2);
    var launch_volume = (4.0/3.0) * Math.PI * Math.pow(launch_radius, 3);
    var density_difference = rho_a - rho_g;
    var gross_lift = launch_volume * density_difference;
    neck_lift = (gross_lift - mb) * 1000;
    var total_mass = mp + mb;
    var free_lift = (gross_lift - total_mass) * ga;
    ascent_rate = Math.sqrt(free_lift / (0.5 * cd * launch_area * rho_a));
    var volume_ratio = launch_volume / burst_volume;
    burst_altitude = -(adm) * Math.log(volume_ratio);
    time_to_burst = (burst_altitude / ascent_rate) / 60.0;

    if(isNaN(ascent_rate)) {
        set_error('tba', "Altitude unreachable for this configuration.");
        return;
    }

    ascent_rate = ascent_rate.toFixed(2);
    burst_altitude = burst_altitude.toFixed();
    time_to_burst = time_to_burst.toFixed();
    neck_lift = neck_lift.toFixed();
    launch_litres = (launch_volume * 1000).toFixed();
    launch_cf = (launch_volume * 35.31).toFixed(1);
    launch_volume = launch_volume.toFixed(2);

    document.getElementById('ar').innerHTML = ascent_rate + " m/s";
    document.getElementById('ba').innerHTML = burst_altitude + " m";
    document.getElementById('ttb').innerHTML = time_to_burst + " min";
    document.getElementById('nl').innerHTML = neck_lift + " g";
    document.getElementById('lv_m3').innerHTML = launch_volume + " m<sup>3</sup>";
    document.getElementById('lv_l').innerHTML = launch_litres + " L";
    document.getElementById('lv_cf').innerHTML = launch_cf + " ft<sup>3</sup>";
}