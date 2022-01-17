function() {
			if (localStorage["scrypto-passphrases"] == null) {
				var passphrases = {}
				localStorage["scrypto-passphrases"] = JSON.stringify(passphrases)
			}

			var user = window.get_scrypto_config().owner.local
			var passphrases = JSON.parse(localStorage.getItem("scrypto-passphrases"))
			passphrases[user] = $("#scrypto-passphrase").val()

			localStorage["scrypto-passphrases"] = JSON.stringify(passphrases)
			$('#store-passphrase').html("Local passphrase updated.")
			$('#scrypto-passphrase').prop('disabled', true)
		}