let saveGame = {
    save : {},
    resources : {
        rock : {
            amount : 0,
            increment : 1,
            measurement : "rocks",
        },
        gas : {
            amount : 0,
            increment : 1,
            measurement : "Liters",
        },
        support : {
            amount : 0,
            purchased : 0,
            price : {
                base : 15,
                rock : 15,
                adjustment : 1.15,
            },
            measurement : "Support Staff",
            canSupport : 5,
            supportedPop : function(adjust=0) {
                return (this.amount + adjust).toFixed(0) * this.canSupport;
            },
        },
        gasMiner : {
            amount : 0,
            measurement : "/s",
        },
        rockMiner : {
            amount : 0,
            measurement : "/s",
        },
        recruiter : {
            amount : 0,
            price : {
                rock : 2000,
                gas : 2000,
                staff : 15,
            },
            measurement : "Recruiters",
        },
        metal : {
            amount : 0,
        },
        chemicals : {
            amount : 0,
        },
        widgets : {
            amount : 0,
            price : {
                chemicals : 1000,
                metal : 1000,
            },
        },
        widgeteer : {
            amount : 0,
            measurement : "/s",
            price : {
                chemicals : 10000,
                metal : 10000,
                staff : 100,
            },
        },
        forge : {
            amount : 0,
            measurement : "/s",
            purchased : 0,
            price : {
                rock : 2000,
                gas : 2000,
            },
        },
        reactor : {
            amount : 0,
            measurement : "/s",
            purchased : 0,
            price : {
                rock : 2000,
                gas : 2000,
            },
        },
    }
}

var mult = 1;
var mineClick = function () {saveGame.resources.rock.amount = saveGame.resources.rock.amount + 1};
var gasClick = function () {saveGame.resources.gas.amount = saveGame.resources.gas.amount + 1};
var sstaffBuyClick = function () {
    if (saveGame.resources.rock.amount*mult >= saveGame.resources.support.price.rock) {
        saveGame.resources.rock.amount = saveGame.resources.rock.amount - saveGame.resources.support.price.rock*mult;
        saveGame.resources.support.amount = saveGame.resources.support.amount + mult;
        saveGame.resources.support.purchased = saveGame.resources.support.purchased + mult;
        saveGame.resources.support.price.rock = (saveGame.resources.support.price.base * (Math.pow(saveGame.resources.support.price.adjustment, saveGame.resources.support.purchased))).toFixed(0);
    };
}


var rMinerBuyClick = function () {
    if (totalPop() <= saveGame.resources.support.supportedPop(0-mult)) {
        saveGame.resources.support.amount = saveGame.resources.support.amount -mult;
        saveGame.resources.rockMiner.amount = saveGame.resources.rockMiner.amount + mult;
    };
};

var rMinerSellClick = function () {
    if (saveGame.resources.rockMiner.amount >= mult) {
        saveGame.resources.support.amount = saveGame.resources.support.amount + mult;
        saveGame.resources.rockMiner.amount = saveGame.resources.rockMiner.amount - mult;
    };
};

var gMinerBuyClick = function () {
    if (totalPop() <= saveGame.resources.support.supportedPop(0-mult)) {
        saveGame.resources.support.amount = saveGame.resources.support.amount -mult;
        saveGame.resources.gasMiner.amount = saveGame.resources.gasMiner.amount + mult;
    };
}

var gMinerSellClick = function () {
    if (saveGame.resources.gasMiner.amount >= mult) {
        saveGame.resources.support.amount = saveGame.resources.support.amount + mult
        saveGame.resources.gasMiner.amount = saveGame.resources.gasMiner.amount - mult
    }
}

var recruitBuyClick = function () {
    if (totalPop()-saveGame.resources.recruiter.price.staff <= saveGame.resources.support.supportedPop(-saveGame.resources.recruiter.price.staff*mult) && saveGame.resources.gas.amount >= saveGame.resources.recruiter.price.gas*mult && saveGame.resources.rock.amount >= saveGame.resources.recruiter.price.rock*mult) {
        saveGame.resources.support.amount = saveGame.resources.support.amount - saveGame.resources.recruiter.price.staff*mult
        saveGame.resources.rock.amount = saveGame.resources.rock.amount - saveGame.resources.recruiter.price.rock*mult
        saveGame.resources.gas.amount = saveGame.resources.gas.amount - saveGame.resources.recruiter.price.gas*mult
        saveGame.resources.recruiter.amount = saveGame.resources.recruiter.amount + mult
    }
}

var recruitSellClick = function () {
    if (saveGame.resources.recruiter.amount >= mult) {
        saveGame.resources.support.amount = saveGame.resources.support.amount + mult
        saveGame.resources.recruiter.amount = saveGame.resources.recruiter.amount - mult
    }
}


var forgeBuyClick = function () {
    if (saveGame.resources.rock.amount*mult >= saveGame.resources.forge.price.rock && saveGame.resources.gas.amount*mult >= saveGame.resources.forge.price.gas) {
        saveGame.resources.rock.amount = saveGame.resources.rock.amount - saveGame.resources.forge.price.rock*mult;
        saveGame.resources.gas.amount = saveGame.resources.gas.amount - saveGame.resources.forge.price.gas*mult;
        saveGame.resources.forge.amount = saveGame.resources.forge.amount + mult;
    };
}

var reactorBuyClick = function () {
    if (saveGame.resources.rock.amount*mult >= saveGame.resources.reactor.price.rock && saveGame.resources.gas.amount*mult >= saveGame.resources.reactor.price.gas) {
        saveGame.resources.rock.amount = saveGame.resources.rock.amount - saveGame.resources.reactor.price.rock*mult;
        saveGame.resources.gas.amount = saveGame.resources.gas.amount - saveGame.resources.reactor.price.gas*mult;
        saveGame.resources.reactor.amount = saveGame.resources.reactor.amount + mult;
    };
}

var widgeteerBuyClick = function () {
    if (totalPop()-saveGame.resources.widgeteer.price.staff <= saveGame.resources.support.supportedPop(-saveGame.resources.widgeteer.price.staff*mult) && saveGame.resources.metal.amount >= saveGame.resources.widgeteer.price.metal*mult && saveGame.resources.chemicals.amount >= saveGame.resources.widgeteer.price.chemicals*mult) {
        saveGame.resources.support.amount = saveGame.resources.support.amount - saveGame.resources.widgeteer.price.staff*mult
        saveGame.resources.metal.amount = saveGame.resources.metal.amount - saveGame.resources.widgeteer.price.metal*mult
        saveGame.resources.chemicals.amount = saveGame.resources.chemicals.amount - saveGame.resources.widgeteer.price.chemicals*mult
        saveGame.resources.widgeteer.amount = saveGame.resources.widgeteer.amount + mult
    }
}

var widgeteerSellClick = function () {
    if (saveGame.resources.widgeteer.amount >= mult) {
        saveGame.resources.support.amount = saveGame.resources.support.amount + mult
        saveGame.resources.widgeteer.amount = saveGame.resources.widgeteer.amount - mult
    }
}

function totalPop() {
    pop = saveGame.resources.rockMiner.amount+saveGame.resources.gasMiner.amount+ saveGame.resources.support.amount + saveGame.resources.recruiter.amount
    return pop.toFixed(0);
}

function multChange () {
    mult = parseInt(multiplier.options[multiplier.selectedIndex].text, 10);
}

function update(){
    saveGame.resources.rock.amount = saveGame.resources.rock.amount + ((saveGame.resources.rockMiner.amount-saveGame.resources.forge.amount-saveGame.resources.support.amount)/62.5);
    saveGame.resources.gas.amount = saveGame.resources.gas.amount + ((saveGame.resources.gasMiner.amount-saveGame.resources.reactor.amount)/62.5);
    saveGame.resources.support.amount = saveGame.resources.support.amount + (saveGame.resources.recruiter.amount/625);
    saveGame.resources.metal.amount = saveGame.resources.metal.amount + (saveGame.resources.forge.amount/62.5);
    saveGame.resources.chemicals.amount = saveGame.resources.chemicals.amount + (saveGame.resources.reactor.amount/62.5);
    if(saveGame.resources.widgeteer.amount > 0 && saveGame.resources.metal.amount >= saveGame.resources.widgets.price.metal && saveGame.resources.chemicals.amount >= saveGame.resources.widgets.price.chemicals) {
        saveGame.resources.widgets.amount = saveGame.resources.widgets.amount + (saveGame.resources.widgeteer.amount/625);
        saveGame.resources.metal.amount = saveGame.resources.metal.amount - (saveGame.resources.widgets.price.metal/625);
        saveGame.resources.chemicals.amount = saveGame.resources.chemicals.amount - (saveGame.resources.widgets.price.chemicals/625);
    }
    if (saveGame.resources.rock.amount < 0) {saveGame.resources.rock.amount=0}
    if (saveGame.resources.gas.amount < 0) {saveGame.resources.gas.amount=0}
    if (saveGame.resources.metal.amount < 0) {saveGame.resources.metal.amount=0}
    if (saveGame.resources.chemicals.amount < 0) {saveGame.resources.chemicals.amount=0}
};

function draw(){
    rocksPerSecond.innerText = saveGame.resources.rockMiner.amount.toFixed(2)+ "/s";
    gasPerSecond.innerText = saveGame.resources.gasMiner.amount.toFixed(2)+ "/s";
    rocksMined.value = saveGame.resources.rock.amount.toFixed(0);
    gasMined.value = saveGame.resources.gas.amount.toFixed(0);
    sstaffPrice.value = saveGame.resources.support.price.rock;
    sstaffAmount.value = saveGame.resources.support.amount.toFixed(0);
    recruitAmount.value = saveGame.resources.recruiter.amount.toFixed(0);
    recruitPerSecond.innerText = saveGame.resources.recruiter.amount.toFixed(2)+ "/10s";
    currSupports.innerText = totalPop() +"/"+saveGame.resources.support.supportedPop();
    rMinerAmount.value = saveGame.resources.rockMiner.amount;
    gMinerAmount.value = saveGame.resources.gasMiner.amount;
    forgeAmount.value = saveGame.resources.forge.amount;
    reactorAmount.value = saveGame.resources.reactor.amount;
    metal.value = saveGame.resources.metal.amount.toFixed(0);
    chemicals.value = saveGame.resources.chemicals.amount.toFixed(0);
    widgetAmount.value = saveGame.resources.widgets.amount;
    widgeteerAmount.value = saveGame.resources.widgeteer.amount;
    if (saveGame.resources.support.price.rock > 10000){
        sstaffBuy.disabled = true;
        sstaffPrice.hidden = true;
    } else if (saveGame.resources.rock.amount >= saveGame.resources.support.price.rock*mult) {
        sstaffBuy.disabled = false;
    } else { sstaffBuy.disabled = true;};
    if (totalPop() <= saveGame.resources.support.supportedPop(0-mult)) {
        rMinerBuy.disabled = false;
        gMinerBuy.disabled = false;
    } else { rMinerBuy.disabled = true,gMinerBuy.disabled = true;};
    if (totalPop()-(saveGame.resources.recruiter.price.staff*mult) <= saveGame.resources.support.supportedPop(-saveGame.resources.recruiter.price.staff*mult) && saveGame.resources.gas.amount >= saveGame.resources.recruiter.price.gas*mult && saveGame.resources.rock.amount >= saveGame.resources.recruiter.price.rock*mult) {
        recruitBuy.disabled = false;
    } else { recruitBuy.disabled = true;};
    if (totalPop()-(saveGame.resources.widgeteer.price.staff*mult) <= saveGame.resources.support.supportedPop(-saveGame.resources.widgeteer.price.staff*mult) && saveGame.resources.metal.amount >= saveGame.resources.widgeteer.price.metal*mult && saveGame.resources.chemicals.amount >= saveGame.resources.widgeteer.price.chemicals*mult) {
        widgeteerBuy.disabled = false;
    } else { widgeteerBuy.disabled = true;};
    if (saveGame.resources.rockMiner.amount >= mult)  {
        rMinerSell.disabled = false;
    } else { rMinerSell.disabled = true;};
    if (saveGame.resources.gasMiner.amount >= mult)  {
        gMinerSell.disabled = false;
    } else { gMinerSell.disabled = true;};
    if (saveGame.resources.recruiter.amount >= mult)  {
        recruitSell.disabled = false;
    } else { recruitSell.disabled = true;};
    if (saveGame.resources.widgeteer.amount >= mult)  {
        widgeteerSell.disabled = false;
    } else { widgeteerSell.disabled = true;};
    if (saveGame.resources.rock.amount >= saveGame.resources.forge.price.rock*mult && saveGame.resources.gas.amount >= saveGame.resources.forge.price.gas*mult) {
        forgeBuy.disabled = false;
    } else { forgeBuy.disabled = true;};
    if (saveGame.resources.rock.amount >= saveGame.resources.reactor.price.rock*mult && saveGame.resources.gas.amount >= saveGame.resources.reactor.price.gas*mult) {
        reactorBuy.disabled = false;
    } else { reactorBuy.disabled = true;};
};

function cheatyStart() {
    saveGame.resources.rock.amount= 1000000;
    saveGame.resources.gas.amount= 1000000;
    saveGame.resources.rockMiner.amount= 3000;
    saveGame.resources.support.amount= 1000;
    saveGame.resources.gasMiner.amount= 1000;
    saveGame.resources.metal.amount= 10000;
    saveGame.resources.chemicals.amount= 10000;
}

function setupLoop() {
    mineRock.onclick = mineClick;
    mineGas.onclick = gasClick;
    sstaffBuy.onclick = sstaffBuyClick;
    rMinerBuy.onclick = rMinerBuyClick;
    rMinerSell.onclick = rMinerSellClick;
    gMinerBuy.onclick = gMinerBuyClick;
    gMinerSell.onclick = gMinerSellClick;
    recruitBuy.onclick = recruitBuyClick;
    recruitSell.onclick = recruitSellClick;
    forgeBuy.onclick = forgeBuyClick;
    reactorBuy.onclick = reactorBuyClick;
    widgeteerBuy.onclick = widgeteerBuyClick;
    widgeteerSell.onclick = widgeteerSellClick;
    var mainloop = function() {update(), draw()};
    setInterval(mainloop, 16);
    multiplier.addEventListener("change", function() { multChange();});
    cheatyStart();
};
window.addEventListener("load", function() { setupLoop();});