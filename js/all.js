// 滑動載入
window.onload = function () {
    setEvent();
}

function setEvent() {
    window.onscroll = doScroll;
}

function doScroll(e) {

    var dY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        items,
        aniObj = {
            fadeIn: [
                'js-fadeIn-normal',
                'js-fadeIn-top',
                'js-fadeIn-right',
                'js-fadeIn-bottom',
                'js-fadeIn-left'
            ],
        };

    for (var types in aniObj) {
        for (var i = 0; i < aniObj[types].length; i++) {
            items = document.querySelectorAll('.' + aniObj[types][i]);
            for (var j = 0; j < items.length; j++) {
                if (dY > items[j].offsetTop - this.innerHeight / 4 * 3) {
                    if (items[j].className.indexOf('--active') < 0) {
                        items[j].className += ' ' + aniObj[types][i] + '--active';
                    }
                }
            }
        }
    }
}

// 手機版List清單
$('#List').click(function () {
    $(this).stop(true, true).toggleClass('open');
    $('.header .navi-ls').stop(true, true).toggleClass('slide');
})

// 置頂按鈕
$('.btn-top').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 800, 'swing')
})

// 置頂按鈕隱藏
$(window).scroll(function(){
    if( scrollY > 200){
        $('.btn-top').removeClass('--hide');
    }else{
        $('.btn-top').addClass('--hide');
    }
})