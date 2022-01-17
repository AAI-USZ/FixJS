function(chunk){
                console.log("got chunk", chunk);
                if (typeof chunk === "undefined"){
                  console.log("wtf?");
                  return;
                }
                d += chunk;
              }