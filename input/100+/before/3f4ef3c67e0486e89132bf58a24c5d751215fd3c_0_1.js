function normalizePayload(payload, vmobj, callback)
{
    var action;
    var allowed;
    var brand;
    var property;

    // fix type of arguments that should be numbers, do this here so that fixing
    // memory works correctly later using math.
    for (property in payload) {
        if (payload.hasOwnProperty(property)) {
            if (PAYLOAD_PROPERTIES.hasOwnProperty(property)
                && PAYLOAD_PROPERTIES[property].type === 'integer') {

                payload[property] = Number(payload[property]);
                if (isNaN(payload[property])) {
                    payload[property] = undefined;
                }
            }
        }
    }

    if (vmobj) {
        /* update */
        fixPayloadMemory(payload, vmobj);
        action = 'update';
    } else {
        /* this also calls fixPayloadMemory() */
        applyZoneDefaults(payload);

        if (payload.hasOwnProperty('create_only')
            && payload.transition.transition === 'receiving') {

            action = 'receive';
        } else {
            action = 'create';
        }
    }

    // Should always have a brand after we applied defaults.
    if (vmobj && vmobj.hasOwnProperty('brand')) {
        brand = vmobj.brand;
    } else if (payload.hasOwnProperty('brand')) {
        brand = payload.brand;
    } else {
        callback(new Error('Unable to determine brand for payload'));
        return;
    }

    // Historically we supported dataset_uuid for joyent+joyent-minimal and
    // zone_dataset_uuid for kvm. Now we just support image_uuid so give a
    // deprecation warning and translate if old version specified. This needs
    // to happen before VM.validate because image_uuid is required for most
    // VMs.
    allowed = BRAND_OPTIONS[brand].allowed_properties;
    if ((allowed.hasOwnProperty('dataset_uuid')
            && payload.hasOwnProperty('dataset_uuid'))
        || (allowed.hasOwnProperty('zone_dataset_uuid')
            && payload.hasOwnProperty('zone_dataset_uuid'))) {

        property = (payload.hasOwnProperty('dataset_uuid') ? 'dataset_uuid'
            : 'zone_dataset_uuid');

        if (payload.hasOwnProperty('image_uuid')) {
            VM.log('WARN', 'DEPRECATED option ' + property + ' found, '
                + 'ignoring. In the future use image_uuid only.');
        } else {
            VM.log('WARN', 'DEPRECATED option ' + property + ' found, '
                + 'ignoring. In the future use image_uuid instead.');
            payload.image_uuid = payload[property];
            delete payload.dataset_uuid;
        }
    }

    // after ZoneDefaults have been applied, we should always have zone. Now
    // we validate the payload properties and remove any that are invalid. If
    // there are bad values we'll just fail.
    VM.validate(brand, action, payload, function (errors) {
        var bad_prop;
        var compound_props = ['disks', 'nics', 'filesystems'];
        var matches;
        var obj;
        var prop;

        if (errors) {
            if (errors.hasOwnProperty('bad_brand')) {
                callback(new Error('Invalid brand while validating payload: '
                    + JSON.stringify(brand)));
                return;
            }
            if (errors.bad_values.length > 0) {
                callback(new Error('Invalid value(s) for: '
                    + errors.bad_values.join(',')));
                return;
            }
            if (errors.missing_properties.length > 0) {
                callback(new Error('Missing required properties: '
                    + errors.missing_properties.join(',')));
                return;
            }
            for (bad_prop in errors.bad_properties) {
                bad_prop = errors.bad_properties[bad_prop];
                VM.log('WARN', 'Warning, invalid ' + action + ' property: ['
                    + bad_prop + '] removing from payload.');

                // for bad properties like nics.*.allow_unfiltered_promisc we
                // need to remove it from add_nics, update_nics, etc.
                for (prop in compound_props) {
                    prop = compound_props[prop];

                    matches = new RegExp('^' + prop
                        + '\\.\\*\\.(.*)$').exec(bad_prop);
                    if (matches) {
                        if (payload.hasOwnProperty(prop)) {
                            for (obj in payload[prop]) {
                                delete payload[prop][obj][matches[1]];
                            }
                        }
                        if (payload.hasOwnProperty('add_' + prop)) {
                            for (obj in payload['add_' + prop]) {
                                delete payload['add_' + prop][obj][matches[1]];
                            }
                        }
                        if (payload.hasOwnProperty('update_' + prop)) {
                            for (obj in payload['update_' + prop]) {
                                delete payload['update_'
                                    + prop][obj][matches[1]];
                            }
                        }
                    }
                }

                delete payload[bad_prop];
            }
        }

        // By the time we got here all the properties in the payload are allowed

        // You use 'disks' and 'nics' when creating, but the underlying
        // functions expect add_disks and add_nics, so we rename them now that
        // we've confirmed we've got the correct thing for this action.
        if (payload.hasOwnProperty('disks')) {
            if (payload.hasOwnProperty('add_disks')) {
                callback(new Error('Cannot specify both "disks" and '
                    + '"add_disks"'));
                return;
            }
            payload.add_disks = payload.disks;
            delete payload.disks;
        }
        if (payload.hasOwnProperty('nics')) {
            if (payload.hasOwnProperty('add_nics')) {
                callback(new Error('Cannot specify both "nics" and '
                    + '"add_nics"'));
                return;
            }
            payload.add_nics = payload.nics;
            delete payload.nics;
        }
        if (payload.hasOwnProperty('filesystems')) {
            if (payload.hasOwnProperty('add_filesystems')) {
                callback(new Error('Cannot specify both "filesystems" and '
                    + '"add_filesystems"'));
                return;
            }
            payload.add_filesystems = payload.filesystems;
            delete payload.filesystems;
        }

        // if there's a zfs_root_* and no zfs_data_*, normally the properties
        // would fall through, we don't want that.
        if (payload.hasOwnProperty('zfs_root_compression')
            && !payload.hasOwnProperty('zfs_data_compression')) {

            if (vmobj && vmobj.hasOwnProperty('zfs_data_compression')) {
                // keep existing value.
                payload.zfs_data_compression = vmobj.zfs_data_compression;
            } else {
                // keep default value.
                payload.zfs_data_compression = 'off';
            }
        }
        if (payload.hasOwnProperty('zfs_root_recsize')
            && !payload.hasOwnProperty('zfs_data_recsize')) {

            if (vmobj && vmobj.hasOwnProperty('zfs_data_recsize')) {
                // keep existing value.
                payload.zfs_data_recsize = vmobj.zfs_data_recsize;
            } else {
                // keep default value.
                payload.zfs_data_recsize = 131072;
            }
        }

        // this will ensure we've got a MAC, etc.
        normalizeNics(payload, vmobj);

        // Fix types for boolean fields in case someone put in 'false'/'true'
        // instead of false/true
        for (property in payload) {
            if (payload.hasOwnProperty(property)) {
                if (PAYLOAD_PROPERTIES.hasOwnProperty(property)
                    && PAYLOAD_PROPERTIES[property].type === 'boolean') {

                    payload[property] = fixBooleanLoose(payload[property]);
                }
            }
        }

        // We used to support zfs_storage_pool_name, but zpool is better.
        if (payload.hasOwnProperty('zfs_storage_pool_name')) {
            if (payload.hasOwnProperty('zpool')) {
                VM.log('WARN', 'DEPRECATED option zfs_storage_pool_name found, '
                    + ' ignoring!');
            } else {
                VM.log('WARN', 'DEPRECATED option zfs_storage_pool_name found, '
                    + ' replacing with zpool!');
                payload.zpool = payload.zfs_storage_pool_name;
                delete payload.zfs_storage_pool_name;
            }
        }

        // When creating a VM with SPICE you need the image_uuid, if you don't
        // pass that, we'll remove any SPICE options.
        if (action === 'create'
            && !payload.hasOwnProperty('image_uuid')) {

            if (payload.hasOwnProperty('spice_opts')
                || payload.hasOwnProperty('spice_password')
                || payload.hasOwnProperty('spice_port')) {

                VM.log('WARN', 'Creating with SPICE options requires '
                    + 'image_uuid, REMOVING spice_*');
                delete payload.spice_opts;
                delete payload.spice_password;
                delete payload.spice_port;
            }
        }

        system.getProvisionableMemory(function (err, available_MiB) {
            if (err) {
                VM.log('WARN', 'unable to determine system memory '
                    + 'usage, assuming we have sufficient memory.');
                payload.available_MiB = payload.ram;
            } else {
                payload.available_MiB = available_MiB;
            }
            checkPayloadProperties(payload, vmobj, function (e) {
                if (e) {
                    callback(e);
                } else {
                    callback();
                }
            });
        });
    });
}