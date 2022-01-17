function upload() {

        stop_loop = false;

        if (!files) {
          opts.error(errors[0]);
          return false;
        }
        if(opts.allowedfiletypes.push && opts.allowedfiletypes.length){
          for(var fileIndex = files.length;fileIndex--;){
            if(!files[fileIndex].type || $.inArray(files[fileIndex].type, opts.allowedfiletypes) < 0){
              opts.error(errors[3], files[fileIndex]);
              return false;
            }
          }
        }

        var filesDone = 0,
            filesRejected = 0;

        if (files_count > opts.maxfiles && opts.queuefiles === 0) {
          opts.error(errors[1]);
          return false;
        }

        // Define queues to manage upload process
        var workQueue = [];
        var processingQueue = [];
        var doneQueue = [];

        // Add everything to the workQueue
        for (var i = 0; i < files_count; i++) {
          workQueue.push(i);
        }

        // Helper function to enable pause of processing to wait
        // for in process queue to complete
        var pause = function(timeout) {
            setTimeout(process, timeout);
            return;
        }

        // Process an upload, recursive
        var process = function() {

    	        var fileIndex;

    	        if (stop_loop) return false;

    	        // Check to see if are in queue mode
    	        if (opts.queuefiles > 0 && processingQueue.length >= opts.queuefiles) {

    	          return pause(opts.queuewait);

    	        } else {

    	          // Take first thing off work queue
    	          fileIndex = workQueue[0];
    	          workQueue.splice(0, 1);

    	          // Add to processing queue
    	          processingQueue.push(fileIndex);

    	        }

    	        try {
    	          if (beforeEach(files[fileIndex]) != false) {
    	            if (fileIndex === files_count) return;
    	            var reader = new FileReader(),
    	                max_file_size = 1048576 * opts.maxfilesize;

    	            reader.index = fileIndex;
    	            if (files[fileIndex].size > max_file_size) {
    	              opts.error(errors[2], files[fileIndex], fileIndex);
    	              // Remove from queue
    	              processingQueue.forEach(function(value, key) {
    	                if (value === fileIndex) processingQueue.splice(key, 1);
    	              });
    	              filesRejected++;
    	              return true;
    	            }
    	            reader.onloadend = send;
    	            reader.readAsBinaryString(files[fileIndex]);

    	          } else {
    	            filesRejected++;
    	          }
    	        } catch (err) {
    	          // Remove from queue
    	          processingQueue.forEach(function(value, key) {
    	            if (value === fileIndex) processingQueue.splice(key, 1);
    	          });
    	          opts.error(errors[0]);
    	          return false;
    	        }

    	        // If we still have work to do,
    	        if (workQueue.length > 0) {
    	          process();
    	        }

            };

        var send = function(e) {

          var fileIndex = ((typeof(e.srcElement) === "undefined") ? e.target : e.srcElement).index

          // Sometimes the index is not attached to the
          // event object. Find it by size. Hack for sure.
          if (e.target.index == undefined) {
            e.target.index = getIndexBySize(e.total);
          }

          var xhr = new XMLHttpRequest(),
              upload = xhr.upload,
              file = files[e.target.index],
              index = e.target.index,
              start_time = new Date().getTime(),
              boundary = '------multipartformboundary' + (new Date).getTime(),
              builder;

          newName = rename(file.name);
          mime = file.type
          if (typeof newName === "string") {
            builder = getBuilder(newName, e.target.result, mime, boundary);
          } else {
            builder = getBuilder(file.name, e.target.result, mime, boundary);
          }

          upload.index = index;
          upload.file = file;
          upload.downloadStartTime = start_time;
          upload.currentStart = start_time;
          upload.currentProgress = 0;
          upload.startData = 0;
          upload.addEventListener("progress", progress, false);

          xhr.open("POST", opts.url, true);
          xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' + boundary);

          // Add headers
          $.each(opts.headers, function(k, v) {
            xhr.setRequestHeader(k, v);
          });

          xhr.sendAsBinary(builder);

          opts.uploadStarted(index, file, files_count);

          xhr.onload = function() {
            if (xhr.responseText) {
              var now = new Date().getTime(),
                  timeDiff = now - start_time,
                  result = opts.uploadFinished(index, file, jQuery.parseJSON(xhr.responseText), timeDiff, xhr);
              filesDone++;

              // Remove from processing queue
              processingQueue.forEach(function(value, key) {
                if (value === fileIndex) processingQueue.splice(key, 1);
              });

              // Add to donequeue
              doneQueue.push(fileIndex);

              if (filesDone == files_count - filesRejected) {
                afterAll();
              }
              if (result === false) stop_loop = true;
            }
            
            //Pass any errors to the error option
            if(xhr.status != 200){
              opts.error(xhr.statusText);
            }
            
          };

        }

        // Initiate the processing loop
        process();

      }