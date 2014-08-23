$(document).ready(function(){

	function search_for_password(needle) {
		$.get(
				"/passwords/search",
				{
					needle: needle,
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
			type: 'POST',
			url: '/passwords/search/',
			data: 
				{
					needle: "DEFAULT",
					check: "true" 
				},
			success: function(data){
					check = data.split('_');
					if (decrypt(password,check[0]) !== "Username" || decrypt(password,check[1]) !== "email@example.com" || decrypt(password,check[2]) !== "Password")
					{
						console.log('Password incorrect');
						//changeMessageBox("2/Password incorrect!");
					}
				}
		});
	}
/*	
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
*/
	$('#password').keyup(function(event){ //wenn taste losgelassen wird
		if(event.keyCode == '13') { //Pruefung auf enter
			password=$('#password').val();
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
		$.post(
				"/passwords/add",
				{
					
				},
				function (data){
					$('#mask_new').html(data);
				}
		);
		$("#mask_new").removeClass("hide");
	});

	$('body #PasswordAddForm').on('submit', function(event)
	{
		event.preventDefault();
		$.post(
				"/passwords/php/add",
				{
					'data[Password][URL]': $.trim($('#PasswordURL').val()),
					'data[Password][username]': encrypt(password,$.trim($('#PasswordUsername').val())),
					'data[Password][email]': encrypt(password,$.trim($('#PasswordEmail').val())),
					'data[Password][password]': encrypt(password,$.trim($('#PasswordPassword').val())),
					'data[Password][comment]': $('#PasswordComment').val()
				},
				function (data){
					$("#mask_new").hide("slow");
				
				}
			);
			blockButton($("#PasswordSubmit"), 3);
	});
	
	/*$("#delete_password").click(function(){
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
*/
});
