$(document).ready(function(){
    
    controlURL = 'control.example.com'
	controlComment = 'comment'
	controlType = 'website'
	
    $('body #PasswordListAddForm').on('submit', function(event)
	{
		event.preventDefault();
		password1 = $('#passwords-password1').val();
		password2 = $('#passwords-password2').val();
		password3 = $('#passwords-password3').val();
		if ( password1.length > 3 )
		{
			controlUsername = encrypt('control');
			controlEmail = encrypt('control@example.com');
			controlPassword = encrypt('password');

			$.post(
				'/PasswordLists/add/',
				{
					'name': $('#passwordlist-name').val(),
					'URL': controlURL,
					'username': controlUsername,
					'email': controlEmail,
					'password': controlPassword,
					'comment': controlComment,
					'type': controlType
				},
				function(data)
				{
					if (data.split("/")[0] == '0')
                    {
                        var form = $('<form id="flashAction" action="/PasswordLists/index/" method="post">' +
                            '<input type="text" name="flash" value="' + data + '" /></form>');
                        $('body').append(form);
                        $('#flashAction').submit(); 
                    }
                    else
                    {
                        changeMessageBox(data);
                    }
				}
			);
		}
		else
		{
			alert('Really? Please overthink your Password.. really hard.');
		}
	});

    $('body #PasswordListEditForm').on('submit', function(event)
    {
        event.preventDefault();
        passwordlist_id = $('#PasswordListEditForm').attr('action').split('/');
        passwordlist_id = passwordlist_id[passwordlist_id.length - 1];
        if( $('#oldpassword1').val() == undefined && $('#newpassword1').val() == undefined )

        {
            $.post(
                '/PasswordLists/edit/',
                {
                    'id': passwordlist_id,
                    'name': $('#PasswordListName').val(),
                    'prepare': false
                },
                function(data)
                {
                    changeMessageBox(data)
                }
            );
        }
        else if( $('#oldpassword1').val() == undefined || $('#newpassword1').val() == undefined )
        {
            changeMessageBox('1/You have to give at least Old Password 1 and New Password 1 if you want to change the Password!')
        }
        else
        {
            tmp_name = $('#PasswordListName').val()
            if ( tmp_name == $('#PasswordListName').attr('old_name') )
            {
                tmp_name = "tmp_" + $('#PasswordListName').val()
            }
            
            $.ajax({
                type: 'POST',
                url: '/PasswordLists/edit/',
                data: {
                    'id': passwordlist_id,
                    'prepare': true
                },
                async: false,
                success: function(data)
                {
                    passwords = JSON.parse(data)
                }
            });
      
		    password1 = $('#oldpassword1').val();
		    password2 = $('#oldpassword2').val();
		    password3 = $('#oldpassword3').val();
            for (var n = passwords.length - 1; n >= 0; n--)
            {
                passwords[n]['username'] = decrypt(passwords[n]['username'])
                passwords[n]['email'] = decrypt(passwords[n]['email'])
                passwords[n]['password'] = decrypt(passwords[n]['password'])
            }

            console.log(passwords);
		    password1 = $('#newpassword1').val();
		    password2 = $('#newpassword2').val();
		    password3 = $('#newpassword3').val();
		    controlUsername = encrypt('control');
		    controlEmail = encrypt('control@example.com');
		    controlPassword = encrypt('password');

            $.ajax({
                type: 'POST',
                url: '/PasswordLists/add/',
                data: {
		    		'name': tmp_name,
		    		'URL': controlURL,
		    		'username': controlUsername,
		    		'email': controlEmail,
		    		'password': controlPassword,
		    		'comment': controlComment,
		    		'type': controlType
                },
                async: false,
                success: function(data)
                {
                    passwordlist_id = data
                }
            });
    
            passwords.forEach(function(entry)
            {
                if( entry['URL'] != 'control.example.com' )
                {
                    $.ajax({
                        type: 'POST',
                        url: "/passwords/add/" + passwordlist_id,
                        data: {
                            'URL': entry['URL'],
                            'username': encrypt(entry['username']),
                            'email': encrypt(entry['email']),
                            'password': encrypt(entry['password']),
                            'comment': entry['comment'],
                            'type': entry['type'],
                            'password_list_id': passwordlist_id
                        },
                        async: false
                    });
                }
            });
                   
            changeMessageBox('0/Passwordlist changed! <a href="/">Go to start</a>') 
        }
    } );
    
});
