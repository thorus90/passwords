<div class="container" id="passOverlay">
	<div class="jumbotron">
		<h3>Bitte Passwort eingeben: <input type="password" id="password"></h3>
	</div>
</div>
<div class="container hide" id="searchBox">
	<ul class="nav nav-tabs">
	  <li><a id="new_entry" href="#">New</a></li>
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
<div class="container" id="mask_new">
</div>
<div class="mfp-hide" id="mask_modify_password">
	<div class="container">
		<h3>Modify Password</h3>
		<div class="row">
			<div class="col-md-6 col-xs-4">
				<label class="control-label">Datenbank ID:</label>
			</div>
			<div class="col-md-6 col-xs-8">
				<label class="control-label"><span id="mask_modify_password_dbid"></span></label>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6 col-xs-4">
				<label class="control-label">URL:</label>
			</div>
			<div class="col-md-6 col-xs-8">
				<input class="mask_modify_password_submit form-control" type="text" id="mask_modify_password_url">
			</div>
		</div>
		<div class="row">
			<div class="col-md-6 col-xs-4">
				<label class="control-label">Username:</label>
			</div>
			<div class="col-md-6 col-xs-8">
				<input class="mask_modify_password_submit form-control" type="text" id="mask_modify_password_username">
			</div>
		</div>
		<div class="row">
			<div class="col-md-6 col-xs-4">
				<label class="control-label">E-Mail:</label>
			</div>
			<div class="col-md-6 col-xs-8">
				<input class="mask_modify_password_submit form-control" type="text" id="mask_modify_password_email">
			</div>
		</div>
		<div class="row">
			<div class="col-md-6 col-xs-4">
				<label class="control-label">Password:</label>
			</div>
			<div class="col-md-6 col-xs-8">
				<input class="mask_modify_password_submit form-control" type="text" id="mask_modify_password_password">
			</div>
		</div>
		<div class="row">
			<div class="col-md-6 col-xs-4">
				<label class="control-label">Notes:</label>
			</div>
			<div class="col-md-6 col-xs-8">
				<input class="mask_modify_password_submit form-control" type="text" id="mask_modify_password_notes">
			</div>
		</div>
	</div>
</div>
<div id="accounts"></div>
<div class="container" id="appContent">
</div>
<?php
echo $this->Html->css('passwords/passwords.css');
echo $this->Html->css('passwords/magnific-popup.css');
echo $this->Html->script('passwords/magnific-popup.js');
echo $this->Html->script('passwords/passwords.js');
echo $this->Html->script('passwords/crypt.js');
?>