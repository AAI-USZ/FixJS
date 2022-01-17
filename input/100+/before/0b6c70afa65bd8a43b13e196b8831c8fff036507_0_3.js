function () {
                                    debug_log("_migrate_next done after version #" + migration.version);
                                    debug_log("Migrated to " + migration.version);

                                    //last modification occurred, need finish
                                    if(migrations.length ==0) {
                                        /*if(this.supportOnUpgradeNeeded){
                                            debug_log("Done migrating");
                                            // No more migration
                                            options.success();
                                        }
                                        else{*/
                                            debug_log("_migrate_next setting transaction.oncomplete to finish  version #" + migration.version);
                                            transaction.oncomplete = function() {
                                                debug_log("_migrate_next done transaction.oncomplete version #" + migration.version);

                                                debug_log("Done migrating");
                                                // No more migration
                                                options.success();
                                            }
                                        //}
                                    }
                                    else
                                    {
                                        debug_log("_migrate_next setting transaction.oncomplete to recursive _migrate_next  version #" + migration.version);
                                        transaction.oncomplete = function() {
                                           debug_log("_migrate_next end from version #" + version + " to " + migration.version);
                                           that._migrate_next(migrations, version, options);
                                       }
                                    }

                                }