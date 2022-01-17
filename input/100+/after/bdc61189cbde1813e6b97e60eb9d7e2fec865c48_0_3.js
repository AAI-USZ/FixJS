function() {

        var xhr = new XMLHttpRequest;



        xhr.open('POST', this.SEND_BLOB_URL, true);



        xhr.onload = function(evt) {

          console.log('开始上传blob');

          var status = xhr.status;



          if (status >= 200 && status < 300 || status === 304) {

            var res = jQuery.string(xhr.responseText).evalJSON();



            _this.uploaded_byte = res.saved_size;



            console.log('比较已上传，文件本身的大小',

                    _this.uploaded_byte,

                    _this.file.size,

                    _this.is_uploading_finished());

            _this.inform_or_upload();

          } else {

            console.log('blob上传出错:' + status);

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



          //console.log(new_time, 2, _this.last_refreshed_time)



          if(time_delta > 500){

            var size_delta = loaded;



            _this.last_refreshed_time = new_time;

            _this.set_speed(size_delta / time_delta);

          }

        }



        xhr.send(this._get_form_data());

      }