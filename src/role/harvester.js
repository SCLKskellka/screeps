var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        /*
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.store.getFreeCapacity() > 0 ) {
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0 && creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }*/
        switch (creep.memory.state) {
            case 'search' :
                creep.prototype.search();
                return;
            case 'moveToHarvest' :
                creep.prototype.moveToHarvest(creep.memory.target);
                return;
            case 'moveToDeposit' :
                creep.prototype.moveToDeposit(creep.memory.target);
                return;
            default :
                creep.prototype.search();
                return;
        }


    }
};

module.exports = roleHarvester;