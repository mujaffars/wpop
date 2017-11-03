var screenHeight = parseInt($(window).height());
var screenWidth = parseInt($(window).width());

//screenWidth = parseInt($(window).height()) * 56.25 / 100;

var btnchw = screenHeight * 12.25 / 100;
var btnchwStat = screenHeight * 10.25 / 100;
var windowWidth = parseInt($(window).height()) * 56.25 / 100;

windowWidth = parseInt($(window).width());

if (screenWidth < screenHeight) {
    var fontSize = parseInt(eval(eval(screenWidth * 7) / 100));
    var recordFontSize = parseInt(eval(eval(screenWidth * 4) / 100));
} else {
    var fontSize = parseInt(eval(eval(screenHeight * 7) / 100));
    var recordFontSize = parseInt(eval(eval(screenHeight * 4) / 100));
}

// Supporting methods
function genModalSkeleton() {
    var modalSkeleton = $("<div />", {
        "class": "modal fade bs-example-modal-lg noselect",
        tabindex: "-1",
        role: "dialog",
        'aria-labelledby': "mySmallModalLabel"
    });
    var modal = $("<div />", {
        "class": "modal-dialog modal-lg"
    });
    var modalContent = $("<div />", {
        "class": "modal-content"
    });
    var modalBody = $("<div />", {
        "id": "modalShellBody",
        "class": "modal-body"
    }).html('Loading...');
    modalContent.append(modalBody);
    modal.append(modalContent);
    modalSkeleton.append(modal);

    return modalSkeleton;
}

function setModalContent(modalSkeleton, forwhat) {
    switch (forwhat) {
        case 'ellipsis':
            $.ajax({
                url: 'ellipsis.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                    $(modalSkeleton).find('.badgeName').html(forwhat);
                    
                    getGFCount(1, modalSkeleton);
                    getGFCount(0, modalSkeleton);
                }
            });
            break;
    }
}