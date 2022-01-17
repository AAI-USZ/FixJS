function () {
            $("#camera-move")[0].style.WebkitTransform = cssScale(step.scale) + cssTranslate(step.translate) + cssRotate(step.rotate);
        }