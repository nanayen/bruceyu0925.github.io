/**
 * 新增我的收藏
 */
function newUserCollection(outline_type_id, outline_id, outline_detail_id, quiz_id, handout_id, experiment_id, video_from) {
	var result = false;
	var dataObj = {};
	dataObj.outline_type_id = outline_type_id;
	dataObj.outline_id = outline_id;
	dataObj.outline_detail_id = outline_detail_id;
	dataObj.quiz_id = quiz_id;
	dataObj.handout_id = handout_id;
	dataObj.experiment_id = experiment_id;
	dataObj.video_from = video_from;
	$.ajax({
		url: '/my/new-usercollection',
		data: JSON.stringify(dataObj),
		type: 'POST',
		contentType: 'application/json',
		async: false,
		//cache: false,
		//timeout: 30000,
		beforeSend: function () {
			//bs.disableSubmits(true);
		},
		success: function (r) {
			result = true;
		},
		error: bs.errorHandler,
		complete: function () {
			//bs.disableSubmits(false);
		}
	});
	return result;
}

/**
 * 移除我的收藏
 */
function delUserCollection(user_collection_id) {
	var result = false;
	var dataObj = {};
	dataObj.user_collection_id = user_collection_id;
	$.ajax({
		url: '/my/delete-usercollection',
		data: JSON.stringify(dataObj),
		type: 'POST',
		contentType: 'application/json',
		async: false,
		//cache: false,
		//timeout: 30000,
		beforeSend: function () {
			//bs.disableSubmits(true);
		},
		success: function (r) {
			result = true;
		},
		error: bs.errorHandler,
		complete: function () {
			//bs.disableSubmits(false);
		}
	});
	return result;
}
