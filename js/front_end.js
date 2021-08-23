// 建立調色盤
var Style = getComputedStyle(document.documentElement);
var MajorColor = Style.getPropertyValue('--major');
var MajorPicker = new iro.ColorPicker('#Picker-Major', {
    width: 140,
    color: MajorColor
});

var MinorColor = Style.getPropertyValue('--minor');
var MinorPicker = new iro.ColorPicker('#Picker-Minor', {
    width: 140,
    color: MinorColor
});

var TitleColor = Style.getPropertyValue('--title');
var TitlePicker = new iro.ColorPicker('#Picker-Title', {
    width: 140,
    color: TitleColor
});

// 切換類別
$('.color-li').click(function () {
    $('.color-li.--click').removeClass('--click');
    $(this).addClass('--click');

    var Dis = '#Dis-' + $(this).attr('id');
    $('.color-dis.--click').removeClass('--click');
    $(Dis).addClass('--click');

    $('.color-picker-border.--click').toggleClass('--click')
})

// 開啟調色盤
$('.color-picker-btn').click(function () {
    $(this).parent().find('.color-picker-border').toggleClass('--click')
})

// 關閉調色盤
$('.color-text').click(function () {
    $('.color-picker-border').removeClass('--click')
})

// 使用鍵入
$('#Dis-Major').find('.color-text').blur(function () {
    var Color = $(this).val();
    try {
        document.documentElement.style.setProperty('--major', Color);
        MajorPicker.color.hexString = Color;
    } catch {
        Color = MajorPicker.color.hexString;
        $(this).val(Color);
        document.documentElement.style.setProperty('--major', Color);
        MajorPicker.color.hexString = Color;
    }
})

$('#Dis-Minor').find('.color-text').blur(function () {
    var Color = $(this).val();
    try {
        document.documentElement.style.setProperty('--minor', Color);
        MinorPicker.color.hexString = Color;
    } catch {
        Color = MinorPicker.color.hexString;
        $(this).val(Color);
        document.documentElement.style.setProperty('--minor', Color);
        MinorPicker.color.hexString = Color;
    }
})

$('#Dis-Title').find('.color-text').blur(function () {
    var Color = $(this).val();
    try {
        document.documentElement.style.setProperty('--title', Color);
        TitlePicker.color.hexString = Color;
    } catch {
        Color = TitlePicker.color.hexString;
        $(this).val(Color);
        document.documentElement.style.setProperty('--title', Color);
        TitlePicker.color.hexString = Color;
    }
})

$('.color-text').keydown(function () {
    if (event.keyCode == 13) {
        $(this).blur();
    }
})

// 使用調色盤
MajorPicker.on(['color:init', 'color:change'], function () {
    var Major = MajorPicker.color.hexString;
    $('#Dis-Major').find('.color-text').val(Major);
    document.documentElement.style.setProperty('--major', Major);

    var MajorVal = MajorPicker.color.value;
    if (MajorVal > 60) {
        $('#Dis-Major').addClass('--dark');
    } else {
        $('#Dis-Major').removeClass('--dark');
    }
});

MinorPicker.on(['color:init', 'color:change'], function () {
    var Minor = MinorPicker.color.hexString;
    $('#Dis-Minor').find('.color-text').val(Minor);
    document.documentElement.style.setProperty('--minor', Minor);

    var MinorVal = MinorPicker.color.value;
    if (MinorVal > 60) {
        $('#Dis-Minor').addClass('--dark');
    } else {
        $('#Dis-Minor').removeClass('--dark');
    }
});

TitlePicker.on(['color:init', 'color:change'], function () {
    var Title = TitlePicker.color.hexString;
    $('#Dis-Title').find('.color-text').val(Title);
    document.documentElement.style.setProperty('--title', Title);

    var TitleVal = TitlePicker.color.value;
    if (TitleVal > 60) {
        $('#Dis-Title').addClass('--dark');
    } else {
        $('#Dis-Title').removeClass('--dark');
    }
});

// 顏色重設
$('#Reset-Major').click(function () {
    document.documentElement.style.setProperty('--major', "#4398D9");
    $(this).parent().find('.color-text').text("#4398D9");
    MajorPicker.color.hexString = "#4398D9";
})
$('#Reset-Minor').click(function () {
    document.documentElement.style.setProperty('--minor', "#2EC0FF");
    $(this).parent().find('.color-text').text("#2EC0FF");
    MinorPicker.color.hexString = "#2EC0FF";
})
$('#Reset-Title').click(function () {
    document.documentElement.style.setProperty('--title', "#1C6392");
    $(this).parent().find('.color-text').text("#1C6392");
    TitlePicker.color.hexString = "#1C6392";
})

// 寫Cookie
function SetCookie(){
    var Style = getComputedStyle(document.documentElement);
    var Major = Style.getPropertyValue('--major');
    var Minor = Style.getPropertyValue('--minor');
    var Title = Style.getPropertyValue('--title');

    document.cookie = 'Major=' + Major;
    document.cookie = 'Minor=' + Minor;
    document.cookie = 'Title=' + Title;
}
$('.color-save').click(function () {
    if(document.cookie != ''){
        SetCookie();
        $('#Success').addClass('--show');
    }else{
        $('#Alert').addClass('--show');
        Window_Lock('hidden');
    }
})
$('#Cancel').click(function(){
    $('#Alert').removeClass('--show');
    Window_Lock('auto');
})
$('#Apply').click(function(){
    SetCookie();
    $('#Alert').removeClass('--show');
    $('#Success').addClass('--show');
})
$('#Okay').click(function(){
    $('#Success').removeClass('--show');
    Window_Lock('auto');
})