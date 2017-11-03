var jsLoaded = true;
var admobid = {};
if (/(android)/i.test(navigator.userAgent)) {
    admobid = {
        banner: 'ca-app-pub-3868593263837372/6678102659',
        interstitial: 'ca-app-pub-3868593263837372/8290212008'
    };
} else {
    admobid = {
        banner: 'ca-app-pub-3868593263837372/6678102659',
        interstitial: 'ca-app-pub-3868593263837372/8290212008'
    };
}

function onLoad() {
    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        initApp();
    }
}

function initAd() {
    AdMob.setOptions({
        publisherId: admobid.banner,
        interstitialAdId: admobid.interstitial,
        bannerAtTop: false, // set to true, to put banner at top
        overlap: true, // set to true, to allow banner overlap webview
        offsetTopBar: false, // set to true to avoid ios7 status bar overlap
        isTesting: false, // receiving test ad
        autoShow: false  // auto show interstitial ad when loaded
    });

    AdMob.createBannerView({
        isTesting: false,
        autoShow: true,
    });

    AdMob.prepareInterstitial({
        interstitialAdId: admobid.interstitial,
        autoShow: false,
    })
}
// optional, in case respond to events or handle error
function registerAdEvents() {

    document.addEventListener('backbutton', function (data) {
        var r = confirm('Do you really want to exit?');
        if (r === true)
        {
            (navigator.app && navigator.app.exitApp()) || (device && device.exitApp());
        }
    });

    document.addEventListener('onDismissInterstitialAd', function (event) {
        AdMob.prepareInterstitial({
            interstitialAdId: admobid.interstitial,
            autoShow: false,
        })
    })

}

function prepareInterstitial() {
    AdMob.prepareInterstitial({interstitialAdId: admobid.interstitial, autoShow: true});
}

function initializeAppodeal() {
    var appKey = "";

    Appodeal.confirm(Appodeal.SKIPPABLE_VIDEO);
    Appodeal.setLogging(true);

//    setUserSettings();

    Appodeal.initialize(appKey, Appodeal.SKIPPABLE_VIDEO | Appodeal.REWARDED_VIDEO);

//    Appodeal.enableInterstitialCallbacks(true);
    Appodeal.enableSkippableVideoCallbacks(true);
//    Appodeal.enableBannerCallbacks(true);
    Appodeal.enableRewardedVideoCallbacks(true);

//    Appodeal.setCustomIntegerRule("rule_name", 1);
//    Appodeal.setCustomDoubleRule("rule_name", 1.0);
//    Appodeal.setCustomBooleanRule("rule_name", true);
//    Appodeal.setCustomStringRule("rule_name", "rule_value");
}

function showSkippableVideo() {
    Appodeal.isLoaded(Appodeal.SKIPPABLE_VIDEO, function (result) {
        if (result) {
            Appodeal.show(Appodeal.SKIPPABLE_VIDEO);
        }
    });
}

function showRewardedVideo() {
    Appodeal.isLoaded(Appodeal.REWARDED_VIDEO, function (result) {
        if (result) {
            Appodeal.show(Appodeal.REWARDED_VIDEO);
        } else {
            $('#divAdNotAvailable').removeClass('hide');
            $('#divRevealAns').addClass('hide');
            setTimeout(function () {
                $('.bs-example-modal-sm2').modal('hide');
            }, 3000);
        }
    });
}

function showAdBreak() {
    Appodeal.isLoaded(Appodeal.REWARDED_VIDEO, function (result) {
        if (result) {
            Appodeal.show(Appodeal.REWARDED_VIDEO);
        } else {
            Appodeal.isLoaded(Appodeal.SKIPPABLE_VIDEO, function (result) {
                if (result) {
                    Appodeal.show(Appodeal.SKIPPABLE_VIDEO);
                }
            });
        }
    });
}

function registerAdEvents2() {
    document.addEventListener('backbutton', function (data) {
        $("#header").find("#back").trigger('click');
    });

    document.addEventListener('onInterstitialShown', function () {
        //alert('Cordova onInterstitialShown');
    });
    document.addEventListener('onInterstitialLoaded', function () {
        // alert('Cordova onInterstitialLoaded');
    });
    document.addEventListener('onInterstitialFailedToLoad', function () {
        //alert('Cordova onInterstitialFailedToLoad');
    });
    document.addEventListener('onInterstitialClosed', function () {
        // alert('Cordova onInterstitialClosed');
    });
    document.addEventListener('onInterstitialClicked', function () {
        //alert('Cordova onInterstitialClicked');
    });

    document.addEventListener('onSkippableVideoClosed', function () {
        //alert('Cordova onSkippableVideoClosed');
    });
    document.addEventListener('onSkippableVideoFailedToLoad', function () {
        //alert('Cordova onSkippableVideoFailedToLoad');
    });
    document.addEventListener('onSkippableVideoFinished', function () {
        //alert('Cordova onSkippableVideoFinished');
    });
    document.addEventListener('onSkippableVideoLoaded', function () {
        //alert('Cordova onSkippableVideoLoaded');
    });
    document.addEventListener('onSkippableVideoShown', function () {
//                alert('Cordova onSkippableVideoShown');
    });

    document.addEventListener('onRewardedVideoClosed', function () {
//                alert('Cordova onRewardedVideoClosed');
    });
    document.addEventListener('onRewardedVideoFailedToLoad', function () {
//                alert('Cordova onRewardedVideoFailedToLoad');
    });
    document.addEventListener('onRewardedVideoFinished', function (data) {
        $('.bs-example-modal-sm2').modal('hide');
        if (watchingFor === 'revealAns') {
            var modalSkeleton = genModalSkeleton();
            $(modalSkeleton).modal("show");
            setModalContent(modalSkeleton, 'revealAns');
        }
    });
    document.addEventListener('onRewardedVideoLoaded', function () {
        //alert('Cordova onRewardedVideoLoaded');
    });
    document.addEventListener('onRewardedVideoShown', function () {
//                alert('Cordova onRewardedVideoShown');
    });

}