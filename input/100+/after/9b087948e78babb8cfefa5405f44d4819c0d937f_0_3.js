function () {

        var whichEvent = Math.random() * 10 >> 0;
        var event = { user: "user" + particleNumber};
        particleNumber++;

        switch (whichEvent) {
            case 0:
                event.type = "session_start";
                break;
            case 1:
                event.type = "user";
                break;
            case 2:
                event.type = "purchase";
                break;
            case 3:
                event.type = "buy_in"
                break;
            default:
                event.type = "event";
        }

        return new createParticle(event);
    }