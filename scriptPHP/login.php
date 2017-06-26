<?php
	session_start();
	
	include 'conn.php';
	
	
	$_SESSION['esiste']=0;

	if($_GET['nick']!="" && $_GET['pass']!=""){
	    try{
	    	
			$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
			$stm = $dbh->prepare('SELECT u.id,p.idPermesso FROM SitoSoftairLupiDiToscana.Utente u inner join SitoSoftairLupiDiToscana.Permessi p on (u.Permessi=p.idPermesso) WHERE u.Password=:password and u.Nickname=:username');
			$stm->bindValue(':username',$_GET['nick']);
			$stm->bindValue(':password',$_GET['pass']);
			$stm->execute();
			if($stm->rowCount()>0){
				$a = $stm->fetchAll();
				$_SESSION['permesso'] = $a[0]['idPermesso'];
				$_SESSION['esiste']=$a[0]['id'];
				echo json_encode('Login avvenuto.');
    		}
    		else
    		{
    			echo json_encode('Username o password non valido.');
    		}
		}catch(PDOException $e){
			$e->getMessage();
			echo json_encode('Errore!!');
		}
    }
    else{
    	echo json_encode('Non tutti i campi sono riempiti.');
    }
?>