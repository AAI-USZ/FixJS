function init() {

        if (sys.getVal('etext') === "true") {

            etext = "true"

        } else {

            etext = "false"

        }

        if (sys.getVal('tgreentext') === "true") {

            tgreentext = "true"

        } else {

            tgreentext = "false"

        }

        var nstalkwords = sys.getVal('stalkwords').split(",")

        stalkwords = nstalkwords.concat(stalkwords)

        stalkwords = eliminateDuplicates(stalkwords)

    }