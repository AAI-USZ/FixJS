function quotaListItem(quota_json){
    var value = JSON.stringify(quota_json)
    var str = '<tr quota=\''+value+'\'><td>'+
        quota_json.TYPE+
        '</td><td style="width:100%;"><pre style="margin:0;">';
    switch(quota_json.TYPE){
    case "VM":
        str +=  'VMs: ' + quota_json.VMS + (quota_json.VMS_USED ? ' (' + quota_json.VMS_USED + '). ' : ". ") +
               'Memory: ' + quota_json.MEMORY + (quota_json.MEMORY_USED ? ' (' + quota_json.MEMORY_USED + '). ' : ". ") +
               'CPU: ' + quota_json.CPU +  (quota_json.CPU_USED ? ' (' + quota_json.CPU_USED + '). ' : ". ");
        break;
    case "DATASTORE":
        str +=  'ID: ' + getDatastoreName(quota_json.ID) + '. ' +
               'Size: ' + quota_json.SIZE +  (quota_json.SIZE_USED ? ' (' + quota_json.SIZE_USED + '). ' : ". ") +
               'Images: ' + quota_json.IMAGES +  (quota_json.IMAGES_USED ? ' (' + quota_json.IMAGES_USED + '). ' : ".");
        break;
    case "IMAGE":
        str +=  'ID: ' + getImageName(quota_json.ID) + '. ' +
               'RVMs: ' + quota_json.RVMS +  (quota_json.RVMS_USED ? ' (' + quota_json.RVMS_USED + '). ' : ". ");
        break;
    case "NETWORK":
        str +=  'ID: ' + getVNetName(quota_json.ID) + '. ' +
               'Leases: ' + quota_json.LEASES +  (quota_json.LEASES_USED ? ' (' + quota_json.LEASES_USED + '). ': ". ");
        break;
    }
    str += '</td><td><i class="quota_edit_icon icon-pencil"></i></pre></td></tr>';
    return str;
}