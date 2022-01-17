function(date) {
        if (date !== '') {
            //return moment(date).format("D MMMM YYYY, hh:mm");
            return moment(date).format("YY/MM/DD ddd HH:mm");
            //return new Date(date);
        }
        else {
            return '';
        }
    }