function() {
    var gui = this;

    var nav_file_dropdown_parent = "#nav_file_dropdown";
    // check if the file menu is included in the template (avoid including bootstrap.js if possible)
    if ($("#nav_file_dropdown_parent").length) {
        $(nav_file_dropdown_parent).append('<li><a id="nav_file_dropdown_revert" href="#">Revert</a></li><li class="divider"></li>' +
                                           '<li><a id="nav_file_dropdown_getmei" href="#">Get MEI</a></li>' +
                                           '<li><a id="nav_file_dropdown_getimg" href="#">Get Score Image</a></li>');

        
        $("#nav_file_dropdown_revert").tooltip({animation: true,
                                                placement: 'right', 
                                                title: '<br/><br/>Revert the current MEI file to the original version. ' +
                                                       'Warning: this will revert all changes made in the editor.', 
                                                delay: 100});
        $("#nav_file_dropdown_revert").click(function() {
            // move backup mei file to working directory
            $.get(gui.prefix + "/revert/" + gui.fileName, function(data) {
                // when the backup file has been restored, reload the page
                window.location = gui.prefix + "/editor/" + gui.fileName;
            })
            .error(function() {
                // show alert to user
                // replace text with error message
                $("#alert > p").text("Server failed to restore backup MEI file.");
                $("#alert").animate({opacity: 1.0}, 100);
            });

            return false;
        });

        // MEI download
        $("#nav_file_dropdown_getmei").tooltip({animation: true, 
                                                placement: 'right', 
                                                title: 'View the MEI file of the document being edited.',
                                                delay: 100});
        // set the download path of the file
        $("#nav_file_dropdown_getmei").attr("href", this.prefix + "/file/" + this.fileName);

        // Document image rasterize
        $("#nav_file_dropdown_getimg").tooltip({animation: true, 
                                                placement: 'right', 
                                                title: 'Download an image of the document being edited.',
                                                delay: 100});
        $("#nav_file_dropdown_getimg").click(function() {
            if (!fabric.Canvas.supports('toDataURL')) {
                // show alert to user
                $("#alert > p").text("The browser you are using does not support this feature.");
            }
            else {
                window.open(gui.rendEng.canvas.toDataURL('png'));
            }

            return false;
        });
    }
}