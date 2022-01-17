function (success) {
                        if (success) {
                            var notimsg = "";
                            if (joinable === "withauth") {
                                // Don't add green tick yet because they need to be approved.
                                notimsg = sakai.api.i18n.getValueForKey("YOUR_REQUEST_HAS_BEEN_SENT");
                            }
                            else  { // Everything else should be regular success
                                $("#searchgroups_memberimage_"+groupid).show();
                                notimsg = sakai.api.i18n.getValueForKey("SUCCESSFULLY_ADDED_TO_GROUP");
                            }
                            sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey("GROUP_MEMBERSHIP"),
                                notimsg, sakai.api.Util.notification.type.INFORMATION);
                            itemdiv.removeClass("s3d-action-icon s3d-actions-addtolibrary searchgroups_result_plus");
                            $("#searchgroups_memberimage_" + groupid).show();
                        } else {
                            sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey("GROUP_MEMBERSHIP"),
                                sakai.api.i18n.getValueForKey("PROBLEM_ADDING_TO_GROUP"),
                                sakai.api.Util.notification.type.ERROR);
                        }
                    }