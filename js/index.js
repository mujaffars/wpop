var dbShell;
var btnActive = true;
var readyNext = false;

(function () {

    $(".fa-ellipsis-v").click(function () {
        var modalSkeleton = genModalSkeleton();
        $(modalSkeleton).modal("show");
        setModalContent(modalSkeleton, 'ellipsis');
    })

    document.addEventListener("deviceready", setInterface(), false);

})();

function setInterface() {
    changeCss('body', 'font-size:' + fontSize + 'px;');
    changeCss('.btn-circle', 'height:' + btnchw + 'px; width:' + btnchw + 'px; line-height:' + btnchw + 'px;');
    changeCss('.btn-stat', 'height:' + btnchwStat + 'px; width:' + btnchwStat + 'px; line-height:' + btnchwStat + 'px;');
    changeCss('#divMessageParent', 'height:' + eval(screenHeight * 35 / 100) + 'px;');
    changeCss('#divMessage', 'padding:' + eval(screenHeight * 3 / 100) + 'px;');
    changeCss('#divContent', 'height:' + eval(screenHeight * 50 / 100) + 'px;');
    changeCss('.fa', 'font-size:' + eval(screenHeight * 35 / 100) + 'px;');
    changeCss('.range-show', 'font-size:' + eval(screenHeight * 7 / 100) + 'px; border-radius:' + eval(screenHeight * 6 / 100) + 'px !important;' +
            'border-width:' + eval(screenHeight * 0.25 / 100) + 'px !important;');
    changeCss('.stat-show', 'font-size:' + eval(screenHeight * 6 / 100) + 'px; border-radius:' + eval(screenHeight * 6 / 100) + 'px !important;' +
            'border-width:' + eval(screenHeight * 0.25 / 100) + 'px !important;');
    changeCss('.perSign', 'font-size:' + eval(screenHeight * 3 / 100) + 'px;');
    changeCss('.guesslabel', 'font-size:' + eval(screenHeight * 3 / 100) + 'px;');
    changeCss('.navbar-brand', 'font-size:' + eval(screenHeight * 4 / 100) + 'px !important; line-height:' + eval(screenHeight * 8 / 100) + 'px !important;');
    changeCss('.divNavbar', 'height:' + eval(screenHeight * 8 / 100) + 'px !important;');
    changeCss('#divCallRecords', 'font-size:' + recordFontSize + 'px;');
    changeCss('label.error', 'font-size:' + eval(fontSize / 1.5) + 'px;');
    changeCss('.imgLoader', 'height:' + eval(fontSize / 2) + 'px;');
    changeCss('#GridView1, #sltUsers', 'font-size:' + eval(fontSize / 2.2) + 'px;');

    changeCss('.range-slider__range', 'height:' + eval(screenHeight * 2 / 100) + 'px;');
    changeCss('input[type=range]::-webkit-slider-thumb', 'height:' + eval(screenHeight * 6 / 100) + 'px; width:' + eval(screenHeight * 6 / 100) + 'px;');
    changeCss('input[type=range]::-moz-range-thumb', 'height:' + eval(screenHeight * 6 / 100) + 'px; width:' + eval(screenHeight * 6 / 100) + 'px;');
    changeCss('input[type=range]::-ms-thumb', 'height:' + eval(screenHeight * 6 / 100) + 'px; width:' + eval(screenHeight * 6 / 100) + 'px;');
    changeCss('.thumbnail', 'border-radius:' + eval(screenHeight * 2 / 100) + 'px');

    changeCss('#messageResultSuccess', 'font-size:' + eval(screenHeight * 3 / 100) + 'px;');
    changeCss('#messageResultFail', 'font-size:' + eval(screenHeight * 3 / 100) + 'px;');
    changeCss('#touchForNext', 'font-size:' + eval(screenHeight * 3 / 100) + 'px;');
    changeCss('.fa-ellicon', 'font-size:' + eval(screenHeight * 7 / 100) + 'px;');
    changeCss('.fa-ellipsis-v', 'line-height:' + eval(screenHeight * 8 / 100) + 'px !important;');
    changeCss('.tblEllipsis .alert', 'border-radius:' + eval(screenHeight * 2 / 100) + 'px; paddiing:0;');
    changeCss('.modal-content', 'border-radius:' + eval(screenHeight * 5 / 100) + 'px; border:' + eval(screenHeight * 0.5 / 100) + 'px solid #337ab7;');

    $('body').css({
//        height: $(window).height(),
        width: windowWidth
    })

    createDb();

    $(".btn-circle").click(function () {
        if (btnActive) {
            getProfileDtl(proDtlForNextMsg);
            btnActive = false;
            setTimeout(function () {
                btnActive = true;
            }, 10)
        }
    })

    $("body").click(function () {
        if (readyNext) {
            getNextLvl(showLevel);
        }
    })
}

function showMessage(respData) {
    // If func is defined trigger it
    if (respData.func !== "") {
        window[respData.func](respData);
    } else {
        $('#divMessage').html(respData.text);
        updateMsgId(respData.id);
    }
}

function showLevel(respData) {
    $(".range-value").html(0);
    $(".range-show").removeClass('btn-success').removeClass('btn-danger').addClass('btn-info');
    $(".stat-show").addClass('hide');
    $(".range-slider__range").removeClass("hide");
    $(".range-slider__range").val(50);

    $("#messageResultSuccess").addClass('hide');
    $("#messageResultFail").addClass('hide');
    $("#touchForNext").addClass('hide');

    readyNext = false;
    // If func is defined trigger it
    $('#msgContent').html(respData.message);
    $('.stat-show').html(respData.stat);
}

function onLoad() {
    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        initApp();
    }
}

function initApp() {
    getNextLvl(showLevel);

    //initializeAppodeal();
    //registerAdEvents2();

    initAd();

    registerAdEvents();
}

$(function () {

});

function changeCss(className, classValue) {
    // we need invisible container to store additional css definitions
    var cssMainContainer = $('#css-modifier-container');
    if (cssMainContainer.length == 0) {
        var cssMainContainer = $('<div id="css-modifier-container"></div>');
        cssMainContainer.hide();
        cssMainContainer.appendTo($('head'));
    }

    // and we need one div for each class
    classContainer = cssMainContainer.find('div[data-class="' + className + '"]');
    if (classContainer.length == 0) {
        classContainer = $('<div data-class="' + className + '"></div>');
        classContainer.appendTo(cssMainContainer);
    }

    // append additional style
    classContainer.html('<style>' + className + ' {' + classValue + '}</style>');
}