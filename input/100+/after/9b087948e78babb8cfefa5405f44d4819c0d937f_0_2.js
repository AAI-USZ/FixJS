function (event) {
        var speedlimiter = 100.0 / FRAMESPEED;
        this.x = EMITTER_X + (Math.random() * 8 - 4) * speedlimiter;
        this.y = EMITTER_Y + (Math.random() * 8 - 4) * speedlimiter;
        this.vx = (Math.random() * 2 - 1) * speedlimiter;
        this.vy = (Math.random() * 2 - 1) * speedlimiter;

        this.color = "rgba(90,90,90,0.8)";
        this.alive = true;
        this.diesafter = deltaEver + 180000;
        this.radius = 2;
        this.user = event.user;

        switch (event.type) {
            case "session_start":
            case "session_end":
                this.color = "rgba(0,255,102,0.8)";
                break;
            case "buy_in":
                this.color = "rgba(255,0,0,1.0)";
                this.radius = 3;
                this.diesafter = deltaEver + 600000;
                break;
            case "purchase":
                this.color = "rgba(0,153,255,0.8)";
                break;
            case "user":
                this.color = "rgba(255,204,0,0.8)";
                break;
            case "currency_given":
                this.color = "rgba(255,102,204,0.8)";
                break;
            case "event":
                this.color = "rgba(153,153,153,0.8)";
                this.vx = this.vx / 2;
                this.vy = this.vy / 2;
                this.radius = 1;
                this.diesafter = deltaEver + 30000;
                break;
            default:
                console.log("unmatched event.type " + event.type);
        }

        this.x += this.vx;
        this.y += this.vy;

        //console.log("created particle for user " + this.user, event); //
        if (debug)
            console.log("created particle at [" + this.x + "," + this.y + "] with velocity [" + this.vx + "," + this.vy + "]");
    }