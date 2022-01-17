function(aUrl, aData, aMsg){
  if(this.preCheck()){
    //add value to data object
    aData.value =  this.mValue;
    var thisClass = this;
    var result = null;

    $.ajax({
      "type" : "GET",
      "cache": false ,
      "url"  : aUrl,
       async: false,
      "data" : aData,
      "dataType": "json",
      "timeout" : "10",
      "success": function(aResponse){
        result = aResponse;
      },
      "error": function(aResponse){
        console.log(aError);
      }
    });

    if(result == null){
      //if request failed
      this.mIsValid = false;
      this.onFail("Remote validation failed");
    }
    else if(!result.isValid){
      //if server responded rejected field
      this.mIsValid = false;
      this.onFail((typeof(aMsg)=="undefined")? "Invalid input" : aMsg);
    }

  }

  return this;
}