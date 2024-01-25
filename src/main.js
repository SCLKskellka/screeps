
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
    //foes detection in Spawn1's room
    const allEnemys = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS);
    let alarm = allEnemys.length > 0;

    spawnManager.Spawn(alarm,7,4,3,3,2,4); //Spawn(X) : X * (harvester | upgrader | builder | upkeeper | roadupkeeper | gardian)

    var tower = Game.getObjectById('65b0ce6985e04a08b5364f06');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_WALL ||
                        structure.structureType === STRUCTURE_RAMPART )&&
                    structure.hits < structure.hitsMax);
            }
        })
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
