function(apiprefix, meipath, dwgLib, rendEng, page, guiToggles) {
    var toggles = {
        sldr_bgImgOpacity: true,
        initBgImgOpacity: 0.60,
        initMode: "edit"
    };

    $.extend(toggles, guiToggles);

    this.rendEng = rendEng;
    this.page = page;
    this.apiprefix = apiprefix;
    this.meipath = meipath;
    this.dwgLib = dwgLib;

    // these are variables holding pointers to the drawings
    // that follow around the pointer in insert mode.
    this.punctDwg = null;
    this.divisionDwg = null;
    this.clefDwg = null;

    // cache height and width of punctum glyph for use in
    // bounding box estimation in neumify and ungroup
    // and insert ornamentation spacing.
    var punctGlyph = rendEng.getGlyph("punctum").clone();
    this.punctWidth = punctGlyph.width*rendEng.getGlobalScale();
    this.punctHeight = punctGlyph.height*rendEng.getGlobalScale();

    this.objMoving = false;

    // cache reference to this
    gui = this;

    this.setupNavBar();

    this.setupSideBar("#gui-sidebar", toggles);
    
    // set active button on startup
    $("#btn_" + toggles.initMode).trigger('click');
}