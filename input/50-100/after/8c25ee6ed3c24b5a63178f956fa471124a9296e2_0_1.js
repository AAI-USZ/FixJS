function () {

        if (sys.getVal("idle") === "true") {

            client.goAway(true)

        } else {

            client.goAway(false)

        }

    }