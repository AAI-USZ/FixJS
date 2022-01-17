function(){
            var uname = getValue($(this).val(),4,2,dataTable_vNetworks);
            $('input#NETWORK_UNAME',section_networks).val(uname);
        }