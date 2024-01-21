var SpawnManager ={

    WorkType : function (roleName) {

        var array = _.filter(Game.creeps, (creep) => creep.memory.role == roleName);
        console.log(array.name + ': ' + array.length);
        return array;
    },

    Spawn : function (harvesterQtt,upgraderQtt,builderQtt,upkeeperQtt,roadUpkeeperQtt){

        var harvesters = this.WorkType('harvester');
        //console.log('Harvesters: ' + harvesters.length);
        var upgraders = this.WorkType('upgrader');
        //console.log('Upgraders: ' + upgraders.length);
        var builders = this.WorkType('builder');
        //console.log('Builders: ' + builders.length);
        var upkeepers = this.WorkType('upkeeper');
        //console.log('Builders: ' + builders.length);
        var roadUpkeepers = this.WorkType('roadUpkeeper');
        //console.log('Builders: ' + builders.length);

        if(harvesters.length < harvesterQtt) {
            var newName = 'Harvester' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester: ' + newName + 'spawned.');
        }
        else if(upgraders.length < upgraderQtt){
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName + 'spawned.');
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
        }
        if(builders.length < builderQtt) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName + 'spawned.');
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'builder'}});
        }
        if(upkeepers.length < upkeeperQtt) {
            var newName = 'Upkeeper' + Game.time;
            console.log('Spawning new upkeeper: ' + newName + 'spawned.');
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upkeeper'}});
        }
        if(roadUpkeepers.length < roadUpkeeperQtt) {
            var newName = 'RoadUpkeeper' + Game.time;
            console.log('Spawning new roadUpkeeper: ' + newName + 'spawned.');
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'roadUpkeeper'}});
        }
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }

};

module.exports = SpawnManager;
