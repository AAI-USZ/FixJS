function (settings) {

        $(this).tinymce({
            // localization
            language:"cs", // change language here en,cs,sk

            // Location of TinyMCE script
            script_url:'/assets/backbone_js/tinymce/jscripts/tiny_mce/tiny_mce.js',

            width:"100%",

            // General options
            /*theme:"advanced",
             plugins:"pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

             // Theme options
             //theme_advanced_buttons1:"save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
             theme_advanced_buttons1:"newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
             theme_advanced_buttons2:"cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
             theme_advanced_buttons3:"tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
             theme_advanced_buttons4:"insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
             theme_advanced_toolbar_location:"top",
             theme_advanced_toolbar_align:"left",
             theme_advanced_statusbar_location:"bottom",
             theme_advanced_resizing:true,
             */
            theme:"advanced",
            plugins:"pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

            // Theme options
            //theme_advanced_buttons1:"save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
            theme_advanced_buttons1:"newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect",
            theme_advanced_buttons2:"cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,code",
            theme_advanced_buttons3:"tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media",
            theme_advanced_buttons4:"cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,|,insertdate,inserttime,preview,|,forecolor,backcolor,|,advhr,|,print,|,fullscreen",
            theme_advanced_toolbar_location:"top",
            theme_advanced_toolbar_align:"left",
            theme_advanced_statusbar_location:"bottom",
            theme_advanced_resizing:true,


            // Example content CSS (should be your site CSS)
//                content_css:"css/content.css",

            // Drop lists for link/image/media/template dialogs
            //template_external_list_url: tinymce_datafile_url(settings, "Template"),
            external_link_list_url:tinymce_datafile_url(settings, "Link"),
            external_image_list_url:tinymce_datafile_url(settings, "Image"),
            media_external_list_url:tinymce_datafile_url(settings, "Media"),

            media_types:"flash=swf;shockwave=dcr;qt=mov,qt,mpg,mp3,mp4,mpeg;wmp=avi,wmv,wm,asf,asx,wmx,wvx;rmp=rm",

            // Replace values for the template plugin
            template_replace_values:{
                username:"Some User",
                staffid:"991234"
            }
        });
    }