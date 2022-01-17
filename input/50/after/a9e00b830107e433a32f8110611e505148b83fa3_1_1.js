function () {
            console.log('------Patient Created successfully------');
            //After patient has been created, send the encounter data
            this.sendEncounterData(personUuid);
        }