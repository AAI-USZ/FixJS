function(totalMemory, meta, rec) {
                        // FIXME: 'memory' is 0
                        if (!totalMemory) {
                            totalMemory = 2048;
                        }

                        var freeMemory = totalMemory;

                        var r = [];
                        var vms = rec.getChild('vms');
                        // in case HN doesn't have a vms container, we don't show anything (ON-635)
                        if (vms === null)
                            return '';

                        vms.children().each( function(vm) {
                            var id = 'vmmap-' + vm.getId();
                            var classes = 'node-cell';
                            var memory = vm.get('memory');
                            var uptime = this.getUptime(vm);
                            var tags = vm.get('tags');
                            var usedtags = this.getUsedTags(tags);

                            if (this.selection.contains(id)) {
                                classes += ' selected';
                            }
                            if (uptime === 'inactive') {
                                classes += ' inactive';
                            }

                            var hn = vm.get('hostname');
                            // wrap too long host names
                            if (hn.length > 22)
                                hn = hn.substr(0,20) + '..';

                            r[r.length] = {
                                id: id,
                                name: hn,
                                classes: classes,
                                mem: parseInt(memory),
                                uptime: uptime,
                                cores: vm.get('num_cores'),
                                minwidth: Math.max(parseInt(300 * (memory / totalMemory)) + 30,
                                                   parseInt(hn.length * 5.5) + 30),
                                tags: usedtags
                            };

                            freeMemory -= memory;

                            var url = vm.get('url');
                            this.subscribeGauge(vm, url, 'cpu', id, vm.getMaxCpuLoad());
                            this.subscribeGauge(vm, url, 'memory', id, vm.get('memory'));
                            this.subscribeGauge(vm, url, 'diskspace', id, vm.get('diskspace')['total']);
                        }, this);

                        if (freeMemory) {
                            r[r.length] = {
                                name: 'free',
                                classes: 'node-cell-free',
                                mem: parseInt(freeMemory),
                                minwidth: parseInt(300 * (freeMemory / totalMemory))
                            };
                        }

                        return this.vmTpl.apply(r);
                    }