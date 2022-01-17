function(src, dest, desc, bid) {
    if (SESSION.global().battleinfo[bid] && SESSION.global().battleinfo[bid].rated && desc == "forfeit"
       && sys.ratedBattles(dest) <= 1 && sys.isInChannel(dest, mafiachan)) {
        //normalbot.sendAll(sys.name(dest) + " just forfeited their first battle and is on mafia channel. Troll?", staffchannel)
    }
    delete SESSION.global().battleinfo[bid];
    delete SESSION.users(src).battles[bid];
    delete SESSION.users(dest).battles[bid];

    if (!SESSION.users(src).battlehistory) SESSION.users(src).battlehistory=[];
    if (!SESSION.users(dest).battlehistory) SESSION.users(dest).battlehistory=[];
    SESSION.users(src).battlehistory.push([sys.name(dest), "win", desc]);
    SESSION.users(dest).battlehistory.push([sys.name(src), "lose", desc]);
}