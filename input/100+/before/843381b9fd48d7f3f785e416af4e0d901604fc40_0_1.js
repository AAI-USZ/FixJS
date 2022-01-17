function(){
  $('#fake-picture').click(function(){
    $('#take-picture').click();
  });
  var getpad = imagepad;
  var getpos=new pos();
  getpad.init();
  
  var getfilter= new filter (getpad.hidepad); 
  var greyframe=getfilter.grey();
  getpad.showpad(greyframe , getpad.hidepad.width, getpad.hidepad.height);
  
  //var warlholframe=getfilter.warlhol();
  //getpad.showpad(warlholframe , getpad.hidepad.width, getpad.hidepad.height);
  
  /*drawline*/
  getpad.pad.addEventListener("mousedown", function(e){
    getpad.pen=1;
    getpos=posfn(e, getpad.pad);
    getpad.creatLine(getpos);
  });
  
  getpad.pad.addEventListener("mousemove", function(e){
    if(getpad.pen==1){  
      getpos=posfn(e, getpad.pad);
      getpad.drawLine(getpos);
    }
  });
  
  getpad.pad.addEventListener("mouseleave", function(e){
   getpad.drawLineEnd();
  });
  
  getpad.pad.addEventListener("mouseup", function(e){
     getpad.drawLineEnd();
  });
  
  /*setText*/
  document.getElementById("sendit").addEventListener("click",function(){
    if(document.getElementById("textit").value!==""){
      var gettext=new text();
      gettext.content=document.getElementById("textit").value;
      getpad.drawText(gettext);
    }
  });
  
  /*camera api*/
  var takePicture = document.querySelector("#take-picture");
  
  if (takePicture && getpad.img) {  
        // Set events  
        takePicture.onchange = function (event) {  
            // Get a reference to the taken picture or chosen file  
            var files = event.target.files,  
                file;  
            if (files && files.length > 0) {  
                file = files[0];  
                try {  
                    // Get window.URL object  
                    
                    var URL = window.URL || window.webkitURL;  
  
                    // Create ObjectURL  
                    var imgURL = URL.createObjectURL(file);  
  
                    // Set img src to ObjectURL  
                    getpad.img.src = imgURL;  
                    getpad.img.onload = function() {
                        getpad.init();
                        getpad.showpad(getpad.hidectx.getImageData(0, 0 , getpad.hidepad.width, getpad.hidepad.height));
                    };
                    // Revoke ObjectURL  
                    URL.revokeObjectURL(imgURL);  
               
                }  
                catch (e) {  
                    try {  
                        // Fallback if createObjectURL is not supported  
                        var fileReader = new FileReader();  
                        fileReader.onload = function (event) {  
                            getpad.img.src = event.target.result;  
                            getpad.init();
                        };  
                        fileReader.readAsDataURL(file);  
                    }  
                    catch (e) {  
                        //  
                        var error = document.querySelector("#error");  
                        if (error) {  
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";  
                        }  
                    }  
                }  
            }  
        };  
    }  
}