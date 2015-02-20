<div class="container" id="passOverlay">
	<div class="jumbotron">
		<h3>Bitte Passwort eingeben: <input type="password" id="password1"></h3>
		<h3>Bitte Passwort 2 eingeben: <input type="password" id="password2"></h3>
		<h3>Bitte Passwort 3 eingeben: <input type="password" id="password3"></h3>
	</div>
</div>

<div class="PasswordListUnhideDiv hide container">
<?php
    echo $this->Form->create('Import');
        echo $this->Form->input('import', array
            (
                'label' => __('CSV Data'),
                'type' => 'textarea'
            )
        );
    echo $this->Form->end(__('Submit'));
?>
    <div id="messages"></div>
</div>
<?php
echo $this->Html->css('passwords/passwords.css');
echo $this->Html->css('passwords/magnific-popup.css');
echo $this->Html->script('passwords/magnific-popup.js');
echo $this->Html->script('passwords/passwords.js');
echo $this->Html->script('passwords/crypt.js');
echo $this->Html->script('jquery.csv.0.71.min.js');
echo $this->Html->script('passwordlists/import.js');
?>
