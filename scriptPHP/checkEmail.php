<?php
    function chkEmail($email)
    {
    	// elimino spazi, "a capo" e altro alle estremità della stringa
    	$email = trim($email);
    
    	// se la stringa è vuota sicuramente non è una mail
    	if(!$email) {
    		return false;
    	}
    
    	// controllo che ci sia una sola @ nella stringa
    	$num_at = count(explode( '@', $email )) - 1;
    	if($num_at != 1) {
    		return false;
    	}
    
    	// controllo la presenza di ulteriori caratteri "pericolosi":
    	if(strpos($email,';') || strpos($email,',') || strpos($email,' ')) {
    		return false;
    	}
    
    	// la stringa rispetta il formato classico di una mail?
    	if(!preg_match( '/^[\w\.\-]+@\w+[\w\.\-]*?\.\w{1,4}$/', $email)) {
    		return false;
    	}
    
    	return true;
    }
?>