function(_data_c, status) {
                        winkstart.request('accounts_manager.limits.get', {
                                account_id: account_id,
                                api_url: winkstart.apps['accounts'].api_url
                            },
                            function(_data_l, status) {

                                var tmp = {
                                    account_id: account_id,
                                    limits: _data_l.data,
                                    credits: _data_c.data
                                };

                                THIS.render_credits_limits_popup(tmp);
                            }
                        );
                    }