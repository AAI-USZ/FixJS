function(date) {
        if (date !== '') {
            return moment(date).format("D MMMM YYYY, hh:mm");
            //return new Date(date);
        }
        else {
            return '';
        }
    }