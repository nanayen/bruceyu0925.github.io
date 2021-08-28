$('.window').addClass('--lock');

$(window).load(function () {
    $(this).delay(2300).queue(function () {
        $("#Loading").addClass('--hide');
        $('.banr-home-text').addClass('--show');
        $('.banr-pag-title').addClass('--show');
        $('.window').removeClass('--lock');
    })
})

// 輪播功能
setInterval(function () {
    var getpic_src = $('.js-fadeIn-right--active').siblings().find('.switcher-img-cover').attr('src');
    var getpic_num = "";
    try {
        getpic_num = getpic_src.substr(-5, 1);
    } catch { };

    if (getpic_num > $('.switcher-img-li').length - 1) {
        getpic_num = 0;
    };

    var Img = $('.switcher-img-run .switcher-img-li');
    var Btn = $('.switcher-btn-run .switcher-btn-li');

    Img.removeClass('switcher-img-cover');
    Img.eq(getpic_num).addClass('switcher-img-cover');

    $('.switcher-btn-run .switcher-btn-click').removeClass('switcher-btn-click');
    Btn.eq(getpic_num).addClass('switcher-btn-click');
}, 3000)

// 點選暫停播放功能
$('.switcher-status').click(function () {
    $('.switcher-img-ls').toggleClass('switcher-img-run');
    $('.switcher-btn-ls').toggleClass('switcher-btn-run');
    $('.switcher-play').toggleClass('--show');
    $('.switcher-pause').toggleClass('--show');
})

// 切換圖片功能
$('.switcher-btn-li').mousedown(function () {

    $('.switcher-btn-click').stop(true, true).removeClass('switcher-btn-click');
    $(this).stop(true, true).addClass('switcher-btn-click');

    var pic_num = $('.switcher-btn-li').index(this) + 1;

    $('.switcher-img-li').removeClass('switcher-img-cover');
    $('.switcher-img-li').eq(pic_num - 1).addClass('switcher-img-cover');
})

// Blog圖片放大，鎖左右切換函數
function Bigpic_Btn() {
    var num_total = parseInt($('.blog-li').length);
    var num_this = parseInt($('.blog-bigimg').attr('src').substr(-7, 3));
    if (num_this == num_total) {
        $('.prev').addClass('--lock');
        $('.next').removeClass('--lock');
    } else if (num_this == 1) {
        $('.next').addClass('--lock');
        $('.prev').removeClass('--lock');
    } else {
        $('.blog-btn').removeClass('--lock');
    }
}

// Blog圖片放大，按鈕功能
$('.prev').click(function () {
    var num_Chg = $('.blog-bigimg').attr('src').substr(-7, 3);
    num_Chg = (parseInt(num_Chg) + 1) + '';
    while (num_Chg.length < 3) {
        num_Chg = "0" + num_Chg;
    }
    var num_Src = '/image/poster/poster_' + num_Chg + '.jpg';
    $('.blog-bigimg').attr('src', num_Src);
    Bigpic_Btn();
})

$('.next').click(function () {
    var num_Chg = $('.blog-bigimg').attr('src').substr(-7, 3);
    num_Chg = (parseInt(num_Chg) - 1) + '';
    while (num_Chg.length < 3) {
        num_Chg = "0" + num_Chg;
    }
    var num_Src = '/image/poster/poster_' + num_Chg + '.jpg';
    $('.blog-bigimg').attr('src', num_Src);
    Bigpic_Btn();
})

$('.blog-close').click(function () {
    $('.blog-big').removeClass('--show');
    $('.window').removeClass('--lock');
})

// PS前後比較功能
$('.toggle-border').mousedown(function () {
    $(this).find('.toggle-btn').stop(true, true).toggleClass('toggle-move');
    $(this).siblings().find('.dis-before').stop(true, true).toggleClass('--show');
})

// Blog圖片放大、動態加載
var dataUrl = "/json/poster.json"
$.ajax({
    url: dataUrl,
    method: 'GET',
    dataType: 'json',
    data: '',
    async: true,

    success: function (res) {

        var Total = res["poster"].length - 1;

        $(window).scroll(function () {
            var BodyH = document.body.scrollHeight;
            var ScreH = window.screen.availHeight;

            if (scrollY >= BodyH - ScreH - 200) {

                for (let i = 6; i > 0; i--) {

                    if (Total >= 0) {

                        var Name = res["poster"][Total]["posterName"];
                        var Url = res["poster"][Total]["posterUrl"];
                        var Style = res["poster"][Total]["posterStyle"];


                        $('.blog-ls').append(
                            '<li class="blog-li js-fadeIn-bottom">' +
                            '<div class="blog-cover">' +
                            '<span class="blog-desc">' + Name + '</span>' +
                            '</div>' +
                            '<div class="blog-img" style="' + Style + '">' +
                            '<img src="' + Url + '" alt="' + Name + '" class="img-resp">' +
                            '</div>' +
                            '</li>'
                        );

                        Total = Total - 1
                    } else {
                        break;
                    }
                }


                $('.blog-li').click(function () {
                    var getSrc = $(this).find('.img-resp').attr('src');
                    $('.blog-bigimg').attr('src', getSrc);
                    $('.window').addClass('--lock');
                    $('.blog-big').addClass('--show');
                    Bigpic_Btn();
                })
            }
        })
    },
    error: err => {
        console.log("poster.json加載失敗")
    },
});