function (field, event) {
                    if (me.delayValidation && (!event.isSpecialKey() ||
                                               (event.getKey() === event.BACKSPACE) ||
                                               (event.getKey() === event.DELETE))) {
                        var spinningWheelTask = new Ext.util.DelayedTask(function () {
                            var spinningWheel = me.down('#spinningWheel');
                            var validationLabel = me.down('#validationLabel');
                            if (spinningWheel) {
                                spinningWheel.hide();
                            }
                            if (validationLabel) {
                                validationLabel.show();
                            }
                        });
                        var spinningWheel = me.down('#spinningWheel');
                        var validationLabel = me.down('#validationLabel');
                        if (spinningWheel) {
                            spinningWheel.show();
                        }
                        if (validationLabel) {
                            validationLabel.hide();
                        }
                        spinningWheelTask.delay(me.delayValidationTime);
                    }
                }