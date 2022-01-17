function(evt) {

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