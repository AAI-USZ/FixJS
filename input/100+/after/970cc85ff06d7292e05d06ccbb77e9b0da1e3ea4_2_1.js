function buildSelect(select, zero_balance, reset) {
    var old_val = select.val();

    select.empty();

    for (var key in addresses) {
        var addr = addresses[key];

        //Don't include archived addresses
        if (!addr || addr.tag == 2)
            continue;

        var label = addr.label;

        if (!label)
            label = addr.addr.substring(0, 15) + '...';

        if (zero_balance || addr.balance > 0) {
            //On the sent transactions page add the address to the from address options
            select.prepend('<option value="'+addr.addr+'">' + label + ' - ' + formatBTC(addr.balance) + ' BTC</option>');
        }
    }

    select.prepend('<option value="any" selected>Any Address</option>');

    if (!reset && old_val)
        select.val(old_val);
}