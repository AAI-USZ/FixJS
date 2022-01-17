function ResumableChunk(resumableObj, fileObj, offset, callback, options){
    var $ = this;
    $.resumableObj = resumableObj;
    $.fileObj = fileObj;
    $.fileObjSize = fileObj.file.size;
    $.offset = offset;
    $.callback = callback;
    $.lastProgressCallback = (new Date);
    $.tested = false;
    $.options = options || {};
    $.targetURL = $.options.targetURL || $.resumableObj.opts.targetURL;

    // Computed properties
    $.loaded = 0;
    $.startByte = $.options.startByte ? $.options.startByte :  $.offset*$.resumableObj.opts.chunkSize;
    $.endByte = $.options.endByte ? $.options.endByte : ($.offset+1)*$.resumableObj.opts.chunkSize;
    if ($.fileObjSize-$.endByte < $.resumableObj.opts.chunkSize) {
      // The last chunk will be bigger than the chunk size, but less than 2*chunkSize
      $.endByte = $.fileObjSize;
    }
    $.xhr = null;

    // test() makes a GET request without any data to see if the chunk has already been uploaded in a previous session
    $.test = function(){
      // Set up request and listen for event
      $.xhr = new XMLHttpRequest();

      var testHandler = function(e){
        $.tested = true;
        var status = $.status();
        if(status=='success') {
          $.callback(status, $.message());
          $.resumableObj.uploadNextChunk();
        } else {
          $.send();
        }
      }
      $.xhr.addEventListener("load", testHandler, false);
      $.xhr.addEventListener("error", testHandler, false);

      // Add data from the query options
      var url = ""
      var params = [];
      $h.each($.resumableObj.opts.query, function(k,v){
          params.push([encodeURIComponent(k), encodeURIComponent(v)].join('='));
        });
      // Add extra data to identify chunk
      params.push(['resumableChunkNumber', encodeURIComponent($.offset+1)].join('='));
      params.push(['resumableChunkSize', encodeURIComponent($.resumableObj.opts.chunkSize)].join('='));
      params.push(['resumableTotalSize', encodeURIComponent($.fileObjSize)].join('='));
      params.push(['resumableIdentifier', encodeURIComponent($.fileObj.uniqueIdentifier)].join('='));
      params.push(['resumableFilename', encodeURIComponent($.fileObj.fileName)].join('='));
      // Append the relevant chunk and send it
      $.xhr.open("GET", $.resumableObj.opts.target + '?' + params.join('&'));
      $.xhr.send(null);
    }

    // send() uploads the actual data in a POST call
    $.send = function(){
      if($.resumableObj.opts.testChunks && !$.tested) {
        $.test();
        return;
      }
      
      // Set up request and listen for event
      $.xhr = new XMLHttpRequest();

      // Progress
      $.xhr.upload.addEventListener("progress", function(e){
          if( (new Date) - $.lastProgressCallback > $.resumableObj.opts.throttleProgressCallbacks * 1000 ) {
            $.callback('progress');
            $.lastProgressCallback = (new Date);
          }
          $.loaded=e.loaded||0; 
        }, false);
      $.loaded = 0;
      $.callback('progress');

      // Done (either done, failed or retry)
      var doneHandler = function(e){
        var status = $.status();
        if(status=='success'||status=='error') {
          $.callback(status, $.message());
          $.resumableObj.uploadNextChunk();
        } else {
          $.callback('retry', $.message());
          $.abort();
          $.send(); // TODO: Insert a retryInterval pause into this loop
        }
      };
      $.xhr.addEventListener("load", doneHandler, false);
      $.xhr.addEventListener("error", doneHandler, false);

      // Add data from the query options
      var formData = new FormData();
      $h.each($.resumableObj.opts.query, function(k,v){
          formData.append(k,v);
        });
      // Add extra data to identify chunk
      formData.append('resumableChunkNumber', $.offset+1);
      formData.append('resumableChunkSize', $.resumableObj.opts.chunkSize);
      formData.append('resumableTotalSize', $.fileObjSize);
      formData.append('resumableIdentifier', $.fileObj.uniqueIdentifier);
      formData.append('resumableFilename', $.fileObj.fileName);
      // Append the relevant chunk and send it
      var func = ($.fileObj.file.mozSlice ? 'mozSlice' : ($.fileObj.file.webkitSlice ? 'webkitSlice' : 'slice'));
      formData.append($.resumableObj.opts.fileParameterName, $.fileObj.file[func]($.startByte,$.endByte));
      $.xhr.open("POST", $.targetURL);
      $.xhr.send(formData);
    }
    $.abort = function(){
      // Abort and reset
      if($.xhr) $.xhr.abort();
      $.xhr = null;
    }
    $.status = function(){
      // Returns: 'pending', 'uploading', 'success', 'error'
      if(!$.xhr) {
        return('pending');
      } else if($.xhr.readyState<4) {
        // Status is really 'OPENED', 'HEADERS_RECEIVED' or 'LOADING' - meaning that stuff is happening
        return('uploading');
      } else {
        if($.xhr.status==200) {
          // HTTP 200, perfect
          return('success');
        } else if($.xhr.status==415 || $.xhr.status==500 || $.xhr.status==501) {
          // HTTP 415/500/501, permanent error
          return('error');
        } else {
          // this should never happen, but we'll reset and queue a retry 
          // a likely case for this would be 503 service unavailable
          $.abort();
          return('pending');
        }
      }
    }
    $.message = function(){
      return($.xhr ? $.xhr.responseText : '');
    }
    $.progress = function(relative){
      if(typeof(relative)==='undefined') relative = false;
      var factor = (relative ? ($.endByte-$.startByte)/$.fileObjSize : 1);
      var s = $.status();
      switch(s){
      case 'success':
      case 'error':
        return(1*factor);
      case 'pending':
        return(0*factor);
      default:
        return($.loaded/($.endByte-$.startByte)*factor);
      }
    }
    return(this);
  }