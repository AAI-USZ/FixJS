function quotaListItem(quota_json){
    var value = JSON.stringify(quota_json)
    var str = '<tr quota=\''+value+'\' ';

    if (quota_json.TYPE == "VM")
        str += ' class="vm_quota" ';

    str += '><td>'+
        quota_json.TYPE+
        '</td><td style="width:100%;"><pre style="margin:0;">';
    switch(quota_json.TYPE){
    case "VM":
        str +=  'VMs: ' + quota_json.VMS + (quota_json.VMS_USED ? ' (' + quota_json.VMS_USED + '). ' : ". ") +
               'Memory: ' + quota_json.MEMORY + (quota_json.MEMORY_USED ? 'MB (' + quota_json.MEMORY_USED + 'MB). ' : ". ") +
               'CPU: ' + quota_json.CPU +  (quota_json.CPU_USED ? ' (' + quota_json.CPU_USED + '). ' : ". ");
        break;
    case "DATASTORE":
        str +=  'ID/Name: ' + getDatastoreName(quota_json.ID) + '. ' +
               'Size: ' + quota_json.SIZE +  (quota_json.SIZE_USED ? 'MB (' + quota_json.SIZE_USED + 'MB). ' : ". ") +
               'Images: ' + quota_json.IMAGES +  (quota_json.IMAGES_USED ? ' (' + quota_json.IMAGES_USED + '). ' : ".");
        break;
    case "IMAGE":
        str +=  'ID/Name: ' + getImageName(quota_json.ID) + '. ' +
               'RVMs: ' + quota_json.RVMS +  (quota_json.RVMS_USED ? ' (' + quota_json.RVMS_USED + '). ' : ". ");
        break;
    case "NETWORK":
        str +=  'ID/Name: ' + getVNetName(quota_json.ID) + '. ' +
               'Leases: ' + quota_json.LEASES +  (quota_json.LEASES_USED ? ' (' + quota_json.LEASES_USED + '). ': ". ");
        break;
    }
    str += '</td><td><button class="quota_edit_icon"><i class="icon-pencil"></i></button></pre></td></tr>';
    return str;
}