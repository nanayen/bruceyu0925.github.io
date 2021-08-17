bs = {};
(function (bs) {
    'use strict';
    var _bs = bs;
    _bs.disableSubmits = disableSubmits;
    _bs.errorHandler = errorHandler;
    _bs.formatNumber = formatNumber;
    _bs.getUrlVar = getUrlVar;
    _bs.initSelectElement = initSelectElement;
    _bs.initSelectElementContainSearch = initSelectElementContainSearch;
    _bs.initSelectElementDefault = initSelectElementDefault;
    _bs.initSelectElementSpecial = initSelectElementSpecial;
    _bs.cloneSelectOption = cloneSelectOption;
    _bs.initTagElement = initTagElement;
    _bs.fullChar2halfChar = fullChar2halfChar;
    _bs.isNumber = isNumber;
    _bs.isEmail = isEmail;
    _bs.numToAlphabet = numToAlphabet;
    _bs.findObjectByKey = findObjectByKey;
    _bs.findIndexByKey = findIndexByKey;
    _bs.findIndexAryByKey = findIndexAryByKey;
    _bs.numberConvertToUppercase = numberConvertToUppercase;
    _bs.isChina = isChina;
    _bs.native2ascii = native2ascii;
    _bs.ascii2native = ascii2native;
    _bs.getAudioHtml = getAudioHtml;
    _bs.getBtnAudioHtml = getBtnAudioHtml;
    _bs.setAudioPlay = setAudioPlay;
    _bs.clearAllSetTimeOut = clearAllSetTimeOut;
    _bs.clearAllSetInterval = clearAllSetInterval;
    _bs.getFullDate = getFullDate;
    _bs.getDateString = getDateString;
    _bs.getUnixTimestamp = getUnixTimestamp;
    _bs.secToTime = secToTime;
    _bs.showImage = showImage;
    _bs.showFileName = showFileName;
    _bs.padStart = padStart;
    _bs.shuffle = shuffle;
    _bs.checkSearchElement = checkSearchElement;
    _bs.initSearchElement = initSearchElement;
    _bs.downloadFile = downloadFile;
    _bs.checkImgFile = checkImgFile;
    _bs.checkImgSize = checkImgSize;
    _bs.roundDecimal = roundDecimal;

    //送出資料時block住畫面
    function disableSubmits(type) {
        if (type) {
            $.blockUI.defaults.css = {
                padding: 0,
                margin: 0,
                top: '50%',
                left: '50%',
                textAlign: 'center',
                cursor: 'wait'
            };
            $.blockUI({
                message: '<div class="spinner-border text-light" role="status"></div>',
                baseZ: 2000
            });

        } else {
            $.unblockUI();
        }
    }

    //ajax錯誤處理
    function errorHandler(jqXHR, exception) {
        if (jqXHR.status === 401) {
            location.href = '/auth/login';
        } else if (jqXHR.status == 403) {
            alert('Requested page Forbidden. [403]');
        } else if (jqXHR.status == 404) {
            alert('Requested page not found. [404]');
        } else if (jqXHR.status == 500) {
            alert('Internal Server Error [500].');
        } else if (jqXHR.status == 0) {
            console.error(exception, jqXHR);
        } else if (jqXHR.status == 302) {
            location.href = '/auth/login';
        } else if (exception === 'parsererror') {
            alert('Requested JSON parse failed.');
        } else if (exception === 'timeout') {
            alert('Time out error.');
        } else if (exception === 'abort') {
            alert('Ajax request aborted.');
        } else {
            alert('Uncaught Error.\n' + jqXHR.responseText);
        }
    }

    //格式化數字
    function formatNumber(number) {
        if (number > 0) {
            number = number.toFixed(2) + '';
            x = number.split('.');
            x1 = x[0];
            //x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1;
        } else {
            return '0';
        }
    }

    //取出指定key的querystring
    function getUrlVar(key) {
        var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
        return result && decodeURIComponent(result[1]) || "";
    }

    //初始化Select
    function initSelectElement(AElement, AUrl, AName, AValue, ASetValue, ASkipValue) {
        $.ajax({
            url: AUrl,
            type: 'post',
            async: false,
            success: function (res) {
                $(AElement + ' option').remove();
                if (AName != '') {
                    $(AElement).append('<option value="' + AValue + '">' + AName + '</option>');
                }
                $.each(res, function (key, item) {
                    if (item.id) {
                        if (ASkipValue != item.id) {
                            $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
                        }
                    } else if (item.code) {
                        if (ASkipValue != item.code) {
                            $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
                        }
                    }
                });

                if (ASetValue != '') {
                    $(AElement).val(ASetValue);
                }

                $(AElement).select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity
                });
            },
            error: errorHandler
        });
    }

    //初始化Select,有search条件
    function initSelectElementContainSearch(AElement, AUrl, searchObj, AName, AValue, ASetValue, ASkipValue) {
        $.ajax({
            url: AUrl,
            type: 'post',
            data: JSON.stringify(searchObj),
            async: false,
            contentType: 'application/json',
            success: function (res) {
                $(AElement + ' option').remove();
                if (AName != '') {
                    $(AElement).append('<option value="' + AValue + '">' + AName + '</option>');
                }
                $.each(res, function (key, item) {
                    if (item.id) {
                        if (ASkipValue != item.id) {
                            $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
                        }
                    } else if (item.code) {
                        if (ASkipValue != item.code) {
                            $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
                        }
                    }
                });
                $(AElement).select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity
                });

                if (ASetValue != '') {
                    $(AElement).val(ASetValue).trigger('change');
                }
            },
            error: errorHandler
        });
    }

    //初始化Select,只有预设选项
    function initSelectElementDefault(AElement, AName, AValue) {

        $(AElement + ' option').remove();

        if (AName != '') {
            $(AElement).append('<option value="' + AValue + '">' + AName + '</option>');
        }

        $(AElement).select2({
            theme: 'bootstrap',
            minimumResultsForSearch: Infinity
        });
    }

    //初始化Select,特定选项传入
    function initSelectElementSpecial(AElement, AName, AValue, AOptionAry) {

        $(AElement + ' option').remove();

        if (AName != '') {
            $(AElement).append('<option value="' + AValue + '">' + AName + '</option>');
        }

        $.each(AOptionAry, function (key, item) {
            if (item.id) {
                $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
            } else if (item.code) {
                $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
            }
        });

        $(AElement).select2({
            theme: 'bootstrap',
            minimumResultsForSearch: Infinity
        });
    }

    //複製已經初始化的Select至其他Select
    function cloneSelectOption(src_element, target_element) {
        var options = $(src_element + " > option").clone();
        $(target_element).append(options);

        $(target_element).select2({
            theme: 'bootstrap',
            minimumResultsForSearch: Infinity
        });
    }

    //初始化Tag
    function initTagElement(AElement, AUrl, AParameter, ASetValue) {
        $.ajax({
            url: AUrl,
            type: 'post',
            async: false,
            data: AParameter,
            success: function (res) {
                $(AElement + ' option').remove();
                $.each(res, function (key, item) {
                    if (item.id) {
                        $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
                    } else if (item.code) {
                        $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
                    }
                });
                $(AElement).select2({
                    theme: 'bootstrap',
                    placeholder: {
                        id: '-1',
                        text: '选择標籤'
                    },
                    tags: true,
                    language: 'zh-TW'
                });
                if ((ASetValue != '') && (ASetValue != null)) {
                    $(AElement).val(JSON.parse(ASetValue)).trigger('change');
                }
            },
            error: errorHandler
        });
    }

    //將全型轉半型
    function fullChar2halfChar(obj) {
        var text = obj.value;
        var asciiTable = "!\"#$%&\’()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
        var big5Table = "%uFF01%u201D%uFF03%uFF04%uFF05%uFF06%u2019%uFF08%uFF09%uFF0A%uFF0B%uFF0C%uFF0D%uFF0E%uFF0F%uFF10%uFF11%uFF12%uFF13%uFF14%uFF15%uFF16%uFF17%uFF18%uFF19%uFF1A%uFF1B%uFF1C%uFF1D%uFF1E%uFF1F%uFF20%uFF21%uFF22%uFF23%uFF24%uFF25%uFF26%uFF27%uFF28%uFF29%uFF2A%uFF2B%uFF2C%uFF2D%uFF2E%uFF2F%uFF30%uFF31%uFF32%uFF33%uFF34%uFF35%uFF36%uFF37%uFF38%uFF39%uFF3A%uFF3B%uFF3C%uFF3D%uFF3E%uFF3F%u2018%uFF41%uFF42%uFF43%uFF44%uFF45%uFF46%uFF47%uFF48%uFF49%uFF4A%uFF4B%uFF4C%uFF4D%uFF4E%uFF4F%uFF50%uFF51%uFF52%uFF53%uFF54%uFF55%uFF56%uFF57%uFF58%uFF59%uFF5A%uFF5B%uFF5C%uFF5D%uFF5E";
        var result = "";

        for (var i = 0; i < text.length; i++) {
            var val = escape(text.charAt(i));
            var j = big5Table.indexOf(val);
            result += (((j > -1) && (val.length == 6)) ? asciiTable.charAt(j / 6) : text.charAt(i));
        }
        obj.value = result;
    }

    //判斷是不是數字
    function isNumber(value) {
        return !Number.isNaN(Number(value));
    }

    //判斷是不是Email
    function isEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //數字轉英文
    function numToAlphabet(num) {
        var s = ''
        while (num > 0) {
            var m = num % 26
            if (m === 0) m = 26
            s = (m + 9).toString(36) + s
            num = (num - m) / 26
        }
        return s.toUpperCase()
    }

    //取得物件陣列中的元素
    function findObjectByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    }

    //取得物件陣列中的索引
    function findIndexByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return null;
    }

    //取得物件陣列中的所有索引，並重組一個索引陣列
    function findIndexAryByKey(array, key, value) {
        var array = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                array.push(i);
            }
        }
        return array;
    }

    //阿拉伯數字轉換成中文數字,只處理到0~99
    function numberConvertToUppercase(num) {
        num = Number(num);
        var upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '萬', '億'];
        var length = String(num).length;
        if (length == 1) {
            return upperCaseNumber[num];
        } else if (length == 2) {
            if (num == 10) {
                return upperCaseNumber[num];
            } else if (num > 10 && num < 20) {
                return '十' + upperCaseNumber[String(num).charAt(1)];
            } else {
                return upperCaseNumber[String(num).charAt(0)] + '十' + upperCaseNumber[String(num).charAt(1)].replace('零', '');
            }
        }
    }

    //判斷是否為中文
    function isChina(s) {
        var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
        if (!patrn.exec(s)) {
            return false;
        } else {
            return true;
        }
    }

    //中文轉ASCII
    function native2ascii() {
        var character = document.getElementById("characterTa").value.split("");
        var ascii = "";
        for (var i = 0; i < character.length; i++) {
            var code = Number(character[i].charCodeAt(0));
            if (!document.getElementById("ignoreLetter").checked || code > 127) {
                var charAscii = code.toString(16);
                charAscii = new String("0000").substring(charAscii.length, 4) + charAscii;
                ascii += "\\u" + charAscii
            } else {
                ascii += character[i];
            }
        }
        ;
        document.getElementById("asciiTa").value = ascii;
    };

    //ASCII轉中文
    function ascii2native() {
        var character = document.getElementById("asciiTa").value.split("\\u");
        var native = character[0];
        for (var i = 1; i < character.length; i++) {
            var code = character[i];
            native += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
            if (code.length > 4) {
                native += code.substring(4, code.length);
            }
        }
        ;
        document.getElementById("characterTa").value = native;
    }

    //取得聲音播放器HTML
    function getAudioHtml(o) {
        var inner_html = '';

        var audio_id = o.id;
        var audio_src = o.src;

        inner_html += '<audio id="' + audio_id + '" controlslist="nodownload" style="display:none">';
        inner_html += '	<source src="' + audio_src + '" type="audio/mpeg" />';
        inner_html += '</audio>';

        return inner_html;
    }

    //取得聲音播放器外部按鈕HTML
    function getBtnAudioHtml(o) {
        var inner_html = '';

        var btn_css = o.btn_css;
        var btn_for = o.btn_for;
        var btn_text = o.btn_text;

        inner_html += '<button type="button" class="btn btn-primary ' + btn_css + '" for="' + btn_for + '">' + btn_text + '</button> ';

        return inner_html;
    }

    //設定聲音播放器按鈕播放事件
    function setAudioPlay(o) {

        var audio_id = o.id;
        var btn_dom = o.btn_dom;
        var btn_text = o.btn_text;

        var audio = document.getElementById(audio_id);

        var myInterval = setInterval(function () {
            if (audio.ended) {
                clearInterval(myInterval);
                $(btn_dom).text(btn_text);
                audio.pause();
            }
        }, 500);

        if (audio.paused) {
            $(btn_dom).text('暫停');
            audio.play();
        } else {
            $(btn_dom).text(btn_text);
            audio.pause();
        }
    }

    //取消Timeout
    function clearAllSetTimeOut() {
        var highestTimeoutId = setTimeout(";");
        for (var i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
    }

    //清除TimeInterval
    function clearAllSetInterval() {
        var highestIntervalId = setInterval(";");
        for (var i = 0; i < highestIntervalId; i++) {
            clearInterval(i);
        }
    }

    //取得完整日期物件
    function getFullDate(d) {
        const _year = new Date(d).getFullYear();
        const _month = ("0" + (new Date(d).getMonth() + 1).toString()).slice(-2);
        const _date = ("0" + new Date(d).getDate()).slice(-2);
        const _hour = ('0' + new Date(d).getHours()).slice(-2);
        const _minute = ('0' + new Date(d).getMinutes()).slice(-2);
        const _second = ('0' + new Date(d).getSeconds()).slice(-2);

        var fullDate = {
            year: _year,
            month: _month,
            date: _date,
            hour: _hour,
            minute: _minute,
            second: _second
        }
        return fullDate;
    }

    //取得日期
    function getDateString(t) {
        if (t) {
            return new Date(t * 1000).toLocaleDateString('zh-TW');
        } else {
            return new Date().toLocaleDateString('zh-TW');
        }
    }

    //取得UnixTimestamp
    function getUnixTimestamp(d) {
        if (d) {
            return Math.floor(new Date(d).getTime() / 1000);
        } else {
            return Math.floor(new Date().getTime() / 1000);
        }
    }

    //將秒數換成時間格式
    function secToTime(timeInSeconds, format) {
        var time = parseInt(timeInSeconds, 10),
            hours = Math.floor(time / 60 / 60),
            minutes = Math.floor(time % 3600 / 60),
            seconds = Math.floor(time % 3600 % 60);
        if (format == 'short') {
            return (hours == 0 ? '' : padStart(hours, 2, 0) + ':') + padStart(minutes, 2, 0) + ':' + padStart(seconds, 2, 0);
        } else {
            return padStart(hours, 2, 0) + ':' + padStart(minutes, 2, 0) + ':' + padStart(seconds, 2, 0);
        }
    }

    //將暫存圖片轉換成base64顯示
    function showImage(file, img, type) {
        var files = $(file).get(0).files;
        var reader = new FileReader();
        reader.onload = function (e) {
            if (type == 'background') {
                $(img).attr('style', "background-image:url(" + e.target.result + ")");
            } else {
                $(img).attr('src', e.target.result);
            }
        };
        reader.readAsDataURL(files[0]);
    }

    //顯示暫存檔案檔名
    function showFileName(file, view) {
        var files = $(file).get(0).files;
        var file_name = '';
        for (var i = 0; i < files.length; i++) {
            file_name += files[i].name + '<br><br>';
        }
        $(view).html(file_name);
        $(view).show();
    }

    // 左邊補零，例：padStart(1, 2, 0) 會輸出 01
    function padStart(input, length, padding) {
        while ((input = input.toString()).length + (padding = padding.toString()).length < length) {
            padding += padding;
        }
        return padding.substr(0, length - input.length) + input;
    }

    //物件亂序
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) ;
        return o;
    }

    //確認Dom物件搜尋是否為初始狀態
    function checkSearchElement() {
        var input_len = $('input[id*="search"]').filter(function () {
            return this.value
        }).length;
        var select_len = $('select[id*="search"] option:selected[value!="-1"]').length;
        return (input_len + select_len) == 0 ? true : false;
    }

    //初始化Dom物件搜尋初始狀態
    function initSearchElement() {
        $('input[id*="search"]').val('');
        $('select[id*="search"]').val('-1');
		$('select[id*="search"]').select2({
			theme: 'bootstrap',
			minimumResultsForSearch: Infinity
		});
    }

    function downloadFile(downloadType, downloadUrl, downloadMethod, downloadFilename) {
        // downloadType "application/pdf"
        if (downloadMethod == 1) {
            // 下載方法1
            window.location.href = downloadUrl;
        } else {
            // 下載方法2
            $.ajax({
                url: downloadUrl,
                type: 'Get',
                dataType: 'binary',
                //cache: false,
                timeout: 30000,
                beforeSend: function () {
                },
                success: function (r) {
                    var a = document.createElement('a');
                    var binaryData = [];
                    binaryData.push(r);
                    a.href = window.URL.createObjectURL(new Blob(binaryData, {type: downloadType}));
                    a.download = downloadFilename;
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                },
                error: bs.errorHandler,
                complete: function () {
                }
            });
        }
    }

	function checkImgFile(o){
		let bool_type=true;
		var files = $(o).get(0).files;
		if (files[0].type=='image/tiff') {
			alert('不可以上傳tif格式的圖片');
			bool_type=false;
		}
		else {
			bool_type=true;
		}
		return bool_type;
	}

	function checkImgSize(dataObj){
		var o=dataObj.element;
		var element_id=dataObj.element_id;
		var target_id=dataObj.target_id;
		var w=dataObj.width;
		var h=dataObj.height;

		var file=$(o).get(0).files[0];
		var img = new Image();
		var _URL = window.URL || window.webkitURL;
		var objectUrl = _URL.createObjectURL(file);
		img.onload = function () {
			_URL.revokeObjectURL(objectUrl);
			if (this.width>w) {
				alert('你上傳的圖片寬度大於'+w);
				$(o).val('');
			}
			else if (this.height>h) {
				alert('你上傳的圖片高度大於'+h);
				$(o).val('');
			}
			else {
				bs.showImage('#'+element_id,'#'+target_id);
			}
		};
		img.src = objectUrl;
	}

	function roundDecimal(val,precision) {
		return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
	}

})(bs);
