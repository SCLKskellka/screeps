
var spawnManager = require('manager.SpawnManager')
var energyManager = require('manager.EnergyManager')
var jobManager = require('manager.JobManager')

module.exports.loop = function () {
    // You should spawn creeps at this point

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    //foes detection in room W1N7
    var alarm = false;
   var allEnemys = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS)
    if(allEnemys[0] != null){
        alarm = true;
        console.alert('We are attacked !')
    }
    else alarm = false;

    spawnManager.Spawn(alarm,6,4,3,3,2,4); //Spawn(X) : X * (harvester | upgrader | builder | upkeeper | roadupkeeper | gardian)

    var tower = Game.getObjectById('04075e36fc68664aad1871a3');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    jobManager.JobAttribution();
}
