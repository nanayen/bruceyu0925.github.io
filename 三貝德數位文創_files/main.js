// global variable
var g_obj = {
    teaching_teacher: 1, // 名師教學
    teaching_live: 2, //段考直播
    db_practice_ot_id: 3, //百萬題庫
    m_e_ot_id: 4, // 電子講義
    db_test_history_ot_id: 5, //歷屆試題
    question_ot_id: 6, // 瀏覽問題
    ask_ot_id: 7, // 我要發問
    my_learn_notes_ot_id: 8, // 我的筆記
    m_i_ot_id: 9, // 互動實驗
    db_class_practice_ot_id: 11, // 隨堂練習
	exam_studylist: 12, // 1200單字
	teaching_word: 14, // 1200單字

    ec_id: 3, // 高中版
    device_id: 4, // web

    year_id: '',
    field_id: '',
    subject_id: '',
    factory_id: '',
    grade_group_id: '',
    unit_id: '',
    section_id: '',
    segment_id: '',

    outline_id: '',
    outline_detail_id: '',
    video_id: '',
    quiz_id: '',
};

// 判斷使用者收藏
function getUsercollection(outline_type_id, outline_id, outline_detail_id, quiz_id, handout_id, eps_id) {
    if (outline_detail_id != "") { // 知識點 id：單一名師教學、單一段考直播
        $.get("/my/usercollection?outline_type_id=" + outline_type_id + "&outline_id=" + outline_id + "&outline_detail_id=" + outline_detail_id, function (r) {
            // if(res.data.length > 0){ // 表示目前有收藏
            if (typeof r.data.user_collection_id != 'undefined') { // 表示目前有收藏
                $("#tag_plus").attr("data-status", "1").attr("data-outline_detail_id", outline_detail_id).attr("data-user_collection_id", r.data.user_collection_id).addClass("-on");
            } else { // 表示目前無收藏
                $("#tag_plus").attr("data-status", "0").attr("data-outline_detail_id", outline_detail_id).removeAttr("data-user_collection_id").removeClass("-on");
            }
        });
    }
    if (quiz_id != "") { // 題庫 id
        $.get("/my/usercollection?outline_type_id=" + outline_type_id + "&outline_id=" + outline_id + "&quiz_id=" + quiz_id, function (r) {
            // if(res.data.length > 0){ // 表示目前有收藏
            if (typeof r.data.user_collection_id != 'undefined') { // 表示目前有收藏
                $("#tag_plus").attr("data-status", "1").attr("data-section_id", outline_id).attr("data-quiz_id", quiz_id).attr("data-user_collection_id", r.data.user_collection_id).addClass("-on");
            } else {
                $("#tag_plus").attr("data-status", "0").attr("data-section_id", outline_id).attr("data-quiz_id", quiz_id).removeAttr("data-user_collection_id").removeClass("-on");
            }
        });
    }
    if (handout_id != "") { // 講義
        $.get("/my/usercollection?outline_type_id=" + outline_type_id + "&outline_id=" + outline_id + "&handout_id=" + handout_id, function (r) {
            // if(res.data.length > 0){ // 表示目前有收藏
            if (typeof r.data.user_collection_id != 'undefined') { // 表示目前有收藏
                $("#tag_plus").attr("data-status", "1").attr("data-handout_id", handout_id).attr("data-user_collection_id", r.data.user_collection_id).addClass("-on");
            } else {
                $("#tag_plus").attr("data-status", "0").attr("data-handout_id", handout_id).removeAttr("data-user_collection_id").removeClass("-on");
            }
        });

    }
    if (eps_id != "") { // 互動實驗 id

    }
}

// 判斷使用者收藏(針對考卷測驗)
function getUsercollectionForTest(outline_type_id, outline_id, quiz, tag_plus_id) {
    $.get("/my/usercollection?outline_type_id=" + outline_type_id + "&outline_id=" + outline_id + "&quiz_id=" + quiz, function (res) {
        //console.log(res);
        // if(res.data.length > 0){ // 表示目前有收藏
        if (typeof res.data.user_collection_id != 'undefined') { // 表示目前有收藏
            if ($("#" + tag_plus_id).length > 0) {
                $("#" + tag_plus_id).attr("data-status", "1").attr("data-quiz_id", quiz).attr("data-user_collection_id", res.data.user_collection_id).addClass("-on");
            }
        } else {
            if ($("#" + tag_plus_id).length > 0) {
                $("#" + tag_plus_id).attr("data-status", "0").attr("data-quiz_id", quiz).removeAttr("data-user_collection_id").removeClass("-on");
            }
        }
    });
}

function getHomeApp() {
  $('.txtNewMessage').hide()
  $('.new_solvederrata_counter').hide()
  $('.new_solved_counter').hide()
  $('.new_errata_counter').hide()

  $.ajax({
    url: '/site/get-home-app',
    type: 'GET',
    contentType: 'application/json',
    success: function (res) {
  	  const message = res.message;
  	  if (message != 'success') {
  		  alert(message);
  		  return false;
  	  }

	  let data = res.data;

	  if (data.new_message > 0) {
		$('.txtNewMessage').html('1').show()
	  }

	  let solvedCount = data.new_solved
	  let errataCount = data.new_errata
	  if (solvedCount + errataCount > 0) {
		let solvedErrataCount = solvedCount + errataCount
		$('.new_solvederrata_counter').html(solvedErrataCount).show()
	  }

	  if (solvedCount > 0) {
		$('.new_solved_counter').html(solvedCount).show()
	  }

	  if (errataCount > 0) {
		$('.new_errata_counter').html(errataCount).show()
	  }

	  let planCount = data.new_plan_count
	  if (planCount > 0) {
		$('.new_plan_counter').html(planCount).show()
	  }

	  window.localStorage["education_id"]=data.education_id;

	  // 取得服務內容
	  $('.service_list li').empty().append(data.user_message_service_item.replace(/\n/g, "<br>"));

	  // 取得服務時間
	  $('.serviceTime').empty().append(data.user_message_service_time.replace(/\n/g, "<br>"));
    },
    error: bs.errorHandler
  });
}

// jQuery + XMLHttpRequest 取得 Binary 檔案
$.ajaxTransport("+binary", function (options, originalOptions, jqXHR) {
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob))))) {
        return {
            // create new XMLHttpRequest
            send: function (headers, callback) {
                // setup all variables
                var xhr = new XMLHttpRequest(),
                    url = options.url,
                    type = options.type,
                    async = options.async || true,
                    // blob or arraybuffer. Default is blob
                    dataType = options.responseType || "blob",
                    data = options.data || null,
                    username = options.username || null,
                    password = options.password || null;

                xhr.addEventListener('load', function () {
                    var data = {};
                    data[options.dataType] = xhr.response;
                    // make callback and send data
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, async, username, password);

                // setup custom headers
                for (var i in headers) {
                    xhr.setRequestHeader(i, headers[i]);
                }

                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function () {
                jqXHR.abort();
            }
        };
    }
});

// 設定導覽列
var getMainHeaderList = function (r, url1, url2) {
    // 設定導覽列連結
    switch (location.pathname.toLowerCase().split('/')[2]) {
        case url2 + '-field':         // 領域
            $("#header_field").addClass("show_tri -on").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-field");
            break;
        case url2 + '-subject':       // 科目
            $("#header_field").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-field");
            $("#header_field").text(r.header.field_name);
            $("#header_subject").addClass("show_tri -on").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-subject?outline_id=" + r.header.field_id);
            break;
        case url2 + '-grade-group':   // 年級/群組
            $("#header_field").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-field");
            $("#header_field").text(r.header.field_name);
            $("#header_subject").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-subject?outline_id=" + r.header.field_id);
            $("#header_subject").text(r.header.subject_name);
            $("#header_grade_group").addClass("show_tri -on").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-grade-group?outline_id=" + r.header.subject_id);
            break;
        case url2 + '-unit':          // 單元
            $("#header_field").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-field");
            $("#header_field").text(r.header.field_name);
            $("#header_subject").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-subject?outline_id=" + r.header.field_id);
            $("#header_subject").text(r.header.subject_name);
            $("#header_grade_group").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-grade-group?outline_id=" + r.header.subject_id);
            $("#header_grade_group").text(((r.header.factory_name!='不分版')?r.header.factory_name:'')+r.header.grade_group_name);
            $("#header_unit").addClass("-on").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-unit?outline_id=" + r.header.grade_group_id);
            //$("#header_unit").text(r.header.unit_name);
            break;
        case url2 + '-section':          // 節
            $("#header_field").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-field");
            $("#header_field").text(r.header.field_name);
            $("#header_subject").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-subject?outline_id=" + r.header.field_id);
            $("#header_subject").text(r.header.subject_name);
            $("#header_grade_group").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-grade-group?outline_id=" + r.header.subject_id);
            $("#header_grade_group").text(((r.header.factory_name!='不分版')?r.header.factory_name:'')+r.header.grade_group_name);
			$("#header_unit").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-unit?outline_id=" + r.header.grade_group_id);
            $("#header_unit").text(r.header.unit_name);
            $("#header_section").addClass("-on").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-section?outline_id=" + r.header.unit_id);
            if (r.header.field_name=='1200單字') {
            	$("#header_subject").parent().hide();
				$("#header_grade_group").parent().hide();
				$("#header_unit").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-1200?outline_id=" + r.header.unit_id);
				$("#header_unit").text('字母分類');
				$("#header_section").addClass("-on").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-section?outline_id=" + r.header.unit_id+'&word='+bs.getUrlVar('word'));
            }
            break;
        case 'digital-handout-paper': // 電子講義
        case 'ask-ask-question':      // 瀏覽發問
        case 'ask-browse-list':       // 我要發問
        case url2 + '-list':          // 我的筆記
        case url2 + '-list-view':     // 播放頁面
        case url2 + '-exam-select':
        case url2 + '-exam':          // 測評頁面
            $("#header_field").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-field");
            $("#header_field").text(r.header.field_name);
            $("#header_subject").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-subject?outline_id=" + r.header.field_id);
            $("#header_subject").text(r.header.subject_name);
            $("#header_grade_group").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-grade-group?outline_id=" + r.header.subject_id);
            $("#header_grade_group").text(r.header.grade_group_name);

			if (window.localStorage["education_id"]==1) {
				$("#header_unit").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-unit?outline_id=" + r.header.grade_group_id);
	            $("#header_unit").text(r.header.unit_name);
	            $("#header_section").addClass("-on").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-section?outline_id=" + r.header.unit_id);
			}
			else {
			    $("#header_unit").addClass("").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-unit?outline_id=" + r.header.grade_group_id);
			}

			if (r.header.field_name=='1200單字') {
            	$("#header_subject").parent().hide();
				$("#header_grade_group").parent().hide();
				$("#header_unit").parent().hide();
            }
            break;
		case url2 + '-1200':
			$("#header_field").addClass("show_tri").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-field");
			$("#header_field").text('1200單字');
			$("#header_subject").parent().hide();
			$("#header_grade_group").parent().hide();
			$("#header_unit").addClass("-on").attr("style", "display:block").attr("href", "/" + url1 + "/" + url2 + "-1200?outline_id=" + bs.getUrlVar('outline_id'));
			$("#header_unit").text('字母分類');
			break;
        default:
            break;
    }
}

// 設定側邊欄連結
var setMainSidebarList = function () {
    // 設定側邊欄選中狀態
    var sidebarValue = location.pathname.toLowerCase().split('/')[2];
    var outline_type_id = bs.getUrlVar("outline_type_id");
    switch (sidebarValue) {
        //經典課程 / 名師教學
        case 'teaching-teacher-field':
        case 'teaching-teacher-subject':
        case 'teaching-teacher-grade-group':
        case 'teaching-teacher-unit':
        case 'teaching-teacher-section':
        case 'teaching-teacher-list-view':
            $('#teaching').addClass('-on');
            $('#teaching button').addClass('-on');
            $('#teaching-teacher').addClass('-on');
            $('#teaching-teacher-header').removeClass('no_display');
            break;

        //經典課程 / 段考直播
        case 'teaching-live-list':
        case 'teaching-live-list-view':
            $('#teaching').addClass('-on');
            $('#teaching button').addClass('-on');
            $('#teaching-live').addClass('-on');
            $('#teaching-live-header').removeClass('no_display');
            break;

		case 'teaching-1200':
		case 'teaching-1200-list':
		case 'teaching-1200-list-view':
	        $('#teaching').addClass('-on');
	        $('#teaching button').addClass('-on');
	        $('#teaching-1200').addClass('-on');
	        break;

        //百萬題庫 / 隨堂練習
        case 'exam-practice-field':
        case 'exam-practice-subject':
        case 'exam-practice-grade-group':
        case 'exam-practice-unit':
        case 'exam-practice-section':
        case 'exam-practice-exam':
            $('#exam').addClass('-on');
            $('#exam button').addClass('-on');
            $('#exam-practice').addClass('-on');
            $('#teaching-teacher-header').removeClass('no_display');
            break;

        //百萬題庫 / 考卷測驗
        case 'exam-paper-field':
        case 'exam-paper-subject':
        case 'exam-paper-grade-group':
        case 'exam-paper-unit':
        case 'exam-paper-section':
        case 'exam-paper-exam-select':
        case 'exam-paper-exam':
            $('#exam').addClass('-on');
            $('#exam button').addClass('-on');
            $('#exam-paper').addClass('-on');
            $('#teaching-teacher-header').removeClass('no_display');
            break;

        //百萬題庫 / 歷屆試題
        case 'exam-history-list':
            $('#exam').addClass('-on');
            $('#exam button').addClass('-on');
            $('#exam-history').addClass('-on');
            $('#teaching-live-header').removeClass('no_display');
            break;

        //做練習 / 學習單
		case 'exam-studylist-field':
        case 'exam-studylist-subject':
        case 'exam-studylist-grade-group':
        case 'exam-studylist-unit':
        case 'exam-studylist-section':
            $('#exam').addClass('-on');
            $('#exam button').addClass('-on');
            $('#exam-studylist').addClass('-on');
            $('#teaching-teacher-header').removeClass('no_display');
            break;

        //電子講義
        case 'digital-handout-field':
        case 'digital-handout-subject':
        case 'digital-handout-grade-group':
        case 'digital-handout-unit':
        case 'digital-handout-paper':
            $('#digital').addClass('-on');
            $('#digital button').addClass('-on');
            $('#digital-handout').addClass('-on');
            $('#teaching-teacher-header').removeClass('no_display');
            break;

        //解惑平臺 / 瀏覽問題
        case 'ask-browse-field':
        case 'ask-browse-subject':
        case 'ask-browse-grade-group':
        case 'ask-browse-unit':
        case 'ask-browse-section':
        case 'ask-browse-list':
        case 'ask-browse-list-view':
            $('#ask').addClass('-on');
            $('#ask button').addClass('-on');
            $('#ask-browse').addClass('-on');
            $('#teaching-teacher-header').removeClass('no_display');
            break;

        //解惑平臺 / 我要發問
        case 'ask-ask-field':
        case 'ask-ask-subject':
        case 'ask-ask-grade-group':
        case 'ask-ask-unit':
        case 'ask-ask-section':
        case 'ask-ask-question':
            $('#ask').addClass('-on');
            $('#ask button').addClass('-on');
            $('#ask-ask').addClass('-on');
            $('#teaching-teacher-header').removeClass('no_display');
            break;

        //解惑平臺 / 發問紀錄
        case 'ask-record-list':
        case 'ask-record-view':
            $('#ask').addClass('-on');
            $('#ask button').addClass('-on');
            $('#ask-record').addClass('-on');
            break;

        //解惑平臺 / 勘誤紀錄
        case 'ask-wrong-list':
        case 'ask-wrong-list-view':
            $('#ask').addClass('-on');
            $('#ask button').addClass('-on');
            $('#ask-wrong').addClass('-on');
            break;

        //解惑平臺 / 點數紀錄
        case 'ask-point-list':
            $('#ask').addClass('-on');
            $('#ask button').addClass('-on');
            $('#ask-point').addClass('-on');
            break;

        //我的學習 / 學習計畫
        case 'my-plan-list':
        case 'my-plan-homework':
            $('#my').addClass('-on');
            $('#my button').addClass('-on');
            $('#my-plan').addClass('-on');
            $('#my-plan-header').removeClass('no_display');
            if (sidebarValue == 'my-plan-list') $('#my-plan-list-header').addClass('-on');
            if (sidebarValue == 'my-plan-homework') $('#my-plan-homework-header').addClass('-on');
            break;

        //我的學習 / 學習記錄
        case 'my-record-river-time':
        case 'my-record-river-video':
        case 'my-record-river-answer':
        case 'my-record-wrong-list':
        case 'my-record-wrong-exam':
        case 'my-record-score-list':
        case 'my-record-score-view':
            $('#my').addClass('-on');
            $('#my button').addClass('-on');
            $('#my-record').addClass('-on');
            $('#my-record-header').removeClass('no_display');
            if (sidebarValue == 'my-record-river-time') $('#my-record-river-time-header').addClass('-on');
            if (sidebarValue == 'my-record-river-video') $('#my-record-river-video-header').addClass('-on');
            if (sidebarValue == 'my-record-river-answer') $('#my-record-river-answer-header').addClass('-on');
            if (sidebarValue == 'my-record-wrong-list') $('#my-record-wrong-list-header').addClass('-on');
            if (sidebarValue == 'my-record-wrong-exam') $('#my-record-wrong-list-header').addClass('-on');
            if (sidebarValue == 'my-record-score-list') $('#my-record-score-list-header').addClass('-on');
            if (sidebarValue == 'my-record-score-view') $('#my-record-score-list-header').addClass('-on');
            break;

        //我的學習 / 我的收藏
        case 'my-collection-list':
        case 'exam-collection-exam':
            $('#my').addClass('-on');
            $('#my button').addClass('-on');
            $('#my-collection').addClass('-on');
            $('#my-collection-header').removeClass('no_display');
            if (outline_type_id == '1') $('#my-collection-teaching-teacher').addClass('-on');
            if (outline_type_id == '2') $('#my-collection-teaching-live').addClass('-on');
            if (outline_type_id == '3') $('#my-collection-exam').addClass('-on');
            if (sidebarValue == 'exam-collection-exam') $('#my-collection-exam').addClass('-on');
            if (outline_type_id == '4') $('#my-collection-digital-handout').addClass('-on');
            if (outline_type_id == '9') $('#my-collection-digital-interactive-experiment').addClass('-on');

			if (window.localStorage['education_id']==1) {
				$('#my-collection-teaching-teacher').text('看課程');
				$('#my-collection-teaching-live').parent().hide();
				$('#my-collection-digital-handout').text('讀教材').parent().hide()
			}
            break;

        //我的學習 / 我的筆記
        case 'my-note-field':
        case 'my-note-subject':
        case 'my-note-grade-group':
        case 'my-note-unit':
        case 'my-note-section':
        case 'my-note-list':
        case 'my-note-list-view':
        case 'my-note-1200':
            $('#my').addClass('-on');
            $('#my button').addClass('-on');
            $('#my-note').addClass('-on');
            $('#teaching-teacher-header').removeClass('no_display');
            break;

        default:
            break;
    }

    // 設定側邊欄連結
    switch (location.pathname.toLowerCase().split('/')[2]) {
        // 領域 / 科目
        case 'teaching-teacher-subject':
        case 'exam-practice-subject':
        case 'exam-paper-subject':
        case 'digital-handout-subject':
        case 'ask-browse-subject':
        case 'ask-ask-subject':
        case 'my-note-subject':
            $("#teaching-teacher").attr("href", "/teaching/teaching-teacher-subject?outline_id=" + bs.getUrlVar("outline_id"));
            $("#exam-practice").attr("href", "/exam/exam-practice-subject?outline_id=" + bs.getUrlVar("outline_id"));
            $("#exam-paper").attr("href", "/exam/exam-paper-subject?outline_id=" + bs.getUrlVar("outline_id"));
            $("#digital-handout").attr("href", "/digital/digital-handout-subject?outline_id=" + bs.getUrlVar("outline_id"));
            $("#ask-browse").attr("href", "/ask/ask-browse-subject?outline_id=" + bs.getUrlVar("outline_id"));
            $("#ask-ask").attr("href", "/ask/ask-ask-subject?outline_id=" + bs.getUrlVar("outline_id"));
            $("#my-note").attr("href", "/my/my-note-subject?outline_id=" + bs.getUrlVar("outline_id"));
            break;

        // 領域 / 科目 / 年級/群組
        case 'teaching-teacher-grade-group':
        case 'exam-practice-grade-group':
        case 'exam-paper-grade-group':
        case 'digital-handout-grade-group':
        case 'ask-browse-grade-group':
        case 'ask-ask-grade-group':
        case 'my-note-grade-group':
            $("#teaching-teacher").attr("href", "/teaching/teaching-teacher-grade-group?outline_id=" + bs.getUrlVar("outline_id"));
            $("#exam-practice").attr("href", "/exam/exam-practice-grade-group?outline_id=" + bs.getUrlVar("outline_id"));
            $("#exam-paper").attr("href", "/exam/exam-paper-grade-group?outline_id=" + bs.getUrlVar("outline_id"));
            $("#digital-handout").attr("href", "/digital/digital-handout-grade-group?outline_id=" + bs.getUrlVar("outline_id"));
            $("#ask-browse").attr("href", "/ask/ask-browse-grade-group?outline_id=" + bs.getUrlVar("outline_id"));
            $("#ask-ask").attr("href", "/ask/ask-ask-grade-group?outline_id=" + bs.getUrlVar("outline_id"));
            $("#my-note").attr("href", "/my/my-note-grade-group?outline_id=" + bs.getUrlVar("outline_id"));
            break;

        // 領域 / 科目 / 年級/群組 / 單元
        case 'teaching-teacher-unit':
        case 'exam-practice-unit':
        case 'exam-paper-unit':
        case 'digital-handout-unit':
        case 'ask-browse-unit':
        case 'ask-ask-unit':
        case 'my-note-unit':
            $("#teaching-teacher").attr("href", "/teaching/teaching-teacher-unit?outline_id=" + bs.getUrlVar("outline_id"));
            $("#exam-practice").attr("href", "/exam/exam-practice-unit?outline_id=" + bs.getUrlVar("outline_id"));
            $("#exam-paper").attr("href", "/exam/exam-paper-unit?outline_id=" + bs.getUrlVar("outline_id"));
            $("#digital-handout").attr("href", "/digital/digital-handout-unit?outline_id=" + bs.getUrlVar("outline_id"));
            $("#ask-browse").attr("href", "/ask/ask-browse-unit?outline_id=" + bs.getUrlVar("outline_id"));
            $("#ask-ask").attr("href", "/ask/ask-ask-unit?outline_id=" + bs.getUrlVar("outline_id"));
            $("#my-note").attr("href", "/my/my-note-unit?outline_id=" + bs.getUrlVar("outline_id"));
            break;

		// 領域 / 科目 / 年級/群組 / 單元 / 節
	    case 'teaching-teacher-section':
	    case 'exam-practice-section':
	    case 'exam-paper-section':
	    case 'digital-handout-section':
	    case 'ask-browse-section':
	    case 'ask-ask-section':
	    case 'my-note-section':
	        $("#teaching-teacher").attr("href", "/teaching/teaching-teacher-section?outline_id=" + bs.getUrlVar("outline_id"));
	        $("#exam-practice").attr("href", "/exam/exam-practice-section?outline_id=" + bs.getUrlVar("outline_id"));
	        $("#exam-paper").attr("href", "/exam/exam-paper-section?outline_id=" + bs.getUrlVar("outline_id"));
	        $("#digital-handout").attr("href", "/digital/digital-handout-section?outline_id=" + bs.getUrlVar("outline_id"));
	        $("#ask-browse").attr("href", "/ask/ask-browse-section?outline_id=" + bs.getUrlVar("outline_id"));
	        $("#ask-ask").attr("href", "/ask/ask-ask-section?outline_id=" + bs.getUrlVar("outline_id"));
	        $("#my-note").attr("href", "/my/my-note-section?outline_id=" + bs.getUrlVar("outline_id"));
	        break;

        //我要發問
        case 'ask-browse-list':
        case 'ask-ask-question':
            $("#ask-ask").attr("href", "/ask/ask-ask-unit?outline_id=" + bs.getUrlVar("outline_id"));
            $("#my-note").attr("href", "/my/my-note-unit?outline_id=" + bs.getUrlVar("outline_id"));

        default:
            break;
    }
}

$(function () {
    'use strict';
    init();
    function init() {
        // 設定側邊欄連結
        setMainSidebarList();

        // 側邊欄選單切換
        $("aside.aside button.btn_nav").on("click", function () {
            $(this).toggleClass("-on");
            $(this).closest("li").toggleClass("-on");
            var that = $(this);
            $(this).closest("li").find("ul.sub_list").children("li").each(function (index, item) {
                $(item).find("a.sub_menu_item").each(function (other_index, other_item) {
                    if ($(other_item).hasClass("-on")) {
                        $(that).addClass("-on");
                    }
                })
            });

            // 只開啟目前點擊的項目，其它關閉
            var nav_list = $(this).closest("ul.nav_list");
            $(nav_list).children("li").removeClass("-on").find("button.btn_nav").removeClass("-on");
            $(this).closest("li").addClass("-on").find("button.btn_nav").addClass("-on");
        });

        // video禁止右鍵叫出選單
        $('.video-js').bind('contextmenu', function () {
            return false;
        });

        // video.js HELP_IMPROVE_VIDEOJS disable
        Object.defineProperty(window, "HELP_IMPROVE_VIDEOJS", {
            get: function () {
                debugger; // trace the call stack
                return false
            }
        });

        // 避免點擊slider後停住
        $(document).on("click", "div.slick-slide a.item_link", function () {
            $(this).blur();
        });

        // 防止網址被iframe
        if (window != parent) {
            window.top.location.href = window.location.href;
        }
    }
});

function searchCheck() {
    if ($.trim($("#q").val()) == "") {
        alert("請輸入查詢關鍵字");
        return false;
    }
    return true;
}

// 留言區
$(function () {

    // 計算 div.msg_list_block 的高度
    var calc_msg_list_block_height = function () {
        var msg_list_block_height = $("#msg_article div.content_block").height() - $("#msg_article div.admin_msg").outerHeight();
        $("#msg_article div.msg_list_block").css("height", msg_list_block_height + "px");
        $('#msg_article div.msg_list_block').scrollTop($('#msg_article div.msg_list_block')[0].scrollHeight);
    };

    // 留言 question mark
    $("button.btn_q_mark").on("click", function () {
        $(this).closest("div.btn_q_mark_parent").find("div.service_info_block").toggleClass("no_display");
    });

    // 留言的訊息框開關
    $("a.toggle_msg, #msg_article button.btn_close").on("click", function (e) {
        e.preventDefault();

        // 取得留言
        getUserMessage();


        $("#msg_article").toggleClass("no_display");
        calc_msg_list_block_height();
    });

    // 選擇檔案
    $("button.btn_msg_upload").on("click", function () {
        $("#um_img").click();
    });

    // 開始上傳
    $("#um_img").change(function () {
		if(!bs.checkImgFile(this)){
			return false;
		}
        newUserMessage(0);
    });

    // 留言
    $("button.btn_send_msg").on("click", function () {
        newUserMessage(1);
    });

    function getUserMessage() {
        $.ajax({
            url: '/site/get-user-message',
            type: 'POST',
            contentType: 'application/json',
            success: function (res) {
                // 執行成功要做的事
                $("#user_msg_list").html("");
                var userMessageHtml = '';
                var userMessageData = res.data;
                for (var i = 0; i < userMessageData.length; i++) {
                    var msgDate = new Date(userMessageData[i]['created_at'] * 1000);
                    var oneMessageHtml = '';
                    if (userMessageData[i]["content"] != "") {
                        oneMessageHtml += userMessageData[i]["content"];
                    }
                    if (userMessageData[i]["img"] != "") {
                        oneMessageHtml += '<span style="width: 120px; height: 120px; text-align: center; display:flex; align-items:center; justify-content:center;">';
                        oneMessageHtml += '<a href="#" class="msg-img" data-img="' + userMessageData[i]["img"] + '">';
                        oneMessageHtml += '<img src="' + userMessageData[i]["img"] + '" class="msgBlockImage" style="max-width: 120px; max-height: 120px;" />';
                        oneMessageHtml += '</a>';
                        oneMessageHtml += '</span>';
                    }
                    if (userMessageData[i]["link"] != "") {
                        oneMessageHtml += '<a href="' + userMessageData[i]["link"] + '" target="_blank">' + userMessageData[i]["link"] + '</a>';
                    }
                    if (userMessageData[i]["admin_id"] != 0) {
						let msgClass = (parseInt(userMessageData[i]["is_head"])==1)?'-others':'-school';
                        userMessageHtml += '<li class="'+msgClass+'">';
                        userMessageHtml += '<div class="msg_block">';
                        userMessageHtml += '<div class="msg_bubble">';
                        userMessageHtml += oneMessageHtml;
                        userMessageHtml += '</div>';
                        userMessageHtml += '<div class="time_block">';
                        userMessageHtml += '<span class="date">' + msgDate.getFullYear() + "/" + (msgDate.getMonth() + 1) + "/" + msgDate.getDate() + '</span>';
                        userMessageHtml += '<span class="time">' + ((msgDate.getHours().toString().length == 1) ? "0" : "") + msgDate.getHours() + ":" + ((msgDate.getMinutes().toString().length == 1) ? "0" : "") + msgDate.getMinutes() + '</span>';
                        userMessageHtml += '</div>';
                        userMessageHtml += '</div>';
                        userMessageHtml += '</li>';
                    } else {
                        userMessageHtml += '<li class="-own">';
                        userMessageHtml += '<div class="msg_block">';
                        userMessageHtml += '<div class="time_block">';
                        userMessageHtml += '<span class="date">' + msgDate.getFullYear() + "/" + (msgDate.getMonth() + 1) + "/" + msgDate.getDate() + '</span>';
                        userMessageHtml += '<span class="time">' + ((msgDate.getHours().toString().length == 1) ? "0" : "") + msgDate.getHours() + ":" + ((msgDate.getMinutes().toString().length == 1) ? "0" : "") + msgDate.getMinutes() + '</span>';
                        userMessageHtml += '</div>';
                        userMessageHtml += '<div class="msg_bubble">';
                        userMessageHtml += oneMessageHtml;
                        userMessageHtml += '</div>';
                        userMessageHtml += '</div>';
                        userMessageHtml += '</li>';
                    }
                }
                $(".user_msg_list").html(userMessageHtml);
                calc_msg_list_block_height();
                $(".txtNewMessage").hide();
                setTimeout(function () {
                    $('.user_msg_list').scrollTop($('.user_msg_list').prop("scrollHeight"));
                }, 1000);

                $('.msg-img').on('click', function (e) {
                    e.preventDefault();
                    showLargeImage($(this).attr('data-img'));
                });
            },
            error: bs.errorHandler
        });
    }

    // 留言點擊顯示大圖
    function showLargeImage(u) {
        $('#user_message_large img').attr("src", u);
        $('#user_message_large').modal();
    }

    // 新增學生留言
    function newUserMessage(t) {

        if (t == 0) {
            if ($('#um_img').get(0).files.length < 0) {
                return false;
            }
        } else {
            if (!$('#um_content').val()) {
                return false;
            }
        }

        var formdata = new FormData();
        formdata.append('upload_type', t);
        formdata.append('msg_content', $('#um_content').val());
        var files = $('#um_img').get(0).files;
        if (files.length > 0) {
            formdata.append('file', files[0]);
        }

        $.ajax({
            url: '/site/new-user-message',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function (res) {
                $('#um_content').val('');
                $('#um_img').val('');
                getUserMessage();
            },
            error: bs.errorHandler
        });
    }
});

$(function () {
    getHomeApp();
})

$(function () {
    // 切換搜尋
    $("a.btn_search").on("click", function (e) {
        e.preventDefault();
        $(this).closest("header.header").find("div.search_bar").toggleClass("no_display");
    });

    // 搜尋
    $("input.text_search").on("keyup", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            $(this).closest("form").submit();
        }
    });

    // 星等評價
    $("ul.star_list").find("button.btn_star").on("click", function () {
        var star_num = $(this).attr("data-star");
        var el_star_list = $(this).closest("ul.star_list");
        $(el_star_list).find("button.btn_star").removeClass("-on");
        $(el_star_list).children("li").each(function (index) {
            if (index + 1 <= star_num) {
                $(this).find("button.btn_star").addClass("-on");
            }
        });
    });
});
