function Getdays() {
    $('.date-li').removeClass('--show');
    $('.date-num').text('');

    var DateYM = $('#Setdate').val();
    var DateY = DateYM.substr(0, 4);
    var DateM = DateYM.substr(-2, 2);

    $('.date-title').text(DateY + '年' + DateM + '月')

    var DateDays = new Date(DateY, DateM, 0);
    var GetDays = DateDays.getDate();

    var FstDate = new Date(DateY, DateM - 1, 1);
    var FstWeek = FstDate.getDay()

    for (let i = 0; i < GetDays; i++) {
        $('.date-li').eq(FstWeek + i).addClass('--show');
        $('.date-num').eq(FstWeek + i).text(1 + i);
    }
}

$('#Setdate-Apply').click(Getdays)

$('#Clear-All').click(function () {
    $('.check').fadeIn(300);
    document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
})

$('.date-li').click(function(){
    $(this).toggleClass('--choose');
})

$('#Delete').click(function(){
    $('.date').find('.--choose').find('.date-text').text('');
    $('.--choose').removeClass('--choose');
})

$('#Change').click(function(){
    var Text = $('#Textbox').val();
    $('.date').find('.--choose').find('.date-text').text(Text);
    $('.--choose').removeClass('--choose');
    $('#Textbox').val('');
})

$('#No').click(function () {
    $('.check').fadeOut(300);
    document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
})

$('#Yes').click(function(){
    $('.date-text').text('');
    $('.--choose').removeClass('--choose');
    $('.check').fadeOut(300);
    document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
})

function screenshot() {

    html2canvas(document.getElementById('ScreenShot')).then(function (canvas) {

        document.body.appendChild(canvas);

        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");

        var DateYM = $('#Setdate').val();
        var DateY = DateYM.substr(0, 4);
        var DateM = DateYM.substr(-2, 2);

        a.download = DateY + DateM + '日程表.jpg';
        a.click();

        $('canvas').remove();
    });
}
