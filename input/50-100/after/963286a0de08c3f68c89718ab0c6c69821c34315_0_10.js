function(data) {
            if (confirm(data)) {
                if (currentRecording == -1 && selected_customer == id) {
                  $('#buzzer').addClass('disabled');
                  selected_customer = false;
                  $("#sel_customer").html('');
                }
                $.post(adminPanel_extension_path + "processor.php", {axAction: "deleteCustomer", axValue: 1, id: id }, 
                    function() { adminPanel_extension_refreshSubtab('customers');
                 hook_customers_changed(); }
                );
            }
        }