function() {
				$del($id('DESU_alertHelpDEBUG'));
				var nCfg = new Config(Cfg), tl = timeLog.split('\n');
				tl[tl.length - 1] = Lng.total[lCode] + endTime + 'ms';
				delete nCfg['passwValue'];
				delete nCfg['signatValue'];
				delete nCfg['lastScrUpd'];
				for(var i in nCfg) {
					if(nCfg[i] === defaultCfg[i]) {
						delete nCfg[i];
					}
				}
				$alert(Lng.infoDebug[lCode] + ':<br /><textarea readonly rows="20" cols="75">' + getPrettyJSON({
					'version': defaultCfg['version'],
					'location': String(window.location),
					'nav': nav,
					'cfg': nCfg,
					'spells': spellsList,
					'perf': tl
				}, '') + '</textarea>', 'HelpDEBUG', false);
			}