function (msg) {
                console.log(msg);
                eval("msg =" + msg.d);

                switch (msg.type) {
                    case "question":
                        window.location = "answer.aspx?q=" + msg.data;
                        break;
                    case "comparison":
                        window.location = "compare.aspx" + __constructURLPart(msg.data);
                        break;
                    case "relate":
                        window.location = "relate.aspx" + __constructURLPart(msg.data);
                        break;
                }
            }