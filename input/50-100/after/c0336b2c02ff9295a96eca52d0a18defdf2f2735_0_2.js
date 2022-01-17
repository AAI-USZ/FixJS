function() {
			if (updateChatPreview()) {
				if ($('#textInput').val()!='') {
					if (pingInterval) {
						window.clearTimeout(pingInterval);

					}
					$.post(POST_URL,{'chat': chat, 'line': $('#preview').text()}); // todo: check for for error
					pingInterval = window.setTimeout(pingServer, PING_PERIOD*1000);
					$('#textInput').val('');
					updateChatPreview();
				}
			}
			return false;
		}