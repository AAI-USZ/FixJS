function (initdata) {
    'use strict';

    function isSearchEnabled() {
      return $('.search-button').attr('disabled') !== "disabled";
    }
    function isUploadEnabled() {
      return $('.save-button').attr('disabled') !== "disabled";
    }

    function enableSearch(enable) {
      if (enable == isSearchEnabled()) return;
      if (enable) {
        $('.search-button').removeAttr('disabled');
      } else {
        $('.search-button').attr('disabled', true);
      }
    }

    function enableUpload(enable) {
      if (enable == isUploadEnabled()) return;
      if (enable) {
        $('.save-button').removeAttr('disabled');
      } else {
        $('.save-button').attr('disabled', true);
      }
    }

    function haveTags() {
      return $('.box-editor').val().length > 0 && $('.box-editor').val() != window.locale.fileupload.boxeditor;
    }

    function haveFilesQueued() {
      return $('.upload-file-queue tr').size() > 0;
    }

    function isUploadPending() {
      return haveFilesQueued();
      //return (haveFilesQueued() && haveTags());
    }

    function resetBoxEditor() {
      $('.box-editor').val(window.locale.fileupload.boxeditor)
    }

    function initUI() {
      resetBoxEditor();

      $('.upload-list').hide();

      $('.box-editor').change(function() {
        enableUpload(isUploadPending());
        enableSearch(haveTags());
      });

      $('.box-editor').live('keyup', function() {
        enableUpload(isUploadPending());
        enableSearch(haveTags());
      });

      $('.box-editor').focus(function() {
        $('.box-editor').val("");
      });

      $('.box-editor').blur(function() {
        if ($('.box-editor').val().length == 0) {
          $('.box-editor').val(window.locale.fileupload.boxeditor);
        }
      });

      $('.save-button').click(function() {
        if (!haveTags()) {
          alert("Before you upload your files, you should tag them.")
          return false;
        }
        $('.files').find('.start button').click();
        return true;
      })
    }

    $('#fileupload').fileupload();
    $('#fileupload').fileupload('option', {
        url: '/u/',
        autoUpload: false,
        multipart: true,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        process: [
            {
                action: 'load',
                fileTypes: /^image\/(gif|jpeg|png)$/,
                maxFileSize: 20000000 // 20MB
            },
            {
                action: 'save'
            }
        ]
    });

/*
    $('#fileupload').fileupload('option', {
        url: '/u/',
        autoUpload: false,
        multipart: false,
//        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|dmg)$/i,
        process: [
            {
                action: 'load',
                fileTypes: /^image\/(gif|jpeg|png)$/,
                maxFileSize: 20000000 // 20MB
            },
            {
                action: 'save'
            }
        ]
    });
*/
    $('#fileupload').bind('fileuploadadd', function (e, data) {
      $('.upload-list').show();
//      $('.upload-list').removeAttr('hidden');

      enableUpload(true);  // if (!haveTags) then we will popup on Upload
    });
    $('#fileupload').bind('fileuploadfail', function (e, data) {
      if ($('.upload-file-queue tr').size() == 1) {
//        $('.upload-list').hide();
////        $('.upload-list').attr('hidden',true);

        enableUpload(false);
      } else {
        enableUpload(true);
      }
    });

    var template = $('#template-mason-brick').html();

    $('#fileupload').bind('fileuploaddone', function (e, data) {
//      $('.upload-list').hide();
//      enableUpload(false);
      // TODO: reset UI and clear tr's

      var x = JSON.parse(data.jqXHR.responseText)[0]
      var h = Mustache.to_html(template, x);
      var $gallery = $('#gallery')
      $gallery.prepend(h);
      $gallery.imagesLoaded(function(){
        $gallery.masonry('reload')
      });
    });

    $('#fileupload')
      .bind('fileuploadadd', function (e, data) {console.log("fileuploadadd")})
      .bind('fileuploadsubmit', function (e, data) { console.log("fileuploadsubmit") })
      .bind('fileuploadsend', function (e, data) {console.log("fileuploadsend")})
      .bind('fileuploaddone', function (e, data) {console.log("fileuploaddone")})
      .bind('fileuploadfail', function (e, data) {console.log("fileuploadfail")})
      .bind('fileuploadalways', function (e, data) {console.log("fileuploadalways")})
      .bind('fileuploadprogress', function (e, data) {console.log("fileuploadprogress")})
      .bind('fileuploadprogressall', function (e, data) {console.log("fileuploadprogressall")})
      .bind('fileuploadstart', function (e) {console.log("fileuploadstart")})
      .bind('fileuploadstop', function (e) {console.log("fileuploadstop")})
      .bind('fileuploadchange', function (e, data) {console.log("fileuploadchange")})
      .bind('fileuploadpaste', function (e, data) {console.log("fileuploadpaste")})
      .bind('fileuploaddrop', function (e, data) {console.log("fileuploaddrop")})
      .bind('fileuploaddragover', function (e) {console.log("fileuploaddragover")});

    initUI();

    function initGallery(data) {
      var $gallery = $('#gallery');

//      var template = $('#template-mason-brick').html();
      $.each(initdata, function(i,x){
        var h = Mustache.to_html(template, x);
        $gallery = $gallery.append(h);
      });
      $gallery.masonry('reload');

      $gallery.imagesLoaded(function(){
        $gallery.masonry({
          itemSelector : '.item',
          columnWidth: 240
        });
      });
    }

    initGallery(initdata);
}