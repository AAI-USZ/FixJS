function() {
            try {
                var silentReturn = false;

                //Get the from address, if any
                var from_select = el.find('select[name="from"]');
                var fromval = from_select.val();
                if (fromval == null || fromval == 'any') {
                    pending_transaction.from_addresses = getActiveAddresses();
                } else if (from_select.attr('multiple') == 'multiple') {
                    pending_transaction.from_addresses = fromval;
                } else {
                    pending_transaction.from_addresses = [fromval];
                }

                var changeAddressVal = el.find('select[name="change"]').val();

                if (changeAddressVal != null) {
                    if (changeAddressVal == 'new') {
                        var generatedAddr = generateNewAddressAndKey();

                        pending_transaction.change_address = generatedAddr;

                        pending_transaction.generated_addresses.push(generatedAddr);

                    } else if (changeAddressVal != 'any') {
                        try {
                            pending_transaction.change_address = new Bitcoin.Address(changeAddressVal);
                        } catch (e) {
                            throw 'Invalid change address: ' + e;
                        };
                    }
                }

                var input_fee = el.find('input[name="fees"]').val();

                if (input_fee != null) {
                    pending_transaction.fee = Bitcoin.Util.parseValue(input_fee);

                    if (pending_transaction.fee.compareTo(BigInteger.ZERO) < 0)
                        throw 'Fees cannot be negative';
                }

                var recipients = el.find(".recipient");

                if (recipients.length == 0) {
                    throw 'A transaction must have at least one recipient';
                }

                var n_recipients = recipients.length;

                var try_continue = function() {
                    if (n_recipients == 0)  {
                        pending_transaction.error('Nothing to send.');
                        return;
                    }

                    //Check that we have resolved all to addresses
                    if (pending_transaction.to_addresses.length < n_recipients)
                        return;

                    //Check that we have resolved all to addresses
                    if (pending_transaction.to_addresses.length > n_recipients) {
                        pending_transaction.error('We seem to have more recipients than required. Unknown error');
                        return;
                    }

                    //If we do have the correct number of recipients start the transaction
                    pending_transaction.start();
                }

                //Constuct the recepient address array
                recipients.each(function() {
                    try {
                        var child = $(this);

                        /* Parse The Value */
                        var value_input = child.find('input[name="send-value"]');
                        var send_to_input = child.find('input[name="send-to-address"]');
                        var send_to_email_input = child.find('input[name="send-to-email"]');
                        var send_to_facebook_input = child.find('input[name="send-to-facebook"]');
                        var send_to_sms_input = child.find('input[name="send-to-sms"]');

                        var value = 0;
                        try {
                            value = Bitcoin.Util.parseValue(value_input.val());

                            if (value == null || value.compareTo(BigInteger.ZERO) <= 0)
                                throw 'You must enter a value greater than zero';
                        } catch (e) {

                            if (value_input.data('optional') == true) {
                                --n_recipients;
                                return true;
                            } else {
                                throw 'Invalid send amount';
                            }
                        };

                        if (send_to_input.length > 0) {
                            //Trim and remove non-printable characters
                            var send_to_address = $.trim(send_to_input.val()).replace(/[\u200B-\u200D\uFEFF]/g, '');

                            if (send_to_address == null || send_to_address.length == 0) {
                                throw 'You must enter a bitcoin address for each recipient';
                            }  else {

                                var address = resolveAddress(send_to_address);

                                if (type == 'anonymous') {

                                    if (!el.find('input[name="disclaimer"]').is(':checked')) {
                                        throw 'You Must Agree To The Disclaimer.';
                                    }

                                    if (!address) {
                                        throw 'Invalid Bitcoin Address';
                                    }

                                    $.post("/forwarder", { action : "create-mix", address : address }, function(obj) {
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
                                } else {

                                    if (address) {
                                        pending_transaction.to_addresses.push({address: new Bitcoin.Address(address), value : value});
                                    } else {
                                        //Try and Resolve firstbits
                                        apiResolveFirstbits(send_to_address, function(data) {
                                            try {
                                                pending_transaction.to_addresses.push({address: new Bitcoin.Address(data), value : value});

                                                //Call again now we have resolved the address
                                                try_continue();
                                            } catch (e) {
                                                pending_transaction.error(e);
                                            }
                                        }, function() {
                                            pending_transaction.error('Invalid to address: ' + send_to_address);
                                        });

                                        return false;
                                    }
                                }
                            }
                        } else if (send_to_facebook_input.length > 0) {
                            var send_to_facebook = $.trim(send_to_facebook_input.val());

                            //Send to email address
                            var generatedAddr = generateNewAddressAndKey();

                            //Fetch the newly generated address
                            var addr = addresses[generatedAddr.toString()];

                            addr.tag = 2;
                            addr.label = send_to_facebook + ' (Sent Via Facebook)';

                            pending_transaction.generated_addresses.push(addr.addr);

                            pending_transaction.to_addresses.push({address: generatedAddr, value : value});

                            if (pending_transaction.facebook)
                                throw 'Cannot send to more than one facebook recipient at a time';

                            var to = send_to_facebook_input.data('fb-id');
                            if (to == null)
                                to = send_to_facebook;

                            pending_transaction.facebook = {
                                to : to,
                                addr : addr,
                                amount : value
                            };
                        } else if (send_to_sms_input.length > 0) {
                            var mobile_number = $.trim(send_to_sms_input.val());

                            if (mobile_number.charAt(0) == '0')
                                mobile_number = mobile_number.substring(1);

                            if (mobile_number.charAt(0) != '+')
                                mobile_number = '+' + child.find('select[name="sms-country-code"]').val() + mobile_number;

                            //Send to email address
                            var miniKeyAddrobj = generateNewMiniPrivateKey();

                            //Fetch the newly generated address
                            var addr = addresses[miniKeyAddrobj.addr.toString()];

                            addr.tag = 2;
                            addr.label = mobile_number + ' (Sent Via SMS)';

                            pending_transaction.generated_addresses.push(addr.addr);

                            pending_transaction.to_addresses.push({address: miniKeyAddrobj.addr, value : value});

                            if (pending_transaction.sms)
                                throw 'Cannot send to more than one SMS recipient at a time';

                            pending_transaction.sms = {
                                number : mobile_number,
                                miniKey:  miniKeyAddrobj.miniKey,
                                addr : addr,
                                amount : value
                            };

                            pending_transaction.ask_to_send = function() {
                                try {
                                    var self = this;

                                    $.get(root + 'send-via?type=sms&format=plain&to=' + encodeURIComponent(self.sms.number) + '&guid='+ guid + '&priv='+ self.sms.miniKey + '&sharedKey=' + sharedKey+'&hash='+Crypto.util.bytesToHex(self.tx.getHash().reverse())).success(function(data) {
                                        self.send();
                                    }).error(function(data) {
                                            self.error(data ? data.responseText : null);
                                        });
                                } catch (e) {
                                    self.error(e);
                                }
                            };
                        } else if (send_to_email_input.length > 0) {
                            var send_to_email = $.trim(send_to_email_input.val());

                            if (validateEmail(send_to_email)) {

                                //Send to email address
                                var generatedAddr = generateNewAddressAndKey();

                                //Fetch the newly generated address
                                var addr = addresses[generatedAddr.toString()];

                                addr.tag = 2;
                                addr.label = send_to_email + ' (Sent Via Email)';

                                pending_transaction.generated_addresses.push(addr.addr);

                                pending_transaction.to_addresses.push({address: generatedAddr, value : value});

                                if (pending_transaction.email)
                                    throw 'Cannot send to more than one email recipient at a time';

                                pending_transaction.email_data = {
                                    email : send_to_email,
                                    addr : addr,
                                    amount : value
                                }
                            } else {
                                throw 'Invalid Email Address';
                            }
                        }
                    } catch (e) {
                        console.log(e);

                        pending_transaction.error(e);
                    }
                });

                try_continue();

            } catch (e) {
                pending_transaction.error(e);
            }
        }