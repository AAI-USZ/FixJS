function(index, status) {
            var action = actions_in_progress[status["uuid"]],
                action_row = $('tr[data-uuid="'+status["uuid"]+'"]'),
                action_status_col = action_row.find('td.package_action_status');

            switch (status["state"]) {
                case "waiting":
                case "running":
                    // do nothing, no change to status needed
                    break;
                case "error":
                    switch (action) {
                        case KT.package_action_types.PKG_INSTALL:
                            action_status_col.html(i18n.adding_package_failed);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_UPDATE:
                            action_status_col.html(i18n.updating_package_failed);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_REMOVE:
                            action_status_col.html(i18n.removing_package_failed);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_GRP_INSTALL:
                            action_status_col.html(i18n.adding_group_failed);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG_GRP);
                            break;
                        case KT.package_action_types.PKG_GRP_REMOVE:
                            action_status_col.html(i18n.removing_group_failed);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG_GRP);
                            break;
                    }
                    break;
                case "finished":
                    switch (action) {
                        case KT.package_action_types.PKG_INSTALL:
                            action_status_col.html(i18n.adding_package_success);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_UPDATE:
                            action_status_col.html(i18n.updating_package_success);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_REMOVE:
                            action_status_col.html(i18n.removing_package_success);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_GRP_INSTALL:
                            action_status_col.html(i18n.adding_group_success);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG_GRP);
                            break;
                        case KT.package_action_types.PKG_GRP_REMOVE:
                            action_status_col.html(i18n.removing_group_success);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG_GRP);
                            break;
                    }
                    break;
                case "canceled":
                    switch (action) {
                        case KT.package_action_types.PKG_INSTALL:
                            action_status_col.html(i18n.adding_package_canceled);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_UPDATE:
                            action_status_col.html(i18n.updating_package_canceled);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_REMOVE:
                            action_status_col.html(i18n.removing_package_canceled);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_GRP_INSTALL:
                            action_status_col.html(i18n.adding_group_canceled);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG_GRP);
                            break;
                        case KT.package_action_types.PKG_GRP_REMOVE:
                            action_status_col.html(i18n.removing_group_canceled);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG_GRP);
                            break;
                    }
                    break;
                case "timed_out":
                    switch (action) {
                        case KT.package_action_types.PKG_INSTALL:
                            action_status_col.html(i18n.adding_package_timeout);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_UPDATE:
                            action_status_col.html(i18n.updating_package_timeout);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_REMOVE:
                            action_status_col.html(i18n.removing_package_timeout);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG);
                            break;
                        case KT.package_action_types.PKG_GRP_INSTALL:
                            action_status_col.html(i18n.adding_group_timeout);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG_GRP);
                            break;
                        case KT.package_action_types.PKG_GRP_REMOVE:
                            action_status_col.html(i18n.removing_group_timeout);
                            clearAction(status["uuid"], status["parameters"], KT.package_action_types.PKG_GRP);
                            break;
                    }
                    break;
            }
        }