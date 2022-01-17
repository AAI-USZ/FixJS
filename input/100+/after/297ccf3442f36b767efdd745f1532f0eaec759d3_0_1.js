function () {

        var ejs = new EJS({ text : this.template });

        var l10n = { // TODO
                "shop": "shop",
                "houses": "houses",
                "farming": "farming",
                "farms": "farms",
                "decoration": "decoration",
                "specials": "specials"
            };

        nav = document.querySelector('nav');
        hud_goals = document.getElementById('hud-goals');
        var defaultDepartmentId;

        var shopItems = {}, i;

        var setItemProperties = function (itemKey) {

            var item = this.game.entitiesDefinition[itemKey] || 0;

            var result;

            switch (item["class"]) {

                case "house":
                case "uhouse":
                    result = {
                        title: item.name,
                        imgSrc: utils.urlFor(Shop.IMAGES_BASE_URL + item.icon),
                        name: itemKey,
                        "class": item["class"],
                        goldCost: item.goldCost,
                        population: item.population || 1,
                        contractRequiredFood: item.contract.requiredFood,
                        contractRequiredTime: utils.roundTime(item.contract.requiredTime), // milliseconds -> minutes
                        contractProvidedGold: item.contract.providedGold
                    };
                    break;

                case "farm":
                    result = {
                        title: item.name,
                        imgSrc: utils.urlFor(Shop.IMAGES_BASE_URL + item.icon),
                        name: itemKey,
                        "class": item["class"],
                        goldCost: item.goldCost
                    };
                    break;

                case "seeds":
                    result = {
                        title: item.name,
                        imgSrc: utils.urlFor(Shop.IMAGES_BASE_URL + item.icon),
                        name: itemKey,
                        "class":item["class"],
                        goldCost: item.goldCost,
                        contractRequiredTime: utils.roundTime(item.contract.requiredTime), // milliseconds -> minutes
                        contractRequiredGold: item.contract.requiredGold,
                        contractProvidedFood: item.contract.providedFood
                    };
                    break;

                case "decoration":
                    result = {
                        title: item.name,
                        imgSrc: utils.urlFor(Shop.IMAGES_BASE_URL + item.icon),
                        name: itemKey,
                        "class": item["class"],
                        goldCost: item.goldCost,
                        influenceArea: item.influenceArea,
                        goldBoost: item.goldBoost,
                        foodBoost: item.foodBoost
                    };
                    break;

            }

            result.unlockCondition = item.unlockCondition;
            result.unlockValue = item.unlockValue;

            return result;

        };

        this.shopItems.forEach(function (item, ddi) {
                if (ddi++ === Shop.DEFAULT_DEPARTMENT_INDEX) {
                    defaultDepartmentId = item.name;
                }
                shopItems[item.name] = item.items.map(setItemProperties, this);
                shopItems[item.name].sort(this.sortShopItems);

        }, this);

        var shopWrapper = document.createElement("div");
        shopWrapper.id = "shop";
        shopWrapper.innerHTML = ejs.render({
            l10n: l10n,
            shopItems: shopItems
        });

        utils.addTouchHandler(shopWrapper.querySelector("div.head button.cancel"), function () {
            if(utils.can('shop/close')) {
                this.hide(true);
            }
        }, this);

        this._departmentsListElement = shopWrapper.querySelector("ul.departments_list");
        utils.addTouchHandler(this._departmentsListElement, this._departmentsListTouchHandler, this);

        this._departmentsElement = shopWrapper.querySelector("div.departments");
        utils.addTouchHandler(this._departmentsElement, this._departmentsTouchHandler, this);


        var departmentsElements = shopWrapper.querySelectorAll("ul.department");


        if(wooga.castle.capabilities.iPad) {
            Array.prototype.forEach.call(departmentsElements, utils.enableScrollabilityX, true);
        } else {
            Array.prototype.forEach.call(departmentsElements, utils.enableScrollability);
        }

        var upgradeCastleButton = shopWrapper.querySelector("#upgrade-castle .button");
        utils.addTouchHandler(upgradeCastleButton, function () {
            var castleView = this.game.castle.entityView;

            this.view.scrollTo(-castleView.x, -castleView.y);
            this.view.filterVisibleViews();

            this.hide();
            if (wooga.castle.playerData.upgradingCastle) {
                wooga.castle.CastleCompleteScreen.instance().show();
                this.deactivate();
                this.manager.setMode(wooga.castle.GameModesManager.Mode.BASIC);
            }
            else {
                this.view.publish("castleUpgradeMode/set", {
                    target: castleView
                });
            }


        }, this);


        this.rootNode.appendChild(shopWrapper);

        this.element = shopWrapper;


        this.activateDepartment(Shop.DEPARTMENT_ID_PATTERN.replace("{id}", defaultDepartmentId), true);

        utils.subscribe('game:player/update', function () {
            this.invalidate();
        }, this);

    }