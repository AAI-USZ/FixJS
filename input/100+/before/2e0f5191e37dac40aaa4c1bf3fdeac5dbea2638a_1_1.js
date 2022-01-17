function(modify,params) {

    JSAN.use('OpenILS.data'); var data = new OpenILS.data(); data.init({'via':'stash'});
    JSAN.use('util.network'); var network = new util.network();
    JSAN.use('util.money');

    var c = [
        {
            'id' : 'acp_id',
            'fm_class' : 'acp',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_id'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.acp.id(); },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'circ_id',
            'fm_class' : 'circ',
            'label' : document.getElementById('commonStrings').getString('staff.circ_label_id'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.circ ? my.circ.id() : ""; },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'mvr_doc_id',
            'fm_class' : 'mvr',
            'label' : document.getElementById('commonStrings').getString('staff.mvr_label_doc_id'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.mvr.doc_id(); },
            'persist' : 'hidden width ordinal'
        },
        {
            'persist' : 'hidden width ordinal',
            'id' : 'service',
            'label' : 'Service',
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.service; }
        },
        {
            'id' : 'barcode',
            'fm_class' : 'acp',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_barcode'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.acp.barcode(); },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'call_number',
            'fm_class' : 'acp',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_call_number'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.acp && my.acp.call_number() == -1) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.not_cataloged');
                } else if (my.acp && my.acp.call_number() == -2) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.retrieving');
                } else {
                    if (!my.acn) {
                        var x = network.simple_request("FM_ACN_RETRIEVE.authoritative",[ my.acp.call_number() ]);
                        if (x.ilsevent) {
                            return document.getElementById('circStrings').getString('staff.circ.utils.not_cataloged');
                        } else {
                            my.acn = x; return x.label();
                        }
                    } else {
                        return my.acn.label();
                    }
                }
            },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'owning_lib',
            'fm_class' : 'acn',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.owning_lib'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (Number(my.acn.owning_lib())>=0) {
                    return data.hash.aou[ my.acn.owning_lib() ].shortname();
                } else {
                    return my.acn.owning_lib().shortname();
                }
            },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'copy_number',
            'fm_class' : 'acp',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_copy_number'),
            'flex' : 1,
            'sort_type' : 'number',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.acp.copy_number(); },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'location',
            'fm_class' : 'acp',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_location'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (Number(my.acp.location())>=0) {
                    return data.lookup("acpl", my.acp.location() ).name();
                } else {
                    return my.acp.location().name();
                }
            },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'loan_duration',
            'fm_class' : 'acp',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_loan_duration'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                switch(Number(my.acp.loan_duration())) {
                    case 1:
                        return document.getElementById('circStrings').getString('staff.circ.utils.loan_duration.short');
                        break;
                    case 2:
                        return document.getElementById('circStrings').getString('staff.circ.utils.loan_duration.normal');
                        break;
                    case 3:
                        return document.getElementById('circStrings').getString('staff.circ.utils.loan_duration.long');
                        break;
                };
            },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'circ_lib',
            'fm_class' : 'acp',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_circ_lib'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (Number(my.acp.circ_lib())>=0) {
                    return data.hash.aou[ my.acp.circ_lib() ].shortname();
                } else {
                    return my.acp.circ_lib().shortname();
                }
            },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'fine_level',
            'fm_class' : 'acp',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_fine_level'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                switch(Number(my.acp.fine_level())) {
                    case 1:
                        return document.getElementById('circStrings').getString('staff.circ.utils.fine_level.low');
                        break;
                    case 2:
                        return document.getElementById('circStrings').getString('staff.circ.utils.fine_level.normal');
                        break;
                    case 3:
                        return document.getElementById('circStrings').getString('staff.circ.utils.fine_level.high');
                        break;
                };
            },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'circulate',
            'fm_class' : 'acp',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.circulate'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (get_bool( my.acp.circulate() )) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.yes');
                } else {
                    return document.getElementById('circStrings').getString('staff.circ.utils.no');
                }
            },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'deleted',
            'fm_class' : 'acp',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.deleted'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (get_bool( my.acp.deleted() )) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.yes');
                } else {
                    return document.getElementById('circStrings').getString('staff.circ.utils.no');
                }
            },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'holdable',
            'fm_class' : 'acp',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.holdable'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (get_bool( my.acp.holdable() )) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.yes');
                } else {
                    return document.getElementById('circStrings').getString('staff.circ.utils.no');
                }
            },
            'persist' : 'hidden width ordinal'
        },
        {
            'id' : 'floating',
            'fm_class' : 'acp',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.floating'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (get_bool( my.acp.floating() )) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.yes');
                } else {
                    return document.getElementById('circStrings').getString('staff.circ.utils.no');
                }
            },
            'persist' : 'hidden width ordinal'
        },

        {
            'id' : 'opac_visible',
            'fm_class' : 'acp',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.opac_visible'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (get_bool( my.acp.opac_visible() )) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.yes');
                } else {
                    return document.getElementById('circStrings').getString('staff.circ.utils.no');
                }
            },
            'persist' : 'hidden width ordinal'
        },
        {
            'persist' : 'hidden width ordinal',
            'id' : 'acp_mint_condition',
            'fm_class' : 'acp',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.acp_mint_condition'),
            'flex' : 0,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (get_bool( my.acp.mint_condition() )) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.acp_mint_condition.true');
                } else {
                    return document.getElementById('circStrings').getString('staff.circ.utils.acp_mint_condition.false');
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'acp',
            'id' : 'ref',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.reference'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (get_bool( my.acp.ref() )) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.yes');
                } else {
                    return document.getElementById('circStrings').getString('staff.circ.utils.no');
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'acp',
            'id' : 'deposit',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.deposit'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (get_bool( my.acp.deposit() )) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.yes');
                } else {
                    return document.getElementById('circStrings').getString('staff.circ.utils.no');
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'acp',
            'id' : 'deposit_amount',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_deposit_amount'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.acp.price() == null) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.unset');
                } else {
                    return util.money.sanitize(my.acp.deposit_amount());
                }
            },
            'sort_type' : 'money'
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'acp',
            'id' : 'price',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_price'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.acp.price() == null) {
                    return document.getElementById('circStrings').getString('staff.circ.utils.unset');
                } else {
                    return util.money.sanitize(my.acp.price());
                }
            },
            'sort_type' : 'money'
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'acp',
            'id' : 'circ_as_type',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_circ_as_type'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.acp.circ_as_type(); }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'acp',
            'id' : 'circ_modifier',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_circ_modifier'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { var cm = my.acp.circ_modifier(); return document.getElementById('commonStrings').getFormattedString('staff.circ_modifier.display',[cm,data.hash.ccm[cm].name(),data.hash.ccm[cm].description()]); }
        },
        {
            'id' : 'status_changed_time',
            'fm_class' : 'acp',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.status_changed_time'),
            'flex' : 1,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return util.date.formatted_date( my.acp.status_changed_time(), '%{localized}' ); },
            'persist' : 'hidden width ordinal'
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'checkout_lib',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.checkout_lib'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.circ) {
                    return data.hash.aou[ my.circ.circ_lib() ].shortname();
                } else {
                    return "";
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'xact_start',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.xact_start'),
            'flex' : 1,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.circ) {
                    return util.date.formatted_date( my.circ.xact_start(), '%{localized}' );
                } else {
                    return "";
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'checkin_time',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.checkin_time'),
            'flex' : 1,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.circ) {
                    return util.date.formatted_date( my.circ.checkin_time(), '%{localized}' );
                } else {
                    return "";
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'xact_finish',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.xact_finish'),
            'flex' : 1,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.circ ? util.date.formatted_date( my.circ.xact_finish(), '%{localized}' ) : ""; },
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'due_date',
            'label' : document.getElementById('commonStrings').getString('staff.circ_label_due_date'),
            'flex' : 1,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.circ) {
                    return util.date.formatted_date( my.circ.due_date(), '%{localized}' );
                } else {
                    return "";
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'acp',
            'id' : 'acp_create_date',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.create_date'),
            'flex' : 1,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return util.date.formatted_date( my.acp.create_date(), '%{localized}' ); }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'acp',
            'id' : 'acp_edit_date',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.edit_date'),
            'flex' : 1,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return util.date.formatted_date( my.acp.edit_date(), '%{localized}' ); }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'mvr',
            'id' : 'title',
            'label' : document.getElementById('commonStrings').getString('staff.mvr_label_title'),
            'flex' : 2,
            'sort_type' : 'title',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.mvr) {
                    if (my.mvr.doc_id() == -1) {
                        return my.acp.dummy_title();
                    } else {
                        return my.mvr.title();
                    }
                } else {
                    return my.acp.dummy_title();
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'mvr',
            'id' : 'author',
            'label' : document.getElementById('commonStrings').getString('staff.mvr_label_author'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.mvr) {
                    if (my.mvr.doc_id() == -1) {
                        return my.acp.dummy_author();
                    } else {
                        return my.mvr.author();
                    }
                } else {
                    return my.acp.dummy_author();
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'mvr',
            'id' : 'edition',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.edition'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.mvr.edition(); }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'mvr',
            'id' : 'isbn',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.isbn'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { 
                if (my.mvr) {
                    if (my.mvr.doc_id() == -1) {
                        return my.acp.dummy_isbn();
                    } else {
                        return my.mvr.isbn();
                    }
                } else {
                    return my.acp.dummy_isbn();
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'mvr',
            'id' : 'pubdate',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.pubdate'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.mvr.pubdate(); }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'mvr',
            'id' : 'publisher',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.publisher'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.mvr.publisher(); }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'mvr',
            'id' : 'tcn',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.tcn'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.mvr.tcn(); }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'renewal_remaining',
            'label' : document.getElementById('commonStrings').getString('staff.circ_label_renewal_remaining'),
            'flex' : 0,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.circ) {
                    return my.circ.renewal_remaining();
                } else {
                    return "";
                }
            },
            'sort_type' : 'number'
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'stop_fines',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.stop_fines'),
            'flex' : 0,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.circ) {
                    return my.circ.stop_fines();
                } else {
                    return "";
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'stop_fines_time',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.stop_fines_time'),
            'flex' : 0,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (my.circ) {
                    return util.date.formatted_date( my.circ.stop_fines_time(), '%{localized}' );
                } else {
                    return "";
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'acp',
            'id' : 'acp_status',
            'label' : document.getElementById('commonStrings').getString('staff.acp_label_status'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) {
                if (Number(my.acp.status())>=0) {
                    return data.hash.ccs[ my.acp.status() ].name();
                } else {
                    return my.acp.status().name();
                }
            }
        },
        {
            'persist' : 'hidden width ordinal',
            'id' : 'route_to',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.route_to'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.route_to.toString(); }
        },
        {
            'persist' : 'hidden width ordinal',
            'id' : 'message',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.message'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.message.toString(); }
        },
        {
            'persist' : 'hidden width ordinal',
            'id' : 'uses',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.uses'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.uses; },
            'sort_type' : 'number'
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'acp',
            'id' : 'alert_message',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.alert_message'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.acp.alert_message(); }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'checkin_workstation',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.checkin_workstation'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.circ ? ( typeof my.circ.checkin_workstation() == 'object' ? my.circ.checkin_workstation().name() : my.circ.checkin_workstation() ) : ""; },
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'checkout_workstation',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.checkout_workstation'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.circ ? ( typeof my.circ.workstation() == 'object' ? my.circ.workstation().name() : my.circ.workstation() ) : ""; },
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'checkout_workstation_top_of_chain',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.checkout_workstation_top_of_chain'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { if (my.circ&&!my.original_circ) { if(!get_bool(my.circ.desk_renewal())&&!get_bool(my.circ.opac_renewal())&&!get_bool(my.circ.phone_renewal())){my.original_circ = my.circ;}}; return my.original_circ ? ( typeof my.original_circ.workstation() == 'object' ? my.original_circ.workstation().name() : my.original_circ.workstation() ) : ""; },
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'circ',
            'id' : 'checkin_scan_time',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.checkin_scan_time'),
            'flex' : 1,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.circ ? util.date.formatted_date( my.circ.checkin_scan_time(), '%{localized}' ) : ""; },
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'bre',
            'id' : 'owner',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.owner'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.bre ? (typeof my.bre.owner() == 'object' ? my.bre.owner().shortname() : data.hash.aou[my.bre.owner()].shortname() ) : ''; }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'bre',
            'id' : 'creator',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.creator'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.bre ? (typeof my.bre.creator() == 'object' ? my.bre.creator().usrname() : '#' + my.bre.creator() ) : ''; }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'bre',
            'id' : 'editor',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.editor'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.bre ? (typeof my.bre.editor() == 'object' ? my.bre.editor().usrname() : '#' + my.bre.editor() ) : ''; }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'bre',
            'id' : 'create_date',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.bre.create_date'),
            'flex' : 1,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.bre ? util.date.formatted_date( my.bre.create_date(), '%{localized}' ) : ''; }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'bre',
            'id' : 'edit_date',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.bre.edit_date'),
            'flex' : 1,
            'sort_type' : 'date',
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.bre ? util.date.formatted_date( my.bre.edit_date(), '%{localized}' ) : ''; }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'bre',
            'id' : 'tcn_value',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.tcn'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.bre ? my.bre.tcn_value() : ''; }
        },
        {
            'persist' : 'hidden width ordinal',
            'fm_class' : 'bre',
            'id' : 'tcn_source',
            'label' : document.getElementById('circStrings').getString('staff.circ.utils.tcn_source'),
            'flex' : 1,
            'primary' : false,
            'hidden' : true,
            'editable' : false, 'render' : function(my) { return my.bre ? my.bre.tcn_source() : ''; }
        }

    ];
    for (var i = 0; i < c.length; i++) {
        if (modify[ c[i].id ]) {
            for (var j in modify[ c[i].id ]) {
                c[i][j] = modify[ c[i].id ][j];
            }
        }
    }
    if (params) {
        if (params.just_these) {
            JSAN.use('util.functional');
            var new_c = [];
            for (var i = 0; i < params.just_these.length; i++) {
                var x = util.functional.find_list(c,function(d){return(d.id==params.just_these[i]);});
                new_c.push( function(y){ return y; }( x ) );
            }
            c = new_c;
        }
        if (params.except_these) {
            JSAN.use('util.functional');
            var new_c = [];
            for (var i = 0; i < c.length; i++) {
                var x = util.functional.find_list(params.except_these,function(d){return(d==c[i].id);});
                if (!x) new_c.push(c[i]);
            }
            c = new_c;
        }
    }
    return c.sort( function(a,b) { if (a.label < b.label) return -1; if (a.label > b.label) return 1; return 0; } );
}