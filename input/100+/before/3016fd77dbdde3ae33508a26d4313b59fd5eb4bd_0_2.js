function initTours() {

    // config object

    Config.Tours = {

        maxqueue: parseInt(getConfigValue("tourconfig.txt", "maxqueue")),

        maxarray: 1023,

        maxrunning: parseInt(getConfigValue("tourconfig.txt", "maxrunning")),

        toursignup: parseInt(getConfigValue("tourconfig.txt", "toursignup")),

        tourdq: parseInt(getConfigValue("tourconfig.txt", "tourdq")),

        subtime: parseInt(getConfigValue("tourconfig.txt", "subtime")),

        activity: parseInt(getConfigValue("tourconfig.txt", "touractivity")),

        tourbreak: parseInt(getConfigValue("tourconfig.txt", "breaktime")),

        abstourbreak: parseInt(getConfigValue("tourconfig.txt", "absbreaktime")),

        reminder: parseInt(getConfigValue("tourconfig.txt", "remindertime")),

        channel: "Tournaments",

        errchannel: "Developer's Den",

        tourbotcolour: "#3DAA68",

        minpercent: parseInt(getConfigValue("tourconfig.txt", "minpercent")),

        version: "1.353",

        debug: false,

        points: true

    }

    if (Config.Tours.tourbot === undefined) {

        Config.Tours.tourbot = "\u00B1Genesect: "

    }

    tourschan = sys.channelId("Tournaments");

    tourserrchan = sys.channelId("Indigo Plateau");

    if (sys.existChannel(Config.Tours.channel)) {

        tourschan = sys.channelId(Config.Tours.channel)

    }

    if (sys.existChannel(Config.Tours.errchannel)) {

        tourserrchan = sys.channelId(Config.Tours.errchannel)

    }

    if (typeof tours != "object") {

        sys.sendAll("Creating new tournament object", tourschan)

        tours = {"queue": [], "globaltime": 0, "key": 0, "keys": [], "tour": {}, "history": [], "touradmins": [], "subscriptions": {}, "activetas": [], "activehistory": [], "tourmutes": {}, "tourbans": []}

    }

    else {

        if (!tours.hasOwnProperty('queue')) tours.queue = [];

        if (!tours.hasOwnProperty('globaltime')) tours.globaltime = 0;

        if (!tours.hasOwnProperty('key')) tours.key = [];

        if (!tours.hasOwnProperty('keys')) tours.keys = [];

        if (!tours.hasOwnProperty('tour')) tours.tour = {};

        if (!tours.hasOwnProperty('history')) tours.history = [];

        if (!tours.hasOwnProperty('touradmins')) tours.touradmins = [];

        if (!tours.hasOwnProperty('subscriptions')) tours.subscriptions = {};

        if (!tours.hasOwnProperty('activetas')) tours.activetas = [];

        if (!tours.hasOwnProperty('activehistory')) tours.activehistory = [];

        if (!tours.hasOwnProperty('tourmutes')) tours.tourmutes = {};

        if (!tours.hasOwnProperty('tourbans')) tours.tourbans = [];

    }

    try {

        getTourWinMessages()

        sys.sendAll("Win messages added", tourschan)

    }

    catch (e) {

        // use a sample set of win messages

        tourwinmessages = ["annihilated", "threw a table at", "blasted", "captured the flag from", "FALCON PAAAAWNCHED", "haxed", "outsmarted", "won against", "hung, drew and quartered"];

        sys.sendAll("No win messages detected, using default win messages", tourschan)

    }

    try {

        var data = (sys.getFileContent("touradmins.txt")).split(":::")

        for (var d=0;d<data.length;d++) {

            var info = data[d]

            if (info === undefined || info == "") {

                data.splice(d,1)

            }

        }

        tours.touradmins = data

    }

    catch (e) {

        sys.sendAll("No tour admin data detected, leaving blank", tourschan)

    }

    try {

        loadTourMutes()

    }

    catch (e) {

        sys.sendAll("No tourmute data detected, leaving blank", tourschan)

    }

    sys.sendAll("Version "+Config.Tours.version+" of the tournaments system was loaded successfully in this channel!", tourschan)

}