var switch_page_remainder = 0 // 按上一題、下一題時，判斷是否要到下個 20 題

$(function () {
    'use strict';
    init();

    function init() {

		window.document.body.onbeforeunload = function() {
			return false;
		}

        getDataList();

        // 加入或移除收藏
        $('a.tag_plus').on('click', function (e) {
            e.preventDefault()
            if ($(this).attr('data-status') == '0') {
                if (newUserCollection(g_obj.db_practice_ot_id, $(this).attr('data-section_id'), '', $(this).attr('data-quiz_id'), '', '', '')) {
                    $(this).toggleClass('-on');
                    getUsercollectionForTest(g_obj.db_practice_ot_id, $(this).attr('data-section_id'), $(this).attr('data-quiz_id'), 'tag_plus_' + $(this).attr('data-quiz_id'))
                } else {
                    alert('加入失敗')
                }
            } else {
                if (delUserCollection($(this).attr('data-user_collection_id'))) {
                    $(this).toggleClass('-on')
                    getUsercollectionForTest(g_obj.db_practice_ot_id, $(this).attr('data-section_id'), $(this).attr('data-quiz_id'),'tag_plus_' + $(this).attr('data-quiz_id'))
                } else {
                    alert('移除失敗')
                }
            }
        })
    }

    function getDataList() {
        var dataObj = {};
        dataObj.outline_type_id = g_obj.db_practice_ot_id;
        // quizpaper_type_id:0為錯題訂正, 1為考試測驗, 2為隨堂練習
        dataObj.quizpaper_type_id = 1;
        if (bs.getUrlVar("pid") != '') {
            // 卷號考試
            dataObj.pid = bs.getUrlVar("pid");
			dataObj.plan_id=bs.getUrlVar('plan_id');
            dataObj.task_id=bs.getUrlVar('task_id');
        } else {
            // 類別出題
            dataObj.exam_type = bs.getUrlVar("exam_type");
            dataObj.outline_id = bs.getUrlVar("outline_id");
            dataObj.outline_ids = window.localStorage["String_Check_Value"];
            dataObj.difficult_easy_qty = bs.getUrlVar("difficult_easy_qty");
            dataObj.difficult_medium_qty = bs.getUrlVar("difficult_medium_qty");
            dataObj.difficult_hard_qty = bs.getUrlVar("difficult_hard_qty");
            dataObj.difficult_for_auto = bs.getUrlVar("difficult_for_auto");
            dataObj.priority_video_for_auto = bs.getUrlVar("priority_video_for_auto");
            dataObj.priority_never_for_auto = bs.getUrlVar("priority_never_for_auto");
            dataObj.plan_id=bs.getUrlVar('plan_id');
            dataObj.task_id=bs.getUrlVar('task_id');
            dataObj.exam_type=bs.getUrlVar('exam_type');
            dataObj.q_ids=bs.getUrlVar('q_ids');
        }
        $.ajax({
            url: '/frontend-util/get-exam-paper',
            data: JSON.stringify(dataObj),
            type: 'POST',
            contentType: 'application/json',
            async: false,
            //cache: false,
            timeout: 30000,
            beforeSend: function () {
                //bs.disableSubmits(true);
            },
			success: function (r) {
				if (r.quiz.length > 0) {
					var rangeTitle = '';
					var rangeList = [];
					var questionHtml = '', questionCountHtml = '', questionAnswerHtml = '', questionExplainHtml = '',
					questionHiddenField = ''
					var temp_parent_id=0;
					var temp_sort=0;
					$.each(r.quiz, function (i, item) {

						//題號
						questionCountHtml += '<li class="btn_circle btn_circle_' + (i + 1) + '">';

						questionCountHtml += ' <button type="button" onclick="btn_count_click(' + (i + 1) + ')" class="btn_count_' + (i + 1) + ' btn_count' + ((i == 0) ? ' -on' : '') +
						 '" data-tab-target="tab_' + (i + 1) + '" data-index="' + (i + 1) + '" data-quiz_id="'+item.id+'">';

						temp_sort++;
						if (item.parent_id!=0) {
							if (temp_parent_id==item.parent_id) {
								temp_sort--;
							}
							else {
								temp_parent_id=item.parent_id;
							}
						}

						questionCountHtml += '  <span class="-circle">' + temp_sort + '</span>'
						questionCountHtml += ' </button>'

						questionCountHtml += '</li>'

						//題目區
						questionHtml += '<div class="data_tab tab_' + (i + 1) + ((i != 0) ? ' -none' : '') + '" data-quiz_category_id="' + item.quiz_category_id + '">';
						questionHtml += '<div class="q_content">'
						questionHtml += '<div class="left_block">'
						questionHtml += '<span class="info1">第 ' + temp_sort + ' 題</span>'
						questionHtml += '<span class="info2">' + item.quiz_category_name + '</span>'

						if (item.audio_path != '') {
							questionHtml += '<button type="button" onclick="document.getElementById(\'audio_' + (i + 1) + '\').play();" class="btn_audio"><img src="/images/icon/btn_audio.svg"></button>';
							questionHtml += '<audio id="audio_' + (i + 1) + '" src="' + item.audio_path + '" />';
						}

						questionHtml += `<a href="#" id="tag_plus_${item.id}" data-section_id="${item.section_id}"  data-outline_id="${item.outline_id}" data-quiz_id="${item.id}" `
						if (item.uc_id) {
							questionHtml += `class="tag_plus -on" data-status="1" data-user_collection_id="${item.uc_id}"`
						} else {
							questionHtml += `class="tag_plus" data-status="0"`
						}
						questionHtml += '>'

						if (item.education_id!=1) {
							questionHtml += '<img src="/images/icon/icon_tag_plus.svg" class="-plus"><img src="/images/icon/icon_tag_cancel.svg" class="-cancel">'
						}
						else {
							questionHtml += '<img src="/images/icon/icon_tag_plus_ele.svg" class="-plus"><img src="/images/icon/icon_tag_cancel_ele.svg" class="-cancel">'
						}

						questionHtml += '</a>'

						//End of left_block
						questionHtml += '</div>'

						questionHtml += '<div class="right_block" style="background:#FFF;min-height:390px">'

						// 題目
						var qg_html_static=(item.qg_html_static)?'<div class="question-content qg-content">' + item.qg_html_static + '</div>':'';

						questionHtml += '<p class="para"><div class="container">'+qg_html_static+'<div class="question-content qa-content">' + item.qa_html_static + '</div>'

						// 題目選項
						var q_options_1 = '1';
						var q_options_2 = '2';
						var q_options_3 = '3';
						var q_options_4 = '4';
						var q_options_5 = '5';
						if ((item.education_id == 2) || (item.education_id == 3)) {
							q_options_1 = 'A';
							q_options_2 = 'B';
							q_options_3 = 'C';
							q_options_4 = 'D';
							q_options_5 = 'E';
						}
						if ((item.qa_a_html_static != '') && (item.qa_a_html_static != null)) {
							questionHtml += '<div class="answer"><div class="answer-option">(' + q_options_1 + ')</div><div class="answer-content">' + item.qa_a_html_static + '</div></div>';
						}
						if ((item.qa_b_html_static != '') && (item.qa_b_html_static != null)) {
							questionHtml += '<div class="answer"><div class="answer-option">(' + q_options_2 + ')</div><div class="answer-content">' + item.qa_b_html_static + '</div></div>';
						}
						if ((item.qa_c_html_static != '') && (item.qa_c_html_static != null)) {
							questionHtml += '<div class="answer"><div class="answer-option">(' + q_options_3 + ')</div><div class="answer-content">' + item.qa_c_html_static + '</div></div>';
						}
						if ((item.qa_d_html_static != '') && (item.qa_d_html_static != null)) {
							questionHtml += '<div class="answer"><div class="answer-option">(' + q_options_4 + ')</div><div class="answer-content">' + item.qa_d_html_static + '</div></div>';
						}
						if ((item.qa_e_html_static != '') && (item.qa_e_html_static != null)) {
							questionHtml += '<div class="answer"><div class="answer-option">(' + q_options_5 + ')</div><div class="answer-content">' + item.qa_e_html_static + '</div></div>';
						}

						questionHtml += '<div class="answer" id="explain_' + (i + 1) + '" style="display:none"><div class="answer-content aa-content">' + item.aa_html_static + '</div></div>';
						

						//End of left_block
						questionHtml += '</div>';
						//End of q_content
						questionHtml += '</div>'
						//End of data_tab
						questionHtml += '</div>'

						questionHtml += '<div class="answer_block_container">'
						questionHtml += '<div class="answer_block">'
						questionHtml += '<button type="button" onclick="btn_click_left(' + (i + 1) + ');" class="btn_answer_move btn_left"></button>'
						questionHtml += '<ul class="q_answer_list q_answer_list_' + (i + 1) + '" data-original-index="0" data-section_id="' + item.section_id + '" data-outline_id="' + item.outline_id + '" data-quiz_category_id="' + item.quiz_category_id + '" data-quiz_id="' + item.id + '" data-parent_id="' + item.parent_id + '">'

						if ((item.qa_a_html_static != '') && (item.qa_a_html_static != null)) {
							var q_options_view = q_options_1;
							questionHtml += '<li><button type="button" onclick="btn_answer_click(' + (i + 1) + ', \'1\', ' + item.quiz_category_id + ')" class="btn_answer btn_answer_' + (i + 1) + ' btn_answer_' + (i + 1) + '_1" data-value="' + q_options_view + '">' + q_options_view + '</button></li>'
						}
						if ((item.qa_b_html_static != '') && (item.qa_b_html_static != null)) {
							var q_options_view = q_options_2;
							questionHtml += '<li><button type="button" onclick="btn_answer_click(' + (i + 1) + ', \'2\', ' + item.quiz_category_id + ')" class="btn_answer btn_answer_' + (i + 1) + ' btn_answer_' + (i + 1) + '_2" data-value="' + q_options_view + '">' + q_options_view + '</button></li>'
						}
						if ((item.qa_c_html_static != '') && (item.qa_c_html_static != null)) {
							var q_options_view = q_options_3;
							questionHtml += '<li><button type="button" onclick="btn_answer_click(' + (i + 1) + ', \'3\', ' + item.quiz_category_id + ')" class="btn_answer btn_answer_' + (i + 1) + ' btn_answer_' + (i + 1) + '_3" data-value="' + q_options_view + '">' + q_options_view + '</button></li>'
						}
						if ((item.qa_d_html_static != '') && (item.qa_d_html_static != null)) {
							var q_options_view = q_options_4;
							questionHtml += '<li><button type="button" onclick="btn_answer_click(' + (i + 1) + ', \'4\', ' + item.quiz_category_id + ')" class="btn_answer btn_answer_' + (i + 1) + ' btn_answer_' + (i + 1) + '_4" data-value="' + q_options_view + '">' + q_options_view + '</button></li>'
						}
						if ((item.qa_e_html_static != '') && (item.qa_e_html_static != null)) {
							var q_options_view = q_options_5;
							questionHtml += '<li><button type="button" onclick="btn_answer_click(' + (i + 1) + ', \'5\', ' + item.quiz_category_id + ')" class="btn_answer btn_answer_' + (i + 1) + ' btn_answer_' + (i + 1) + '_5" data-value="' + q_options_view + '">' + q_options_view + '</button></li>'
						}

						if (item.quiz_category_id==4) {
							var q_options_view = q_options_1;
							questionHtml += '<li><button type="button" onclick="btn_answer_click(' + (i + 1) + ', \'1\', ' + item.quiz_category_id + ')" class="btn_answer btn_answer_' + (i + 1) + ' btn_answer_' + (i + 1) + '_1" data-value="' + q_options_view + '">對</button></li>'
							var q_options_view = q_options_2;
							questionHtml += '<li><button type="button" onclick="btn_answer_click(' + (i + 1) + ', \'2\', ' + item.quiz_category_id + ')" class="btn_answer btn_answer_' + (i + 1) + ' btn_answer_' + (i + 1) + '_2" data-value="' + q_options_view + '">錯</button></li>'
						}

						questionHtml += '</ul>'
						questionHtml += '<button type="button" onclick="btn_click_right(' + (i + 1) + ');" class="btn_answer_move btn_right"></button>'
						questionHtml += '</div>'
						questionHtml += '<div class="n_or_p">'
						questionHtml += '<button type="button" onclick="btn_next_click(-1);" class="q_next -p -invisible">上一題</button>'
						questionHtml += '<button type="button" onclick="btn_next_click(1);" class="q_next -n">下一題</button>'
						questionHtml += '</div>'
						questionHtml += '<div class="check_again_block">'
						if (item.quiz_category_id==4) {
							questionHtml += '<button type="button" onclick="btn_show_answer_click(' + (i + 1) + ');" class="btn_q_show_answer" id="show_ans_' + (i + 1) + '">打開解答</button>&nbsp;'
						}
						questionHtml += '<button type="button" onclick="btn_check_click($(this))" class="btn_check">再檢查</button>'

						questionHtml += '</div>'
						questionHtml += '</div>'
						questionHtml += '</div>'
						i++;

						$('.q_count_list').html(questionCountHtml)
						$('.q_and_a_block_container').html(questionHtml)

						if (i > 20) {
							$('button.btn_move.btn_right').removeClass('-disabled')
						}

						rangeTitle = item.field_name + '/' + item.factory_name + '/' + item.grade_group_name + '/' + item.unit_name + '/' + item.section_name;
						rangeTitle = "<li>" + rangeTitle.trim() + "<li>";
						if ((rangeTitle.trim() != "<li><li>") && ($.inArray(rangeTitle, rangeList) === -1)) {
							rangeList.push(rangeTitle);
						}
					});
					calQuestion()
					$("#header_subject_2").text(r.quiz[0].subject_name);
					$("#range_list").html(rangeList.join(""));

				}

				// 設定導覽列
				getMainHeaderList(r, 'exam', 'exam-paper');
			},
            error: bs.errorHandler,
            complete: function () {
            }
        });
    }
});


// 題號左右滑動
$('button.btn_move.btn_right').on('click', function () {
    if (!$(this).hasClass('-disabled')) {
        var q_count_list = $(this).closest('div.q_total_block').find('ul.q_count_list')[0]
        var q_count_list_length = $(q_count_list).children('li').length // 選項總個數
        var data_original_index = parseInt($(q_count_list).attr('data-original-index'))
        var remain_length = q_count_list_length - (data_original_index + 20)
        //var next_index = data_original_index + 1;
        var move_index = (remain_length >= 20 ? 20 : remain_length)

        if (move_index < 20) {
            switch_page_remainder = move_index
        }

        if (q_count_list_length > 20) {
            $(q_count_list).children('li').animate({
                left: '-=' + (46 * move_index) + 'px'
            }, 'slow')
            $(q_count_list).attr('data-original-index', data_original_index + move_index)
        }
        $(this).closest('div.q_total_block').find('button.btn_move.btn_left').removeClass('-disabled')
        if ((data_original_index + move_index + 20) == q_count_list_length) {
            $(this).addClass('-disabled')
        } else {
            $(this).removeClass('-disabled')
        }
    }
})

$('button.btn_move.btn_left').on('click', function () {
    if (!$(this).hasClass('-disabled')) {
        var q_count_list = $(this).closest('div.q_total_block').find('ul.q_count_list')[0]
        var q_count_list_length = $(q_count_list).children('li').length // 選項總個數
        var data_original_index = parseInt($(q_count_list).attr('data-original-index'))

        var remain_length = data_original_index
        var move_index = (remain_length >= 20 ? 20 : remain_length)

        if (move_index < 20) {
            switch_page_remainder = move_index
        }

        if (data_original_index >= 1) {
            $(this).removeClass('-disabled')
            $(q_count_list).children('li').animate({
                left: '+=' + (46 * move_index) + 'px'
            }, 'slow')
            $(q_count_list).attr('data-original-index', data_original_index - move_index)
        }
        $(this).closest('div.q_total_block').find('button.btn_move.btn_right').removeClass('-disabled')
        if (data_original_index - move_index == 0) {
            switch_page_remainder = 0
            $(this).addClass('-disabled')
        } else {
            $(this).removeClass('-disabled')
        }
    }
})

// 交卷
$('button.btn_send_test').on('click', function () {
	window.document.body.onbeforeunload = function() {}
    clearTimeout(timer) // 暫停計時
    var el_all_contents_block = $(this).closest('div.all_contents_block')

    var answered = 0
    var will_check = 0
    var all_btn_count = $(el_all_contents_block).find('button.btn_count').length
    $(el_all_contents_block).find('button.btn_count').each(function (index, item) {

        if ($(item).hasClass('-answered')) {
            answered += 1
        }
        if ($(item).hasClass('-will-check')) {
            will_check += 1
        }
    })
    var un_answer = all_btn_count - answered

    $('#send_test_modal').find('span.-un-answer').html(un_answer)
    $('#send_test_modal').find('span.-will-check').html(will_check)
    if (answered == all_btn_count && will_check == 0) {
        $('#send_test_modal').find('p.para2').addClass('-none')
    } else {
        $('#send_test_modal').find('p.para2').removeClass('-none')
    }
    $('#send_test_modal').modal()
})


// 顯示數量
function calQuestion() {
    var answered = 0
    var will_check = 0
    var all_btn_count = $('button.btn_count').length
    $('button.btn_count').each(function (index, item) {

        if ($(item).hasClass('-answered')) {
            answered += 1
        }
        if ($(item).hasClass('-will-check')) {
            will_check += 1
        }
    })
    var un_answer = all_btn_count - answered
    $('.un_answer_block').html(un_answer + '題')
    $('.will_check_block').html(will_check + '題')
}

// 直接點題號
var currentQuestion = 1

function btn_count_click(q) {

	getQuizContent(q);

    var maxQuestion = $('.btn_circle').length
    currentQuestion = q

    $('.btn_circle button').removeClass('-on')
    $('.btn_circle_' + q + ' button').addClass('-on')
    // 題目分頁切換
    $('.data_tab').addClass('-none')
    $('.tab_' + q).removeClass('-none')

    if (maxQuestion == currentQuestion) {
        $('.btn_send_test').show()
    } else {
        $('.btn_send_test').hide()
    }

    btn_next_show()
}

// 上一題、下一題
function btn_next_click(x) {
    check_next_page(x)
    currentQuestion += x
    var maxQuestion = $('.btn_circle').length
    if (currentQuestion < 1) {
        currentQuestion = 1
    } else if (currentQuestion > maxQuestion) {
        currentQuestion = maxQuestion
    }
    btn_count_click(currentQuestion)
}

// 切換至下一頁或上一頁
function check_next_page(next_or_previous) {
    var total_q = $('button.btn_count').length
    var current_q_index = parseInt($('button.btn_count.-on').attr('data-index'))

    if (next_or_previous == 1) { // 表示按下一題
        if (((current_q_index - switch_page_remainder) % 20) == 0) {
            $('button.btn_move.btn_right').click()
        }
    } else if (next_or_previous == -1) { // 表示按上一題
        if (((current_q_index - switch_page_remainder) % 20) == 1) {
            $('button.btn_move.btn_left').click()
        }
    } else {
    }
}

// 顯示上一題/下一題按鈕
function btn_next_show() {
    var maxQuestion = $('.btn_count').length
    if (currentQuestion == 1) {
        $('button.q_next.-p').addClass('-invisible')
    } else {
        $('button.q_next.-p').removeClass('-invisible')
    }
    if (currentQuestion == maxQuestion) {
        $('button.q_next.-n').addClass('-invisible')
    } else {
        $('button.q_next.-n').removeClass('-invisible')
    }
}

// 答題左右滑動
function btn_click_right(q) {
    var q_answer_list = $('.q_answer_list_' + q)
    var data_original_index = parseInt($(q_answer_list).attr('data-original-index'))
    var next_index = data_original_index + 1
    if (parseInt($(q_answer_list).find('li').length) - 6 >= next_index) {
        $(q_answer_list).children('li').animate({
            left: '-=68px'
        }, 'slow')
        $(q_answer_list).attr('data-original-index', next_index)
    }
}

function btn_click_left(q) {
    var q_answer_list = $('.q_answer_list_' + q)
    var data_original_index = parseInt($(q_answer_list).attr('data-original-index'))

    if (data_original_index >= 1) {
        var next_index = data_original_index - 1
        $(q_answer_list).children('li').animate({
            left: '+=68px'
        }, 'slow')
        $(q_answer_list).attr('data-original-index', next_index)
    }
}

// 直接點答題
function btn_answer_click(q, i, tqt_id) {
    if (tqt_id == '1' || tqt_id == '3') {	// 單選
        $('.btn_answer_' + q).removeClass('-on')
        $('.btn_answer_' + q + '_' + i).addClass('-on')
        $('.btn_count_' + q).addClass('-answered')
    } else if (tqt_id == '2') {	// 多選
        if ($('.btn_answer_' + q + '_' + i).hasClass('-on')) {
            $('.btn_answer_' + q + '_' + i).removeClass('-on')
        } else {
            $('.btn_answer_' + q + '_' + i).addClass('-on')
        }

        if ($('.btn_answer_' + q).hasClass('-on')) {
            $('.btn_count_' + q).addClass('-answered')
        } else {
            $('.btn_count_' + q).removeClass('-answered')
        }
    } else if (tqt_id == '4') {	// 非選
		$('.btn_answer_' + q).removeClass('-on')
        $('.btn_answer_' + q + '_' + i).addClass('-on')
        $('.btn_count_' + q).addClass('-answered')
    }
    calQuestion()
}

function btn_show_answer_click(q){
	if ($('#explain_' + q).hasClass('-on')) {
		$('#explain_'+q).hide();
		$('#explain_'+q).removeClass('-on');
		$('#show_ans_'+q).html('打開解答');
	}
	else {
		$('#explain_'+q).show();
		$('#explain_'+q).addClass('-on');
		$('#show_ans_'+q).html('關閉解答');
	}
}

// 再檢查
function btn_check_click(o) {
    $(o).toggleClass('-on')
    $('.btn_count.-on').toggleClass('-will-check')
    calQuestion()
}

// 送出答案
var isPosted = false

function sentTestRecord() {
    if (isPosted) {
        return
    }
    var quiz_state_ary = [];
    var questions = []

    $('.q_answer_list').each(function (index2, item2) {
        var quiz_state = {};
        //原始順序
        quiz_state.origin_idx = index2;
        //實際試卷順序
        quiz_state.data_idx = index2;
        //quiz_id
        quiz_state.quiz_id = $(item2).attr('data-quiz_id')
        quiz_state.parent_id = $(item2).attr('data-parent_id')
        quiz_state.outline_id = $(item2).attr('data-outline_id')
        quiz_state.quiz_category_id = $(item2).attr('data-quiz_category_id')
        //確定有無勾選
        quiz_state.checked = 0;
        //答案
        var my_ans = '';
        $(this).find('button.btn_answer.-on').each(function (index, item) {
            if (my_ans == '') {
                my_ans = $(item).attr('data-value');
            } else {
                my_ans = my_ans + ';' + $(item).attr('data-value');
            }
            my_ans = my_ans.replaceAll("A", "1");
            my_ans = my_ans.replaceAll("B", "2");
            my_ans = my_ans.replaceAll("C", "3");
            my_ans = my_ans.replaceAll("D", "4");
            my_ans = my_ans.replaceAll("E", "5");
        })
        if (my_ans == '') {
            quiz_state.user_ans = '-';
        } else {
            quiz_state.user_ans = my_ans;
        }
        //待檢查
        if ($('.tab_' + (index2 + 1)).children(".answer_block_container").children(".check_again_block").find('button.btn_check.-on').length == 1) {
            quiz_state.need_check = 1;
        } else {
            quiz_state.need_check = 0;
        }

        //秒數
        quiz_state.costsec = parseInt(timerArray[index2], 10) || 0
        //畫掉
        quiz_state.ans_remove = [];
        quiz_state_ary.push(quiz_state);
    })

    //tyler
    if (testRecord(1, $('#range_list').text(), quiz_state_ary,bs.getUrlVar("plan_id"),bs.getUrlVar("task_id"))) {
        isPosted = false
    }
}

// 測驗時間
var timer
var timerArray = []
var used_second = 0

function timerTick() {
    used_second++
    var thour = (Math.floor(used_second / 3600)).toString()
    var tminute = '0' + (Math.floor(used_second / 60)).toString()
    tminute = tminute.substring(tminute.length - 2, tminute.length)
    var tsecond = '0' + (used_second % 60).toString()
    tsecond = tsecond.substring(tsecond.length - 2, tsecond.length)
    $('.timer_block').html(((thour > 0) ? thour + ':' : '') + tminute + ':' + tsecond)
    timer = setTimeout('timerTick();', 1000)

    // 單題計時
    var tmpSecond = parseInt(timerArray[currentQuestion - 1], 10) || 0
    timerArray[currentQuestion - 1] = tmpSecond + 1
}

timer = setTimeout('timerTick();', 1000);

$('#save_record').click(function (event) {
    sentTestRecord()
    //window.location.reload()
})

function getQuizContent(index){
	var dataObj={};
	dataObj.quiz_id=$('.btn_count_'+index).attr('data-quiz_id');
	$.ajax({
		url: '/frontend-util/get-quiz-content',
		type: 'POST',
		data: JSON.stringify(dataObj),
		contentType: 'application/json',
		success: function (res) {
			const data=res;
			$('.data_tab.tab_'+index).find('.qg-content').html(data.qg_html_static);
			$('.data_tab.tab_'+index).find('.qa-content').html(data.qa_html_static);
			$('.data_tab.tab_'+index).find('.aa-content').html(data.aa_html_static);
		},
		error: bs.errorHandler
	});
}
