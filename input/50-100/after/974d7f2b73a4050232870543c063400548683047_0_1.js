function setCheckedValue(radioObj, newValue) {

    var i;

	if (radioObj) {

        var radioLength = radioObj.length;

        if (radioLength === undefined) {

            radioObj.checked = (radioObj.value == newValue.toString());

        } else {

            for (i = 0; i < radioLength; i++) {

                radioObj[i].checked = radioObj[i].value == newValue.toString();

            }

        }

    }

}