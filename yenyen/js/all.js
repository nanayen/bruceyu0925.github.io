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