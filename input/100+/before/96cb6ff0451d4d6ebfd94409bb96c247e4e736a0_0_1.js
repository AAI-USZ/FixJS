function() {
        //ініціалізація менеджера підказок
        Ext.tip.QuickTipManager.init();        
        //типи валідації полів
        Ext.apply(Ext.form.field.VTypes, {
            cyralphanum:  function(val) {
                return /^[а-яіїєА-ЯІЇЄa-zA-Z\d\s]{1,}$/.test(val);
            },
            cyralphanumText: 'Допустимые символы кирилици, латыни',
            cyralphanumMask: /[а-яіїєА-ЯІЇЄa-zA-Z\d\s]/
        });
        Ext.apply(Ext.form.field.VTypes, {
            cyralphanumplus:  function(val) {
                return /^[а-яіїєА-ЯІЇЄa-zA-Z\d\s\_\+\\\-\/\(\)\{\}\'\"\!\&\=\*\%\#\<\>]{1,}$/.test(val);
            },
            cyralphanumplusText: 'Допустимые символы кирилици, латыни, цифри, знаки пунктуации и операций',
            cyralphanumplusMask: /[а-яіїєА-ЯІЇЄa-zA-Z\d\s\_\+\\\-\/\(\)\{\}\'\"\!\&\=\*\%\#\<\>]/
        });        
        Ext.apply(Ext.form.field.VTypes, {
            phone:  function(val) {
                return /^[\d\(\)\-]{1,}$/.test(val);
            },
            phoneText: 'Допустимые цифры, знаки (,) и -',
            phoneMask: /[\d\(\)\-]/
        });        
        Ext.apply(Ext.form.field.VTypes, {
            decimal:  function(val) {
                return /^(\d+)(((.|,)\d+)+)?$/.test(val);
            },
            decimalText: 'Допустимы цифры',
            decimalMask: /(\d+)(((.|,)\d+)+)?/
        });         
        Ext.apply(Ext.form.field.VTypes, {
            mathexp:  function(val) {
                return /(^(\d+)(((.|,)\d+)+)?$)|(^((\d+)(((.|,)\d+)+)?[\+\-\*\/]{0,1})+(\d+)(((.|,)\d+)+)?$)/.test(val);
            },
            mathexpText: 'Допустимы только простые математические выражения',
            mathexpMask: /\d/
        });         
    }