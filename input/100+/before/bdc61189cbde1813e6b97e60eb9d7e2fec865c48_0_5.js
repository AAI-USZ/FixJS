function(){

    var file_uploader_elm = jQuery('.page-media-file-uploader');

    if(0 == file_uploader_elm.length) return;





    var FileWrapper = function(file) {

      this.BLOB_SIZE      = 524288; // 1024 * 512 bytes 512K传一段



      this.NEW_UPLOAD_URL = file_uploader_elm.domdata('new-upload-url');

      this.SEND_BLOB_URL  = file_uploader_elm.domdata('send-blob-url');

      this.FILE_PUT_URL   = file_uploader_elm.domdata('file-put-url');

      this.CURRENT_PATH   = file_uploader_elm.domdata('current-path');



      this.file = file;

      this.elm  = file_uploader_elm.find('.progress-bar-sample .file').clone();



      this.uploaded_byte = 0;

      this.read_byte     = 0;



      var _this = this;



      this.show_error = function(msg){

        this.elm.addClass('error');

        this.elm.find('.error-info').append( msg || '' );

      }



      this.start_upload = function(){

        if (0 == this.file.size) {

          this.show_error('请不要上传空文件');

          return;

        }



        this.last_refreshed_time = new Date();



        jQuery.ajax({

          url  : this.NEW_UPLOAD_URL,

          type : 'POST',

          data : {

            'file_name'  : this.file.name,

            'file_size'  : this.file.size

          },

          success : function(res){

            console.log("new upload ")

            console.log(res)

            _this.uploaded_byte = res.saved_size;

            _this.SLICE_TEMP_FILE_ID = res.slice_temp_file_id;

            _this.inform_or_upload();

          },

          error : function(){

            _this.show_error();

          }

        })

      }



      this._get_form_data = function(){

        var form_data = new FormData;

        form_data.append('slice_temp_file_id',  this.SLICE_TEMP_FILE_ID);

        form_data.append('file_blob',  this.get_blob());

        return form_data;

      }



      this.inform_or_upload = function () {

        if (this.is_uploading_finished()) {

          pie.log('上传完毕');

          this.file_put();

          this.set_progress(100);

          return;

        }



        this.upload_blob();

      }



      // 上传文件段

      this.upload_blob = function() {

        var xhr = new XMLHttpRequest;



        xhr.open('POST', this.SEND_BLOB_URL, true);



        xhr.onload = function(evt) {

          pie.log('开始上传blob');

          var status = xhr.status;



          if (status >= 200 && status < 300 || status === 304) {

            var res = jQuery.string(xhr.responseText).evalJSON();



            _this.uploaded_byte = res.saved_size;



            pie.log('比较已上传，文件本身的大小',

                    _this.uploaded_byte,

                    _this.file.size,

                    _this.is_uploading_finished());

            _this.inform_or_upload();

          } else {

            pie.log('blob上传出错:' + status);

            _this.show_error();

          }

        }



        xhr.upload.onprogress = function(evt) {

          var loaded = evt.loaded;

          var total  = evt.total;



          var uploaded_byte = _this.uploaded_byte + loaded;

          var file_size     = _this.file.size



          // 计算上传百分比

          var percent_uploaded = (uploaded_byte * 100 / file_size).toFixed(2);

          _this.set_progress(percent_uploaded);



          // 计算上传速度

          var new_time = new Date();

          var time_delta = new_time - _this.last_refreshed_time;



          //pie.log(new_time, 2, _this.last_refreshed_time)



          if(time_delta > 500){

            var size_delta = loaded;



            _this.last_refreshed_time = new_time;

            _this.set_speed(size_delta / time_delta);

          }

        }



        xhr.send(this._get_form_data());

      }



      this.is_uploading_finished = function() {

        return this.uploaded_byte >= this.file.size

      }



      this.query_md5 = function() {

        if (this.MD5) {

          jQuery.ajax({

            url  : this.MD5_QUERY_URL,

            type : 'GET',

            data : { 'md5' : this.MD5 },

            success : function(data){ // 返回应该是一个字符串，media_file_id或空



              // 根据返回来判断是否同md5的media_file已存在

              // 如果已存在就告知psu服务器inform_psu_exist

              

              // 如果未存在就什么也不作

              _this.EXISTING_MEDIA_FILE_ID = data;



              pie.log('query md5 data: ', data);

              pie.log('看看有没有existing_media_file_id ', _this.EXISTING_MEDIA_FILE_ID)

              pie.log('url', _this.MD5_QUERY_URL);

              pie.log('data', data);

            },

            error : _this.show_error

          });

          return;

        }



        pie.log('MD5值未算出！');

      }



      this.file_put = function() {

        var url = jQuery.path_join(this.FILE_PUT_URL,this.CURRENT_PATH,this.file.name)

        console.log(url)

        jQuery.ajax({

          url  :  url,

          type : 'PUT',

          data : {

            'slice_temp_file_id' : this.SLICE_TEMP_FILE_ID

          },

          success : function(data){ //返回应该是一个字符串，新的media_file_id

            pie.log('inform返回: ', arguments);

          },

          error : _this.show_error

        });

      }



      this.get_blob = function(){

        return this.slice_file(this.uploaded_byte);

      }



      this.slice_file = function(start_byte) {

        File.prototype.mindpin_slice = File.prototype.slice ||

                                       File.prototype.webkitSlice ||

                                       File.prototype.mozSlice;



        return this.file.mindpin_slice(start_byte, start_byte + this.BLOB_SIZE);

      }



      this.get_size_str = function(){

        var mbs  = this.file.size / 1024 / 1024;

        return ( Math.floor(mbs * 100) / 100 ) + 'MB';

      }



      this.set_progress = function(percent){

        this.elm

          .find('.bar .percent')

            .html(percent + ' %')

          .end()

          .find('.bar .p')

            //.animate({'width':percent+'%'}, 100)

            .css({'width':percent+'%'})

      }



      this.set_speed = function(speed){

        this.elm

          .find('.speed .data')

            .html( speed.toFixed(2) + 'KB/s')

          .end()

          .find('.remaining-time .data')

            .html( '--:--:--' )

          .end()

      }



      this.render = function() {

        this.set_progress(0);

        this.set_speed(0);



        this.elm

          .find('.name')

            .html(jQuery.string(this.file.name).escapeHTML().str)

          .end()

          .find('.size')

            .html( this.get_size_str() )

          .end()



          .hide()

          .fadeIn(100)

          .appendTo(file_uploader_elm.find('.uploading-files-list'));



        return this;

      }



      // 以下为MD5相关方法：



      this.get_md5 = function() {

        var file_reader = new FileReader;

        var spark       = new SparkMD5();



        file_reader.onload = function(evt) {

          spark.appendBinary(evt.target.result);



          if (_this.read_byte < _this.file.size) {

            next_blob();

            return;

          }



          _this.MD5 = spark.end();

          pie.log('获得MD5值为: ', _this.MD5);



          _this.elm.find('.md5').text('MD5: ' + _this.MD5);



          _this.query_md5();

        }



        file_reader.onprogress = function(evt) {

          // 增加进度显示

          var loaded = evt.loaded;

          var total  = evt.total;



          var read_byte = _this.read_byte + loaded;

          var file_size = _this.file.size;



          var percent_read = (read_byte * 100 / file_size).toFixed(2);

          percent_read = percent_read > 100 ? 100 : percent_read;



          _this.elm.find('.md5-percent').text( percent_read + '%' );

        }



        var next_blob = function() {

          file_reader.readAsBinaryString(_this.slice_file(_this.read_byte));

          _this.read_byte += _this.BLOB_SIZE;

        }



        next_blob();

      }



    }



    // 收到文件数组，执行上传

    var upload_each_files = function(files) {

      jQuery.each(files, function(index, file) {

        // TODO 这里需要加入文件是否重复上传的判断



        new FileWrapper(file).render().start_upload();

      });

    }





    // --------------------------

    // 一些小函数，都是关于事件绑定的，比较繁琐，主要逻辑看上面就可以了



    // 停止事件冒泡并阻止浏览器默认行为

    var stop_event = function(evt){

      evt.stopPropagation();

      evt.preventDefault();

    }



    var show_dragover = function(){

      file_uploader_elm.find('.upload-drop-area .tip').addClass('dragover');

    }



    var hide_dragover = function(){

      file_uploader_elm.find('.upload-drop-area .tip').removeClass('dragover');

    }



    var is_in_body = function(dom){

      try{

        return (dom == document.body) || jQuery.contains(document.body, dom)

      }catch(e){

        return false;

      }

    }



    // ----------------------------

    // ----- 以下为事件绑定：



    file_uploader_elm.find('input[type=file]').live('change', function(evt){

      upload_each_files(evt.target.files);

    });



    jQuery(document.body)

      .bind('dragover', function(evt){ stop_event(evt); })



      .bind('dragenter', function(evt){

        //pie.log(evt.target, evt.relatedTarget);

        stop_event(evt);

        show_dragover();

      })



      .bind('dragleave', function(evt){

        stop_event(evt);

        if(jQuery.browser.mozilla){

          if(!is_in_body(evt.relatedTarget)){ hide_dragover(); }

          return;

        }



        var oevt = evt.originalEvent;

        if( oevt.clientX <= 0 || oevt.clientY <= 0){ hide_dragover(); }

      })



      .bind('drop', function(evt){

        stop_event(evt);

        hide_dragover();

        upload_each_files(evt.originalEvent.dataTransfer.files);

      })

}