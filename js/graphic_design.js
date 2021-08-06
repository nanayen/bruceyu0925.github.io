// 輪播功能
setInterval(function () {
    var getpic_src = $('.switcher-img-cover').attr('src');
    var getpic_num = getpic_src.substr(30, 1)
    if (getpic_num > $('.switcher-img-li').length - 1) {
        getpic_num = 0;
    }
    var setpic_num = getpic_num + 1
    var setpic_src = 'image/vis_ecoffee/vis_ecoffee_' + setpic_num + '.jpg';

    var Img = $('.switcher-img-run').find('.switcher-img-li');
    var Btn = $('.switcher-btn-run').find('.switcher-btn-li');

    Img.removeClass('switcher-img-cover');
    Img.eq(getpic_num).addClass('switcher-img-cover');

    $('.switcher-btn-run').find('.switcher-btn-click').removeClass('switcher-btn-click');
    Btn.eq(getpic_num).addClass('switcher-btn-click');
}, 3000)

$('.switcher').mousedown(function () {
    $('.switcher-img-ls').removeClass('switcher-img-run');
    $('.switcher-btn-ls').removeClass('switcher-btn-run');
})

$('.switcher').mouseup(function () {
    $('.switcher-img-ls').addClass('switcher-img-run');
    $('.switcher-btn-ls').addClass('switcher-btn-run');
})

$('.switcher-btn-li').mousedown(function () {

    $('.switcher-btn-click').stop(true, true).removeClass('switcher-btn-click');
    $(this).stop(true, true).addClass('switcher-btn-click');

    var pic_num = $('.switcher-btn-li').index(this) + 1;
    var pic_src = 'image/vis_ecoffee/vis_ecoffee_' + pic_num + '.jpg';

    $('.switcher-img-li').removeClass('switcher-img-cover');
    $('.switcher-img-li').eq(pic_num - 1).addClass('switcher-img-cover');

})

// Blog圖片放大，鎖左右切換函數
function Bigpic_Btn(){
    var num_total = $('.blog-li').length;
    var num_this = parseInt($('.blog-bigimg').attr('src').substr(-7,3));
    if(num_this == num_total){
        $('.prev').addClass('--lock');
    }else if (num_this == 1){
        $('.next').addClass('--lock');
    }else{
        $('.blog-btn').removeClass('--lock');
    }
}

// Blog圖片放大
$('.blog-li').click(function () {
    $('.blog-big').stop(true, true).fadeIn(300);

    var getSrc = $(this).find('.img-resp').attr('src');
    $('.blog-bigimg').attr('src', getSrc);
    Bigpic_Btn();

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
})

$('.prev').click(function(){
    var num_Chg = $('.blog-bigimg').attr('src').substr(-7,3);
    num_Chg = (parseInt(num_Chg)+1)+'';
    while(num_Chg.length < 3){
        num_Chg = "0" + num_Chg;
    }
    var num_Src = '/image/poster/poster_' + num_Chg + '.jpg';
    $('.blog-bigimg').attr('src', num_Src);
    Bigpic_Btn();
})

$('.next').click(function(){
    var num_Chg = $('.blog-bigimg').attr('src').substr(-7,3);
    num_Chg = (parseInt(num_Chg)-1)+'';
    while(num_Chg.length < 3){
        num_Chg = "0" + num_Chg;
    }
    var num_Src = '/image/poster/poster_' + num_Chg + '.jpg';
    $('.blog-bigimg').attr('src', num_Src);
    Bigpic_Btn();
})

$('.blog-close').click(function(){
    $('.blog-big').stop(true, true).fadeOut(300);
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
})

// PS前後比較功能
$('.toggle-border').mousedown(function () {
    $(this).find('.toggle-btn').stop(true, true).toggleClass('toggle-move');
    $(this).parent().find('.dis-before').stop(true, true).fadeToggle(300);
})