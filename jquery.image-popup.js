(function($){
    $.fn.imagePopup = function(options){
        var settings = $.extend({
            overlayColor : "rgba(0, 0, 0, 0.5)",

            closeButtonImg : {
                src : null,
                width : "30px",
                height : "30px"
            },

            imgBorder : "5px solid white",
            imgBorderRadius : "5px",
            imgWidth : "500px",
            imgHeight : "400px",

            imgCaption : {
                exist: true,
                capFontSize: "50px",
                capColor: "white"
            }

        }, options)

        return this.each(function(){
            var $overlay, $closeButton, $enlargedImg, $caption;
            setOverlayProperties();
            setCloseButtonProperties();
            setEnlargedImgProperties();
            if(settings.imgCaption.exist){
                setCaptionProperties();
                console.log("in");
            }   
            

            $(this).find("a").on('click', function(event){
                event.preventDefault();

                var imgSource = $(this).children("img").attr("src");
                $enlargedImg.attr("src", imgSource);

                if(settings.imgCaption.exist){
                    var imgCap = $(this).children("img").attr("alt");
                    $caption.text(imgCap);
                }

                $overlay.show();

            })

            function setOverlayProperties(){
                $overlay = $('<div></div>');
                $overlay.css({
                    "background": settings.overlayColor,
                    "position" : "absolute",
                    "top" : "0",
                    "left": "0",
                    "display" : "none",
                    "text-align" : "center",
                    "width" : "100%",
                    "height" : "89%",
                    "padding-top" : "5%"
                })

                $("body").append($overlay);
            }

            function setCloseButtonProperties(){
                var prop = {
                    "color" : "white",
                    "cursor" : "pointer",
                    "font-size" : "20px",
                    "width" : settings.closeButtonImg.width,
                    "height" : settings.closeButtonImg.height,
                    "position" : "absolute",
                    "top" : "5px",
                    "right" : "5px",
                    "border" : "0px",
                    "z-index": "1"
                };

                if(settings.closeButtonImg.src){
                    $closeButton = $('<img>');
                    $closeButton.attr('src', settings.closeButtonImg.src);
                }
                else{
                    $closeButton = $('<span>x</span>')
                }

                $closeButton.css(prop);
                $overlay.append($closeButton);

                $closeButton.click(function(){
                    $overlay.hide();
                })
            }

            function setEnlargedImgProperties(){
                var prop = {
                    "background-color" : "white",
                    "border" : settings.imgBorder,
                    "border-radius" : settings.imgBorderRadius,
                    "width" : settings.imgWidth,
                    "height" : settings.imgHeight,
                    "position" : "absolute",
                    "right": "425px",
                    "z-index": "1"
                }
                $enlargedImg = $('<img>');
                
                $enlargedImg.css(prop);
                $overlay.append($enlargedImg);
            }

            function setCaptionProperties(){
                $caption = $('<p></p>');
                $caption.css({
                    "font-size": settings.imgCaption.capFontSize,
                    "color": settings.imgCaption.capColor,
                    "margin-top": "450px",
                    "z-index": "1"
                })

                $overlay.append($caption);
            }
        })
    }
}(jQuery));