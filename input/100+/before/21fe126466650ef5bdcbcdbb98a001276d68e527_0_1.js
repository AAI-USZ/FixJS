function(_data, status) {
                                    THIS.migrate_data(_data);
                                    THIS.format_data(_data);

                                    var render_data = $.extend(true, defaults, _data);

                                    $.each(_data_account.data.available_apps, function(k, v) {
                                        var tmp = {},
                                            available = $.inArray(v, _data.data.available_apps || []);

                                        if(available > -1){
                                            tmp.enabled = true;
                                        } else {
                                            tmp.enabled = false;
                                        }

                                        if(winkstart.config.available_apps[v]) {
                                            $.extend(true, tmp, winkstart.config.available_apps[v]);
                                        }

                                        render_data.field_data.available_apps.push(tmp);
                                    });

                                    winkstart.request('accounts_manager.credits.get', {
                                            account_id: data.id,
                                            api_url: winkstart.apps['accounts'].api_url,
                                            billing_provider: THIS.billing_provider,
                                        },
                                        function(_data_c, status) {
                                            render_data.credits = _data_c.data;

                                            winkstart.request('accounts_manager.limits.get', {
                                                    account_id: data.id,
                                                    api_url: winkstart.apps['accounts'].api_url
                                                },
                                                function(_data_l, status) {
                                                    var limits = {
                                                        inbound_trunks: 0,
                                                        twoway_trunks: 0
                                                    };
                                                    $.extend(true, limits, _data_l.data);
                                                    render_data.limits = limits;

                                                    THIS.render_accounts_manager(render_data, target, callbacks);

                                                    if(typeof callbacks.after_render == 'function') {
                                                        callbacks.after_render();
                                                    }
                                                }
                                            );
                                        }
                                    );
                                }