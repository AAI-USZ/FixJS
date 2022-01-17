function () {
            console.log(localStorage.loggedInUser)
            this.sendEncounterData(personUuid, localStorage.regUuidencountertype, localStorage.screenerUuidlocation, localStorage.loggedInUser)
        }