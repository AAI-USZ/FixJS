function(e) {
                e.preventDefault();
                var code = $('input#code', code_html).val();

                if(code != "" && code != null) {
                    winkstart.request('auth.invite_code', {
                            api_url: winkstart.apps.auth.api_url,
                            invite_code: code
                        },
                        function(_data, status) {
                            winkstart.publish('onboard.register', {
                                invite_code: code
                            });
                        },
                        function(_data, status) {
                            switch(_data['error']) {
                                case '404':
                                    winkstart.alert('error', 'Invalid invite code !');
                                    break;
                                case '410':
                                    winkstart.alert('error', 'Invite code already used !');
                                    break;
                                default:
                                    winkstart.alert('error', '<p>An error occurred</p>' + winkstart.print_r(_data));
                                    break;
                            }
                        }
                    );
                }

            }