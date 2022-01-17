function (e, o) {
                var allowed = [];

                t.ok(!err, 'loading VM after create');
                if (!err) {
                    console.error(JSON.stringify(o));
                    allowed = o.fs_allowed.split(',');
                    t.ok(allowed.length === 3,
                        'number of fs_allowed is correct after load ['
                        + allowed.length + ',3]');
                    t.ok(allowed.indexOf('ufs') !== -1,
                        'fs_allowed has ufs');
                    t.ok(allowed.indexOf('pcfs') !== -1,
                        'fs_allowed has pcfs');
                    t.ok(allowed.indexOf('tmpfs') !== -1,
                        'fs_allowed has tmpfs');
                    vmobj = o;
                } else {
                    abort = true;
                }
                t.end();
            }