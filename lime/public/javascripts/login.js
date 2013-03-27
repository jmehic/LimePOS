$(function(){
	$("#create").on("click",function(){
		var $form = $("form");
		$form.attr("action","/create");
		$form.submit();
	});
});
