<div class="container" id="passOverlay">
	<div class="jumbotron">
		<h3>Bitte Passwort eingeben: <input type="password" id="password1"></h3>
		<h3>Bitte Passwort 2 eingeben: <input type="password" id="password2"></h3>
		<h3>Bitte Passwort 3 eingeben: <input type="password" id="password3"></h3>
	</div>
</div>

<div class="container hide" id="searchBox">
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
    echo $this->Form->create('Password', array
        (
            'action' => 'add'
        )
    );
    echo $this->Form->input('Password.URL');
    echo $this->Form->input('Password.username');
    echo $this->Form->input('Password.email');
    echo $this->Form->input('Password.password');
    echo $this->Form->input('Password.comment');
    echo $this->Form->input('Password.password_list_id', array
        (
            'type' => 'hidden',
            'value' => $password_list_id
        ));
    echo '<div class="row">';
        echo $this->Form->end(array(
            'label' => __('Add Password'),
            'div' =>  '',
            'before' => '<div class="col-lg-offset-2 col-lg-2">'
        ));
        echo '<div class="col-lg-2">';
            echo '<input class="close_popup btn btn-primary" type="submit" value="' . __('Abort') . '">';
        echo '</div>';
    echo '</div>';
    ?>
</div>

<div class="container mfp-hide" id="mask_modify_password">
    <?php
    echo $this->Form->create('Password', array
        (
            'action' => 'edit'
        )
    );
    echo $this->Form->input('Password.URL');
    echo $this->Form->input('Password.username');
    echo $this->Form->input('Password.email');
    echo $this->Form->input('Password.password');
    echo $this->Form->input('Password.comment');
    echo $this->Form->input('Password.password_list_id', array
        (
            'type' => 'hidden',
            'value' => $password_list_id
        ));
    echo '<div class="row">';
        echo $this->Form->end(array(
            'label' => __('Edit Password'),
            'div' =>  '',
            'before' => '<div class="col-lg-offset-2 col-lg-2">',
            'id' => 'PasswordEditSubmit'
        ));
        echo '<div class="col-lg-2">';
            echo '<input class="close_popup btn btn-primary" type="submit" value="' . __('Abort') . '">';
        echo '</div>';
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
