<?php

class PasswordsController extends AppController
{

	public $helpers = array(
        'Form' => array(
              'className' => 'BootstrapForm'
        )
    );
	public $components = array(
		'DebugKit.Toolbar',
        'Session',
        'Auth'
    );

    public function index()
    {
    }

    public function search()
    {
        if ( $this->request->is('ajax') )
		{
			$this->set('passwords',$this->Password->find('all', array
			(
				'conditions' => array
				(
					'OR' => array
					(
						'Password.URL LIKE' => '"%' . $this->request->data['needle'] . '%"',
						'Password.comment LIKE' => '"%' . $this->request->data['needle'] . '%"'
					)
				)
			)));
			$this->set('check', $this->request->data['check']);
		}
		else
		{
			$this->Session->setFlash(__('Only via Ajax allowed!'));
            exit();
		}
    }
	
	public function add()
	{
		$this->set('standAlone', false);
		if ( $this->request->is('ajax') )
		{
			$this->layout = 'ajax';
		}
		elseif ( $this->request->is('post') || $this->request->is('get') ) 
		{
			if ($this->Password->save($this->request->data)) {
                $this->Session->setFlash(__('The user has been saved'));
            }
		}
		else
		{
			$this->set('standAlone', true);
		}
	}
}
?>
