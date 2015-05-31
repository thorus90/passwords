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
			    		decrypted = decrypt($(this).html());
                        $(this).text(decrypted);
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
		$("#PasswordEditForm #url").val($(".entry[password_id=" + passwordid + "]").children().html());
		$("#PasswordEditForm #username").val($(".entry[password_id=" + passwordid + "]").children().next().html());
		$("#PasswordEditForm #email").val($(".entry[password_id=" + passwordid + "]").children().next().next().html());
		$("#PasswordEditForm #password").val($(".entry[password_id=" + passwordid + "]").children().next().next().next().html());
		$("#PasswordEditForm #comment").val($(".entry[password_id=" + passwordid + "]").children().next().next().next().next().html());
		$("#PasswordEditForm #type").val($(".entry[password_id=" + passwordid + "]").children().next().next().next().next().next().html());
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
					'URL': $.trim($('#PasswordAddForm #url').val()),
					'username': encrypt($.trim($('#PasswordAddForm #username').val())),
					'email': encrypt($.trim($('#PasswordAddForm #email').val())),
					'password': encrypt($.trim($('#PasswordAddForm #password').val())),
					'comment': $('#PasswordAddForm #comment').val(),
                    'type': $('#PasswordAddForm [name="type"]').val(),
					'password_list_id': $('#PasswordAddForm #password-list-id').val()
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
				'URL': $.trim($('#PasswordEditForm #url').val()),
				'username': encrypt($.trim($('#PasswordEditForm #username').val())),
				'email': encrypt($.trim($('#PasswordEditForm #email').val())),
				'password': encrypt($.trim($('#PasswordEditForm #password').val())),
				'comment': $('#PasswordEditForm #comment').val(),
				'password_list_id': $('#PasswordEditForm #password-list-id').val(),
				'type': $('#PasswordEditForm [name="type"]').val()
			},
			function (data){
				changeMessageBox(data);
				$.magnificPopup.close();
                search_for_password($("#search").val());
			}
		);
    }
        
	$('#PasswordEditForm input').keyup(function(event){
        event.preventDefault();
		if(event.keyCode == '13') {
            edit_password();
		}
	});

    $('#PasswordEditForm').submit(function(){
        event.preventDefault();
        edit_password();
    });

    $('body').on('click', '#PasswordAddType', function()
    {
        event.preventDefault();
        if ( typeof pressed == 'undefined' || pressed == false )
        {
            $(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
            $('#type').attr("name","");
            $(this).parent().parent().after('<div class="col-lg-9 col-lg-offset-2"><input name="type" class="form-control" type="text" id="PasswordTypeNew" required="required"></div>');
            $(this).html('<span class="glyphicon glyphicon-minus"></span>');
            pressed = true;
        }
        else
        {
            $(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
            $('#PasswordTypeNew').parent().remove();
            $('#type').attr("name","type");
            $(this).html('<span class="glyphicon glyphicon-plus"></span>');
            pressed = false;
        }
    });
});
