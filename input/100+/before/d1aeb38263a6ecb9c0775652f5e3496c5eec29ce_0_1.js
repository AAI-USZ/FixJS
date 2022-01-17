function() {

    var keys = CKEDITOR.mdnKeys = {
            control1: CKEDITOR.CTRL + 49,
            control2: CKEDITOR.CTRL + 50,
            control3: CKEDITOR.CTRL + 51,
            control4: CKEDITOR.CTRL + 52,
            control5: CKEDITOR.CTRL + 53,
            control6: CKEDITOR.CTRL + 54,

            controlK: CKEDITOR.CTRL + 75,
            controlL: CKEDITOR.CTRL + 76,
            controlShiftL: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76,
            controlS: CKEDITOR.CTRL + 83,
            controlO: CKEDITOR.CTRL + 79,
            controlShiftO: CKEDITOR.CTRL + CKEDITOR.SHIFT + 79,
            controlShiftS: CKEDITOR.CTRL + CKEDITOR.SHIFT + 83,
            shiftSpace: CKEDITOR.SHIFT + 32,
            tab: 9,
            shiftTab: CKEDITOR.SHIFT + 9,
            enter: 13
        },
        block = function(k) {
            return CKEDITOR.config.blockedKeystrokes.push(keys[k]);
        };

    // Prevent key handling
    block('tab');
    block('shiftTab');
    block('control1');
    block('control2');
    block('control3');
    block('control4');
    block('control5');
    block('control6');
    block('controlO');
    block('controlS');
    block('controlShiftL');
    block('controlShiftO');

}