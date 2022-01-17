function(_data_wl, status) {
                                defaults.field_data.whitelabel = _data_wl.data;
                                defaults.field_data.whitelabel.logo_url = winkstart.apps['accounts'].api_url + '/accounts/'+data.id+'/whitelabel/logo?auth_token='+winkstart.apps['accounts'].auth_token;

                                render();
                            }