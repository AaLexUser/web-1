<?php
function validateNumber($num, int $min, int $max){
    return isset($num) && is_numeric($num) && ($num >= $min) && ($num <= $max);
}
function validateTimezone($timezone){
    return isset($timezone);
}
function checkSecondQuadrant($x, $y, $r){
    return $y<=$x+$r && $x <= 0 && $y >=0;
}
function checkThirdQuadrant($x,$y,$r){
    return $y >= -$r && $x >= -$r && $y<=0 && $x <=0 && $r>=0;
}
function checkFourthQuadrant($x,$y,$r){
    return $y <= 0 && $x >= 0 && $r >=$x*$x+$y*$y;
}


session_start();
if (!isset($_SESSION['data']))
    $_SESSION['data'] = array();

if(!empty($_POST)){
    $x = @$_POST["x_coordinate"];
    $y = @$_POST["y_coordinate"];
    $r = @$_POST["r_coordinate"];  
    $timezone= @$_POST["timezone"];
    if(validateNumber($x,-4,4) && validateNumber($y, -5, 5) && validateNumber($r,1,3) && validateTimezone($timezone)){
        checkSecondQuadrant($x, $y, $r) || checkThirdQuadrant($x, $y, $r) || checkFourthQuadrant($x, $y, $r) ? $ishit = "Hit" : $ishit = "Miss";
        $currentTime = date("H:i:s", time()-$timezone*60);
        $executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

        $ansArray = array("x"=>$x, "y"=>$y, "r"=>$r, "ishit"=>$ishit, "currentTime"=>$currentTime, "executionTime"=>$executionTime);
        array_push($_SESSION['data'], $ansArray);
    }
    else echo "error in validate";
    foreach ($_SESSION['data'] as $elem){
        echo "<tr class='columns'>";
        echo "<td>" . $elem['x'] . "</td>";
        echo "<td>" . $elem['y'] . "</td>";
        echo "<td>" . $elem['r'] . "</td>";
        echo "<td>" . $elem['ishit']  . "</td>";
        echo "<td>" . $elem['currentTime']  . "</td>";
        echo "<td>" . $elem['executionTime'] . "</td>";
        echo "</tr>";
    }
}
else{
    echo "Error. Post is empty.";
}
?>
