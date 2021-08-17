var ol_id, tr_id

$(function () {
    // 取得頁面間傳遞參數
    ol_id = bs.getUrlVar('ol_id')
    if (typeof ol_id == 'undefined') {
        ol_id = ''
    }
    tr_id = bs.getUrlVar('tr_id')
    if (typeof tr_id == 'undefined') {
        tr_id = ''
    }
})

// 取得大綱節點下測驗數量，依難度區分
var maxLevelQty_easy = 0
var maxLevelQty_normal = 0
var maxLevelQty_difficult = 0

// 取得題目數量
function setDifficult(t) {
    var tmpLevelQty_easy = 0
    var tmpLevelQty_normal = 0
    var tmpLevelQty_difficult = 0
    switch (t) {
        case 'easy':
            tmpLevelQty_easy = 4
            tmpLevelQty_normal = 5
            tmpLevelQty_difficult = 1
            break
        case 'normal':
            tmpLevelQty_easy = 2
            tmpLevelQty_normal = 5
            tmpLevelQty_difficult = 3
            break
        case 'difficult':
            tmpLevelQty_easy = 1
            tmpLevelQty_normal = 5
            tmpLevelQty_difficult = 4
            break
    }
    $('#difficult_easy_qty').val((tmpLevelQty_easy <= maxLevelQty_easy)
        ? tmpLevelQty_easy
        : maxLevelQty_easy)
    $('#difficult_medium_qty').val((tmpLevelQty_normal <= maxLevelQty_normal)
        ? tmpLevelQty_normal
        : maxLevelQty_normal)
    $('#difficult_hard_qty').val((tmpLevelQty_difficult <= maxLevelQty_difficult)
        ? tmpLevelQty_difficult
        : maxLevelQty_difficult)
    resetButton()
}

function resetButton() {
    if (parseInt($('#difficult_easy_qty').val(), 10) +
        parseInt($('#difficult_medium_qty').val(), 10) +
        parseInt($('#difficult_hard_qty').val(), 10) >= 5) {
        $('.to_start_1').removeClass('-disabled')
    } else {
        $('.to_start_1').addClass('-disabled')
    }
    if (parseInt($('#difficult_easy_qty').val(), 10) +
        parseInt($('#difficult_medium_qty').val(), 10) +
        parseInt($('#difficult_hard_qty').val(), 10) >= 1) {
        $('.to_print_1').removeClass('-disabled')
    } else {
        $('.to_print_1').addClass('-disabled')
    }
}

// 新增測驗結果
function testReRecord(quizpaper_type_id, tr_id, quiz_state_ary) {
    var boolStatus = false
    // tr_type:0為錯題訂正, 1為考試測驗, 2為隨堂練習
    var dataObj = {};
    dataObj.quizpaper_type_id = quizpaper_type_id;
    dataObj.tr_id = tr_id;
    dataObj.quiz_state_ary = quiz_state_ary;
    /* 參考 JSON: {"token": "testToken","tr_type": "1","questions": [{"tq_id": 1,"tqr_used_second": 10,"odt_id": 1,"answers": [{"ta_id": 2}]}]} */
    $.ajax({
        url: '/frontend-util/new-exam-record',
        data: JSON.stringify(dataObj),
        type: 'POST',
        contentType: 'application/json',
        //cache: false,
        timeout: 30000,
        success: function (response) {
            console.log(response)
            switch (response.status) {
                case 1000:
                    // 執行成功要做的
                    switch (quizpaper_type_id) {
                        case 1:
                            window.location.href = './my_learn_record_score.html?ol_id=' +
                                ol_id + '&tr_id=' + response.data.tr_id + '&subject_name=' +
                                bs.getUrlVar('subject_name')
                            break
                        case 2:
                            window.location.href = './q_db_practice_unit.html?ol_id=' +
                                bs.getUrlVar('unit_ol_id') + '&field_name=' + bs.getUrlVar('field_name') +
                                '&subject_name=' + bs.getUrlVar('subject_name') + '&version_name=' +
                                bs.getUrlVar('version_name') + '&grade_group_name=' +
                                bs.getUrlVar('grade_group_name')
                            break
                        case 3:
                            window.location.href = './my_learn_record_score.html?ol_id=' +
                                ol_id + '&tr_id=' + response.data.tr_id + '&subject_name=' +
                                bs.getUrlVar('subject_name')
                            break
                    }
                    boolStatus = true
                    break
                default:
                    alert(response.msg)
                    break
            }
        }
    })
    return boolStatus
}

// 新增測驗結果
function testRecord(quizpaper_type_id, quizpaper_name, quiz_state_ary, plan_id=null, task_id=null) {
    var boolStatus = false
    // quizpaper_type_id:0為錯題訂正, 1為考試測驗, 2為隨堂練習
    var dataObj = {};
    dataObj.pid = bs.getUrlVar('pid');
    dataObj.quizpaper_type_id = quizpaper_type_id;
    dataObj.quizpaper_name = quizpaper_name;
    dataObj.quiz_state_ary = quiz_state_ary;
	dataObj.user_plan_id=(plan_id)?plan_id:0;
	dataObj.schoolclass_task_id=(task_id)?task_id:0;
    $.ajax({
        url: '/frontend-util/new-exam-record',
        data: JSON.stringify(dataObj),
        type: 'POST',
        contentType: 'application/json',
        //cache: false,
        timeout: 30000,
        success: function (r) {
            console.log(r)
            // if (r.quizresult_id)
            //   window.location.href = '/my/my-record-score-view?rid=' + r.quizresult_id;

            switch (quizpaper_type_id) {
                case 1: //考試測驗
                    if (r.quizresult_id)
                        window.location.href = '/my/my-record-score-view?rid=' + r.quizresult_id;
                    break
                case 2: //隨堂練習
                    if (r.quizresult_id)
                        window.location.href = '/exam/exam-practice-unit?outline_id=' + r.outline_id;
                    break
            }
            boolStatus = true;
        }
    })
    return boolStatus
}

// 取得測驗記錄 PDF
function getMyRecordScoreViewPdf() {
    var downloadUrl = '/my/get-my-record-score-view-pdf?rid=' + bs.getUrlVar("rid");
    // 導頁下載
    bs.downloadFile('application/pdf', downloadUrl, 1);
}

// 歷屆試題最近觀看
var getExamHistoryRecord = function (r, element_id) {
    if (r.record.length > 0) {
        var html = '';
        $.each(r.record, function (i, item) {
            html += '<li>';
            html += '  <a href="#"  class="item_link">';
            html += '    <ul class="wrong_or_not_list">'
            if (item.question_name != '')
                html += '      <li><span class="-right" data-exam_id="' + item.exam_id + '" style="width:50px; font-size:1.1rem;">試題</span></li>'
            if (item.explain_name != '')
                html += '      <li><span class="-wrong" data-exam_id="' + item.exam_id + '" style="width:50px; font-size:1.1rem;">詳解</span></li>'
            html += '    </ul>'
            html += '    <img src="' + item.img + '" class="link_img">';
            html += '    <div class="desc_block">';
            html += '      <p class="para1">' + item.subject_name + ' ' + ' ' + item.grade_group_name + '</p>';
            html += '      <p class="para2">' + item.unit_name + '</p>';
            html += '    </div>';
            html += '  </a>';
            html += '</li>';
        });
        $("#" + element_id).html(html);
    } else {
        $("#" + element_id).html("");
    }
};

// 學習單最近觀看
var getStudyListRecord = function (r, element_id) {
    if (r.record.length > 0) {
        var html = '';
        $.each(r.record, function (i, item) {
			html += '<li>';
			html += '  <a href="/frontend-util/get-exam-studylist-download?outline_id='+item.outline_id+'&study_list_id='+item.study_list_id+'" class="item_link">';
			html += '    <img src="' + item.img + '" class="link_img">';
			html += '    <div class="desc_block">';
			html += '      <p class="para1">' + item.subject_name + ' ' + ((item.factory_name!='不分版')?item.factory_name+' ':' ') + item.grade_group_name + ' ' + item.unit_name + '</p>';
			html += '      <p class="para2">' + item.section_name + '</p>';
			html += '    </div>';
			html += '  </a>';
			html += '</li>';
        });
        $("#" + element_id).html(html);
    } else {
        $("#" + element_id).html("");
    }
};

// 最近測驗
var getExamRecord = function (r, type_id, element_id) {
    console.log(r.record.data);
    var data = r.record.data;
    var html = '';

    // quizpaper_type_id:0為錯題訂正, 1為考試測驗, 2為隨堂練習
    if (type_id == 1) {
        if (data.length > 0) {
            $.each(data, function (i, item) {
                html += '<li class="' + (i < 15 ? "" : "no_display") + '">';
                html += '  <a href="/my/my-record-score-view?rid=' + item.rid + '" class="item_link">';
                html += '    <div class="top_block"><p class="para_title">' + item.subject_name + ' ' + ((item.factory_name!='不分版')?item.factory_name+' ':' ') + item.grade_group_name + '</p></div>';
                html += '    <div class="middle_block"><p class="para1">' + item.unit_name + '</p><p class="para2">' + item.section_name + '</p></div>';
                html += '    <div class="bottom_block"><p class="para_right -right">' + item.time_at + '</p><p class="para_left">' + item.created_at + '</p></div>';
                html += ((item.allscore >= 60) ? '<span class="score -more">' : '<span class="score -less">') + item.allscore + '</span>';
                html += '  </a>';
                html += '</li>';
            });
            $("#" + element_id).html(html);
        } else {
            $("#" + element_id).html("");
        }
    }

    // 隨堂練習
    if (type_id == 2) {
        if (data.length > 0) {
            $.each(data, function(i, item){
                html += '<li>';
                html += '  <a href="/exam/exam-practice-exam?pid='+item.pid+'" class="item_link">';
                html += '    <ul class="wrong_or_not_list">';

                $.each(JSON.parse(item.detail), function(j, q){
                    html += '    <li><span class="' + (q.result == 1 ? "-right" : "-wrong" ) + '">' + (parseInt(q.origin_idx)+1) + '</span></li>';
                });

                html += '    </ul>';
                html += '    <div class="desc_block">';
                html += '      <p class="para1">' + item.subject_name + ' ' + ((item.factory_name!='不分版')?item.factory_name+' ':' ') + item.grade_group_name + ' ' + item.unit_name + '</p>';
                html += '      <p class="para2">' + item.section_name + '</p>';
                html += '    </div>';
                html += '  </a>';
                html += '</li>';
            });
            $("#" + element_id).html(html);
        } else {
            $("#" + element_id).html("");
        }
    }
};
