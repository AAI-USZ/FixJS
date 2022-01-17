function() {
        var mainContent = $('<div></div>'),
        self = this,
        contactus = $('<div id="maincontact">'),
        selection = $('<section id="contact">'),
        divleft = $('<div id="">'),
        contactdescrip = $('<div class="contactdescrip">'),
        myCart = $('<div class="mycart_div"></div>'),
        log_div = $('<div class="log_div"></div>'),
        log_innerdiv = $('<div class="log_innerdiv"></div>'),
        log_innerdiv1 = $('<div class="log_innerdiv1"></div>'),
        log_heading = $('<div class="log_heading">Register</div>'),
        log_txt_div = $('<div class="log_txt_div"></div>'),
        registrationStatus = $('<div class="log_txt"></div>'),
        statusMsg = $('<div class="log_txt_lft">Registration Status :' + self.api.resgisterresponse.successMessage+ '</div>'),
        userStatus = $('<div class="log_txt"></div>'),
        userstatusMsg = $('<div class="log_txt_lft">User Status :' + self.api.resgisterresponse.message+ ' </div>'),
        log_txtfname = $('<div class="log_txt">'),
        log_txt_lftfname = $('<div class="log_txt_lft">Name :' + self.phrescoapi.register.firstName + self.phrescoapi.register.lastName + ' </div>'),
        log_txtEmail = $('<div class="log_txt">'),
        log_txt_lftEmail = $('<div class="log_txt_lft">Email : ' + self.phrescoapi.register.email + ' </div>'),
        cleardiv = $('<div class="clear"></div>');     

        registrationStatus.append(statusMsg);
        userStatus.append(userstatusMsg);
        log_txtfname.append(log_txt_lftfname);
        log_txtEmail.append(log_txt_lftEmail);
        log_txt_div.append(registrationStatus);
        log_txt_div.append(userStatus);
        log_txt_div.append(log_txtfname);
        log_txt_div.append(log_txtEmail);
        log_innerdiv1.append(log_heading);
        log_innerdiv1.append(log_txt_div);
        log_innerdiv.append(log_innerdiv1);
        log_div.append(log_innerdiv);
        myCart.append(log_div);
        contactdescrip.append(myCart);
        divleft.append(contactdescrip);    
        divleft.append(cleardiv);
        selection.append(divleft);
        contactus.append(selection);
        mainContent.append(contactus);
        this.mainContent = mainContent;
    }