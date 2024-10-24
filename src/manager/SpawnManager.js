var SpawnManager ={

    WorkType : function (roleName) {

        var array = _.filter(Game.creeps, (creep) => creep.memory.role == roleName);
        //console.log(roleName + ': ' + array.length);
        return array;
    },

    CrafterUnit : function (roleName, MySpawnerName){
        switch (roleName){

            case 'upgrader':
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName + 'spawned.');
                Game.spawns[MySpawnerName].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
                break;
            case 'builder':
                var newName = 'Builder' + Game.time;
                console.log('Spawning new builder: ' + newName + 'spawned.');
                Game.spawns[MySpawnerName].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'builder'}});
                break;
            case 'upkeeper':
                var newName = 'Upkeeper' + Game.time;
                console.log('Spawning new upkeeper: ' + newName + 'spawned.');
                Game.spawns[MySpawnerName].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'upkeeper'}});
                break;
            case 'roadUpkeeper':
                var newName = 'RoadUpkeeper' + Game.time;
                console.log('Spawning new roadUpkeeper: ' + newName + 'spawned.');
                Game.spawns[MySpawnerName].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'roadUpkeeper'}});
                break;
            case 'gardian':
                var newName = 'Gardian' + Game.time;
                console.log('Spawning new gardian: ' + newName + 'spawned.');
                Game.spawns[MySpawnerName].spawnCreep([ATTACK,CARRY,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: 'gardian'}});
                break;
            case 'Extractor':
                console.log('Spawning new Extractor: ' + 'Extractor' + Game.time + 'spawned.');
                Game.spawns[MySpawnerName].spawnCreep([WORK,MOVE],
                    'Extractor' + Game.time, {memory: {role: 'Extractor'}});
                break;
            case 'Collector':
                Game.spawns[MySpawnerName].spawnCreep([CARRY,MOVE,MOVE], 'Collector' + Game.time, {memory: {role: 'Collector'}});
                console.log('Spawning new Collector: ' + 'Collector' + Game.time + 'spawned.');
                break;
            default:

        }
    },
    Spawn : function (MySpawner,alarm,upgraderQtt,builderQtt,upkeeperQtt,roadUpkeeperQtt,gardianQtt){
        var upgraders = this.WorkType('upgrader');
        var builders = this.WorkType('builder');
        var upkeepers = this.WorkType('upkeeper')
        var roadUpkeepers = this.WorkType('roadUpkeeper');
        var gardians = this.WorkType('gardian');
        var Extractor = this.WorkType('Extractor');
        var Collector = this.WorkType('Collector')

       /* if(alarm){
            if(gardians.length < gardianQtt) {
                this.CrafterUnit('gardian')
            }
        }
        else{
            if(upgraders.length < upgraderQtt){
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
        }*/
        //spawn Extractors
        if(Extractor.length < MySpawner.room.find(FIND_SOURCES).length){
            this.CrafterUnit('Extractor',MySpawner.name);
        }
        if(Collector.length < MySpawner.room.find(FIND_SOURCES).length*2){
            this.CrafterUnit('Collector',MySpawner.name)
        }

        if(MySpawner.spawning) {
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
