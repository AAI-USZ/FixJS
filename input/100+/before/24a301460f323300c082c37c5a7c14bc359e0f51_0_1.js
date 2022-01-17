function(id, xhr){
        // the request was aborted/cancelled
        if (!this._files[id]) return;
        
        var name = this.getName(id);
        var size = this.getSize(id);
        
        this._options.onProgress(id, name, size, size);
                
        if (xhr.status == 200){
            this.log("xhr - server response received");
            this.log("responseText = " + xhr.responseText);
            var fileURL = xhr.responseText.replace(/\"/g,"");
            this.log(fileURL);
            if (document.getElementById('userPicture')){
                document.getElementById('imgPath').innerHTML = "<img src='data/uploads/userimg/" + fileURL + "' />" ; 
            	document.getElementById('userPicture').value =  "data/uploads/userimg/" + fileURL;
            }
            
            if (document.getElementById('courseImage')){
                document.getElementById('imgPath').innerHTML = "<img src='data/uploads/courseimg/" + fileURL + "' />" ; 
            	document.getElementById('courseImage').value =  "data/uploads/courseimg/" + fileURL;
            }
            
            var response;
                    
           try {
                 response = eval("({\"success\":true} )");
             } catch(err){
                 response = {};
             }
            
            this._options.onComplete(id, name, response);
                        
        } else {                   
            this._options.onComplete(id, name, {});
        }
                
        this._files[id] = null;
        this._xhrs[id] = null;    
        this._dequeue(id);                    
    }