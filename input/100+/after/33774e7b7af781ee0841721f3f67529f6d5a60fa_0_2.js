function(){
        var self = this,
            dropArea = this._find(this._element, 'drop'),
            full = this._find(this._element, 'fullElement');

        var dz = new qq.UploadDropZone({
            element: dropArea,
            onEnter: function(e){
                //qq.addClass(dropArea, self._classes.dropActive);
                qq.addClass(full, self._classes.dropActive);
                e.stopPropagation();
            },
            onLeave: function(e){
                e.stopPropagation();
            },
            onLeaveNotDescendants: function(e){
                //qq.removeClass(dropArea, self._classes.dropActive);  
                qq.removeClass(full, self._classes.dropActive);
            },
            onDrop: function(e){
                dropArea.style.display = 'none';
                //qq.removeClass(dropArea, self._classes.dropActive);
                qq.removeClass(full, self._classes.dropActive);
                self._uploadFileList(e.dataTransfer.files);    
            }
        });
                
        dropArea.style.display = 'none';

        qq.attach(document, 'dragenter', function(e){     
            if (!dz._isValidFileDrag(e)) return; 
            
            dropArea.style.display = 'block';            
        });                 
        qq.attach(document, 'dragleave', function(e){
            if (!dz._isValidFileDrag(e)) return;            
            
            var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
            // only fire when leaving document out
            if ( ! relatedTarget || relatedTarget.nodeName == "HTML"){               
                dropArea.style.display = 'none';                                            
            }
        });                
    }