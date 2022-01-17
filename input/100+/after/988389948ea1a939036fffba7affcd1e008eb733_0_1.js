function(uid) {
			var localSettings = getLocalIdmSettings(), 
				idm = document.getElementById('wdn_identity_management');
			
			idm.className = idm.className.replace(/(^|\s)(hidden|loggedin)(\s|$)/, '');
			
			var icon = '';
			// in planet red's use of CAS, staff usernames are converted like jdoe2 -> unl_jdoe2
			//  and student usernames are converted like s-jdoe3 -> unl_s_jdoe3
			var planetred_uid;
			if (uid.substring(2,0) == 's-') {
				planetred_uid = 'unl_' + uid.replace('-','_');
			} else {
				planetred_uid = 'unl_' + uid;
			}
			var user_profiles = document.getElementsByClassName('wdn_idm_user_profile');
			
			for (var j = 0; j < user_profiles.length; j++) {
			    user_profiles[j].setAttribute('href', 'http://planetred.unl.edu/pg/profile/'+planetred_uid);
			}
			document.getElementById('wdn_idm_userpic').setAttribute('src', '//planetred.unl.edu/pg/icon/'+planetred_uid+'/topbar/');
			var username = document.getElementById('wdn_idm_username');
			while (username.firstChild) {
				username.removeChild(username.firstChild);
			}
			username.appendChild(document.createTextNode(WDN.idm.displayName(uid)));
			idm.className += ' loggedin';
			
			// Any time logout link is clicked, unset the user data
			var logoutLink = document.getElementById('wdn_idm_logout').getElementsByTagName('a')[0];
			if (logoutLink.addEventListener) {
				logoutLink.removeEventListener('click', WDN.idm.logout, false);
				logoutLink.addEventListener('click', WDN.idm.logout, false);
			} else if (logoutLink.attachEvent) {
				logoutLink.detachEvent('onclick', WDN.idm.logout);
				logoutLink.attachEvent('onclick', WDN.idm.logout);
			}
			
			if (localSettings.logout) {
				WDN.idm.setLogoutURL(localSettings.logout);
			}
			WDN.idm.updateCommentForm();
		}