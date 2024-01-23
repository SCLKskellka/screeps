
var roleUpkeeper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //search road and repair if hit < 5k and freecapacity = false
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_WALL ||
                    structure.structureType == STRUCTURE_RAMPART )&&
                    structure.hits < structure.hitsMax);
            }
        })

        console.log('construct to repair -> '+targets.length);
        //console.log('room name: '+creep.room.name);
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('repair');
        }
        if(creep.memory.repairing && targets.length > 0 ) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#fffffe'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }

};

module.exports = roleUpkeeper;