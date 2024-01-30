import {runHarvester} from "../role/harvester.mjs"
import {runBuilder} from "../role/builder.mjs"
import {runGardian} from "../role/gardian.mjs"
import {runRoadUpkeeper} from "../role/roadUpkeeper.mjs"
import {runUpgrader} from "../role/upgrader.mjs"
import {runUpkeeper} from "../role/upkeeper.mjs";
export const JobAttribution = function (){
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            runHarvester(creep);
        }
        if(creep.memory.role === 'upgrader') {
            runUpgrader(creep);
        }
        if(creep.memory.role === 'builder') {
            runBuilder.run(creep);
        }
        if(creep.memory.role === 'upkeeper') {
            runUpkeeper(creep);
        }
        if(creep.memory.role === 'roadUpkeeper') {
            runRoadUpkeeper(creep);
        }
        if(creep.memory.role === 'gardian') {
            runGardian(creep);
        }
    }
}