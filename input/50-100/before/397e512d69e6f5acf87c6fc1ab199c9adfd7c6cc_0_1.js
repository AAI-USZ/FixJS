function(error,result){
                if (error) {
                    return 'Error sending email!  Error was: ' + error;
                } else {
                    return 'Email response successfull!  Response was: ' + result +'\nEmail to: ' + email + '\nEmail text: \n' + chatTranscript;
                }
            }