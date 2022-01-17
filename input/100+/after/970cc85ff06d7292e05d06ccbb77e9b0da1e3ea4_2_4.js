function() {
        $.post("/forwarder", { action : "create-mix", address : getPreferredAddress(), guid : guid, sharedKey : sharedKey }, function(obj) {
            try {
                if (obj.destination != address) {
                    throw 'Mismatch between requested and returned destination address';
                }

                pending_transaction.to_addresses.push({address: new Bitcoin.Address(obj.input_address), value : value});

                //Call again now we have got the forwarding address
                try_continue();
            } catch (e) {
                pending_transaction.error(e);
            }
        }).error(function(data) {
                pending_transaction.error(data ? data.responseText : null);
            });
    }