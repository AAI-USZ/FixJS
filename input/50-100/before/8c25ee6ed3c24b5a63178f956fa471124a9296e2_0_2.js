function (text) {

        var m = String(text);

        if (m.length > 0) {

            var amp = "&am" + "p;";

            var lt = "&l" + "t;";

            var gt = "&g" + "t;";

            return m.replace(/&/g, amp).replace(/</g, lt).replace(/>/g, gt);

        } else {

            return "";

        }

    }