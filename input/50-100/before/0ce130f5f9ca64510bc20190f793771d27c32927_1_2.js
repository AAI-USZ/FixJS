function(error) {
                    if(error) {
                        console.error("Could not use service " + service + ":", error);
                    }

                    introspectedCount++;
                    if(introspectedCount == services.length) showContent(permissions);
                }