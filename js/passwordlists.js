$(document).ready(function(){
    
    controlURL = 'control.example.com'
	controlComment = 'comment'
	controlType = 'website'
	
    $('body #PasswordListAddForm').on('submit', function(event)
	{
		event.preventDefault();
		password1 = $('#PasswordsPassword1').val();
		password2 = $('#PasswordsPassword2').val();
		password3 = $('#PasswordsPassword3').val();
		if ( password1.length > 3 )
		{
			controlUsername = encrypt('control');
			controlEmail = encrypt('control@example.com');
			controlPassword = encrypt('password');

			$.post(
				'/PasswordLists/add/',
				{
					'data[PasswordList][name]': $('#PasswordListName').val(),
					'data[Password][URL]': controlURL,
					'data[Password][username]': controlUsername,
					'data[Password][email]': controlEmail,
					'data[Password][password]': controlPassword,
					'data[Password][comment]': controlComment,
					'data[Password][type]': controlType
				},
				function(data)
				{
					console.log(data)
				}
			);
		}
		else
		{
			alert('Really? Please overthink your Password.. really hard.');
		}
	});

    $('#PasswordListEditForm').on('click','#PasswordListEditSubmit', function(event)
    {
        event.preventDefault();
        passwordlist_id = $('#PasswordListEditForm').attr('action').split('/');
        passwordlist_id = passwordlist_id[passwordlist_id.length - 1];
        if( $('#PasswordsOldpassword1').val() == undefined && $('#PasswordsNewpassword1').val() == undefined )
        {
            $.post(
                '/PasswordLists/edit/',
                {
                    'data[PasswordList][id]': passwordlist_id,
                    'data[PasswordList][name]': $('#PasswordListName').val(),
                    'data[prepare]': false
                },
                function(data)
                {
                    changeMessageBox(data)
                }
            );
        }
        else if( $('#PasswordsOldpassword1').val() == undefined || $('#PasswordsNewpassword1').val() == undefined )
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
                    'data[PasswordList][id]': passwordlist_id,
                    'data[prepare]': true
                },
                async: false,
                success: function(data)
                {
                    passwords = JSON.parse(data)
                }
            });
      
		    password1 = $('#PasswordsOldpassword1').val();
		    password2 = $('#PasswordsOldpassword2').val();
		    password3 = $('#PasswordsOldpassword3').val();
            for (var n = passwords.length - 1; n >= 0; n--)
            {
                passwords[n]['Password']['username'] = decrypt(passwords[n]['Password']['username'])
                passwords[n]['Password']['email'] = decrypt(passwords[n]['Password']['email'])
                passwords[n]['Password']['password'] = decrypt(passwords[n]['Password']['password'])
            }

		    password1 = $('#PasswordsNewpassword1').val();
		    password2 = $('#PasswordsNewpassword2').val();
		    password3 = $('#PasswordsNewpassword3').val();
		    controlUsername = encrypt('control');
		    controlEmail = encrypt('control@example.com');
		    controlPassword = encrypt('password');

            $.ajax({
                type: 'POST',
                url: '/PasswordLists/add/',
                data: {
		    		'data[PasswordList][name]': tmp_name,
		    		'data[Password][URL]': controlURL,
		    		'data[Password][username]': controlUsername,
		    		'data[Password][email]': controlEmail,
		    		'data[Password][password]': controlPassword,
		    		'data[Password][comment]': controlComment,
		    		'data[Password][type]': controlType
                },
                async: false,
                success: function(data)
                {
                    passwordlist_id = data
                }
            });
    
            passwords.forEach(function(entry)
            {
                if( entry['Password']['URL'] != 'control.example.com' )
                {
                    $.ajax({
                        type: 'POST',
                        url: "/passwords/add/" + passwordlist_id,
                        data: {
                            'data[Password][URL]': entry['Password']['URL'],
                            'data[Password][username]': encrypt(entry['Password']['username']),
                            'data[Password][email]': encrypt(entry['Password']['email']),
                            'data[Password][password]': encrypt(entry['Password']['password']),
                            'data[Password][comment]': entry['Password']['comment'],
                            'data[Password][type]': entry['Password']['type'],
                            'data[Password][password_list_id]': passwordlist_id
                        },
                        async: false
                    });
                }
            });
                   
            changeMessageBox('0/Passwordlist changed! <a href="/">Go to start</a>') 
        }
    });
});
