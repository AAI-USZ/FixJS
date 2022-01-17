function(xml) {
                if(xml == 'You are not logged in!') {
                    $('#urlholder').html('You can not save this visualization because you are not logged in. Please <a href="login.php">login</a> or <a href="register.php">join iSENSE</a> then try again.');
                }
                else {
                    $('#urlholder').createAppend('a', { href:'http://isense.cs.uml.edu/visdir.php?id=' + xml }, 'http://isense.cs.uml.edu/visdir.php?id=' + xml);
                }
                $('#savetable').hide();
                $('#savedtable').show();
            }