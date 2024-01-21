var SpawnManager ={

    WorkType : function (roleName) {

        var array = _.filter(Game.creeps, (creep) => creep.memory.role == roleName);
        console.log(array.name + ': ' + array.length);
        return array;
    },

    CrafterUnit : function (roleName){
        switch (roleName){
            case 'harvester':
                var newName = 'Harvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester: ' + newName + 'spawned.');
                break;
            case 'upgrader':
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName + 'spawned.');
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
                break;
            case 'builder':
                var newName = 'Builder' + Game.time;
                console.log('Spawning new builder: ' + newName + 'spawned.');
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'builder'}});
                break;
            case 'upkeeper':
                var newName = 'Upkeeper' + Game.time;
                console.log('Spawning new upkeeper: ' + newName + 'spawned.');
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'upkeeper'}});
                break;
            case 'roadUpkeeper':
                var newName = 'RoadUpkeeper' + Game.time;
                console.log('Spawning new roadUpkeeper: ' + newName + 'spawned.');
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'roadUpkeeper'}});
                break;
            default:

        }
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
            this.CrafterUnit('harvester')
        }
        else if(upgraders.length < upgraderQtt){
            this.CrafterUnit('upgrader')
        }
        if(builders.length < builderQtt) {
            this.CrafterUnit('builder')
        }
        if(upkeepers.length < upkeeperQtt) {
            this.CrafterUnit('upkeeper')
        }
        if(roadUpkeepers.length < roadUpkeeperQtt) {
            this.CrafterUnit('roadUpkeeper')
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
