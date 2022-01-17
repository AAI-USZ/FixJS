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
      "error": function(aError){
        console.log(aError);
      }
    });

    if(result == null){
      //if request failed
      this.mIsValid = false;
      this.onFail("Remote validation failed");
    }
    else if(result.isValid==false){ //is server responds with false
      this.mIsValid = false;

      if((typeof(aMsg)=="undefined")){//if no msg arg specified

        if(result.hasOwnProperty('error')){ //if server responds with error
          this.onFail(result.error);
        }
        else{
          this.onFail("Invalid input");
        }
      }
      else{
        this.onFail(aMsg);
      }

    }

  }

  return this;
}