function confirmTACredentials(){
	//creates dummy TA value if loginDebug is true: netID is TA, password is password
	if (loginDebug){
		storeEntry(loginPrepend, "|", "|", "TA", "|", "|", "|", "|", Sha1.hash("password",true).toUpperCase());
	}
	//gets the netID and password from the page
	var name = document.getElementById("TA").value;
	var password = document.getElementById("password").value;
	if (name!=null && name!="")
	{
		if (password!=null && password != "")
		{
			for (var i = 0; i < localStorage.length; i++) {
				var key = localStorage.key(i);
				//if this is the right netid, then hash the plaintext password and check it
				if(stringContains(loginPrepend, key)){
					if (keyDelimiter(key,"netID") == name) {
						if (localStorage[key] == Sha1.hash(password,true).toUpperCase()) {
							document.getElementById("login").style.display="none";
							document.getElementById("main").style.display="inline";
							//removes dummy TA value if loginDebug is true
							if (loginDebug){
								key = "storedLogin | | TA | | | |";
								localStorage.removeItem(key);
							}
							return false;
						} 
					}
				}
			}
			alert("Invalid netID or password");
			return false;
		}
		else
		{
			alert("Please enter a password");
			return false;
		}
	}
	else
	{
		alert("Please enter a TA netID");
		return false;
	}
}