<?php
    session_start();
    
    include 'conn.php';
    
    try{
        $dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
        $stm = $dbh->prepare("SELECT * FROM SitoSoftairLupiDiToscana.Utente WHERE Nickname=:username AND Nome=:nome AND Cognome=:cognome AND Email=:email");
    	$stm->bindValue(':nome',$_GET['nome']);
    	$stm->bindValue(':cognome',$_GET['cognome']);
    	$stm->bindValue(':email',$_GET['email']);
    	$stm->bindValue(':username',$_GET['nick']);
    	if($stm->execute() == true){
    		$a = $stm->fetchAll();
    		echo json_encode('Registrato.');
    		
            $to  = $a[0]['Email'];
  			$subject = "Conferma registrazione al sito Soft-air Lupi di Toscana";
  			$message = "<html>
        				  <body>
        				    <table>
        				        <td>
        				            <tr><h5>Grazie per esserti registrato!!</h5></tr>
        				        </td>
        				        <td>
        				            <tr>
        				                Per completare la registrazione ti manca un ultimo passaggio:
                                        clicca sul link seguente per attivare definitivamente il tuo account!
                                    </tr>
        				        </td>
        				        <td>
        				            <tr>---------------------------------------------------------</tr>
        				        </td>
        				        <td>
        				            <tr>http://lupiditoscana.altervista.org/scriptPHP/confermaUtente.php?id=" . $a[0]['id'] . "</tr>
        				        </td>
        				        <td>
        				            <tr>---------------------------------------------------------</tr>
        				        </td>
        				        <td>
        				            <tr>
        				                Se invece non riconosci l'iscrizione al nostro sito rispondi a questa email, cercheremo di risolvere eventuali problemi.</br>
                                        Grazie per la collaborazione,
                                    </tr>
        				        </td>
        				        <td>
        				            <tr>Soft-air Lupi di Toscana.</tr>
        				        </td>
        				    </table>
                          </body>
        			  </html>";
  			$headers = 'From: killerainvito@gmail.com' . "\r\n" .
             				'Reply-To: killerainvito@gmail.com' . "\r\n" .
             				'X-Mailer: PHP/' . phpversion();
              $headers .= "MIME-Version: 1.0\n";
  			$headers .= "Content-Type: text/html; charset=\"iso-8859-1\"\n";
  			$headers .= "Content-Transfer-Encoding: 7bit\n\n";
  			//mail($to, $subject, $message, $headers);
    	}
    	else{
    	    echo json_encode('Errore!');
    	}
    }catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
	}
?>