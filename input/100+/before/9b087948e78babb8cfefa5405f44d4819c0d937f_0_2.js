function (event) {
        var speedlimiter = 100.0 / FRAMESPEED;
        this.x = EMITTER_X + (Math.random() * 8 - 4) * speedlimiter;
        this.y = EMITTER_Y + (Math.random() * 8 - 4) * speedlimiter;
        this.vx = (Math.random() * 2 - 1) * speedlimiter;
        this.vy = (Math.random() * 2 - 1) * speedlimiter;

        //var r = Math.random() * 255 >> 0;
        //var g = Math.random() * 255 >> 0;
        //var b = Math.random() * 255 >> 0;
        //this.color = "rgba(" + r + ", " + g + ", " + b + ", 0.8)";
        this.color = "rgba(90,90,90,0.8)";

        switch (event.type) {
            case "session_start":
                this.color = "rgba(0,255,102,0.8)";
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
                break;
            default:
                console.log("event.type " + event.type);
                this.color = "rgba(" + (Math.random() * 255 >> 0) + ", " + (Math.random() * 255 >> 0) + ", " + (Math.random() * 255 >> 0) + ", 0.8)";
        }

        this.alive = true;
        this.radius = 2;
        this.user = event.user;

        this.x += this.vx;
        this.y += this.vy;

        //console.log("created particle for user " + this.user, event); //

        if (debug)
            console.log("created particle at [" + this.x + "," + this.y + "] with velocity [" + this.vx + "," + this.vy + "]");
    }