console.log('lfv_Verkeerslichten_Verkeersbuis 1.0.0');
const aim = require('aim-server');
const on = 0;
const off = 1;

console.log(aim.api);

aim.extend ({
    operations : {
        lfv_Verkeerslichten_Verkeersbuis_SetStand : function (id, stand) {
        	console.log('SetStand', id, stand);
        	var vkl = aim.data.lfv_Verkeerslichten_Verkeersbuis[id];
            if (!vkl) return { status: 404 }; // Not Found
            //ws.send(JSON.stringify());

            var rio = i2c[vkl.i2c];
            if (!rio) return { status: 400 }; // Invalid ID
        	clearTimeout(this.to);
        	switch (stand) {
        		case "rood":
        			aim.digitalWrite(vkl.i2c, vkl.doGroen, off);
        			aim.digitalWrite(vkl.i2c, vkl.doGeel, on);
        			aim.digitalWrite(vkl.i2c, vkl.doRood, off);
        			this.to = setTimeout(function () {
        				aim.digitalWrite(vkl.i2c, vkl.doGroen, off);
        				aim.digitalWrite(vkl.i2c, vkl.doGeel, off);
        				aim.digitalWrite(vkl.i2c, vkl.doRood, on);
                        ws.request({ url: `lfv_Verkeerslichten_Verkeersbuis(${id})`, method: "PATCH", body: { stand: "rood" } }, function(res){ console.log('SET',res);});
        			}.bind(this), 3000);
                    ws.request({ url: `lfv_Verkeerslichten_Verkeersbuis(${id})`, method: "PATCH", body: { stand: "geel" } }, function(res){ console.log('SET',res);});
        			break;
                case "groen":
        			aim.digitalWrite(vkl.i2c, vkl.doGroen, on);
        			aim.digitalWrite(vkl.i2c, vkl.doGeel, off);
        			aim.digitalWrite(vkl.i2c, vkl.doRood, off);
                    ws.request({ url: `lfv_Verkeerslichten_Verkeersbuis(${id})`, method: "PATCH", body: { stand: "groen" } }, function(res){ console.log('SET',res);});
        			break;
                case "gedoofd":
        			aim.digitalWrite(vkl.i2c, vkl.doGroen, off);
        			aim.digitalWrite(vkl.i2c, vkl.doGeel, off);
        			aim.digitalWrite(vkl.i2c, vkl.doRood, off);
                    ws.request({ url: `lfv_Verkeerslichten_Verkeersbuis(${id})`, method: "PATCH", body: { stand: "gedoofd" } }, function(res){ console.log('SET',res);});
        			break;
        		case "geel_knipperen":
        			this.geel_knipperen = off;
        			(function () {
        				aim.digitalWrite(vkl.i2c, vkl.doGroen, off);
        				aim.digitalWrite(vkl.i2c, vkl.doGeel, this.geel_knipperen ^= 1);
                        aim.digitalWrite(vkl.i2c, vkl.doRood, off);
        				this.to = setTimeout(arguments.callee.bind(this), 1000);
        			}).call(this);
                    ws.request({ url: `lfv_Verkeerslichten_Verkeersbuis(${id})`, method: "PATCH", body: { stand: "geel_knipperen" } }, function(res){ console.log('SET',res);});
        			break;
        		default:
        	}
        	return { status: 200 }; // OK
        }
    }
});

const statemodel = {
	init: {
		entry: function () {
			console.log('init entry');
			this.bestuurbaar = 'ja';
			this.ingestelde_stand = 'gedoofd';
			//console.log('>>>>', this.lfv_Verkeerslicht_Verkeersbuis);
			//forEach(this.lfv_Verkeerslicht_Verkeersbuis, "SetStand", "geel_knipperen")
		},
		do: function () {
			//console.log('init do');
			//forEach(this.lfv_Verkeerslicht_Verkeersbuis, "SetStand", "rood")
		},
		exit: function () {
			console.log('init exit');
		},
	},
	gedoofd: {
		trigger: {
			init: function () {
				return forAll(this.lfv_Verkeerslicht_Verkeersbuis, "stand", "gedoofd")
			},
			groen: function () {
				return forAll(this.lfv_Verkeerslicht_Verkeersbuis, "stand_gewenst", "gedoofd") && this.timerPassed
			},
			geel_knipperen: function () {
				return forAll(this.lfv_Verkeerslicht_Verkeersbuis, "stand_gewenst", "gedoofd") && this.timerPassed
			},
		},
		entry: function () {
			console.log('gedoofd entry');
			//forEach(this.lfv_J32_Verkeersbuis, "SetStand", "uit");
			forEach(this.lfv_Verkeerslicht_Verkeersbuis, "SetStand", "gedoofd");
		},
		do: function () {
			console.log('gedoofd do');
		},
		exit: function () {
			console.log('gedoofd exit');
		},
	},
	j32_aan: {
		trigger: {
			gedoofd: function () { return this.stand_gewenst != "gedoofd" },
		},
		entry: function () {
			console.log('j32_aan entry');
			forEach(this.lfv_J32_Verkeersbuis, "SetStand", "aan");
			this.timerSet(this.tijd_j32);
		},
		do: function () {
			console.log('j32_aan do');
		},
		exit: function () {
			console.log('j32_aan exit');
		},
	},
	geel_knipperen: {
		trigger: {
			init: function () {
				return forAll(this.lfv_Verkeerslicht_Verkeersbuis, "stand", "geel_knipperen")
			},
			j32_aan: function () {
				return forAll(this.lfv_J32_Verkeersbuis, "stand", "aan") && this.timerPassed
			},
			groen: function () {
				return this.stand_gewenst == "geel_knipperen" && this.timerPassed
				//return this.lfv_Verkeerslichten_Verkeersbuis.stand_gewenst == "geel_knipperen" && this.timerPassed
			},
			geel: function () {
				//console.log('TRIGGER GEEL', this, this.stand_gewenst);
				//return this.lfv_Verkeerslichten_Verkeersbuis.stand_gewenst == "geel_knipperen" && this.timerPassed
				return this.stand_gewenst == "geel_knipperen" && this.timerPassed
			},
			rood: function () {
				//return this.lfv_Verkeerslichten_Verkeersbuis.stand_gewenst == "gedoofd" && this.timerPassed || this.lfv_Verkeerslichten_Verkeersbuis.STORING_ROOD_ACTIEVE_LICHTEN == true
				return this.stand_gewenst == "gedoofd" && this.timerPassed || this.STORING_ROOD_ACTIEVE_LICHTEN == true
			}, // Kan dit zo?
		},
		entry: function () {
			console.log('geel_knipperen entry');
			forEach(this.lfv_Verkeerslicht_Verkeersbuis, "SetStand", "geel_knipperen");
			this.timerSet(this.tijd_geel_knipperen); // tijd pas starten als de gewenste stand is bereikt????
		},
		do: function () {
			console.log('geel_knipperen do');
		},
		exit: function () {
			console.log('geel_knipperen exit');
		},
	},
	geel: {
		trigger: {
			init: function () { return forAll(this.lfv_Verkeerslicht_Verkeersbuis, "stand", "geel") },
			geel_knipperen: function () { return forAll(this.lfv_Verkeerslicht_Verkeersbuis, "stand", "geel_knipperen") && this.timerPassed },
			groen: function () { return this.stand_gewenst == "rood" && this.timerPassed },
		},
		entry: function () {
			console.log('geel entry');
			forEach(this.lfv_Verkeerslicht_Verkeersbuis, "SetStand", "geel");
			this.timerSet(this.tijd_geel);
		},
		do: function () {
			console.log('geel do');
		},
		exit: function () {
			console.log('geel exit');
		},
	},
	rood: {
		trigger: {
			init: function () { return forAll(this.lfv_Verkeerslicht_Verkeersbuis, "stand", "rood") },
			geel: function () { return forAll(this.lfv_Verkeerslicht_Verkeersbuis, "stand", "geel") && this.timerPassed },
			vrijgave_afsluitboom: function () {
				return this.stand_gewenst == "gedoofd" || this.stand_gewenst == "geel_knipperen" || this.stand_gewenst == "groen"
			},
		},
		entry: function () {
			//console.log('rood entry', this.lfv_Verkeerslicht_Verkeersbuis);
			forEach(this.lfv_Verkeerslicht_Verkeersbuis, "SetStand", "rood");
			this.timerSet(this.tijd_rood); // Tweede timer nodig, tbv afsluitboom vrijgave!!!
		},
		do: function () {
			console.log('rood do');
		},
		exit: function () {
			console.log('rood exit');
		},
	},
	groen: {
		trigger: {
			init: function () { return forAll(this.lfv_Verkeerslicht_Verkeersbuis, "stand", "groen") },
			geel_knipperen: function () {
				//return this.lfv_Verkeerslichten_Verkeersbuis.stand_gewenst == "groen" && this.timerPassed
				return this.stand_gewenst == "groen" && this.timerPassed
			},
			rood: function () {
				//return this.lfv_Verkeerslichten_Verkeersbuis.stand_gewenst == "groen" && this.timerPassed
				return this.stand_gewenst == "groen" && this.timerPassed
			},
		},
		entry: function () {
			console.log('groen entry');
			forEach(this.lfv_Verkeerslicht_Verkeersbuis, "SetStand", "groen");
			this.timerSet(this.tijd_groen);
		},
		do: function () {
			console.log('groen do');
		},
		exit: function () {
			console.log('groen exit');
		},
	},
	vrijgave_afsluitboom: {
		trigger: {
			rood: function () { return forAll(this.lfv_Verkeerslicht_Verkeersbuis, "stand", "rood") && this.timerPassed },
		},
		entry: function () {
			console.log('vrijgave_afsluitboom entry');
			// SetVrijgaveAfsluitboom(aan)
		},
		do: function () {
			console.log('vrijgave_afsluitboom do');
		},
		exit: function () {
			console.log('vrijgave_afsluitboom exit');
			// SetVrijgaveAfsluitboom(uit)
		},
	},
};
