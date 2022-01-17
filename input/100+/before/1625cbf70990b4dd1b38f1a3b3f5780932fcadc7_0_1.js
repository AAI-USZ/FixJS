function() {
			console.log("1")
			if (!accessible_message_key && !window.get_scrypto_config().decryption_key) {
				return
			} else if (!accessible_message_key) {
				secured_decryption = window.get_scrypto_config().decryption_key
				decryption_key = scrypto.decrypt_decryption_key($("#scrypto-passphrase").val(), Base64.decode(secured_decryption))
				
				if(decryption_key === null) {
					$(this).html("<p>This message is encrypted, but no suitable decryption key is available. This may occur if an incorrect passphrase (or no passphrase) is specified.</p>")
					return
				}
			}

			console.log("2")
			var html = $(this).html()

			var encrypted_messages = html.match(/\[scrypto\].*\[\/scrypto\]/)
			console.log("3")
			if (encrypted_messages) {
				console.log("4")
				for (var k = 0; k < encrypted_messages.length; k++) {
					console.log("5")
					var message = JSON.parse(Base64.decode(encrypted_messages[k].replace('[scrypto]', '').replace('[/scrypto]', '')))

					var owner = (window.get_scrypto_config().owner.global) ? window.get_scrypto_config().owner.global : window.get_scrypto_config().owner.local

					if (!accessible_message_key) {
						accessible_message_key = sjcl.decrypt(decryption_key, message.recipient_message_keys[owner])

						var symmetric_fields = window.get_scrypto_config().symmetric_fields.split(",")
						for (var i = 0; i < symmetric_fields.length; i++) {
							$(symmetric_fields[i]).each(function() {
								$(this).attr("data-symmetric_key", Base64.encode(accessible_message_key))
							})
						}
					}
					console.log("6")
					var text = sjcl.decrypt(JSON.parse(accessible_message_key), message.encrypted_text);
					console.log("7")
					if(typeof(Markdown) === 'object' && typeof(Markdown.getSanitizingConverter) === 'function') {
						var converter = Markdown.getSanitizingConverter()
						text = converter.makeHtml(text)
					}
					
					html = html.replace(encrypted_messages[k], text)
				}
				console.log("8")
				$(this).html(html)
			}
		}