var roleRoadworker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var myRoads = room.find(STRUCTURE_ROAD);
        for(STRUCTURE_ROAD in myRoads){
            if(creep.store.getFreeCapacity() < 1 && STRUCTURE_ROAD.hit < 5000){
                var target = STRUCTURE_ROAD;
                if(creep.repair(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#211d1d'}});
                }
            }
            else if(creep.store.getFreeCapacity() > 0){
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#262222'}});
                }
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#211d1d'}});
                    }
                }
            }
        }
    }
};

module.exports = roleRoadworker;