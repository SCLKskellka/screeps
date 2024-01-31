import {moveToDeposit, moveToHarvest, harvesterAfk} from "../states/states.mjs";

/** @param {Creep} creep **/
export const runHarvester = function(creep) {
    switch (creep.memory.state) {
        case 'moveToHarvest' :
            creep.say('M.T.harvest');
            moveToHarvest(creep);
            if(!creep.store.getFreeCapacity() > 0){
                creep.memory.state = 'moveToDeposit';
            }
            return;
        case 'moveToDeposit' :
            creep.say('M.T.deposit');
            moveToDeposit(creep);
            if(creep.store[RESOURCE_ENERGY] === 0){
                creep.memory.state = 'searchToHarvest';
            }
            return;
        case 'harvesterAfk' :
            creep.say('afk.harvester');
            harvesterAfk(creep,0);
            if(creep.store[RESOURCE_ENERGY] === 0){
                creep.memory.state = 'searchToHarvest';
            }
            if(!creep.store.getFreeCapacity() > 0){
                creep.memory.state = 'moveToDeposit';
            }
            return;
        default :
            creep.memory.state = 'moveToHarvest';
            return;
    }


}
