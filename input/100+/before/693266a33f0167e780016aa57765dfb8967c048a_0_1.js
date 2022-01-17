function (settings) {
    	
        Database.setDefaults(settings, {
            title: '',
            uid: '',
            name: ''
        });

        var peopleData = Database.entity.db('main', 'user').load(settings.uid);
        var peopleDetailWindow = Titanium.UI.createWindow({
            id: 'peopleDetailWindow',
            title: peopleData.full_name,
            barColor: feri.ui.barColor,
            backgroundColor: feri.ui.backgroundColor,
            fullscreen: false
        });
        peopleDetailWindow.orientationModes = [Ti.UI.PORTRAIT];

        var tvData = [];
        var commonPadding = 15;
        
        var tv = Ti.UI.createTableView({
            textAlign: 'left',
            width: '100%'
        });
        tv.footerView = Ti.UI.createView({
            height: 1,
            opacity: 0
        });
        
        var headerRow = Ti.UI.createTableViewRow({
            height: 'auto',
            left: 0,
            top: -5,
            bottom: 10,
            layout: 'vertical',
            className: 'mainHeaderRow',
            backgroundPosition: 'bottom left',
            selectionStyle: 'none'
        });

        var titleRow = Ti.UI.createTableViewRow({
            hasChild: false,
            height: 'auto',
            width: '100%',
            selectionStyle: 'none',
            selectedBackgroundColor: feri.ui.selectedBackgroundColor
        });
        
        var bioRow = Ti.UI.createTableViewRow({
            hasChild: false,
            height: 'auto',
            width: '100%',
            selectionStyle: 'none',
            selectedBackgroundColor: feri.ui.selectedBackgroundColor
        });
        
        var officeRow = Ti.UI.createTableViewRow({
            hasChild: false,
            height: 'auto',
            width: '100%',
            selectionStyle: 'none',
            selectedBackgroundColor: feri.ui.selectedBackgroundColor
        });
        
        var hoursRow = Ti.UI.createTableViewRow({
            hasChild: false,
            height: 'auto',
            width: '100%',
            selectionStyle: 'none',
            selectedBackgroundColor: feri.ui.selectedBackgroundColor
        });
        
        var emailRow = Ti.UI.createTableViewRow({
            hasDetail: true,
            height: 'auto',
            width: '100%',
            selectionStyle: 'none',
            selectedBackgroundColor: feri.ui.selectedBackgroundColor
        });
        
        var telRow = Ti.UI.createTableViewRow({
            hasDetail: false,
            height: 'auto',
            width: '100%',
            selectionStyle: 'none',
            selectedBackgroundColor: feri.ui.selectedBackgroundColor
        });
        if (Titanium.Platform.osname != 'ipad')
        	telRow.hasDetail = true;

        if (peopleData.full_name != undefined) {
            var fullName = Ti.UI.createLabel({
	            text: feri.cleanSpecialChars(peopleData.full_name),
	            font: {
	                fontSize: 28,
	                fontWeight: 'bold'
	            },
	            textAlign: 'left',
	            color: '#000',
	            left: commonPadding,
	            top: 18,
	            bottom: 10,
	            right: commonPadding,
	            height: 'auto'
	        });
            headerRow.add(fullName);
        }

        if (peopleData.position != undefined) {
            var position = Ti.UI.createLabel({
                text: feri.cleanSpecialChars(peopleData.position),
                font: {
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                textAlign: 'left',
                color: '#666',
                height: 'auto',
                left: commonPadding,
                touchEnabled: false,
                bottom: commonPadding
            });
            headerRow.add(position);
        }
        tvData.push(headerRow);
        
        var titleText = (!peopleData.title) ? "No title available" : feri.cleanSpecialChars(peopleData.title.replace(/^[\s\n\r\t]+|[\s\n\r\t]+$/g, '').replace(/\n/g, "\n\n"));
        var title = Ti.UI.createLabel({
            text: titleText,
            backgroundColor: '#fff',
            textAlign: 'left',
            color: '#000',
            height: 'auto',
            width: feri.isAndroid() ? '92%' : 'auto',
            top: 10,
            bottom: 10,
            font: {
                fontSize: 16
            }
        });

        if (!feri.isAndroid()) {
            title.right = 10;
            title.left = 10;
        }

		if ( peopleData.title ) {
        	titleRow.add(title);
        	tvData.push(feri.ui.createHeaderRow('Naziv'));
        	tvData.push(titleRow);
        }
		
        var bioText = (!peopleData.bio) ? "No biography available" : feri.cleanSpecialChars(peopleData.bio.replace(/^[\s\n\r\t]+|[\s\n\r\t]+$/g, '').replace(/\n/g, "\n\n"));
        var bio = Ti.UI.createLabel({
            text: bioText,
            backgroundColor: '#fff',
            textAlign: 'left',
            color: '#000',
            height: 'auto',
            width: feri.isAndroid() ? '92%' : 'auto',
            top: 10,
            bottom: 10,
            font: {
                fontSize: 16
            }
        });

        if (!feri.isAndroid()) {
            bio.right = 10;
            bio.left = 10;
        }

		if ( peopleData.bio ) {
        	bioRow.add(bio);
        	tvData.push(feri.ui.createHeaderRow('Biography'));
        	tvData.push(bioRow);
        }
        
        var officeText = (!peopleData.office) ? "No office available" : feri.cleanSpecialChars(peopleData.office.replace(/^[\s\n\r\t]+|[\s\n\r\t]+$/g, '').replace(/\n/g, "\n\n"));
        var office = Ti.UI.createLabel({
            text: officeText,
            backgroundColor: '#fff',
            textAlign: 'left',
            color: '#000',
            height: 'auto',
            width: feri.isAndroid() ? '92%' : 'auto',
            top: 10,
            bottom: 10,
            font: {
                fontSize: 16
            }
        });

        if (!feri.isAndroid()) {
            office.right = 10;
            office.left = 10;
        }
        
        officeRow.add(office);
        
        var hoursText = (!peopleData.office) ? "No hours available" : feri.cleanSpecialChars(peopleData.hours.replace(/^[\s\n\r\t]+|[\s\n\r\t]+$/g, '').replace(/\n/g, "\n\n"));
        var hours = Ti.UI.createLabel({
            text: hoursText,
            backgroundColor: '#fff',
            textAlign: 'left',
            color: '#000',
            height: 'auto',
            width: feri.isAndroid() ? '92%' : 'auto',
            top: 10,
            bottom: 10,
            font: {
                fontSize: 16
            }
        });

        if (!feri.isAndroid()) {
            hours.right = 10;
            hours.left = 10;
        }

        hoursRow.add(hours);
        
        var telText = (!peopleData.tel) ? "No tel available" : feri.cleanSpecialChars(peopleData.tel.replace(/^[\s\n\r\t]+|[\s\n\r\t]+$/g, '').replace(/\n/g, "\n\n"));
        var tel = Ti.UI.createLabel({
            text: telText,
            backgroundColor: '#fff',
            textAlign: 'left',
            color: '#000',
            height: 'auto',
            width: feri.isAndroid() ? '92%' : 'auto',
            top: 10,
            bottom: 10,
            font: {
                fontSize: 16
            }
        });

        if (!feri.isAndroid()) {
            tel.right = 10;
            tel.left = 10;
        }

        telRow.add(tel);
        
        if ( peopleData.office || peopleData.hours || peopleData.tel ) {
        	tvData.push(feri.ui.createHeaderRow('Kabinet'));
        	if ( peopleData.office )
        		tvData.push(officeRow);
        	if ( peopleData.hours )
        		tvData.push(hoursRow);
        	if ( peopleData.tel )
        		tvData.push(telRow);
        }
        
        var emailText = (!peopleData.email) ? "No email available" : feri.cleanSpecialChars(peopleData.email.replace(/^[\s\n\r\t]+|[\s\n\r\t]+$/g, '').replace(/\n/g, "\n\n"));
        var email = Ti.UI.createLabel({
            text: emailText,
            backgroundColor: '#fff',
            textAlign: 'left',
            color: '#000',
            height: 'auto',
            width: feri.isAndroid() ? '92%' : 'auto',
            top: 10,
            bottom: 10,
            font: {
                fontSize: 16
            }
        });

        if (!feri.isAndroid()) {
            email.right = 10;
            email.left = 10;
        }
        
        emailRow.add(email);
        
        if ( peopleData.email ) {
        	tvData.push(feri.ui.createHeaderRow('Email'));
        	tvData.push(emailRow);
        }

        tv.setData(tvData);
        peopleDetailWindow.add(tv);
        
        // send email
        emailRow.addEventListener('click', function () {
        	var emailDialog = Ti.UI.createEmailDialog();
        	emailDialog.setToRecipients([peopleData.full_name + '<' + peopleData.email + '>']);
			emailDialog.open();
        });
        
        // make a phone cal
        telRow.addEventListener('click', function () {
        	if (Titanium.Platform.osname != 'ipad')
        		Ti.Platform.openURL('tel://'+peopleData.tel.replace(/\s/g, ""));
        });

        return peopleDetailWindow;
    }