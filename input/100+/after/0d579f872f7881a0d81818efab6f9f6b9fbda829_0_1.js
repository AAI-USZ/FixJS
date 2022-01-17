function(dropDownId,

                       initialText,

                       containerClass,

                       rolloverContainerClass,

                       disabledClass,

                       fieldClass,

                       rolloverFieldClass,

                       disabledFieldClass,

                       focusedClass,

                       promptText,

                       promptTextClass) {

    var dropDown = O$.initComponent(dropDownId, null, {

      _field: O$(dropDownId + "::field"),

      _promptVisible: O$(dropDownId + "::field" + "::promptVisible"),

      _initialText: initialText,



      _fieldDisabled: false,



      _setFieldDisabled: function(disabled) {

        if (this._fieldDisabled == disabled) return;



        this._fieldDisabled = disabled;



        O$.setStyleMappings(this, {disabled: disabled ? disabledClass : ""});

        O$.setStyleMappings(this._field, {fieldDisabled: disabled ? disabledFieldClass : ""});



        this._field.disabled = disabled ? "disabled" : "";

      }

    });



    dropDown._o_inputField = dropDown._field; // for O$._selectTextRange to be able to access the text field



    if (!dropDown._field) {

      // the case for SuggestionField

      O$.assert(dropDown.nodeName.toUpperCase() == "INPUT", "O$._initDropDownField. Unexpected dropDown.nodeName: " + dropDown.nodeName);

      dropDown._field = dropDown;

    }



    var field = dropDown._field;

    dropDown._containerClass = O$.DropDown._getClassName(containerClass);

    dropDown._focusedClass = O$.DropDown._getClassName(focusedClass);

    dropDown.className = dropDown._containerClass;

    dropDown._rolloverContainerClass = dropDown._containerClass + O$.DropDown._getClassName(rolloverContainerClass);



    dropDown._promptText = promptText;

    dropDown._promptTextClass = O$.DropDown._getClassName(promptTextClass);



    if (dropDown._promptText) {

      if ((initialText.length = 0 && dropDown._field.value.length == 0) ||

          (initialText.length = 0 && dropDown._field.value == dropDown._promptText)) {

        //needed for FireFox, when press F5 key

        dropDown._promptVisible.value = true;

      }

    } else

      dropDown._promptVisible.value = false;



    dropDown._fieldClass = O$.DropDown._getClassName(fieldClass);

    if (dropDown != field)

      field.className = dropDown._fieldClass;



    if (O$.isOpera() && !O$.isOpera9AndLate()) { // padding not correct work in Opera8

      field.style.padding = "0px";

    }



    dropDown._rolloverFieldClass = dropDown._fieldClass + O$.DropDown._getClassName(rolloverFieldClass);



    dropDown._initValue = function (value) {

      field.value = value;

    };



    if (dropDown != field)

      dropDown.focus = function() {

        try {

          field.focus();

        } catch (e) {

        }

      };

    dropDown._onfocus = dropDown.onfocus;



    var waitingForFocusReacquiring = false;

    dropDown._focusHandler = function() {

      if (waitingForFocusReacquiring) {

        waitingForFocusReacquiring = false;

        return;

      }

      O$.appendClassNames(dropDown, [dropDown._focusedClass]);

      dropDown._containerClass = O$.DropDown._addInClassName(dropDown._containerClass, dropDown._focusedClass);

      dropDown._rolloverContainerClass = O$.DropDown._addInClassName(dropDown._rolloverContainerClass, dropDown._focusedClass);

      if (dropDown._onfocus) {

        dropDown._onfocus();

      }



      if (dropDown._promptText) {

        if ((dropDown._field.value == dropDown._promptText) && (dropDown._promptVisible.value == "true")) {

          if (promptTextClass)

            O$.excludeClassNames(dropDown._field, [promptTextClass]);

          dropDown._field.value = "";

          dropDown._promptVisible.value = false;

        }

      }

    };

    O$.addEventHandler(field, "focus", dropDown._focusHandler);

    O$.initUnloadableComponent(field);



    dropDown._onblur = dropDown.onblur;

    O$.addEventHandler(field, "blur", function() {

      waitingForFocusReacquiring = true;

      setTimeout(function() {

        if (!waitingForFocusReacquiring)

          return;

        waitingForFocusReacquiring = false;

        O$.excludeClassNames(dropDown, [dropDown._focusedClass]);

        dropDown._containerClass = O$.DropDown._removeOfClassName(dropDown._containerClass, dropDown._focusedClass);

        dropDown._rolloverContainerClass = O$.DropDown._removeOfClassName(dropDown._rolloverContainerClass, dropDown._focusedClass);



        if (dropDown._onblur) {

          dropDown._onblur();

        }



        if (dropDown._promptText) {

          if ((dropDown._field.value.length == 0)) {

            if (promptTextClass) {

              O$.appendClassNames(dropDown._field, [promptTextClass]);

            }



            // This timeout is required for the prompt text under IE

            setTimeout(function() {

              if (dropDown._itemPresentation){

                dropDown._showPresentationPromptText(dropDown._promptText);

              } else {

                dropDown._field.value = dropDown._promptText;

              }

            }, 1);



            dropDown._promptVisible.value = true;

          } else

            dropDown._promptVisible.value = false;

        }

      }, 1);

    });



    if (O$.isMozillaFF() || O$.isSafari3AndLate() /*todo:check whether O$.isSafari3AndLate check is really needed (it was added by mistake)*/) {

      O$.addEventHandler(dropDown, "keyup", function(evt) {

        if (evt.keyCode == 27) {//ESC key

          if (dropDown._field.value == dropDown._promptText) {

            dropDown._field.value = "";

          }

        }

      });

      O$.initUnloadableComponent(dropDown);

    }



    setTimeout(function() {

      if (initialText.length > 0) {

        dropDown._initValue(initialText);

      } else if (initialText.length == 0 && dropDown._promptText) {

        dropDown._initValue(initialText);



        setTimeout(function() {

          if (dropDown._itemPresentation){

            dropDown._showPresentationPromptText(dropDown._promptText);

          } else {

            dropDown._field.value = dropDown._promptText;

          }

        }, 1);



        if (promptTextClass) {

          O$.appendClassNames(dropDown._field, [dropDown._promptTextClass]);

        }

        dropDown._promptVisible.value = true;

      } else {

        dropDown._initValue(initialText);

      }



      dropDown._skipValidation = false;

    }, 100);



    field._o_zeroBorders = true;

    field._o_fullWidth = true;

    field._o_fullHeight = false;

    O$.fixInputsWidthStrict(dropDown);

  }