function deal_networks ( ) {
    var hv_zone_id = $('select[name="hvzones"]').val()
    var hv_id = $('select[name="packageconfigoption[4]"]').val()
    
    if ( typeof networksByHypervisorZone[hv_zone_id] == 'undefined' ) {
        networksByHypervisorZone[hv_zone_id] = []
    }
    if ( typeof networksByHypervisor[hv_id] == 'undefined' ) {
        networksByHypervisor[hv_id] = []
    }
    
    var $nets   = networksByHypervisorZone[hv_zone_id].concat(networksByHypervisor[hv_id])
    var options = $('select[name="sec_network_id"] option, select[name="packageconfigoption[6]"] option') 
    
    if ( hv_zone_id == 'no_zone' || hv_zone_id == '0'){
        options.each( function(){
            $(this).removeAttr("disabled")
        })
    } else {
        options.each( function(){
            if ( ! in_array( $(this).val(), $nets ) ){
                $(this).attr('disabled', 'disabled')
            } else {
                $(this).removeAttr('disabled')
            }
        })        
    }   
}