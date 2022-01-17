function() {

    $('#dateOfBirth').datepicker({dateFormat: "dd/mm/yy", maxDate: 0, buttonImageOnly: true, changeYear: true, changeMonth: true, yearRange: '1900:', buttonImage: '../../resources/images/calendar.gif', showOn: 'both'});
    $('#nhisExpirationDate').datepicker({dateFormat: "dd/mm/yy", minDate: 0, buttonImageOnly: true, changeYear: true, changeMonth: true, yearRange: '1900:2100', buttonImage: '../../resources/images/calendar.gif', showOn: 'both'});
    $('#registrationMode').change(function() {
        ($(this).val() == 'USE_PREPRINTED_ID') ? $('#motechId').parent().show() : $('#motechId').parent().hide();
    });

    $('#typeOfPatient').change(function() {
        ($(this).val() == 'CHILD_UNDER_FIVE') ? $('#parentId').parent().show() : $('#parentId').parent().hide();

        if($(this).val() == 'PREGNANT_MOTHER') {
            disableGenderForMother();
        } else {
            $('#sex2').attr('checked', false);
            $('.jsHideMale').show();
        }
    });

    $("#patientForm").formly({'onBlur':false, 'theme':'Light'});
    new Field('regions').hasADependent(new Field('districts').hasADependent(new Field('sub-districts')));

    var disableGenderForMother = function() {
        $('#sex2').attr('checked', true);
        $('.jsHideMale').hide();
    };

    var validateMotherMotechId = function() {
        if($('#parentId').val()==$('#motechId').val()){
            $("#motherIdError").removeClass('hide');
            return false;
        }
    }

    var validate = function(form) {
        formValidator.clearMessages(form);
        formValidator.validateRequiredFields(form);
        formValidator.validateDate(form);
        formValidator.validateDateBefore(form);
        validateMotherMotechId();
        formValidator.validatePhoneNumbers(form);
        return formValidator.hasErrors(form);
    };

    $('#sub-districts').change(function() {
        facilities.show($(this));
    });

    $('#submitNewPatient').click(function() {
        var patientForm = $('#patientForm');
        if (!validate(patientForm)) {
            patientForm.submit();
        }
    });

    if ($('#notInsured').attr("checked")) {
        $('#nhisNumber').parent().hide();
        $('#nhisExpirationDate').parent().hide();
    }

    if ($('#insured').attr("checked")) {
        $('#nhisNumber').parent().show();
        $('#nhisExpirationDate').parent().show();
    }

    $('#insured').click(function() {
        $('#nhisNumber').parent().show();
        $('#nhisExpirationDate').parent().show();
    });

    $('#notInsured').click(function() {
         $('#nhisNumber').parent().hide();
         $('#nhisExpirationDate').parent().hide();
    });
    $('#regions').trigger('change');

    $($('select[id = "typeOfPatient"]').find('option[value="' + $('input[type = "hidden"][id="typeOfPatient"]').val() + '"]')[0]).attr('selected', true).change();

    if($('#patientGender').val() != undefined && $('#patientGender').val() != "") {
        if($('#patientGender').val() == 'F') {
            $('#sex2').attr('checked', true);
        } else {
            $('#sex1').attr('checked', true);
        }
    }
}