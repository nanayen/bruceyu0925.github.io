// 畫面縮放及定位功能
function AutoWidth() {
    var Width = document.body.offsetWidth;
    $('.phone-box').css('width', Width - 400);
}

function AutoCenter() {
    var OuterW = document.getElementById('Outer').offsetWidth;
    var InnerW = document.getElementById('Inner').offsetWidth;
    var OuterH = document.getElementById('Outer').offsetHeight;
    var InnerH = document.getElementById('Inner').offsetHeight;

    $('.phone-box').scrollLeft((InnerW - OuterW) / 2);
    $('.phone-box').scrollTop((InnerH - OuterH) / 2);

    $('.phone').css('transform', 'scale(100%)');
    $('#Window-Size').val(100);
    $('.range-text').text('100%');
}

AutoWidth();
AutoCenter();

window.onresize = function () {
    AutoWidth();
}

// 全部清空
$('#Clear-All').click(function () {
    $('.check').fadeIn(300);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
})

// 畫面大小
$('#Window-Size').on("input", function () {
    var Per = $(this).val() + '%';
    $('.range-text').text(Per);
    $('.phone').css('transform', 'scale(' + Per + ')')
});

// 畫面置中
$('#Move-Center').click(function () {
    AutoCenter();
})

// 文字編輯
    $('#Titlebox').keyup(function () {
        var Tx = $(this).val();
        $('.block-title-text').text(Tx);
    })
    $('#Textbox').keyup(function () {
        var Tx = $(this).val();
        $('.block-desc-text').text(Tx);
    })

// 格式擇一
$('.choose-one').click(function () {
    $(this).parent().find('.choose-one').removeClass('--click');
    $(this).addClass('--click');
})

// 文字其他格式
$('.font-li').click(function () {
    $(this).toggleClass('--click');
})

// 標題格式設定
$('#Title').find('button').click(function () {

    var Level = $('#Title').find('.level').find('.--click').val();
    var Bold = $('#Title').find('.bold.--click').val();
    if (Bold == undefined) {
        Bold = "normal";
    }
    var Italic = $('#Title').find('.italic.--click').val();
    if (Italic == undefined) {
        Italic = "normal";
    }
    var Underline = $('#Title').find('.underline.--click').val();
    if (Underline == undefined) {
        Underline = "none";
    }

    $('.block-title-text').css('text-align', Level);
    $('.block-title-text').css('font-weight', Bold);
    $('.block-title-text').css('font-style', Italic);
    $('.block-title-text').css('text-decoration', Underline);
})

$('#Title').find('.color').change(function(){
    var Color = $('#Title').find('.color').val();
    $('.block-title-text').css('color', Color);
})

$('#Title').find('.size').change(function(){
    var Size = $('#Title').find('.size').val()+'px';
    $('.block-title-text').css('font-size', Size);
})

// 內文格式設定
$('#Text').find('button').click(function () {

    var Level = $('#Text').find('.level').find('.--click').val();
    var Bold = $('#Text').find('.bold.--click').val();
    if (Bold == undefined) {
        Bold = "normal";
    }
    var Italic = $('#Text').find('.italic.--click').val();
    if (Italic == undefined) {
        Italic = "normal";
    }
    var Underline = $('#Text').find('.underline.--click').val();
    if (Underline == undefined) {
        Underline = "none";
    }

    $('.block-desc-text').css('text-align', Level);
    $('.block-desc-text').css('font-weight', Bold);
    $('.block-desc-text').css('font-style', Italic);
    $('.block-desc-text').css('text-decoration', Underline);
})

$('#Text').find('.color').change(function(){
    var Color = $('#Text').find('.color').val();
    $('.block-desc-text').css('color', Color);
})

$('#Text').find('.size').change(function(){
    var Size = $('#Text').find('.size').val()+'px';
    $('.block-desc-text').css('font-size', Size);
})

// 對話框，不要清空
$('#No').click(function () {
    $('.check').fadeOut(300);
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
})

// 對話框，全部清空
$('#Yes').click(function () {

    $('.block-title-text').css('color', '#481e6b');
    $('.block-title-text').css('font-size', '32px');
    $('.block-title-text').css('text-align', 'center');
    $('.block-title-text').css('font-weight', 'normal');
    $('.block-title-text').css('font-style', 'normal');
    $('.block-title-text').css('text-decoration', 'none');

    $('.block-desc-text').css('color', '#532a75');
    $('.block-desc-text').css('font-size', '20px');
    $('.block-desc-text').css('text-align', 'center');
    $('.block-desc-text').css('font-weight', 'normal');
    $('.block-desc-text').css('font-style', 'normal');
    $('.block-desc-text').css('text-decoration', 'none');

    $('#Title').find('.color').val('#481e6b');
    $('#Title').find('.size').val('32');
    
    $('#Text').find('.color').val('#532a75');
    $('#Text').find('.size').val('20');

    $('#Titlebox').val('');
    $('#Textbox').val('');
    $('.format-li').removeClass('--click');
    $('.level').find('.center').addClass('--click');
    $('.vertical').find('.flex-start').addClass('--click');
    $('.font-li').removeClass('--click');

    $('.block-title-text').text('');
    $('.block-desc-text').text('');

    $('.check').fadeOut(300);

    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
})

// 匯出圖片檔
function screenshot() {

    html2canvas(document.getElementById('ScreenShot')).then(function (canvas) {

        document.body.appendChild(canvas);

        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");

        a.download = '文字版.jpg';
        a.click();

        $('canvas').remove();
    });
}