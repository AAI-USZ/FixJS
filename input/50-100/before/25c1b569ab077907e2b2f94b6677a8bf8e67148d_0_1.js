function (e) {
                                e.preventDefault();
                                var action = $('#ws_form').find('form').attr('action');
                                action = action.replace('_instanceId', node.data.key);
                                var id = $('ws_form').find('form').attr('id');
                                ClaroUtils.sendForm(action, document.getElementById(id), submissionHandler);
                            }