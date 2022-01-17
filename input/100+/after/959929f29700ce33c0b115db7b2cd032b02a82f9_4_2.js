function(options, elem, _notificationAreaName){
        var myOptions = $.extend({}, $.fn.crudForm.defaults, options || {});
        // this is set in the DCI.App initialization
        var notificationAreaName = _notificationAreaName;
        var mySubmitHandler = function(form) {
            var currentForm = form;
            var ajaxOptions = {dataType: 'json',
                success: function(result){
                    var viewId = $(currentForm).data().viewId;
                    KYT.notificationService.resetArea(notificationAreaName);
                    KYT.notificationService.processResult(result,notificationAreaName,viewId);
                },
                beforeSubmit:  beforSubmitCallback
            };
            $(form).ajaxSubmit(ajaxOptions);
        };

        var beforSubmitCallback = function(arr, form, options){
            var _arr = arr;
            $(myOptions.beforeSubmitCallbackFunctions).each(function(i,item){
                if(typeof(item) === 'function') item(_arr);
            });
        };
        // public methods.

        var nArea = KYT.notificationService.retrieveArea(notificationAreaName);
        this.setBeforeSubmitFuncs = function(beforeSubmitFunc){
             var array = !$.isArray(beforeSubmitFunc) ? [beforeSubmitFunc] : beforeSubmitFunc;
            $(array).each(function(i,item){
                if($.inArray(item,myOptions.beforeSubmitCallbackFunctions)<=0){
                    myOptions.beforeSubmitCallbackFunctions.push(item);
                }
            });};

        $(elem).validate({
            submitHandler: mySubmitHandler,
            errorContainer: nArea.getErrorContainer(),
            errorLabelContainer: nArea.getErrorContainer().find("ul"),
            wrapper: 'li',
            validClass: "valid_field",
            errorClass: "invalid_field",
            ignore:"",
            extraAreasToValidate:myOptions.extraAreasToValidate,
            highlight: function(element, errorClass, validClass) {
                nArea.getErrorContainer().find("ul").addClass(errorClass);
                if(element.type == "select-one"){
                    $(element).next("div").addClass(errorClass);
                }else if (element.type === 'radio') {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                if (element.type === 'radio') {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else if(element.type == "select-one"){
                    $(element).next("div").removeClass(errorClass).addClass(validClass);
                }
                else{
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        });
    }