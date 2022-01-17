function init()
{
    var background = new Background();
    
	// base summaries are for blocks - how they appear; what properties they have.
	// name, topColor, frontLeftColor, frontRightColor, canStandOn, weight
	// Weight of blocks is per unit of height.
    var baseSummary = {
        s:["Sand", "#d1df5d", "#c1cf4d", "#b1bf3d", true, 50],
        m:["Mud", "#808000", "#707000", "#606000", true, 50],
        e:["Earth", "#79621c", "#695218", "#594210", true, 50],
        f:["Field", "#00ff00", "#00ee00", "#00dd00", true, 50],
        g:["Grass", "#33c52e", "#28b520", "#20a518", true, 40],
        h:["Hedge", "#108010", "#0c700c", "#096009", true, 40],
        a:["Aqua", "#00eeee", "#00dddd", "#00cccc", false, 30],
        w:["Water", "#4b60e5", "#3b50d5", "#3240c5", false, 30],
        o:["Ocean", "#0000dd", "#0000cc", "#0000aa", false, 30],
        c:["Clay", "#a0522d", "#954623", "#80391b", true, 60],
        r:["Rock", "#696969", "#595959", "#494949", true, 100],
        d:["Stone", "#506070", "#405060", "#304050", true, 100]
        };
    
	// itemTemplates are params for all the non-block items in the game.
    // itemName, itemCode, ht, wt, lightStrength, lightRadius, povRange, blockView, canStandOn, isPushable, isTakeable, isVisible

    var itemTemplates = {
        x:{itemName:"boulder01", fullname:"Large Boulder", itemCode:"x", ht:20, wt:1000, isPushable:true, blockView:true},
        X:{itemName:"tree01", fullname:"Palm Tree", itemCode:"X", ht:30, wt:400},
        ".":{itemName:"pebbles01", fullname:"Pebbles", itemCode:".", canStandOn:true},
        z:{itemName:"brazier01", fullname:"Brazier", itemCode:"z", ht:10, wt:20, lightStrength:1, lightRadius:3},
        i:{itemName:"coin01", fullname:"Coin", itemCode:"i", wt:0.1, canStandOn:true, isTakeable:true, isSaveable:true},
        k:{itemName:"key01", fullname:"Key", itemCode:"k", wt:0.1, canStandOn:true, isTakeable:true, isSaveable:true},
        I:{itemName:"stick01", fullname:"Stick", itemCode:"I", wt:0.1, canStandOn:true, isTakeable:true, isSaveable:true, canWeild:true},
        j:{itemName:"ghost01", fullname:"Ghost", itemCode:"j", ht:10, povRange:4},
        G:{itemName:"golem01", fullname:"Golem", itemCode:"G", ht:20, wt:500, povRange:4, climbHeight:0},
        L:{itemName:"goblin01", fullname:"Goblin", itemCode:"L", ht:10, wt:30, povRange:4, climbHeight:5, moveTowards:["b"], scaredOf:["b"]},
        Z:{itemName:"zombie01", fullname:"Zombie", itemCode:"Z", ht:20, wt:100, povRange:4, climbHeight:0, moveTowards:["b"]},
        Y:{itemName:"zombie02", fullname:"Ghoul", itemCode:"Y", ht:20, wt:100, povRange:4, climbHeight:0, moveTowards:["b"]},
        T:{itemName:"teleport01", fullname:"Teleport", itemCode:"T", canStandOn:true, doesTeleport:true},
        S:{itemName:"start01", fullname:"Start Square", itemCode:"S", canStandOn:true, isInvisible:true},
        b:{itemName:"avatar02", fullname:"Avatar", itemCode:"b", ht:20, wt:100, lightStrength:1, lightRadius:4, povRange:9, climbHeight:10, dropHeight:20, noEdit:true},
        t:{itemName:"tag01", fullname:"Item Tag", itemCode:"t", noEdit:true},
        B:{itemName:"barrel01", fullname:"Barrel", itemCode:"B", ht:20, wt:1000, isPushable:true, blockView:true, canStandOn:true}
       };
    
    var itemFactory = new PerspectiveItemFactory(0, 25, 15, itemTemplates, baseSummary);
   
    var coverLayer = document.getElementById("persCoverLayer");
    var persModel = new PerspectiveGridModel(itemFactory);

	var playArea = wrapElementById("persPlayArea");
    var persView = new PerspectiveGridView(persModel, itemFactory, 16, 26, 0, 0, 25, 15);
	playArea.appendChild(persView);
   
    gController = new GameController(background, itemFactory, persModel, persView);

    updateLayout();
    gWindow.onresize = updateLayout;

	gController.start();
}