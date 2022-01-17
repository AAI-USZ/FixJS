function () {
        cc.Log("--------");
        cc.Log("--- PNG 128x128 ---");
        this.performTestsPNG("res/Images/test_image.png");

        cc.Log("--- PNG 512x512 ---");
        this.performTestsPNG("res/Images/texture512x512.png");

        cc.Log("EMPTY IMAGE");
        cc.Log("--- PNG 1024x1024 ---");
        this.performTestsPNG("res/Images/texture1024x1024.png");

        cc.Log("LANDSCAPE IMAGE");
        cc.Log("--- PNG 1024x1024 ---");
        this.performTestsPNG("res/Images/landscape-1024x1024.png");
    }