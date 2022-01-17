function onOpen (evt) {
    console.log("autoSocket opened", evt, socket);
    runInit();
}