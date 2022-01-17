function() {
            app.canvas.render(app.currentScene, app.currentCamera);
            downloadDataURI({
                filename: "screenshot.jpeg", 
                data: app.canvas.domElement.toDataURL("image/jpeg")
            });
        //    window.open(app.canvas.domElement.toDataURL("image/jpeg"));
        }