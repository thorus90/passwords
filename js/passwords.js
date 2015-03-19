$(document).ready(function(){

    passwordlistid = document.URL.split('/');
    passwordlistid = passwordlistid[passwordlistid.length - 1]

	function search_for_password(needle) 
	{
		$.post(
				"/passwords/search",
				{
					needle: needle,
                    passwordlistid: passwordlistid
				},
				function (data){
					$("#accounts").html(data);
					$(".toDecrypt").each(function(){
						$(this).html(decrypt($(this).html()));
					});
					$(".entry").click(function(){
						passwordid = $(this).attr("password_id");
						$(".entry").removeClass("success");
						$(this).addClass("success");
					});
				}
		).fail(function(failobject)
        {
            if ( failobject.status == 403 )
            {
                window.location.replace("/");
            }
        });
	}

	function checkIfPasswordCorrect() 
	{
		$.ajax({
			async: false,
			type: 'POST',
			url: '/passwords/search/',
			data: 
				{
					needle: "control.example.com",
                    passwordlistid: passwordlistid
				},
			success: function(data){
                    check = [];
                    $(data).find('.toDecrypt').each(function(index, element){
                        check.push($(element).html());
                    });
					if (decrypt(check[0]) !== "control" || decrypt(check[1]) !== "control@example.com" || decrypt(check[2]) !== "password")
					{
						changeMessageBox("2/Password incorrect!");
					}
				}
		});
	}
	
	function checkIfSelectedEntryIsVisible () {
		if (typeof passwordid === 'undefined') {
			return false;
		}
		var exists = false
		$(".entry").each(function() {
			if ( $(this).attr("password_id") == passwordid ){
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
		$("#PasswordEditForm #PasswordPasswordListId").html(passwordid);
		$("#PasswordEditForm #PasswordURL").val($(".entry[password_id=" + passwordid + "]").children().html());
		$("#PasswordEditForm #PasswordUsername").val($(".entry[password_id=" + passwordid + "]").children().next().html());
		$("#PasswordEditForm #PasswordEmail").val($(".entry[password_id=" + passwordid + "]").children().next().next().html());
		$("#PasswordEditForm #PasswordPassword").val($(".entry[password_id=" + passwordid + "]").children().next().next().next().html());
		$("#PasswordEditForm #PasswordComment").val($(".entry[password_id=" + passwordid + "]").children().next().next().next().next().html());
		$("#PasswordEditForm #PasswordType").val($(".entry[password_id=" + passwordid + "]").children().next().next().next().next().next().html());
	}

	$('#password1, #password2, #password3').keyup(function(event){ //wenn taste losgelassen wird
		if(event.keyCode == '13') { //Pruefung auf enter
			password1=$('#password1').val();
			password2=$('#password2').val();
			password3=$('#password3').val();
			checkIfPasswordCorrect()
			$("#passOverlay").toggle("fast");
			$(".PasswordListUnhideDiv").removeClass("hide");
		}
	});
	$("#search").keyup(function(){
		if($("#search").val().length > 1){
			search_for_password($("#search").val());
		}
	});
	
    $("#new_entry").magnificPopup({
        type:'inline',
        midClick: true,
        modal: false
    });

	$('#PasswordAddForm').submit(function(event)
	{
		event.preventDefault();
		$.post(
				"/passwords/add/" + passwordlistid,
				{
					'data[Password][URL]': $.trim($('#PasswordAddForm #PasswordURL').val()),
					'data[Password][username]': encrypt($.trim($('#PasswordAddForm #PasswordUsername').val())),
					'data[Password][email]': encrypt($.trim($('#PasswordAddForm #PasswordEmail').val())),
					'data[Password][password]': encrypt($.trim($('#PasswordAddForm #PasswordPassword').val())),
					'data[Password][comment]': $('#PasswordAddForm #PasswordComment').val(),
                    'data[Password][type]': $('#PasswordAddForm [name="data[Password][type]"]').val(),
					'data[Password][password_list_id]': $('#PasswordAddForm #PasswordPasswordListId').val()
				},
				function (data){
					changeMessageBox(data);
				}
		);
		blockButton($("#PasswordSubmit"), 3);
        $.magnificPopup.close();
	});
	
	$("#delete_password").click(function(){
		if (checkIfSelectedEntryIsVisible()){ 
			$.post(
				"/passwords/delete/",
				{
					password_id: passwordid
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

    function edit_password(){
		$.post(
			"/passwords/edit/" + passwordid,
			{
				'data[Password][URL]': $.trim($('#PasswordEditForm #PasswordURL').val()),
				'data[Password][username]': encrypt($.trim($('#PasswordEditForm #PasswordUsername').val())),
				'data[Password][email]': encrypt($.trim($('#PasswordEditForm #PasswordEmail').val())),
				'data[Password][password]': encrypt($.trim($('#PasswordEditForm #PasswordPassword').val())),
				'data[Password][comment]': $('#PasswordEditForm #PasswordComment').val(),
				'data[Password][password_list_id]': $('#PasswordEditForm #PasswordPasswordListId').val(),
				'data[Password][type]': $('#PasswordEditForm [name="data[Password][type]"]').val()
			},
			function (data){
				changeMessageBox(data);
				$.magnificPopup.close();
			}
		);
    }
        
	$('#PasswordEditForm input').keyup(function(event){
        event.preventDefault();
		if(event.keyCode == '13') {
            edit_password();
		}
	});

    $('#PasswordEditSubmit').click(function(){
        event.preventDefault();
        edit_password();
    });

    $('body').on('click', '#PasswordAddType', function()
    {
        event.preventDefault();
        if ( typeof pressed == 'undefined' || pressed == false )
        {
            $(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
            $('#PasswordType').attr("name","");
            $(this).parent().after('<div class="col-lg-9 col-lg-offset-2"><input name="data[Password][type]" class="form-control" type="text" id="PasswordTypeNew" required="required"></div>');
            $(this).html('<span class="glyphicon glyphicon-minus"></span>');
            pressed = true;
        }
        else
        {
            $(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
            $('#PasswordTypeNew').parent().remove();
            $(this).html('<span class="glyphicon glyphicon-plus"></span>');
            pressed = false;
        }
    });
});
