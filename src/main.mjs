import "./extensions/creepExtension.mjs";
import "./manager/SourceManager.mjs";
import {JobAttribution} from "./manager/JobManager.mjs";
import {runSpawnManager} from "./manager/SpawnManager.mjs";

module.exports.loop = function () {
    const spawn = Game.spawns['Spawn1'];
    if(spawn){
        spawn.room.SourceManager();
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
        Game.spawns['Spawn1'].room.memory.alarm = alarm;
        runSpawnManager('Spawn1',alarm,4,4,3,3,2);

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
        JobAttribution();
    }

}
