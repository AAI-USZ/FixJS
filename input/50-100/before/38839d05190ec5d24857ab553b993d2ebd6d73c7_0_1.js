function (field, event) {
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