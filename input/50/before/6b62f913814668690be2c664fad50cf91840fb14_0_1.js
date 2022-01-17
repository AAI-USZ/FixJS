function add_nameserver() {
	var ul = document.getElementById("nameservers");
	var new_li = document.createElement('li');
	new_li.innerHTML = lbl_host + ": <input type=\"text\" class=\"host\" onChange=\"return resolve(get_nameservers());\"/>" + lbl_ip + ": <input type=\"text\" class=\"IP\" /></li>";
	ul.appendChild(new_li);
}