function() {
                                try {
                                    var unified_interface = String( obj.data.hash.aous['ui.unified_volume_copy_editor'] ) == 'true';
                                    if (!unified_interface) {
                                        obj.controller.control_map['old_cmd_edit_items'][1]();
                                        return;
                                    }

                                    JSAN.use('util.functional');

                                    var list = util.functional.filter_list(
                                        obj.sel_list,
                                        function (o) {
                                            return o.split(/_/)[0] == 'acp';
                                        }
                                    );

                                    list = util.functional.map_list(
                                        list,
                                        function (o) {
                                            var cloned_copy_obj = JSON2js( js2JSON( obj.map_acp[ o ] ) );
                                            cloned_copy_obj.call_number( obj.map_acn[ 'acn_' + cloned_copy_obj.call_number() ] );
                                            return cloned_copy_obj;
                                        }
                                    );

                                    if (list.length > 0) {
                                        xulG.volume_item_creator( {'existing_copies':list, 'onrefresh' : function() { obj.refresh_list(); } } );
                                    }

                                } catch(E) {
                                    obj.error.standard_unexpected_error_alert(document.getElementById('catStrings').getString('staff.cat.copy_browser.edit_items.error'),E);
                                    obj.refresh_list();
                                }
                            }