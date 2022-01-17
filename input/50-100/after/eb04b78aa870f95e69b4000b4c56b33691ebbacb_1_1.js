function changeMdpRestreint() {
		var nm = document.getElementById('ch_mdp_restreint').value;
		if (nm.length != 32) {
			alert('Votre mot de passe restreint doit faire exactement 32 caractères.');
			return;
		}
		var mdpkey = passwordKey();
		localStorage[mdpkey] = nm;
		chrall.notifyUser({text:"Mot de passe modifié"});
	}