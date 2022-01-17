function run() {
	document.getElementById("result").innerHTML = convert(
		document.getElementById("from").value,
		document.getElementById("from-unit").value,
		document.getElementById("to-unit").value,
		document.getElementById("base-size").value,
		document.getElementById("dpi").value,
		document.getElementById("decimals").value
	);
}