function(){
            var option = $('option:selected',this);
            var uname = getValue(option.attr('elem_id'),1,2,dataTable_vNetworks);
            $('input#NETWORK_UNAME',section_networks).val(uname);
        }