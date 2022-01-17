function () {
        var me = this;
        me.validationTask = new Ext.util.DelayedTask(function () {
            me.validate();
        });
        var spinningWheelTask = new Ext.util.DelayedTask(function () {
            var spinningWheel = me.down('#spinningWheel');
            var validationLabel = me.down('#validationLabel');
            spinningWheel.hide();
            validationLabel.show();
        });
        var fieldConfig = {
            enableKeyEvents: true,
            disabled: me.readonly,
            allowBlank: !me.required,
            vtype: me.vtype,
            name: me.fieldname,
            itemId: me.fieldname,
            action: me.actionName,
            value: me.fieldValue,
            width: 600,
            padding: '0 0 0 20',
            validateOnChange: !me.delayValidation,
            validateOnBlur: !me.delayValidation,
            listeners: {
                'validitychange': me.validityChanged,
                'change': me.delayValidation ?
                    me.callValidationTask : function () {
                },
                'keyup': function (field, event) {
                    if (me.delayValidation && (!event.isSpecialKey() ||
                                               (event.getKey() === event.BACKSPACE) ||
                                               (event.getKey() === event.DELETE))) {
                        var spinningWheel = me.down('#spinningWheel');
                        var validationLabel = me.down('#validationLabel');
                        spinningWheel.show();
                        validationLabel.hide();
                        spinningWheelTask.delay(me.delayValidationTime);
                    }
                }
            }
        };
        if (me.fieldWidth[me.fieldname]) {
            fieldConfig.width = me.fieldWidth[me.fieldname];
        }
        var builderFunction = me.type ? me.fieldConfigBuilders[me.type] : me.fieldConfigBuilders.text;
        fieldConfig = builderFunction(fieldConfig, me);
        if (me.remote) {
            fieldConfig.cls = 'admin-remote-field';
        }
        return fieldConfig;
    }