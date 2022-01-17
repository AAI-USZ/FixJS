function(error) {
        if (error.username) {validateUsername.setData('<div class="validationError">' + error.username + '</div>');}
        if (error.password) {validatePassword.setData('<div class="validationError">' + error.password + '</div>');}
        if (error.firstname) {validateFirstname.setData('<div class="validationError">' + error.firstname + '</div>');}
        if (error.surname) {validateSurname.setData('<div class="validationError">' + error.surname + '</div>');}
        if (error.email) {validateEmail.setData('<div class="validationError">' + error.email + '</div>');}
        if (error.phone) {validatePhone.setData('<div class="validationError">' + error.phone + '</div>');}
    }