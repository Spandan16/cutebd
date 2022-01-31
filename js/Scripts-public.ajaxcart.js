/*
** nopCommerce ajax cart implementation
*/


var AjaxCart = {
    loadWaiting: false,
    usepopupnotifications: false,
    topcartselector: '',
    topwishlistselector: '',
    flyoutcartselector: '',

    init: function (usepopupnotifications, topcartselector, topwishlistselector, flyoutcartselector) {
        this.loadWaiting = false;
        this.usepopupnotifications = usepopupnotifications;
        this.topcartselector = topcartselector;
        this.topwishlistselector = topwishlistselector;
        this.flyoutcartselector = flyoutcartselector;
    },

    setLoadWaiting: function (display) {
        displayAjaxLoading(display);
        this.loadWaiting = display;
    },

    //add a product to the cart/wishlist from the catalog pages
    addproducttocart_catalog: function (urladd) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        $.ajax({
            cache: false,
            url: urladd,
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //add a product to the cart/wishlist from the product details page
    addproducttocart_details: function (urladd, formselector) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);
        var obj = $(formselector).serialize();

        // console.log(obj);
        $.ajax({
            cache: false,
            url: urladd,
            data: $(formselector).serialize(),
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },
    
    success_process: function (response) {
        var window = $("#cart-summery");
        window.html(response.updateflyoutcartsectionhtml);
        $("#flyout-cart").replaceWith(response.updateflyoutcartsectionhtml);
        //$("#flyout-cart").show();
        //if (!window.data("kendoWindow")) {
        //    window.kendoWindow({
        //        width: "600px",
        //        title: "Cart Summery",
        //        actions: [
        //            "Pin",
        //            "Minimize",
        //            "Maximize",
        //            "Close"
        //        ]
        //    });
        //}
       
        
        $.magnificPopup.open({
            items: {
                src: '#cart-summery'
            },
            closeBtnInside:true

            // You may add options here, they're exactly the same as for $.fn.magnificPopup call
            // Note that some settings that rely on click event (like disableOn or midClick) will not work here
        });
       
        //$('#flyout-cart').magnificPopup('open');
        if (response.updatetopcartsectionhtml) {
            $(".cart-qty").html(response.updatetopcartsectionhtml);
            if (response.updatetopcartsectionhtml != "(0)") {
                $('#topcartlink').addClass('FillItem');
                $('#topcartlink').removeClass('EmptyItem');
            }
        }
        if (response.updatetopwishlistsectionhtml) {
            $(AjaxCart.topwishlistselector).html(response.updatetopwishlistsectionhtml);
        }
        if (response.updateflyoutcartsectionhtml) {
            $(AjaxCart.flyoutcartselector).replaceWith(response.updateflyoutcartsectionhtml);
        }
      
        if (response.message) {
            //display notification
            if (response.success == true) {
                
                //success
                if (AjaxCart.usepopupnotifications == true) {
                    displayPopupNotification(response.message, 'success', true);
                }
                else {
                    //specify timeout for success messages
                    displayBarNotification(response.message, 'success', 3500);
                }
            }
            else {
                //error
                if (AjaxCart.usepopupnotifications == true) {
                    displayPopupNotification(response.message, 'error', true);
                }
                else {
                    //no timeout for errors
                    displayBarNotification(response.message, 'error', 0);
                }
                
            }
            return false;
        }
        if (response.redirect) {
            location.href = response.redirect;
            return true;
        }
        return false;
    },

    resetLoadWaiting: function () {
        AjaxCart.setLoadWaiting(false);
    },

    ajaxFailure: function () {
        alert('Failed to add the product to the cart. Please refresh the page and try one more time.');
    }
};




function removeItemAjax(itemId) {

    var r = confirm("Are you sure, you want to delete the item from your cart?");

    if (r == true) {
        displayAjaxLoading(true);
        $.ajax({
            cache: false,
            url: 'cartRemoveAjax/' + itemId,
            type: 'post',
            success: function (response) {
                var window = $("#cart-summery");
                window.html(response.updateflyoutcartsectionhtml);
                $("#flyout-cart").replaceWith(response.updateflyoutcartsectionhtml);

                if (response.updatetopcartsectionhtml) {
                    $(".cart-qty").html(response.updatetopcartsectionhtml);
                    if (response.updatetopcartsectionhtml == "(0)") {
                        $('#topcartlink').addClass('EmptyItem');
                        $('#topcartlink').removeClass('FillItem');

                    }
                }
                if (response.url == "/onepagecheckout") {
                    //$(location).attr('href', '/');
                    //window.location.href = "/";
                    document.location.href = "/cart"
                }
            },
            complete: function (response) {
                displayAjaxLoading(false);
            },
            error: function (response) {

            }
        });
    }
    
}
