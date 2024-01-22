var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleUpkeeper = require('role.upkeeper');
var roleRoadUpkeeper = require('role.roadUpkeeper');
var spawnManager = require('manager.SpawnManager')
var energyManager = require('manager.EnergyManager')

module.exports.loop = function () {
    // You should spawn creeps at this point

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawnManager.Spawn(6,4,3,3,3); //Spawn(X) : X * (harvester | upgrader | builder | upkeeper | roadupkeeper)

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

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upkeeper') {
            roleUpkeeper.run(creep);
        }
        if(creep.memory.role == 'roadUpkeeper') {
            roleRoadUpkeeper.run(creep);
        }
    }
}
