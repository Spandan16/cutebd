/*
** nopCommerce custom js functions
*/



function OpenWindow(query, w, h, scroll) {
    var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 2;

    winprops = 'resizable=0, height=' + h + ',width=' + w + ',top=' + t + ',left=' + l + 'w';
    if (scroll) winprops += ',scrollbars=1';
    var f = window.open(query, "_blank", winprops);
}

function setLocation(url) {
    window.location.href = url;
}

function displayAjaxLoading(display) {
    if (display) {
        $('.ajax-loading-block-window').show();
    }
    else {
        $('.ajax-loading-block-window').hide('slow');
    }
}

function displayPopupNotification(message, messagetype, modal) {
    //types: success, error
    var container;
    if (messagetype == 'success') {
        //success
        container = $('#dialog-notifications-success');
    }
    else if (messagetype == 'error') {
        //error
        container = $('#dialog-notifications-error');
    }
    else {
        //other
        container = $('#dialog-notifications-success');
    }

    //we do not encode displayed message
    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = '<p>' + message + '</p>';
    } else {
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p>' + message[i] + '</p>';
        }
    }

    container.html(htmlcode);

    var isModal = (modal ? true : false);
    container.dialog({modal:isModal});
}


var barNotificationTimeout;
function displayBarNotification(message, messagetype, timeout) {
    clearTimeout(barNotificationTimeout);

    //types: success, error
    var cssclass = 'success';
    if (messagetype == 'success') {
        cssclass = 'success';
    }
    else if (messagetype == 'error') {
        cssclass = 'error';
    }
    //remove previous CSS classes and notifications
    $('#bar-notification')
        .removeClass('success')
        .removeClass('error');
    $('#bar-notification .content').remove();

    //we do not encode displayed message

    //add new notifications
    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = '<p class="content">' + message + '</p>';
    } else {
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p class="content">' + message[i] + '</p>';
        }
    }
    $('#bar-notification').append(htmlcode)
        .addClass(cssclass)
        .fadeIn('slow')
        .mouseenter(function ()
            {
                clearTimeout(barNotificationTimeout);
            });

    $('#bar-notification .close').unbind('click').click(function () {
        $('#bar-notification').fadeOut('slow');
    });

    //timeout (if set)
    if (timeout > 0) {
        barNotificationTimeout = setTimeout(function () {
            $('#bar-notification').fadeOut('slow');
        }, timeout);
    }
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}
$(document).ready(function ()
{
    $(".product-grid .picture").mouseenter(function ()
    {
        var bxWrapper = $(this).closest(".product-grid");
        var hppg = $(this).closest(".product-grid");

        var bxWrapperLeft = bxWrapper.offset().left;
        var pItemLeft = $(this).closest(".product-item").offset().left;
        var pItemPosition = pItemLeft - bxWrapperLeft;
        var pItemWidth = $(this).closest(".product-item").outerWidth();
        var pDetailsWidth = $(this).closest(".product-item").find(".details").outerWidth();
        var leftDetails = 0;

        //console.log(pItemPosition + "-" + pItemWidth + "-" + pDetailsWidth + " ---" + hppg.outerWidth())
        if (pItemPosition + pItemWidth + pDetailsWidth > hppg.outerWidth())
        {
            leftDetails = -1 * (pDetailsWidth);
        }
        else
        {
            leftDetails = pItemWidth;
        }
        $(this).css({ "z-index": 110 });
        //console.log(leftDetails);
        if (leftDetails > 0)
        {
            //$(this).find(".details").css({ "left": leftDetails, "padding": "0px 10px 10px 20px", "background": "url(/Content/triangle-left.png) 8px 30px no-repeat" }).fadeIn();

            $(this).closest(".product-item").find(".details").css({ "width": pItemWidth, "border-left": "none" }).fadeIn(100).animate({ "left": leftDetails }, 300).css({ "z-index": 105 });
        } else
        {
            //$(this).find(".details").css({ "left": leftDetails, "padding": "0px 20px 10px 10px", "background": "url(/Content/arrow-right.png) 250px 30px no-repeat" }).fadeIn();
            $(this).closest(".product-item").find(".details").css({ "width": pItemWidth, "border-right": "none" }).fadeIn(100).animate({ "left": leftDetails - 1 }, 300).css({ "z-index": 105 });

        }
    }).mouseleave(function ()
    {
        $(this).closest(".product-item").find(".details").fadeOut(100).animate({ "left": 0 }, 300).css({ "z-index": 1 });
        $(this).css({ "z-index": 101 });

    });

});
