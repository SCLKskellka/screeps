
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        switch (creep.memory.state) {
            /*case 'searchSource' :
                creep.searchSource();
                if(creep.memory.target === null){
                    creep.memory.state = 'harvesterAfk';
                    return;
                }
                creep.memory.state = 'moveToHarvest';
                return;*/
            case 'moveToHarvest' :
                creep.moveToHarvest();
                if(!creep.store.getFreeCapacity() > 0){
                    creep.memory.state = 'moveToDeposit';
                }
               // creep.memory.state = 'searchSource';
                return;
            case 'moveToDeposit' :
                creep.moveToDeposit();
                if(creep.store[RESOURCE_ENERGY] === 0){
                    creep.memory.state = 'moveToHarvest';
                }
                //creep.memory.state = 'searchStructureWithFreeCapacity';
                return;
            case 'harvesterAfk' :
                creep.searchSource();
                if(creep.memory.target !== null){
                    creep.memory.state = 'searchSource';
                    return;
                }
                return;
            /*case 'searchStructureWithFreeCapacity' :
                creep.searchStructureWithFreeCapacity();
                creep.memory.state = 'moveToDeposit';
                return;*/
            default :
                creep.memory.state = 'moveToHarvest';
                return;
        }


    }
};

module.exports = roleHarvester;