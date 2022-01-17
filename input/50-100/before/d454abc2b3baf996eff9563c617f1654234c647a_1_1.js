function selectAllRadio(oInvertCheckbox, oForm, sMask, sValue)
{
	for (var i = 0; i < oForm.length; i++)
		if (oForm[i].name.substr(0, sMask.length) == sMask && oForm[i].value == sValue)
			oForm[i].checked = true;
}