<?php
    session_start();
    
    $_SESSION['esiste']=0;
    $_SESSION['permesso']=0;
    
    session_destroy();
    
    echo json_encode('Logout avvenuto.');
?>