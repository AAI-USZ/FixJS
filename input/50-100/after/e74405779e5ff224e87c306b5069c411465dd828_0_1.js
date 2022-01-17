function getImage(catName, makeOtherList) {
        var imageLi = document.createElement("li");
        makeOtherList.appendChild(imageLi);
        var newImage = document.createElement("img");
        var setSource = newImage.setAttribute("src", "Images/" + catName + ".png");
        imageLi.appendChild(newImage);

    }