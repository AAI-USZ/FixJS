function(resp){
                console.log("\n===> imgMogrifySaveAs result: ", resp);
                if (resp.code != 200) {
                    return;
                }
                imgrs.publish(DEMO_DOMAIN, function(resp) {
                    console.log("\n===> Publish result: ", resp);
                    if (resp.code != 200) {
                        return;
                    }
                });
            }