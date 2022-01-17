function posn_in_List(id, list) {

        for (cnt=0, lLen=list.length; cnt < lLen; cnt++) {

            if (id == list[cnt]) {

                return cnt;

            }

        }

        return -1;

    }