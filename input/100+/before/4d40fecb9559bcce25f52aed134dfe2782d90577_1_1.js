function(key, value){
                // Update the update status texts
                current = (key+1);
                tmp = parseFloat(running);
                s = value['status'];
                status = s.substr(0, 1);
                
                // Get our file mode
                switch(status)
                {
                    case "M":
                        mode = 'Updating';
                        break;
                    case "A":
                        mode = 'Adding';
                        break;
                    case "D":
                        mode = 'Removing';
                        break;
                    case "R":
                        mode = 'Renaming';
                        break;
                    default:
                        mode = '';
                        break;
                }
                
                // Update the status
                $('#update-state').html('<center>' + mode + ' file: "' + value['file'] +'"</center>');
  
                // Send action
                $.ajax({
                    type: "POST",
                    url: Plexis.url + '/admin_ajax/update',
                    data: { 
                        action: "update", 
                        status: value['status'], 
                        sha: update_sha, 
                        filename: value['file'],
                    },
                    dataType: "json",
                    async: false,
                    timeout: 15000, // in milliseconds
                    success: function(result) 
                    {
                        if(typeof result.php_error != "undefined" && result.php_error == true)
                        {
                            data = result.php_error_data;
                            update_error = true;
                            update_message = data.message;
                            
                            $.msgbox('Update failed because a PHP error was encountered!<br /><br >  Message: '+ data.message +'<br /> File: '+ data.file +'<br /> Line: '+ data.line, {
                                type : 'error'
                            });
                        }
                        else
                        {
                            if(result.success == true)
                            {
                                // Progress
                                running += add;
                                myProgressBar.setValue( running );
                            }
                            else
                            {
                                update_error = true;
                                update_message = result.message;
                            }
                        }
                        
                    },
                    error: function(request, status, err) 
                    {
                        // Show that there we cant connect to the update server
                        update_error = true;
                        show_ajax_error(status);
                    }
                });
                
                // Stop the loop!
                if(update_error == true) return false;
            }