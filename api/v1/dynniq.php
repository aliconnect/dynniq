<?php
class dms{
	function get(){
		global $aim;
		$res=query(
			"SELECT id,instance,ip,interfacetype FROM dms.dbo.station WHERE active=1
			SELECT id,instance,nummer,omschrijving FROM dms.dbo.io WHERE signaal='DI'
			");
		$rows=array();
		while($row=fetch_object($res))array_push($rows,$data->station->{$row->instance}=$row);
		next_result($res);
		while($row=fetch_object($res))if($data->station->{$row->instance})$data->station->{$row->instance}->io->{$row->nummer}=$row;
		die(json_encode($rows));
	}
}
?>
