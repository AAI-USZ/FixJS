function standardValidate(formName){
  var formValid = true;
  if($("#"+formName).length==0) formValid=false;
  $.each($("form#"+formName + ".ValidationMsg"),function (ndx,span){
	span.innerHTML="";
  });
  $.each($("form#"+formName + ".invalid"),function (ndx,field){
	$("form#"+formName +" #"+field.id).removeClass("invalid");
  });
  $.each($("form#" +formName + " .required"),function (ndx,field){
	if(field.value == null || field.value==""){
	 appendValidationMsg(formName,field.id, "Required");
	 highlightFieldError(formName,field.id,true);
	 formValid =false;
	}
  });

return formValid;
}