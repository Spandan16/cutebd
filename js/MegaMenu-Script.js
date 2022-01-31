

function getWidthBrowser() {
    var myWidth;
    if (typeof (window.innerWidth) == 'number') {
        myWidth = window.innerWidth;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        myWidth = document.documentElement.clientWidth;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        myWidth = document.body.clientWidth;
    }
    return myWidth;
};;
function isIpad() {
    if (navigator.userAgent.match(/iPad/i)) {
        return true;
    } else {
        return false;
    }
}

function detectIPadOrientation() {
    var orientation = window.orientation;
    if (orientation == 0 || orientation == 180) {
        return 0;
    } else if (orientation == 90 || orientation == -90) {
        return 90;
    }
}

function getHtmlHide1(moreInsert1, numLiItem) {
    var htmlLiHide = "";
    if ($("#cs_megamenu_more").length == 0) {
        for (var i = (moreInsert1 + 1) ; i <= numLiItem; i++) {
            $liclass = $('#menu ul li.level-1:nth-child(' + i + ')').attr('class');
            $liclass = $liclass.replace("level-1", "level-2");
            htmlLiHide += '<li class="' + $liclass + '">' + $('#menu ul li.level-1:nth-child(' + i + ')').html() + '</li>';
        }
    }
    return htmlLiHide;
}

function getHtmlHide2(moreInsert2, numLiItem) {
    var htmlLiHide = "";
    if ($("#cs_megamenu_more").length == 0) {
        for (var i = (moreInsert2 + 1) ; i <= numLiItem; i++) {
            $liclass = $('#menu ul li.level-1:nth-child(' + i + ')').attr('class');
            $liclass = $liclass.replace("level-1", "level-2");
            htmlLiHide += '<li class="' + $liclass + '">' + $('#menu ul li.level-1:nth-child(' + i + ')').html() + '</li>';
        }
    }
    return htmlLiHide;
}

function refeshMenuIpad(moreInsert1, moreInsert2, htmlLiHide1, htmlLiHide2) {
    if ($("#cs_megamenu_more").length >= 0) {
        $("ul li#cs_megamenu_more").remove();
        if (isIpad() && detectIPadOrientation() == 90) {
            $(htmlLiHide2).insertAfter('#menu ul li:nth-child(' + moreInsert2 + ').menu_item');
        }
        if (isIpad() && detectIPadOrientation() == 0) {
            $(htmlLiHide1).insertAfter('#menu ul li:nth-child(' + moreInsert1 + ').menu_item');
        }
    }
}

function refeshMenuRespon(htmlMenu) {
    if ($("#cs_megamenu_more").length >= 0) {
        $("#menu ul.ul_mega_menu li.level-1").remove();
        $("#menu ul.ul_mega_menu").html(htmlMenu);
        $("li a.title_menu_parent").hover(function () {
            $(this).next().slideDown('fast');
        }, function () {
            $(this).parent().mouseleave(function () {
                $(".options_list").slideUp('fast');
            });
        });
    }
}

function addMoreOnLoad(moreInsert1, moreInsert2, numLiItem, htmlLiHide1, htmlLiHide2) {
    if (moreInsert1 < numLiItem && moreInsert2 < moreInsert1) {
        if ((isIpad() && detectIPadOrientation() == 90) || ($(window).width() > 992 && $(window).width() < 1280)) {
            refeshMenuRespon(htmlMenu);
            if ($("#cs_megamenu_more").length == 0) {
                $('<li id="cs_megamenu_more" class="menu_item menu_last level-1 parent"><a href="#" class="more title_menu_parent">More</a><div class="options more-menu" style="width:auto"><ul class="column cms">' + htmlLiHide1 + '</ul></div>').insertAfter('#menu ul li.level-1:nth-child(' + moreInsert1 + ')');
            }
            if ($("#cs_megamenu_more").length > 0) {
                for (var j = (moreInsert1 + 2) ; j <= (numLiItem + 1) ; j++) {
                    var delItem = moreInsert1 + 2;
                    $("#menu ul li:nth-child(" + delItem + ").menu_item").remove();
                }
            }
        }
        if ((isIpad() && detectIPadOrientation() == 0) || ($(window).width() >= 768 && $(window).width() < 992)) {
            if ($("#cs_megamenu_more").length == 0) {
                $('<li id="cs_megamenu_more" class="menu_item menu_last level-1 parent"><a href="#" class="more title_menu_parent">More</a><div class="options more-menu" style="width:auto"><ul class="column cms">' + htmlLiHide2 + '</ul></div>').insertAfter('#menu ul li.level-1:nth-child(' + moreInsert2 + ')');
            }
            if ($("#cs_megamenu_more").length > 0) {
                for (var j = (moreInsert2 + 2) ; j <= (numLiItem + 1) ; j++) {
                    var delItem = moreInsert2 + 2;
                    $("#menu ul li:nth-child(" + delItem + ").menu_item").remove();
                }
            }
        }
    }
}

function addMoreResponsive(moreInsert1, moreInsert2, numLiItem, htmlLiHide1, htmlLiHide2) {
    if (moreInsert1 < numLiItem && moreInsert2 < moreInsert1) {
        $(window).resize(function () {
            if (!isIpad()) {
                if ($(window).width() >= 768 && $(window).width() <= 992) {
                    refeshMenuRespon(htmlMenu);
                    if ($("#cs_megamenu_more").length == 0) {
                        $('<li id="cs_megamenu_more" class="menu_item menu_last level-1 parent"><a href="#" class="more title_menu_parent">More</a><div class="options more-menu" style="width:auto;"><ul class="column cms">' + htmlLiHide2 + '</ul></div>').insertAfter('#menu ul li.level-1:nth-child(' + moreInsert2 + ')');
                    }
                    if ($("#cs_megamenu_more").length > 0) {
                        for (var j = (moreInsert2 + 2) ; j <= (numLiItem + 1) ; j++) {
                            var delItem = moreInsert2 + 2;
                            $("#menu ul li:nth-child(" + delItem + ").menu_item").remove();
                            $("#menu ul li:nth-child(" + j + ").menu_item").remove();
                        }
                    }
                } else if ($(window).width() >= 992 && $(window).width() < 1280) {
                    refeshMenuRespon(htmlMenu);
                    if ($("#cs_megamenu_more").length == 0) {
                        $('<li id="cs_megamenu_more" class="menu_item menu_last level-1 parent"><a href="#" class="more title_menu_parent">More</a><div class="options more-menu" style="width:auto;"><ul class="column cms">' + htmlLiHide1 + '</ul></div>').insertAfter('#menu ul li.level-1:nth-child(' + moreInsert1 + ')');
                    }
                    if ($("#cs_megamenu_more").length > 0) {
                        for (var j = (moreInsert1 + 2) ; j <= (numLiItem + 1) ; j++) {
                            var delItem = moreInsert1 + 2;
                            $("#menu ul li:nth-child(" + delItem + ").menu_item").remove();
                            $("#menu ul li:nth-child(" + j + ").menu_item").remove();
                        }
                    }
                } else if ($(window).width() > 1279) {
                    if ($("#cs_megamenu_more").length > 0) {
                        refeshMenuRespon(htmlMenu);
                    }
                }
            }
        });
    }
};;

function addsticky(sticky) {
    if ($('#layer_cart').is(":visible")) {
        $('.cs-top-header').removeClass('fixed fadeInDown animated');
    } else
        if (sticky == 1 && !isMobileIpad() && $(window).width() > 1024) {
            if ($(this).scrollTop() > 127) {
                $('.cs-top-header').addClass('fixed fadeInDown animated');
            } else {
                $('.cs-top-header').removeClass('fixed fadeInDown animated');
            }
        }
    if ($('.cs-top-header').hasClass('fixed')) {
        $('.cs-top-header').prev().css("min-height", 42);
    } else
        $('.cs-top-header').prev().removeAttr("style");
}
$(window).scroll(function () {
    addsticky(sticky);
});
$(window).resize(function () {
    if ($(window).width() < 1025) {
        $('.cs-top-header').removeClass('fixed fadeInDown animated');
    }
});
$(document).on('click', '#layer_cart .cross, #layer_cart .continue, .layer_cart_overlay', function (e) {
    if ($(window).width() > 1024) {
        if ($(window).scrollTop() > 127) {
            $('.cs-top-header').addClass('fixed fadeInDown animated');
        }
    }
    if ($('.cs-top-header').hasClass('fixed')) {
        $('.cs-top-header').prev().css("min-height", 42);
    } else
        $('.cs-top-header').prev().removeAttr("style");
});

function isMobileIpad() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
        return true;
    }
    return false;
}

function sresizeWidth() {
    if ($(window).width() < 1025)
        $('.cs-top-header').removeClass('fixed fadeInDown animated');
    $(window).resize(function () {
        if ($(window).width() < 1025)
            $('.cs-top-header').removeClass('fixed fadeInDown animated');
    });
};;