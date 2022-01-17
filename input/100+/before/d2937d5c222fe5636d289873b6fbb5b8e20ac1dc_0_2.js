function(animations) {
        var me = this,
            isLengthPropertyMap = this.lengthProperties,
            fromData = {},
            toData = {},
            data = {},
            element, elementId, from, to, before,
            fromPropertyNames, toPropertyNames,
            doApplyTo, message,
            runningData,
            i, j, ln, animation, propertiesLength, sessionNameMap,
            computedStyle, formattedName, name, toFormattedValue,
            computedValue, fromFormattedValue, isLengthProperty,
            runningNameMap, runningNameList, runningSessions, runningSession;

        if (!this.listenersAttached) {
            this.attachListeners();
        }

        animations = Ext.Array.from(animations);

        for (i = 0,ln = animations.length; i < ln; i++) {
            animation = animations[i];
            animation = Ext.factory(animation, Ext.fx.Animation);
            element = animation.getElement();

            computedStyle = window.getComputedStyle(element.dom);

            elementId = element.getId();

            data = Ext.merge({}, animation.getData());

            if (animation.onBeforeStart) {
                animation.onBeforeStart.call(animation.scope || this, element);
            }
            animation.fireEvent('animationstart', animation);
            this.fireEvent('animationstart', this, animation);

            data[elementId] = data;

            before = data.before;
            from = data.from;
            to = data.to;

            data.fromPropertyNames = fromPropertyNames = [];
            data.toPropertyNames = toPropertyNames = [];

            for (name in to) {
                if (to.hasOwnProperty(name)) {
                    to[name] = toFormattedValue = this.formatValue(to[name], name);
                    formattedName = this.formatName(name);
                    isLengthProperty = isLengthPropertyMap.hasOwnProperty(name);

                    if (!isLengthProperty) {
                        toFormattedValue = this.getCssStyleValue(formattedName, toFormattedValue);
                    }

                    if (from.hasOwnProperty(name)) {
                        from[name] = fromFormattedValue = this.formatValue(from[name], name);

                        if (!isLengthProperty) {
                            fromFormattedValue = this.getCssStyleValue(formattedName, fromFormattedValue);
                        }

                        if (toFormattedValue !== fromFormattedValue) {
                            fromPropertyNames.push(formattedName);
                            toPropertyNames.push(formattedName);
                        }
                    }
                    else {
                        computedValue = computedStyle.getPropertyValue(formattedName);

                        if (toFormattedValue !== computedValue) {
                            toPropertyNames.push(formattedName);
                        }
                    }
                }
            }

            propertiesLength = toPropertyNames.length;

            if (propertiesLength === 0) {
                this.onAnimationEnd(element, data, animation);
                continue;
            }

            runningData = this.getRunningData(elementId);
            runningSessions = runningData.sessions;

            if (runningSessions.length > 0) {
                this.refreshRunningAnimationsData(
                    element, Ext.Array.merge(fromPropertyNames, toPropertyNames), true, data.replacePrevious
                );
            }

            runningNameMap = runningData.nameMap;
            runningNameList = runningData.nameList;

            sessionNameMap = {};
            for (j = 0; j < propertiesLength; j++) {
                name = toPropertyNames[j];
                sessionNameMap[name] = true;

                if (!runningNameMap.hasOwnProperty(name)) {
                    runningNameMap[name] = 1;
                    runningNameList.push(name);
                }
                else {
                    runningNameMap[name]++;
                }
            }

            runningSession = {
                element: element,
                map: sessionNameMap,
                list: toPropertyNames.slice(),
                length: propertiesLength,
                data: data,
                animation: animation
            };
            runningSessions.push(runningSession);

            animation.on('stop', 'onAnimationStop', this);

            fromData[elementId] = from = Ext.apply(Ext.Object.chain(before), from);

            if (runningNameList.length > 0) {
                fromPropertyNames = Ext.Array.difference(runningNameList, fromPropertyNames);
                toPropertyNames = Ext.Array.merge(fromPropertyNames, toPropertyNames);
                from['transition-property'] = fromPropertyNames;
            }

            toData[elementId] = to = Ext.Object.chain(to);

            to['transition-property'] = toPropertyNames;
            to['transition-duration'] = data.duration;
            to['transition-timing-function'] = data.easing;
            to['transition-delay'] = data.delay;

            animation.startTime = Date.now();
        }

        message = this.$className;

        this.applyStyles(fromData);

        doApplyTo = function(e) {
            if (e.data === message && e.source === window) {
                window.removeEventListener('message', doApplyTo, false);
                me.applyStyles(toData);
            }
        };

        window.addEventListener('message', doApplyTo, false);
        window.postMessage(message, '*');
    }