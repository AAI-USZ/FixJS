function(data) {
        this.username = null;
        this.firstname = null;
        this.lastname = null;
        this.gender = null;
        this.bio = null;
        this.background = null;
        this.bgcreditname = null;
        this.bgcrediturl = null;
        this.points = null;
        this.titles = [];
        this.badges = [];

        this.title = null;
        this.nexttitle = null;

        this.level = null;
        this.last = null;
        this.next = null;
        this.points = null;

        /**
         * Returns the display name of the user
         * @return string The display name of the user, one of: [first name] [last name], [first name] "[username]", or [username]
         */
        this.getName = function() {
            var name = "";
            if (this.firstname !== null && this.firstname != '') {
                name += this.firstname;
                if (this.lastname !== null && this.lastname != '') {
                    name += ' ' + this.lastname;
                } else {
                    name += ' "' + this.username + '"';
                }
            } else {
                name = this.username;
            }

            return name;
        }

        /**
         * Returns the level percent of the user
         * @return float Percent to the next level
         */
        this.getLevelPercent = function() {
            return (100 * (this.points - this.last))/(this.next - this.last);
        }

        /**
         * Returns the width of the level bar (1.5x the percent)
         * @return float Width of the level bar, with 150 max
         */
        this.getLevelBarWidth = function() {
            return Math.floor(1.5 * this.getLevelPercent());
        }

        /**
         * Returns the background URL
         * @return string URL of the background
         */
        this.getBackgroundUrl = function() {
            if (this.background === null || this.background == '' || this.background.substring(0, 7) == 'http://') {
                return this.background;
            } else {
                return 'assets/img/backgrounds/' + this.background;
            }
        }

        /**
         * Returns a scaled version of the background URL if possible, otherwise the full background URL
         * @return string URL of the background
         */
        this.getSmallBackgroundUrl = function() {
            if (this.background === null || this.background == '' || this.background.substring(0, 7) == 'http://') {
                return this.background;
            } else {
                return 'assets/img/backgrounds/small/' + this.background;
            }
        }

        /**
         * Populates the object with userdata
         * @param  object   data Key-value pair of user data
         */
        this.constructor = function(data)
        {
            for (var key in data) {
                if (key in this) {
                    this[key] = data[key];
                }
            }
        }
        this.constructor(data);
    }