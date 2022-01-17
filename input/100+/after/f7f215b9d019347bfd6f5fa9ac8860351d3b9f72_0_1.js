function(event, ui) {
        $('#customer_search').val(ui.item.label);
        _.each(['bill', 'ship'], function(addr_name){
          var addr = ui.item.data[addr_name + '_address'];
          if(addr!=undefined){
            $('#order_' + addr_name + '_address_attributes_firstname').val(addr['firstname']);
            $('#order_' + addr_name + '_address_attributes_lastname').val(addr['lastname']);
            $('#order_' + addr_name + '_address_attributes_company').val(addr['company']);
            $('#order_' + addr_name + '_address_attributes_address1').val(addr['address1']);
            $('#order_' + addr_name + '_address_attributes_address2').val(addr['address2']);
            $('#order_' + addr_name + '_address_attributes_city').val(addr['city']);
            $('#order_' + addr_name + '_address_attributes_zipcode').val(addr['zipcode']);
            $('#order_' + addr_name + '_address_attributes_state_id').val(addr['state_id']);
            $('#order_' + addr_name + '_address_attributes_country_id').val(addr['country_id']);
            $('#order_' + addr_name + '_address_attributes_phone').val(addr['phone']);
          }
        });

        $('#order_email').val(ui.item.data['email']);
        $('#user_id').val(ui.item.data['id']);
        $('#guest_checkout_true').prop("checked", false);
        $('#guest_checkout_false').prop("checked", true);
        $('#guest_checkout_false').prop("disabled", false);
        return true;
      }