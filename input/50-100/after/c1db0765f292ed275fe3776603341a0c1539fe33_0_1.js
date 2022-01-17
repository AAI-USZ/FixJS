function (obj) {
            if (this.isPlayer(obj))
                this.players = this.players.filter(function (e) { return e!=obj });
            if (this.isMonster(obj))
                this.monsters = this.monsters.filter(function (e) { return e != obj });
        }