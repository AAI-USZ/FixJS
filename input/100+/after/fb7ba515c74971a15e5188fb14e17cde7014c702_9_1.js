function() {
	    var mainContent = $('<div id="maincontact">'), self = this,
        selection = $('<section id="contact">'),
        divleft = $('<div id="">'),
        h3title = $('<h3> Register </h3>'),
        contactdescrip = $('<div class="contactdescrip">'),
        emailfieldset = $('<fieldset>'),
        firstnameDiv = $('<div id="regfirstname_err_div" class="clearfix">'),
        fristnameField = $('<label for="firstname"><span>First Name *</span><input type="text" name="regfirstname" id="regfirstname" placeholder="First Name"/></label><span class="help-inline" id="regfirstname_err"></span>'),
        lastnameDiv = $('<div id="reglastname_err_div" class="clearfix">'),
        lastnameField = $('<label for="lastname"><span>Last Name *</span><input type="text" name="reglastname" id="reglastname" placeholder="Last Name" /></label><span class="help-inline" id="reglastname_err"></span>'),
        emailDiv = $('<div id="regemail_err_div" class="clearfix">'),
        emailField = $('<label for="email"><span>Email *</span><input type="text" name="regemail" id="regemail" placeholder="Email" /></label><span class="help-inline" id="regemail_err"></span>'),
        passwordDiv = $('<div id="regpassword_err_div" class="clearfix">'),
        passwordField = $('<label for="password"><span>Password *</span><input type="password" name="regpassword" id="regpassword" placeholder="Password"  /></label><span class="help-inline" id="regpassword_err"></span>'),
        phoneDiv = $('<div id="regphonenumber_err_div" class="clearfix">'),
        phoneField = $('<label for="phone"><span>Phone # *</span><input type="phone" name="regphonenumber" id="regphonenumber" placeholder="Phone Number" /></label><span class="help-inline" id="regphonenumber_err"></span>'),
        footer = $('<div>'),
        buttonsDiv = $('<div class="buttonsdiv">'),
        submitButton = $('<input type="submit" value="Submit" class="buttonstyle" id="ok"/>'),
        cancelButton = $('<input id="cancel" type="button" value="Cancel" class="buttonstyle"/>'),
        cleardiv = $('<div class="clear"></div>');     

        firstnameDiv.append(fristnameField);
        lastnameDiv.append(lastnameField); 
        emailDiv.append(emailField);
        passwordDiv.append(passwordField);
        phoneDiv.append(phoneField);

        $(submitButton).bind('click', {categoryId:0} , function(event){
            self.hideItems = ['Register'];
            if(self.phrescoapi.userRegister() === true){
				self.registerTest(self.phrescoapi.registerdata);
                self.phrescoapi.hideWidget(self.hideItems);
                self.listener.publish(event,"RegisterSuccess",[event.data]);
            }
        });
            
        buttonsDiv.append(submitButton);
        buttonsDiv.append(cancelButton);

        footer.append(buttonsDiv); 
        
        emailfieldset.append(firstnameDiv);
        emailfieldset.append(lastnameDiv);
        emailfieldset.append(emailDiv);
        emailfieldset.append(passwordDiv);
        emailfieldset.append(phoneDiv);
        emailfieldset.append(footer);  
        
        contactdescrip.append(emailfieldset);
        
        divleft.append(h3title);   
        divleft.append(contactdescrip);    
        divleft.append(cleardiv);
        selection.append(divleft);
        mainContent.append(selection);
        this.mainContent = mainContent;
    }