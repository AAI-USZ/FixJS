function() {

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