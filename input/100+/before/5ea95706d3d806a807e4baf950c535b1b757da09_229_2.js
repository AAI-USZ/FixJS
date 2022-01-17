function (type, eventData) {
            var self = this,
                ret = undefined,
                r2,
                customEvent;
            eventData = eventData || {};
            type = trim(type);
            if (type.indexOf(" ") > 0) {
                splitAndRun(type, function (t) {
                    r2 = self.fire(t, eventData);
                    if (ret !== false) {
                        ret = r2;
                    }
                });
                return ret;
            }
            var typedGroups = Utils.getTypedGroups(type), _ks_groups = typedGroups[1];
            type = typedGroups[0];
            if (_ks_groups) {
                _ks_groups = Utils.getGroupsRe(_ks_groups);
            }
            S.mix(eventData, {
                // protect type
                type:type,
                _ks_groups:_ks_groups
            });
            customEvent = getCustomEvent(self, type, eventData);
            ret = handle(self, customEvent);
            if (!customEvent.isPropagationStopped &&
                isBubblable(self, type)) {
                r2 = self.bubble(type, customEvent);
                // false 优先返回
                if (ret !== false) {
                    ret = r2;
                }
            }
            return ret
        }