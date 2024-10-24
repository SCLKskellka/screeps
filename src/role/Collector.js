var roleCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var ressources = creep.room.find(FIND_DROPPED_RESOURCES);
        var Creeps = creep.room.find(FIND_CREEPS);
        var tmp = 0;
        var CollectorList = [];
        for(var h = 0; h< Creeps.length; h++){
            if(Creeps[h].memory.role == 'Collector'){
                CollectorList[tmp] = Creeps[h]
                tmp++;
            }
        }
        if(creep.store.getFreeCapacity() > 0 ) {
            for (var i = 0; i < CollectorList; i++) {
                for(var j= 0; j < ressources.length; j++){
                    if(CollectorList[i].memory.myTarget != ressources[j]){
                        creep.memory.myTarget = ressources[j];
                    }
                }
            }
            if(creep.harvest(creep.memory.myTarget) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.memory.myTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
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
        }
    }
};

module.exports = roleCollector;