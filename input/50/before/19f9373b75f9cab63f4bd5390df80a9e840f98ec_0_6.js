function suggest_ip(dom0_ip, exclude, cb){
    var params = {
        'ip': dom0_ip,
        'ex[]': exclude,
    };
    $.ajax({
        url: '/ybz/ipaddress/suggest.json',
        data: params,
        success: cb
    });
}