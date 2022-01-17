function (to) {
            var presence = $pres().c("status").t("Ready or not");
            this.connection.send(presence);

            this.log("Initial presence sent");
        }