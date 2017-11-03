var rangeSlider = function () {
    var slider = $('.range-slider'),
            range = $('.range-slider__range'),
            value = $('.range-slider__value');

    slider.each(function () {

        value.each(function () {
            console.log('aaaaaaaa ');
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(".range-value").html(this.value);
            $("#inpUserGuess").val(this.value);
        });

        range.on('touchend', function () {
            $(".btn-stat").removeClass('hide');
            $(".stat-show").html(currentLevel.stat);

            var userGuess = parseInt($("#inpUserGuess").val());

            var minGuess = eval(currentLevel.stat - 10);
            var maxGuess = eval(currentLevel.stat + 10);

            $(".range-slider__range").addClass("hide");

            $(".range-show").removeClass('btn-success').removeClass('btn-danger');
            if (userGuess >= minGuess && userGuess <= maxGuess) {
                
                updateGuess(currentLevel.id, 1);
                
                $(".range-show").removeClass('btn-info').addClass('btn-success');
                $("#messageResultSuccess").removeClass('hide');
            } else {
                
                updateGuess(currentLevel.id, 0);
                
                $(".range-show").removeClass('btn-info').addClass('btn-danger');
                $("#messageResultFail").removeClass('hide');
            }
            $("#touchForNext").removeClass('hide');
            markLvlComplete();

            var random = Math.floor(Math.random() * 3) + 1;
            if (random === 2) {
                prepareInterstitial();
            }
        });

    });
};

rangeSlider();