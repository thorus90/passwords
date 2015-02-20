$(document).ready(function()
{
    $('body #ImportImportForm').on('submit', function()
    {
        event.preventDefault();
        var passwords = $.csv.toArrays($('#ImportImport').val());
        passwords.forEach(function(password) {
            $.post(
                "/passwords/add/" + passwordlistid,
                {
                    'data[Password][URL]': $.trim(password[0]),
                    'data[Password][username]': encrypt($.trim(password[1]).replace('-;-','"')),
                    'data[Password][email]': encrypt($.trim(password[2]).replace('-;-','"')),
                    'data[Password][password]': encrypt($.trim(password[3]).replace('-;-','"')),
                    'data[Password][comment]': password[4],
                    'data[Password][password_list_id]': passwordlistid
                },
                function (data){
                    if ( data != '0/The Password has been saved0/The Password has been saved' )
                    {
                        changeMessageBox('2/Import Failed for ' + password[0]);
                    }
                }
            );
        });
    });
});
