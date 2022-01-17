function (data) {

			//console.log("press:", data.press.join(","), "release:", data.release.join(","));

			nes.ui.sendInput({ press: data.press, release: data.release});

		}