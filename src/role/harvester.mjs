import {moveToDeposit, moveToHarvest, searchSource} from "../states/states.mjs";

/** @param {Creep} creep **/
export const runHarvester = function(creep) {
    switch (creep.memory.state) {
        /*case 'searchSource' :
            searchSource();
            if(creep.memory.target === null){
                creep.memory.state = 'harvesterAfk';
                return;
            }
            creep.memory.state = 'moveToHarvest';
            return;*/
        case 'moveToHarvest' :
            moveToHarvest(creep);
            if(!creep.store.getFreeCapacity() > 0){
                creep.memory.state = 'moveToDeposit';
            }
            // creep.memory.state = 'searchSource';
            return;
        case 'moveToDeposit' :
            moveToDeposit(creep);
            if(creep.store[RESOURCE_ENERGY] === 0){
                creep.memory.state = 'moveToHarvest';
            }
            //creep.memory.state = 'searchStructureWithFreeCapacity';
            return;
        case 'harvesterAfk' :
            searchSource(creep);
            if(creep.memory.target !== null){
                creep.memory.state = 'searchSource';
                return;
            }
            return;
        /*case 'searchStructureWithFreeCapacity' :
            searchStructureWithFreeCapacity();
            creep.memory.state = 'moveToDeposit';
            return;*/
        default :
            creep.memory.state = 'moveToHarvest';
            return;
    }


}
