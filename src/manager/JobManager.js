var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleUpkeeper = require('role.upkeeper');
var roleRoadUpkeeper = require('role.roadUpkeeper');

var JobManager = {
    JobAttribution : function (){
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'upkeeper') {
                roleUpkeeper.run(creep);
            }
            if(creep.memory.role == 'roadUpkeeper') {
                roleRoadUpkeeper.run(creep);
            }
        }
    },

};
module.exports = JobManager;