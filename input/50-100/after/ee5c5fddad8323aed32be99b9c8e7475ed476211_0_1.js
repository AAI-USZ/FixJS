function calc_init() {

    var ids = ['mb', 'mp', 'tar', 'tba', 'gas', 'rho_g', 'rho_a', 'adm', 'bd', 'cd', 'bd_c', 'cd_c'];
    for(var i in ids) {
        document.getElementById(ids[i]).onchange = calc_update;
    }
    calc_update();
}