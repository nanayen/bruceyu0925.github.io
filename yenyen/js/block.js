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

// 模式擇一
$('.choose-one').click(function () {
    $(this).parent().find('.choose-one').removeClass('--click');
    $(this).addClass('--click');
})

// 背景設定函數
var Back_Solid = function () {
    var Css_Value = $('.back-set-solid').val();
    $('.phone').css('background', 'none');
    $('.phone').css('background-color', Css_Value);
}

var Back_Gradient = function () {
    var Gra1 = $('.gradient_1').val();
    var Gra2 = $('.gradient_2').val();
    var Deg = $('.gradient_deg').val() + 'deg';
    var Css_Value = 'linear-gradient(' + Deg + ',' + Gra1 + ' 0%,' + Gra2 + ' 100%)';
    $('.phone').css('background-color', 'none');
    $('.phone').css('background', Css_Value);
}

$('#Img-Btn').click(function () {
    $('#Board-Img').click();
})

var Back_Image = function () {
    var file = $('#Board-Img')[0].files[0];
    var reader = new FileReader;
    reader.onload = function (e) {
        var Css_Value = 'url(' + e.target.result + ')';
        $('.phone').css('background-color', 'none');
        $('.phone').css('background-image', Css_Value);
        $('.phone').css('background-repeat', 'no-repeat');
        $('.phone').css('background-position', 'center center');
        $('.phone').css('background-size', 'cover');
    };
    try {
        reader.readAsDataURL(file);
    } catch { }
}

$('#Board-Img').change(Back_Image);
$('.back-set-gradient').on('input', Back_Gradient);
$('.back-set-solid').on('input', Back_Solid);

//切換背景模式
$('.back-li').click(function () {
    var Back_kind = $('.back-li').index(this);
    $('.back-set').removeClass('--show');
    $('.back-set').eq(Back_kind).addClass('--show');

    switch (Back_kind) {
        case 0:
            Back_Solid();
            break;
        case 1:
            Back_Gradient();
            break;
        case 2:
            Back_Image();
            break;
    }
})

// 物件顯示
$('.checkbox-btn').click(function(){
    $(this).toggleClass('--click');
})

$('.checkbox-board').click(function(){
    $('.border').toggleClass('--hide');
})

$('.checkbox-divider').click(function(){
    $('.divider').toggleClass('--hide');
})

$('.checkbox-logo').click(function(){
    $('#Logo').toggleClass('--hide');
})

$('.boarder-set').on('input',function(){
    var BorCol = $(this).val();
    $('.border').css('border-color',BorCol);
    $('.divider').css('background-color',BorCol);
    $('.cls-1').css('fill',BorCol);
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

$('#Title').find('.color').on('input',function () {
    var Color = $('#Title').find('.color').val();
    $('.block-title-text').css('color', Color);
})

$('#Title').find('.size').change(function () {
    var Size = $('#Title').find('.size').val() + 'px';
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

$('#Text').find('.color').on('input',function () {
    var Color = $('#Text').find('.color').val();
    $('.block-desc-text').css('color', Color);
})

$('#Text').find('.size').change(function () {
    var Size = $('#Text').find('.size').val() + 'px';
    $('.block-desc-text').css('font-size', Size);
})

// 匯出圖片檔
function screenshot() {
    AutoCenter();

    html2canvas(document.getElementById('ScreenShot')).then(function (canvas) {

        document.body.appendChild(canvas);

        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");

        a.download = '文字版.jpg';
        a.click();

        $('canvas').remove();
    });
}