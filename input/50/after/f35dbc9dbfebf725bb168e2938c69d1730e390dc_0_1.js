function () {
            $("#camera-move")[0].style.WebkitTransform = cssScale(step.scale) + cssRotate(step.rotate) + cssTranslate(step.translate);
        }