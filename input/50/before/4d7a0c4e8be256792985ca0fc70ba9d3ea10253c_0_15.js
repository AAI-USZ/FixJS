function ping () {
            tmp = that.val();

            if (tmp != val){
                val = tmp;
                that.change();
            }

            setTimeout(ping, 100);
        }