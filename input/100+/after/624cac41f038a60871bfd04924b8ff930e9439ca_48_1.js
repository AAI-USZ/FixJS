function(tuid, showSettings){


        /////////////////////////////
        // CONFIGURATION VARIABLES //
        /////////////////////////////

        // Containers
        var $uploadnewversionContainer = $('#uploadnewversion_container');
        var $uploadnewversionFormContainer = $('#uploadnewversion_form_container');

        // Templates
        var uploadnewversionFormTemplate = 'uploadnewversion_form_template';

        // Elements
        var uploadnewversionDoUpload = '.uploadnewversion_doupload';
        var $uploadnewversionUploading = $('#uploadnewversion_uploading');

        var filesList = [];

        ////////////
        // UPLOAD //
        ////////////

        var doUploadVersion = function(){
            sakai.api.Util.Modal.open($uploadnewversionUploading);
            var jqXHR = $('#uploadnewversion_fileupload').fileupload('send', {
                url: '/system/pool/createfile.' + sakai_global.content_profile.content_data.data['_path'],
                files: filesList,
                success: function(data) {
                    $.ajax({
                       url: sakai_global.content_profile.content_data['content_path'] + '.json',
                       type: 'POST',
                       data: {
                           'sakai:needsprocessing': true,
                           'sakai:pagecount': 0,
                           'sakai:hasPreview': false
                       },
                       success: function(data){
                           $.ajax({
                               url: sakai_global.content_profile.content_data['content_path'] + '.save.json',
                               type: 'POST',
                               success: function(data){
                                   sakai.api.Util.Modal.close($uploadnewversionUploading);
                                   sakai.api.Util.Modal.close($uploadnewversionContainer);
                                   sakai_global.content_profile.content_data.data = data;
                                   $(window).trigger('updated.version.content.sakai');
                                   $(window).trigger('update.versions.sakai', {
                                       pageSavePath: sakai_global.content_profile.content_data.content_path,
                                       saveRef: '',
                                       showByDefault: true
                                   });
                               },
                               error: function(err){
                                   sakai.api.Util.Modal.close($uploadnewversionUploading);
                                   debug.error(err);
                               }
                           });
                       },
                       error: function(err){
                           sakai.api.Util.Modal.close($uploadnewversionUploading);
                           debug.error(err);
                       }
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    debug.error(jqXHR, textStatus, errorThrown);
                    sakai.api.Util.Modal.close($uploadnewversionUploading);
                }
            });
        };


        ////////////////////
        // INITIALIZATION //
        ////////////////////

        /**
         * Initialize the modal dialog
         */
        var initializeJQM = function(){
            sakai.api.Util.Modal.setup($uploadnewversionContainer, {
                modal: true,
                overlay: 20,
                toTop: true
            });

            sakai.api.Util.Modal.open($uploadnewversionContainer);

            sakai.api.Util.Modal.setup($uploadnewversionUploading, {
                modal: true,
                overlay: 20,
                toTop: true
            });
            $uploadnewversionUploading.css('z-index', '4002');
        };

        var initializeFileUpload = function(){
            $('#uploadnewversion_fileupload').fileupload({
                replaceFileInput: false,
                add: function(e, data) {
                    filesList = data.files;
                }
            });
        };

        var addBinding = function(){
            $(uploadnewversionDoUpload).unbind('click', doUploadVersion);
            $(uploadnewversionDoUpload).bind('click', doUploadVersion);
        };

        var doInit = function(){
            initializeJQM();
            initializeFileUpload();
            addBinding();
        };

        $(document).on('init.uploadnewversion.sakai', doInit);

    }