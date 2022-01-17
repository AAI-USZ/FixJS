function (msg) {
                console.log(msg);

                eval("msg =" + msg.d);

                switch (msg.type) {
                    case "question":
                        window.location = "answer.aspx?q=" + msg.data;
                        break;
                    case "comparison":
                        window.location = "compare.aspx?q=" + msg.data.join("+");
                        break;
                    case "relate":
                        window.location = "relate.aspx?q=" + msg.data.join("+");
                        break;

                }

            }