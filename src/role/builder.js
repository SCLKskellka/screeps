var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets[0]== null ){
            creep.memory.building = false;
            creep.memory.harvesting = false;
            creep.say('sleep');
            creep.moveTo(spawns.flag['SleepingZone'].pos,{visualizePathStyle: {stroke: '#04f3ab'}})
        }
        else{
            if(creep.memory.building && !creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
                creep.memory.building = false;
                creep.memory.harvesting = true;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
                creep.memory.harvesting = false;
                creep.memory.building = true;
                creep.say('🚧 build');
            }

            if(creep.memory.building) {
                if(targets.length) {
                    if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#d79f3e'}});
                }
            }
        }

    }
};

module.exports = roleBuilder;