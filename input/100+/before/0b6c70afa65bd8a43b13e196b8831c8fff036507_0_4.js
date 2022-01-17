function () {
                        debug_log("_migrate_next done before version #" + migration.version);

                        var continueMigration = function (e) {
                            debug_log("_migrate_next continueMigration version #" + migration.version);

                            var transaction = this.dbRequest.transaction || versionRequest.result;
                            debug_log("_migrate_next begin migrate version #" + migration.version);

                            migration.migrate(transaction, function () {
                                debug_log("_migrate_next done migrate version #" + migration.version);
                                // Migration successfully appliedn let's go to the next one!
                                debug_log("_migrate_next begin after version #" + migration.version);
                                migration.after(function () {
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

                                }.bind(this));
                            }.bind(this));
                        }.bind(this);

                        if(!this.supportOnUpgradeNeeded){
                            debug_log("_migrate_next begin setVersion version #" + migration.version);
                            var versionRequest = this.db.setVersion(migration.version);
                            versionRequest.onsuccess = continueMigration;
                            versionRequest.onerror = options.error;
                        }
                        else {
                            continueMigration();
                        }

                    }