function() {

		var socket = io.connect('/'), $doc = $(document);

		console.log('game ready');



		socket.on("connect", function (data) {

			log("connected. waiting for input");

			socket.emit('game', {info: "game ready for input"});

		});



		socket.on("game", function (data) {

			//console.log("press:", data.press.join(","), "release:", data.release.join(","));

			nes.ui.sendInput({ press: data.press, release: data.release});

		});

		



		nes = new JSNES({

			'ui': $('#emulator').JSNESUI({

				"Homebrew": [

					['Concentration Room', 'roms/croom/croom.nes'],

					['LJ65', 'roms/lj65/lj65.nes'],

				],

				"Working": [

					['Contra', 'local-roms/Contra.nes'],

					['Mario Brothers', 'local-roms/Mario Bros.nes'],

					['Super Mario Brothers 3', 'local-roms/Super Mario Bros 3.nes'],

					/*

					['Bubble Bobble', 'local-roms/Bubble Bobble (U).nes'],

					['Donkey Kong', 'local-roms/Donkey Kong (JU).nes'],

					['Dr. Mario', 'local-roms/Dr. Mario (JU).nes'],

					['Golf', 'local-roms/Golf (JU).nes'],

					['The Legend of Zelda', 'local-roms/Legend of Zelda, The (U) (PRG1).nes'],

					['Lemmings', 'local-roms/Lemmings (U).nes'],

					['Lifeforce', 'local-roms/Lifeforce (U).nes'],



					['Mario Bros.', 'local-roms/Mario Bros. (JU) [!].nes'],

					['Mega Man', 'local-roms/Mega Man (U).nes'],

					['Pac-Man', 'local-roms/Pac-Man (U) [!].nes'],

					['Super Mario Bros.', 'local-roms/Super Mario Bros. (JU) (PRG0) [!].nes'],

					['Tennis', 'local-roms/Tennis (JU) [!].nes'],

					['Tetris', 'local-roms/Tetris (U) [!].nes'],

					['Tetris 2', 'local-roms/Tetris 2 (U) [!].nes'],

					['Zelda II - The Adventure of Link', 'local-roms/Zelda II - The Adventure of Link (U).nes']

					*/

				],



				"Nearly Working": [

					['Duck Hunt', 'local-roms/Duck Hunt (JUE) [!].nes'],

					['Super Mario Bros. 3', 'local-roms/Super Mario Bros. 3 (U) (PRG1) [!].nes']

				]

			})

		});



	}