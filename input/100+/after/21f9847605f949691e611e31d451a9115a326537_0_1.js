function(Backbone, $)
{
    SettingsView = Backbone.View.extend({
        initialize: function() {
            var _this = this;
            this.startTemplates();

            this.element = $('#settings');
            this.top_menu = this.element.find('#menu_settings');
            this.child_menu = this.element.find('#inner_settings');
            this.title = this.element.find('.title');
            this.title_text = this.element.find('.title .text');


            this.model.on('change', this.setValues, this);
            this.model.on('all', _.bind(console.log, console));

            this.top_menu.on('click', 'a', function(e)
            {
                e.preventDefault();
                _this.setCurrent($(this).data('content'), $(this).text());
                _this.setValues();
            });

            $('#inner_settings input, #inner_settings textarea, #inner_settings select').live('change', _.bind(this.valueChanged, this));

            this.element.on('click', '.go_back', function(e)
            {
                e.preventDefault();
                _this.returnMenu();
            });
        },
        startTemplates: function()
        {
            if(!this.templates)
            {
                this.templates = {
                    section: Handlebars.compile($('#tmpl_settings_section').html())
                };
            }
        },

        returnMenu: function()
        {
            this.element.find('.settings_content').removeClass('done');
            this.element.removeClass('sub');

            // this.cleaner_timeout = setTimeout(function(){ self.inner_menu_element.html('') }, 300);
            this.title_text.text(this.title.data('title'));
        },

        setCurrent: function(section, title)
        {
            var html = '';
            var _this = this;

            _.each(window.options_map[section].contents, function(item)
            {
                html += _this.templates.section(item);
            });

            this.title_text.text(title);

            this.child_menu.html(html);
            this.element.addClass('sub');
        },
        setValues: function()
        {
            var self = this;
            $('select, input, textarea', this.child_menu).each(function()
            {
                var el = $(this);
                var s = self.model.get(el.attr('name'));
                
                if(el.data('scope') == 'local' && !s)
                {
                    switch(el.attr('name'))
                    {
                        case 'use_compact':
                            var use_compact = localStorage.getItem('use_compact');
                            $('#use_compact').prop('checked', use_compact && use_compact != 'false').trigger('change');
                            break;
                        case 'multi_day_transfer_mode':
                            var value;
                            
                            if(self.model.get('multi_day_transfer_mode_uldl').value == 'true')
                                value = '2';
                            else if(self.model.get('multi_day_transfer_mode_dl').value == 'true')
                                value = '1';
                            else
                                value = '0';
                                
                            $('#multi_day_transfer_mode').val(value);
                            break;
                    }
                } else if(s){
                    if(el.is(':checkbox'))
                    {
                        el.prop('checked', s.value == 'true' || s.value == '1');
                    }else{
                        el.val(s.value);
                    }
                    
                    if(s.type === 0)
                        el.addClass('number');
/**                    
                    if(s.access == 'R')
                        el.attr('disabled', 'disabled');
**/
                }
                
                if(el.data('depends'))
                {
                    el.prop('disabled', !$('[name="' + el.data('depends') + '"]', this.inner_menu_element).is(':checked'));
                }
            });
        },
        valueChanged: function(e) {
            var me = $(e.currentTarget);
            var prop = me.attr('name');
            
            if(me.data('scope') == 'local')
            {
                switch(me.attr('name'))
                {
                    case 'multi_day_transfer_mode':
                        var props, values;
                        props = ['multi_day_transfer_mode_ul', 'multi_day_transfer_mode_dl', 'multi_day_transfer_mode_uldl'];
                        values = [(me.val() == '0' ? 1 : 0), (me.val() == '1' ? 1 : 0), (me.val() == '2' ? 1 : 0)];
                        
                        for(var i = 0; i < props.length; i++)
                            this.model.get(props[i]).value = values[i];
                        
                        this.setSettings(props, values);
                        break;
                    
                    case 'use_compact':
                        var checked = me.is(':checked');
                        localStorage.setItem('use_compact', '' + checked);
                        $('#torrents').toggleClass('compact', checked);
                        
                        break;
                }
                
                if(me.attr('name').indexOf('webui.') >= 0)
                {
                    var webui_s = JSON.parse(this.settings['webui.cookie'].value);
                    
                    var name = me.attr('name');
                    name = name.replace('webui._cookie.', '');
                    
                    if(me.is(':checkbox'))
                        webui_s[name] = me.is(':checked');
                    else
                        webui_s[name] = me.val();
                    
                    this.model.get('webui._cookie.' + name).value = '' + webui_s[name];
                    this.model.get('webui.cookie').value = JSON.stringify(webui_s);
                    this.setSettings('webui.cookie', this.model.get('webui.cookie').value);
                }
                return;
            }
            
            if(me.is(':checkbox'))
            {
                value = me.is(':checked') ? true : false;
                
                me.find('[data-depends="' + me.attr('id') + '"]').prop('disabled', !value);
                
                if(this.model.has(prop))
                    this.model.get(prop).value = '' + !!value;
            }else{
                value = me.val();
                
                if(this.model.has(prop))
                    this.model.get(prop).value = value;
            }
            
            if(this.model.has(prop))
            {
                this.model.setSettings(prop, value);
            }
        }
     });
    // !Settings
    Settings = Backbone.Model.extend({
        initialize: function()
        {
            var _this = this;
            this.loadAll();
        },

       setSetting: function(s, v) {
            console.log('setSetting(' + s + ',' + v + ')');
            var attr = {};
            attr[s] = v;
            this.btapp.get('settings').save(attr);
        },
        setSettings: function(s, v)
        {
            if(!_.isArray(s)) {
                this.setSetting(s, v);
            } else {
                for(var i = 0; i < s.length; i++)
                {
                    this.setSetting(s[i], v[i]);
                }
            }
        },
        loadAll: function()
        {
            this.first_load = true;
            this.btapp = new Btapp();
            this.btapp.connect({
                queries: ['btapp/settings/'],
                product: 'uTorrent',
                plugin: false,
                poll_frequency: 100
            });
            this.btapp.on('add:settings', function(settings) {
                function processSetting(value, key) {
                    if(typeof value === 'string' && (value === 'true' || value === 'false')) {
                        value = (value === 'true' ? true : false);
                    }
                    this.set(key, {
                        type: typeof value,
                        value: value
                    });
                    if(key == 'webui.cookie')
                    {
                        var parsed = JSON.parse(value);
                        _.each(parsed, function(val, key)
                        {
                            this.set('webui._cookie.' + key, {
                                type: !isNaN(val) ? 0 : (val == 'true' && val == 'false' ? 1 : 2),
                                value: '' + val
                            });
                        });
                    };
                }
                function processSettings(settings) {
                    _.each(settings, processSetting, this);
                }
                processSettings.call(this,  settings.toJSON());
                settings.on('change', function() {
                    processSettings.call(this, this.btapp.get('settings').toJSON());
                }, this);
            }, this);
        }
    });

    // window.Settings = Settings();

    $(function()
    {
        window.settings = new Settings();
        window.settingsview = new SettingsView({model: settings});
    })

    window.options_map = {
        'general': {
            name: 'General',
            contents: {
                'language': {
                    title: 'Language',
                    elements: [
                        {
                            control_combo: true,
                            label_1: 'Language:',
                            combo_1: { 
                                name: 'webui.lang',
                                contents: [
                                    { label: 'English', value: 'en' },
                                    { label: 'Spanish', value: 'es' }
                                ]
                            }
                        }
                    ]
                },
                'privacy': {
                    title: 'Privacy',
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Check for updates',
                            checkbox_1: 'check_update'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Update to beta versions',
                            checkbox_1: 'check_update_beta'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Send anonymous information',
                            checkbox_1: 'anoninfo'
                        }
                    ]
                },
                'when_downloading': {
                    title: 'When Downloading',
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Append .!ut to imcomplete files',
                            checkbox_1: 'append_incomplete'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Pre-allocate space for files',
                            checkbox_1: 'prealloc_space'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Prevent standby if there are active torrents',
                            checkbox_1: 'sys.prevent_standby'
                        }
                    ]
                }
            }
        },
        
        'ui_settings': {
            name: 'UI Settings',
            contents: {
                'display_local': {
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Compact View',
                            checkbox_1: 'use_compact',
                            scope: 'local'
                        }
                    ]
                },
                'display_options': {
                    title: 'Display Options',
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Confirm when deleting torrents',
                            checkbox_1: 'confirm_when_deleting'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Confirm when deleting trackers',
                            checkbox_1: 'confirm_remove_tracker'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Show confirmation dialogs on exit',
                            checkbox_1: 'confirm_exit'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Alternate list background',
                            checkbox_1: 'gui.alternate_color'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Show current speed in the title bar',
                            checkbox_1: 'gui.speed_in_title'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Show speed limits in the status bar',
                            checkbox_1: 'gui.limits_in_statusbar'
                        }
                    ]
                },
                'when_adding_torrents': {
                    title: 'When Adding Torrents',
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Don\'t start the download automatically',
                            checkbox_1: 'torrents_start_stopped'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Activate the program window',
                            checkbox_1: 'activate_on_file'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Show a window that displays the files inside the torrent',
                            checkbox_1: 'show_add_dialog'
                        }
                    ]
                }
            }
        },
        
        'directories': {
            name: 'Directories',
            contents: {
                'location_downloaded_files': {
                    title: 'Location of downloaded files',
                    elements: [
                        {
                            control_checkbox_textbox: true,
                            checkbox_1: 'dir_active_download_flag',
                            label_1: 'Put new downloads in:',
                            textbox_1: 'dir_active_download'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Always show dialog in manual add',
                            checkbox_1: 'always_show_add_dialog'
                        },
                        {
                            control_checkbox_textbox: true,
                            checkbox_1: 'dir_completed_download_flag',
                            label_1: 'Move completed downloads to:',
                            textbox_1: 'dir_completed_download'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Append the torrent\'s label',
                            checkbox_1: 'dir_add_label'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Only move from the default download directory',
                            checkbox_1: 'move_if_defdir'
                        }
                    ]
                },
                'location_torrents': {
                    title: 'Location of torrents',
                    elements: [
                        {
                            control_checkbox_textbox: true,
                            checkbox_1: 'dir_torrent_files_flag',
                            label_1: 'Store .torrents in:',
                            textbox_1: 'dir_torrent_files'
                        },
                        {
                            control_checkbox_textbox: true,
                            checkbox_1: 'dir_completed_torrents_flag',
                            label_1: 'Move .torrents for finished jobs to:',
                            textbox_1: 'dir_completed_torrents'
                        },
                        {
                            control_checkbox_textbox: true,
                            checkbox_1: 'dir_autoload_flag',
                            label_1: 'Automatically load .torrents from:',
                            textbox_1: 'dir_autoload'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Delete loaded .torrents',
                            checkbox_1: 'dir_autoload_delete'
                        }
                    ]
                }
            }
        },
        
        'connection': {
            name: 'Connection',
            contents: {
                'listening_port': {
                    title: 'Listening port',
                    elements: [
                        {
                            control_textbox: true,
                            label_1: 'Port used for incoming connections:',
                            textbox_1: 'bind_port'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Enable UPnP portmapping',
                            checkbox_1: 'upnp'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Randomize port on each start',
                            checkbox_1: 'rand_port_on_start'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Enable NAT-PMP portmapping',
                            checkbox_1: 'natpmp'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Add Windows Firewall exception',
                            checkbox_1: 'disable_fw'
                        }
                    ]
                },
                'proxy_server': {
                    title: 'Proxy Server',
                    elements: [
                        {
                            control_combo: true,
                            label_1: 'Type:',
                            combo_1: { 
                                name: 'proxy.type',
                                contents: [
                                    { label: '(none)', value: '0' },
                                    { label: 'Socks4', value: '1' },
                                    { label: 'Socks5', value: '2' },
                                    { label: 'HTTPS', value: '3' },
                                    { label: 'HTTP', value: '4' }
                                ]
                            }
                        },
                        {
                            control_textbox_large: true,
                            label_1: 'Proxy:',
                            checkbox_1: 'proxy.proxy'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Port:',
                            checkbox_1: 'proxy.port'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Authentication',
                            checkbox_1: 'proxy.auth'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Username:',
                            checkbox_1: 'proxy.username',
                            depends: 'proxy.auth'
                        },
                        {
                            control_password: true,
                            label_1: 'Password:',
                            checkbox_1: 'proxy.password',
                            depends: 'proxy.auth'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Resolve hostnames through proxy:',
                            checkbox_1: 'proxy.resolve'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Use proxy server for peer-to-peer connections',
                            checkbox_1: 'proxy.p2p'
                        }
                    ]
                },
                'proxy_privacy': {
                    title: 'Proxy Privacy',
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Disable all local DNS lookups:',
                            checkbox_1: 'no_local_dns'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Disable features that leak identifying information',
                            checkbox_1: 'private_ip'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Disable connections unsupported by the proxy',
                            checkbox_1: 'only_proxied_conns'
                        }
                    ]
                }
            }
        },
            
        'bandwidth': {
            name: 'Bandwidth',
            contents: {
                'upload_rate_limiting': {
                    title: 'Global Upload Rate Limiting',
                    elements: [
                        {
                            control_textbox: true,
                            label_1: 'Maximum upload rate (kB/s): [0: unlimited]',
                            textbox_1: 'max_ul_rate'
                        },
                        {
                            control_checkbox_textbox: true,
                            label_1: 'Alternate upload rate when not downloading (kB/s):',
                            checkbox_1: 'max_ul_rate_seed_flag',
                            textbox_1: 'max_ul_rate_seed'
                        }
                    ]
                },
                'download_rate_limiting': {
                    title: 'Global Download Rate Limiting',
                    elements: [
                        {
                            control_textbox: true,
                            label_1: 'Maximum download rate (kB/s): [0: unlimited]',
                            textbox_1: 'max_dl_rate'
                        }
                    ]
                },
                'rate_limit': {
                    title: 'Global Rate Limit Options',
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Apply rate limit to transport overhead',
                            checkbox_1: 'net.calc_overhead'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Apply rate limit to uTP connections',
                            checkbox_1: 'net.ratelimit_utp'
                        }
                    ]
                },
                'number_connections': {
                    title: 'Number of Connections',
                    elements: [
                        {
                            control_textbox: true,
                            label_1: 'Global maximum number of connections:',
                            textbox_1: 'conns_globally'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Maximum number of connected peers per torrent:',
                            textbox_1: 'conns_per_torrent'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Number of upload slots per torrent:',
                            textbox_1: 'ul_slots_per_torrent'
                        }
                    ]
                }
            }
        },
        
        'bittorrent': {
            name: 'BitTorrent',
            contents: {
                'basic_bt': {
                    title: 'Basic BitTorrent Features',
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Enable DHT Network',
                            checkbox_1: 'dht'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Enable DHT for new torrents',
                            checkbox_1: 'dht_per_torrent'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Enable Local Peer Discovery',
                            checkbox_1: 'lsd'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Enable bandwidth management [uTP]',
                            checkbox_1: 'enable_bw_management'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Ask tracker for scrape information',
                            checkbox_1: 'enable_scrape'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Enable Peer Exchange',
                            checkbox_1: 'pex'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Limit local peer bandwidth',
                            checkbox_1: 'rate_limit_local_peers'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Enable UDP tracker support',
                            checkbox_1: 'use_udp_trackers'
                        },
                        {
                            control_textbox_large: true,
                            label_1: 'IP/Hostname to report to tracker:',
                            textbox_1: 'tracker_ip'
                        }
                    ]
                },
                'protocol_encryption': {
                    title: 'Protocol Encryption',
                    elements: [
                        {
                            control_combo: true,
                            label_1: 'Outgoing:',
                            combo_1: { 
                                name: 'encryption_mode',
                                contents: [
                                    { label: 'Disabled', value: '0' },
                                    { label: 'Enabled', value: '1' },
                                    { label: 'Forced', value: '2' }
                                ]
                            }
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Allow incoming legacy connections',
                            checkbox_1: 'encryption_allow_legacy'
                        }
                    ]
                }
            }
        },
        
        'transfer_cap': {
            name: 'Transfer Cap',
            contents: {
                'enable_transfer_cap': {
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Enable Transfer Cap',
                            checkbox_1: 'multi_day_transfer_limit_en'
                        }
                    ]
                },
                'cap_settings': {
                    title: 'Cap Settings',
                    elements: [
                        {
                            control_combo: true,
                            label_1: 'Limit Type:',
                            scope: 'local',
                            combo_1: {
                                name: 'multi_day_transfer_mode',
                                contents: [
                                    { label: 'Uploads', value: '0' },
                                    { label: 'Downloads', value: '1' },
                                    { label: 'Uploads + Downloads', value: '2' }
                                ]
                            },
                            depends: 'multi_day_transfer_limit_en'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Bandwidth Cap (Value):',
                            textbox_1: 'multi_day_transfer_limit_value',
                            depends: 'multi_day_transfer_limit_en'
                        },
                        {
                            control_combo: true,
                            label_1: 'Bandwidth Cap (Units):',
                            combo_1: {
                                name: 'multi_day_transfer_limit_unit',
                                contents: [
                                    { label: 'MB', value: '0' },
                                    { label: 'GB', value: '1' }
                                ]
                            },
                            depends: 'multi_day_transfer_limit_en'
                        },
                        {
                            control_combo: true,
                            label_1: 'Time Period (Days):',
                            combo_1: {
                                name: 'multi_day_transfer_limit_span',
                                contents: [
                                    { label: '1', value: '0' },
                                    { label: '2', value: '1' },
                                    { label: '5', value: '2' },
                                    { label: '7', value: '3' },
                                    { label: '10', value: '4' },
                                    { label: '14', value: '5' },
                                    { label: '15', value: '6' },
                                    { label: '20', value: '7' },
                                    { label: '21', value: '8' },
                                    { label: '28', value: '9' },
                                    { label: '30', value: '10' },
                                    { label: '31', value: '11' }
                                ]
                            },
                            depends: 'multi_day_transfer_limit_en'
                        }
                    ]
                }
            }
        },
        
        'queuing': {
            name: 'Queuing',
            contents: {
                'queue_settings': {
                    title: 'Queue Settings',
                    elements: [
                        {
                            control_textbox: true,
                            label_1: 'Maximum number of active torrents (upload or download):',
                            textbox_1: 'max_active_torrent'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Maximum number of active downloads:',
                            textbox_1: 'max_active_downloads'
                        }
                    ]
                },
                'seed_while': {
                    title: 'Seed While [Default values]',
                    elements: [
                        {
                            control_textbox: true,
                            label_1: 'Minimum ratio (%):',
                            textbox_1: 'seed_ratio'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Minimum seeding time (minutes):',
                            textbox_1: 'seed_time'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Seeding tasks have higher priority than downloading tasks',
                            checkbox_1: 'seeds_prioritized'
                        }
                    ]
                },
                'when_ut_reaches_seeding': {
                    title: 'Global Rate Limit Options',
                    elements: [
                        {
                            control_checkbox_textbox: true,
                            label_1: 'Limit the upload rate to (kB/s): [0: stop]',
                            checkbox_1: 'seed_prio_limitul_flag',
                            textbox_1: 'seed_prio_limitul'
                        }
                    ]
                }
            }
        },
        
        'scheduler': {
            name: 'Scheduler',
            contents: {
                'scheduler_settings': {
                    title: 'Scheduler Settings',
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Enable Scheduler:',
                            checkbox_1: 'sched_enable'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Limit upload rate (kB/s):',
                            textbox_1: 'sched_ul_rate'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Limit download rate (kB/s):',
                            textbox_1: 'sched_dl_rate'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Disable DHT when turning off:',
                            checkbox_1: 'sched_dis_dht'
                        }
                    ]
                }
            }
        },
        
        'web_ui': {
            name: 'Web UI',
            contents: {
                'enable_web_ui': {
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Enable Web UI',
                            checkbox_1: 'webui.enable'
                        }
                    ]
                },
                'authentication': {
                    title: 'Authentication',
                    elements: [
                        {
                            control_textbox: true,
                            label_1: 'Username:',
                            textbox_1: 'webui.username'
                        },
                        {
                            control_password: true,
                            label_1: 'Password:',
                            password_1: 'webui.password'
                        },
                        {
                            control_checkbox_textbox: true,
                            label_1: 'Enable Guest account with username:',
                            checkbox_1: 'webui.enable_guest',
                            textbox_1: 'webui.guest'
                        }
                    ]
                },
                'connectivity': {
                    title: 'Connectivity',
                    elements: [
                        {
                            control_checkbox_textbox: true,
                            label_1: 'Alternative listening port (default is the connection port):',
                            checkbox_1: 'webui.enable_listen',
                            textbox_1: 'webui.port'
                        },
                        {
                            control_textbox_large: true,
                            label_1: 'Allow access only from these IPs (separate multiple entries with comma):',
                            textbox_1: 'webui.restrict'
                        }
                    ]
                },
                'user_interface': {
                    title: 'User Interface',
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Show Toolbar',
                            checkbox_1: 'webui._cookie.showToolbar',
                            scope: 'local'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Show Category List',
                            checkbox_1: 'webui._cookie.showCategories',
                            scope: 'local'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Show Detailed Info',
                            checkbox_1: 'webui._cookie.showDetails',
                            scope: 'local'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Show Status Bar',
                            checkbox_1: 'webui._cookie.showStatusBar',
                            scope: 'local'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Update GUI every(ms):',
                            textbox_1: 'webui._cookie.updateInterval',
                            scope: 'local'
                        },
                        {
                            control_textbox: true,
                            label_1: 'Max. rows per page:',
                            textbox_1: 'webui._cookie.maxRows',
                            scope: 'local'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Use system fonts',
                            checkbox_1: 'webui._cookie.useSysFont',
                            scope: 'local'
                        }
                    ]
                }
            }
        },
        
        'ui_extras': {
            name: 'UI Extras',
            contents: {
                'persistent_labels': {
                    title: 'Persistent Labels',
                    elements: [
                        {
                            control_textbox_large: true,
                            label_1: 'Separate multiple labels with | character:',
                            textbox_1: 'gui.persistent_labels'
                        }
                    ]
                },
                'search_engines': {
                    title: 'Search Engines',
                    elements: [
                        {
                            control_textarea: true,
                            label_1: 'Format: name|URL',
                            textarea_1: 'search_list'
                        }
                    ]
                }
            }
        },
        
        'disk_cache': {
            name: 'Disk Cache',
            contents: {
                'basic_cache_settings': {
                    title: 'Basic Cache Settings',
                    elements: [
                        {
                            control_html: true,
                            html: '<p>The disk cache is used to keep frequently accessed data in memory to reduce the number of reads and writes to the hard drive. &micro;Torrent normally manages the cache automatically, but you may change its behavior by modifying these settings.</p>'
                        },
                        {
                            control_checkbox_textbox: true,
                            label_1: 'Override automatic cache size and specify the size manually (MB):',
                            checkbox_1: 'cache.override',
                            textbox_1: 'cache.override_size'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Reduce memory usage when the cache is not needed',
                            checkbox_1: 'cache.reduce'
                        }
                    ]
                },
                'advanced_cache_settings': {
                    title: 'Advanced Cache Settings',
                    elements: [
                        {
                            control_checkbox: true,
                            label_1: 'Enable caching of disk writes',
                            checkbox_1: 'cache.write'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Write out untouched blocks every 2 minutes',
                            checkbox_1: 'cache.writeout',
                            depends: 'cache.write'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Write out finished pieces immediately',
                            checkbox_1: 'cache.writeimm',
                            depends: 'cache.write'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Enable caching of disk reads',
                            checkbox_1: 'cache.read'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Turn off read caching if the upload speed is slow',
                            checkbox_1: 'cache.read_turnoff',
                            depends: 'cache.read'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Remove old blocks from the cache',
                            checkbox_1: 'cache.read_prune',
                            depends: 'cache.read'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Increase automatic cache size when cache thrashing',
                            checkbox_1: 'cache.read_thrash',
                            depends: 'cache.read'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Disable Windows caching of disk writes',
                            checkbox_1: 'cache.disable_win_write'
                        },
                        {
                            control_checkbox: true,
                            label_1: 'Disable Windows caching of disk reads',
                            checkbox_1: 'cache.disable_win_read'
                        }
                    ]
                }
            }
        },
        
        'run_program': {
            name: 'Run Program',
            contents: {
                'run_program': {
                    title: 'Run Program',
                    elements: [
                        {
                            control_textbox_large: true,
                            label_1: 'Run this program when a torrent finishes:',
                            textbox_1: 'finish_cmd'
                        },
                        {
                            control_textbox_large: true,
                            label_1: 'Run this program when a torrent changes state:',
                            textbox_1: 'state_cmd'
                        },
                        {
                            control_html: true,
                            html: '<p>\
You can use these commands:<br />\
%F - Name of downloaded file (for single file torrents)<br />\
%D - Directory where files are saved<br />\
%N - Title of torrent<br />\
%S - State of torrent<br />\
%L - Label<br />\
%T - Tracker<br />\
%M - Status message string (same as status column)<br />\
%I - hex encoded info-hash<br />\
<br />\
State is a combination of:<br />\
started = 1, checking = 2, start-after-check = 4,<br />\
checked = 8, error = 16, paused = 32, auto = 64, loaded = 128</p>'
                        }
                    ]
                }
            }
        },
        
        'about': {
            name: 'About',
            contents: {
                'info': {
                    title: 'Information',
                    elements: [
                        {
                            control_html: true,
                            html: '<p>\
Copyright &copy; ' + (new Date()).getFullYear() + '<br />\
BitTorrent Inc.<br />\
All Rights Reserved.</p>'
                        },
                        {
                            control_html: 1,
                            html: '<p><a class="open_sessions">Click here to manage sessions.</a></p>'
                        }
                    ]
                }
            }
        }
        
    }//End Settings

}