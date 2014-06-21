$(document).ready(function(){
	function search_for_password(needle) {
		$.get(
				"/passwords/php/access_search.php",
				{
					searchstring: needle,
				},
				function (data){
					$("#accounts").html(data);
					$(".toDecrypt").each(function(){
						$(this).html(decrypt(pass,$(this).html()));
					});
					$(".entry").click(function(){
						dbid = $(this).attr("dbid");
						$(".entry").removeClass("success");
						$(this).addClass("success");
					});
				}
			);
	}

	function checkIfPasswordCorrect() {
		$.ajax({
			async: false,
			type: 'GET',
			url: '/passwords/php/access_search.php',
			data: 
				{
					searchstring: "https://user.rottmann-moebel.de",
					check: "true" 
				},
			success: function(data){
					check = data.split('_');
					if (decrypt(pass,check[0]) !== "Username" || decrypt(pass,check[1]) !== "E-Mail  " || decrypt(pass,check[2]) !== "Password")
					{
						changeMessageBox("2/Password incorrect!");
					}
				}
		});
	}
	
	function checkIfSelectedEntryIsVisible () {
		if (typeof dbid === 'undefined') {
			return false;
		}
		var exists = false
		$(".entry").each(function() {
			if ( $(this).attr("dbid") == dbid ){
				exists = true;
			}
		});
		if(exists){
			return true;
		}else{
			return false;
		}
	}

	function fillMaskModifyPassword() {
		$("#mask_modify_password_dbid").html(dbid);
		$("#mask_modify_password_url").val($(".entry[dbid=" + dbid + "]").children(".URL").children("a").attr("href"));
		$("#mask_modify_password_username").val($(".entry[dbid=" + dbid + "]").children(".accdaten").children("span").html());
		$("#mask_modify_password_email").val($(".entry[dbid=" + dbid + "]").children(".accdaten").next().children("span").html());
		$("#mask_modify_password_password").val($(".entry[dbid=" + dbid + "]").children(".accdaten").next().next().children("span").html());
		$("#mask_modify_password_notes").val($(".entry[dbid=" + dbid + "]").children(".comment").html());
	}

	$('#pass').keyup(function(event){ //wenn taste losgelassen wird
		if(event.keyCode == '13') { //Pruefung auf enter
			pass=$('#pass').val();
			checkIfPasswordCorrect()
			$("#passOverlay").toggle("fast");
			$("#searchBox").removeClass("hide");
		}
	});
	$("#search").keyup(function(){
		if($("#search").val().length > 1){
			search_for_password($("#search").val());
		}
	});
	
	$("#new_entry").click(function(){
		$("#mask_new").removeClass("hide");
		$("#addnew").click(function(){
			$.post(
				"/passwords/php/access_add.php",
				{
					url: $.trim($('#url').val()),
					user: encrypt(pass,$.trim($('#user').val())),
					email: encrypt(pass,$.trim($('#email').val())),
					pass: encrypt(pass,$.trim($('#passForNewAccount').val())),
					comment: $('#comment').val()
				},
				function (data){
					$("#mask_new").hide("slow");
					changeMessageBox(data);
				}
			);
			blockButton($("#addnew"), 3);
		});
	});
	
	$("#delete_password").click(function(){
		if (checkIfSelectedEntryIsVisible()){ 
			$.post(
				"/passwords/php/delete_password.php",
				{
					dbid: dbid
				},
				function (data){
					changeMessageBox(data);
					search_for_password($("#search").val());
				}
			);
		}else{
			changeMessageBox("1/Entry not visible anymore. Better not deleting");
		}
	});



	$('#modify_password').magnificPopup({
	  type:'inline',
	  midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	  callbacks: {
	  	open: function() {
	  		if (checkIfSelectedEntryIsVisible()){
	  			fillMaskModifyPassword();
	  		}else{
	  			changeMessageBox("1/Nothing selected yet");
	  			$.magnificPopup.close();
	  		}
	  	}
	  }
	});


	$('.mask_modify_password_submit').keyup(function(event){
		if(event.keyCode == '13') {
			$.post(
				"/passwords/php/edit_password.php",
				{
					dbid: dbid,
					url: $.trim($("#mask_modify_password_url").val()),
					username: encrypt(pass,$.trim($("#mask_modify_password_username").val())),
					email: encrypt(pass,$.trim($("#mask_modify_password_email").val())),
					password: encrypt(pass,$.trim($("#mask_modify_password_password").val())),
					notes: $("#mask_modify_password_notes").val()
				},
				function (data){
					changeMessageBox(data);
					$.magnificPopup.close();
				}
			);
		}
	});

});
