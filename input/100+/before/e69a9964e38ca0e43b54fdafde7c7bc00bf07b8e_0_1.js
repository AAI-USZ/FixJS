function readCfg() {
	Cfg = parseCfg('DESU_Config_' + aib.dm) || fixCfg(nav.isGlobal);
	Cfg['version'] = defaultCfg['version'];
	if(nav.Opera && nav.Opera < 11.1 && Cfg['scriptStyle'] !== 2) {
		Cfg['scriptStyle'] = 2;
	}
	if(nav.Firefox < 6 && !nav.WebKit) {
		Cfg['preLoadImgs'] = 0;
	}
	if(aib.fch || aib.abu) {
		Cfg['findRarJPEG'] = 0;
	}
	if(!nav.Firefox) {
		Cfg['favIcoBlink'] = 0;
	}
	if(!nav.WebKit) {
		Cfg['desktNotif'] = 0;
	}
	if(nav.Opera && nav.Opera < 12) {
		Cfg['YTubeTitles'] = 0;
	}
	if(nav.Opera) {
		Cfg['updScript'] = 0;
	}
	if(!Cfg['saveSage']) {
		Cfg['sageReply'] = 0;
	}
	Cfg['linksOver'] = +Cfg['linksOver'];
	Cfg['linksOut'] = +Cfg['linksOut'];
	setStored('DESU_Config_' + aib.dm, JSON.stringify(Cfg));
	lCode = Cfg['language'];
	Stat = getStoredObj('DESU_Stat_' + aib.dm, {'view': 0, 'op': 0, 'reply': 0});
	if(TNum) {
		Stat.view = +Stat.view + 1;
	}
	setStored('DESU_Stat_' + aib.dm, JSON.stringify(Stat));
	if(Cfg['correctTime']) {
		dTime = new dateTime(Cfg['timePattern'], Cfg['timeOffset']);
	}
	saveSpells(getStored('DESU_Spells_' + aib.dm) || '');
}