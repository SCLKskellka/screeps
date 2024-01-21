var roleRoadUpkeeper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //search road and repair if hit < 5k and freecapacity = false
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD &&
                    structure.hits < structure.hitsMax);
            }
        })
        /*for(var i = 0;i<targets.length-2;i++){
            if((targets[i].hits * 100 / targets[i].hitsMax ) > (targets[i+1].hits * 100 / targets[i+1].hitsMax) ){
                var tmp = targets[i];
                targets[i] = targets[i+1];
                targets[i+1] = tmp;
            }
        }*/
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
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }

};

module.exports = roleRoadUpkeeper;