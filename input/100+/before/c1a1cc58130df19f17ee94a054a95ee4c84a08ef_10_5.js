function parseQuotas(elem){
    var quotas = [];
    var results = {
        VM : "",
        DATASTORE : "",
        IMAGE : "",
        NETWORK : ""
    }
    //max 1 vm quota
    if (!$.isEmptyObject(elem.VM_QUOTA)){
        elem.VM_QUOTA.VM.TYPE = 'VM'
        quotas.push(elem.VM_QUOTA.VM)
    }

    var ds_arr = []
    if ($.isArray(elem.DATASTORE_QUOTA.DATASTORE)){
        ds_arr = elem.DATASTORE_QUOTA.DATASTORE
    } else if (!$.isEmptyObject(elem.DATASTORE_QUOTA)){
        ds_arr = [elem.DATASTORE_QUOTA.DATASTORE]
    }

    for (var i = 0; i < ds_arr.length; i++){
        ds_arr[i].TYPE = 'DATASTORE';
        quotas.push(ds_arr[i]);
    }

    var im_arr = []
    if ($.isArray(elem.IMAGE_QUOTA.IMAGE)){
        im_arr = elem.IMAGE_QUOTA.IMAGE
    } else if (!$.isEmptyObject(elem.IMAGE_QUOTA)){
        im_arr = [elem.IMAGE_QUOTA.IMAGE]
    }

    for (var i = 0; i < im_arr.length; i++){
        im_arr[i].TYPE = 'IMAGE';
        quotas.push(im_arr[i]);
    }

    var vn_arr = []
    if ($.isArray(elem.NETWORK_QUOTA)){
        vn_arr = elem.NETWORK_QUOTA.NETWORK
    } else if (!$.isEmptyObject(elem.NETWORK_QUOTA)){
        vn_arr = [elem.NETWORK_QUOTA.NETWORK]
    }

    for (var i = 0; i < vn_arr.length; i++){
        vn_arr[i].TYPE = 'NETWORK';
        quotas.push(vn_arr[i]);
    }

    for (var i = 0; i < quotas.length; i++){
        var tr = quotaListItem(quotas[i]);
        results[quotas[i].TYPE] += tr;
    }
    return results;
}