#!/bin/env python3

symlinks = [
	(sdir + '/Controller/PasswordsController.php', cakedir + '/Controller/PasswordsController.php'),
	(sdir + '/Controller/PasswordListsController.php', cakedir + '/Controller/PasswordListsController.php'),
	(sdir + '/Model/Table/PasswordsTable.php', cakedir + '/Model/Table/PasswordsTable.php'),
	(sdir + '/Model/Table/PasswordListsTable.php', cakedir + '/Model/Table/PasswordListsTable.php'),
	(sdir + '/Template/PasswordLists/add.ctp', cakedir + '/Template/PasswordLists/add.ctp'),
	(sdir + '/Template/PasswordLists/edit.ctp', cakedir + '/Template/PasswordLists/edit.ctp'),
	(sdir + '/Template/PasswordLists/import.ctp', cakedir + '/Template/PasswordLists/import.ctp'),
	(sdir + '/Template/PasswordLists/index.ctp', cakedir + '/Template/PasswordLists/index.ctp'),
	(sdir + '/Template/PasswordLists/show.ctp', cakedir + '/Template/PasswordLists/show.ctp'),
	(sdir + '/Template/Passwords/add.ctp', cakedir + '/Template/Passwords/add.ctp'),
	(sdir + '/Template/Passwords/delete.ctp', cakedir + '/Template/Passwords/delete.ctp'),
	(sdir + '/Template/Passwords/edit.ctp', cakedir + '/Template/Passwords/edit.ctp'),
	(sdir + '/Template/Passwords/index.ctp', cakedir + '/Template/Passwords/index.ctp'),
	(sdir + '/Template/Passwords/search.ctp', cakedir + '/Template/Passwords/search.ctp'),
	(sdir + '/css/magnific-popup.css', cakedir + '/../webroot/css/passwords/magnific-popup.css'),
	(sdir + '/css/passwords.css', cakedir + '/../webroot/css/passwords/passwords.css'),
	(sdir + '/js/import.js', cakedir + '/../webroot/js/passwordlists/import.js'),
	(sdir + '/js/magnific-popup.js', cakedir + '/../webroot/js/passwords/magnific-popup.js'),
	(sdir + '/js/passwordlists.js', cakedir + '/../webroot/js/passwordlists/passwordlists.js'),
	(sdir + '/js/passwords.js', cakedir + '/../webroot/js/passwords/passwords.js'),
	(sdir + '/js/crypt.js', cakedir + '/../webroot/js/passwords/crypt.js')
]
