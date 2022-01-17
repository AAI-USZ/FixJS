function () {
        cc.log("--------");
        cc.log("--- PNG 128x128 ---");
        this.performTestsPNG("res/Images/test_image.png");

        cc.log("--- PNG 512x512 ---");
        this.performTestsPNG("res/Images/texture512x512.png");

        cc.log("EMPTY IMAGE");
        cc.log("--- PNG 1024x1024 ---");
        this.performTestsPNG("res/Images/texture1024x1024.png");

        cc.log("LANDSCAPE IMAGE");
        cc.log("--- PNG 1024x1024 ---");
        this.performTestsPNG("res/Images/landscape-1024x1024.png");
    }