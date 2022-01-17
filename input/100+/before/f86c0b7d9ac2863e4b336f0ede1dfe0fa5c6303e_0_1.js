function(e) {

                    var target = e.target;

                    var data;

                    while(target && target.nodeType == 1) {

                        e.actionType = target.getAttribute('action-type') || target['action-type'];

                        e.data = {};

                        data = target.getAttribute('action-data') || target['action-data'];

                        data && $.each(data.split('&'), function(i, v) {

                            var map = v.split('=');

                            e.data[map[0]] = map[1];

                        });

                        e.actionType && fn.call(target, e);

                        target = target.parentNode;

                    }

                }