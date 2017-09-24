<div class="container" id="passOverlay">
	<div class="jumbotron">
		<h3>Bitte Passwort eingeben: <input type="password" id="password1"></h3>
		<h3>Bitte Passwort 2 eingeben: <input type="password" id="password2"></h3>
		<h3>Bitte Passwort 3 eingeben: <input type="password" id="password3"></h3>
	</div>
</div>

<div class="PasswordListUnhideDiv container hide" id="searchBox">
	<ul class="nav nav-tabs">
	  <li><a id="new_entry" href="#mask_new_password">New</a></li>
	  <li><a id="modify_password" href="#mask_modify_password">Modify</a></li>
	  <li><a id="delete_password" href="#">Delete</a></li>
	  <li>
		<form class="navbar-form navbar-left" role="search">
			<div class="form-group">
				<input type="text" id="search" class="form-control" placeholder="Search">
			</div>
		</form>
	  </li>
	  <li><div id="messages"></div></li>
	</ul>
</div>

<div class="container mfp-hide" id="mask_new_password">
    <?php
    echo $this->Form->create($password, [ 'url' => [ 'controller' => 'passwords', 'action' => 'add' ], 'id' => 'PasswordAddForm' ] );
    echo $this->Form->input('URL');
    echo $this->Form->input('username');
    echo $this->Form->input('email');
    echo $this->Form->input('password', [ 'type' => 'text' ]);
    echo $this->Form->input('comment');
    echo $this->Form->input('type', [
        'type' => 'select',
        'options' => $DistinctPasswordTypes,
        'empty' => '(choose one)',
        'append' => '<div class="col-lg-1"><button id="PasswordAddType" type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></div>',
    ]);
    echo $this->Form->input('password_list_id', array
        (
            'type' => 'hidden',
            'value' => $password_list_id
        ));
    echo '<div class="row">';
        echo $this->Form->buttonGroup( [
            $this->Form->button(__('Add Password')),
            $this->Form->button(__('Abort'), [ 'id' => 'PasswordAbortForm' ])
        ] );
        echo $this->Form->end();
    echo '</div>';
    ?>
</div>

<div class="container mfp-hide" id="mask_modify_password">
    <?php
    echo $this->Form->create($password, [ 'url' => [ 'controller' => 'passwords', 'action' => 'edit' ], 'id' => 'PasswordEditForm' ] );
    echo $this->Form->input('URL');
    echo $this->Form->input('username');
    echo $this->Form->input('email');
    echo $this->Form->input('password', [ 'type' => 'text' ]);
    echo $this->Form->input('comment');
    echo $this->Form->input('password_list_id', array
        (
            'type' => 'hidden',
            'value' => $password_list_id
        ));
    echo $this->Form->input('type', [
        'type' => 'select',
        'options' => $DistinctPasswordTypes,
        'empty' => '(choose one)',
        'append' => '<div class="col-lg-1"><button id="PasswordAddType" type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></div>',
    ]);
    echo '<div class="row">';
        echo $this->Form->buttonGroup( [
            $this->Form->button(__('Edit Password')),
            $this->Form->button(__('Abort'), [ 'id' => 'PasswordAbortForm' ])
        ] );
        echo $this->Form->end();
    echo '</div>';
    ?>
</div>

<div id="accounts"></div>
<?php
echo $this->Html->css('passwords/passwords.css');
echo $this->Html->css('passwords/magnific-popup.css');
echo $this->Html->script('passwords/magnific-popup.js');
echo $this->Html->script('passwords/passwords.js');
echo $this->Html->script('passwords/crypt.js');
?>
