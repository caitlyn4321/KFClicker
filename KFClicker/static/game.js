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
            basePrice : 15,
            price : 15,
            measurement : "Support Staff",
            canSupport : 5,
        },
        gasMiner : {
            amount : 0,
            measurement : "/s",
        },
        rockMiner : {
            amount : 0,
            measurement : "/s",
        }
    }
}

var mineClick = function () {saveGame.resources.rock.amount = saveGame.resources.rock.amount + 1};
var gasClick = function () {saveGame.resources.gas.amount = saveGame.resources.gas.amount + 1};
var sstaffBuyClick = function () {
    if (saveGame.resources.rock.amount >= saveGame.resources.support.price) {
        saveGame.resources.rock.amount = saveGame.resources.rock.amount - saveGame.resources.support.price;
        saveGame.resources.support.amount = saveGame.resources.support.amount + 1;
        saveGame.resources.support.price = saveGame.resources.support.basePrice * (Math.pow(1.15, saveGame.resources.support.amount));
    };
}


var rMinerBuyClick = function () {
    var totalPop = 0, supportedPop = 0;

    supportedPop = ( saveGame.resources.support.amount -1 ) * saveGame.resources.support.canSupport
    totalPop = saveGame.resources.rockMiner.amount+saveGame.resources.gasMiner.amount+saveGame.resources.rockMiner.amount + saveGame.resources.support.amount
    if (totalPop <= supportedPop) {
        saveGame.resources.support.amount = saveGame.resources.support.amount -1
        saveGame.resources.rockMiner.amount = saveGame.resources.rockMiner.amount + 1
    }
}

var rMinerSellClick = function () {
    if (saveGame.resources.rockMiner.amount > 0) {
        saveGame.resources.support.amount = saveGame.resources.support.amount + 1
        saveGame.resources.rockMiner.amount = saveGame.resources.rockMiner.amount - 1
    }
}

var gMinerBuyClick = function () {
    var totalPop = 0, supportedPop = 0;

    supportedPop = ( saveGame.resources.support.amount -1 ) * saveGame.resources.support.canSupport
    totalPop = saveGame.resources.rockMiner.amount+saveGame.resources.gasMiner.amount+saveGame.resources.rockMiner.amount + saveGame.resources.support.amount
    if (totalPop <= supportedPop) {
        saveGame.resources.support.amount = saveGame.resources.support.amount -1
        saveGame.resources.gasMiner.amount = saveGame.resources.gasMiner.amount + 1
    }
}

var gMinerSellClick = function () {
    if (saveGame.resources.gasMiner.amount > 0) {
        saveGame.resources.support.amount = saveGame.resources.support.amount + 1
        saveGame.resources.gasMiner.amount = saveGame.resources.gasMiner.amount - 1
    }
}

function update(){
    saveGame.resources.rock.amount = saveGame.resources.rock.amount + (saveGame.resources.rockMiner.amount/62.5);
    saveGame.resources.gas.amount = saveGame.resources.gas.amount + (saveGame.resources.gasMiner.amount/62.5);
};

function draw(){
    rocksPerSecond.innerText = saveGame.resources.rockMiner.amount.toFixed(0)+ "/s";
    rocksMined.value = saveGame.resources.rock.amount.toFixed(0);
    gasMined.value = saveGame.resources.gas.amount.toFixed(0);
    sstaffPrice.value = saveGame.resources.support.price.toFixed(0);
    sstaffAmount.value = saveGame.resources.support.amount.toFixed(0);
    rMinerAmount.value = saveGame.resources.rockMiner.amount.toFixed(0);
    gMinerAmount.value = saveGame.resources.gasMiner.amount.toFixed(0);
};

function setupLoop() {
    mineRock.onclick = mineClick;
    mineGas.onclick = gasClick;
    sstaffBuy.onclick = sstaffBuyClick;
    rMinerBuy.onclick = rMinerBuyClick;
    rMinerSell.onclick = rMinerSellClick;
    gMinerBuy.onclick = gMinerBuyClick;
    gMinerSell.onclick = gMinerSellClick;
    var mainloop = function() {update(), draw()};
    setInterval(mainloop, 16);
};
window.addEventListener("load", function() { setupLoop();});