var truck = {
    run: function(creep){
        if(creep.memory.hauling && creep.carry.energy == 0){
            creep.memory.hauling = false;
        }
        if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity){
            creep.memory.hauling = true;
        }
        
        if(creep.memory.hauling){
            targets = creep.room.find(FIND_STRUCTURES, {
               filter: function (targets){ 
                   return ((targets.structureType == STRUCTURE_SPAWN || targets.structureType == STRUCTURE_EXTENSION || (targets.structureType == STRUCTURE_TOWER && targets.energy < targets.energyCapacity - 300)) 
                   && (targets.energy < targets.energyCapacity)); }
            });
            if(targets.length > 0){
                if(ERR_NOT_IN_RANGE == creep.transfer(targets[0], RESOURCE_ENERGY)){
                    creep.moveTo(targets[0]);
                }
            } else {
                targets = creep.room.find(FIND_STRUCTURES,{
                   filter: function(targets){ 
                        return (targets.structureType == STRUCTURE_CONTAINER || targets.structureType == STRUCTURE_STORAGE)
                        && _.sum(targets.store) < (targets.storeCapacity - 300)
                        && targets.pos.findInRange(FIND_SOURCES, 2).length == 0 } 
                });
                if(targets.length > 0){
                    if(ERR_NOT_IN_RANGE == creep.transfer(targets[0], RESOURCE_ENERGY)){
                        creep.moveTo(targets[0]);
                    }
                } else {
            creep.moveTo(Game.flags['idleHarvesters']);
                }
            }
        } else {
            targets = creep.room.find(FIND_DROPPED_ENERGY,{
                   filter: function(targets){ 
                       return targets.energy > creep.carryCapacity } 
                });
            if(targets.length){
                target = creep.pos.findClosestByRange(targets);
                if(creep.pickup(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            } else {
                targets = creep.room.find(FIND_STRUCTURES,{
                   filter: function(targets){ 
                       return targets.structureType == STRUCTURE_CONTAINER 
                       && targets.store[RESOURCE_ENERGY] > creep.carryCapacity 
                       && targets.pos.findInRange(FIND_SOURCES, 2).length > 0 } 
                });
                if(targets.length){
                    target = creep.pos.findClosestByRange(targets);
                    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(target);
                    }
                } else {
                    targets = creep.room.find(FIND_STRUCTURES,{
                        filter: function(targets){
                           return targets.structureType == STRUCTURE_STORAGE
                           && targets.store[RESOURCE_ENERGY] > creep.carryCapacity }
                    });
                    if(targets.length){
                        target = creep.pos.findClosestByRange(targets);
                        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(target);
                        }
                    }
                }
            }
        }
    },
    storTrucker: function(creep){
        if(creep.memory.hauling && creep.carry.energy == 0){
            creep.memory.hauling = false;
        }
        if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity){
            creep.memory.hauling = true;
        }
        if(creep.memory.hauling){
            targets = creep.room.find(FIND_STRUCTURES,{
               filter: function(targets){ 
                    return targets.structureType == STRUCTURE_STORAGE
                    && _.sum(targets.store) < (targets.storeCapacity - 300)} 
            });
            if(targets.length > 0){
                if(ERR_NOT_IN_RANGE == creep.transfer(targets[0], RESOURCE_ENERGY)){
                    creep.moveTo(targets[0]);
                }
            }
        } else {
            targets = creep.room.find(FIND_STRUCTURES,{
               filter: function(targets){ 
                   return targets.structureType == STRUCTURE_CONTAINER 
                   && targets.store[RESOURCE_ENERGY] > creep.carryCapacity 
                   && targets.pos.findInRange(FIND_SOURCES, 2).length > 0 } 
            });
            if(targets.length){
                target = creep.pos.findClosestByRange(targets);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            } else {
                creep.moveTo(Game.flags['idleST']);
            }
        }
    },
    logTrucker: function(creep){
        if(creep.memory.hauling && creep.carry.energy == 0){
            creep.memory.hauling = false;
        }
        if(!creep.memory.hauling && creep.carry.energy == creep.carryCapacity){
            creep.memory.hauling = true;
        }
        
        if(creep.memory.hauling){
            targets = creep.room.find(FIND_STRUCTURES, {
               filter: function (targets){ 
                   return ((targets.structureType == STRUCTURE_SPAWN || targets.structureType == STRUCTURE_EXTENSION || (targets.structureType == STRUCTURE_TOWER && targets.energy < targets.energyCapacity - 300)) 
                   && (targets.energy < targets.energyCapacity)); }
            });
            if(targets.length > 0){
                if(ERR_NOT_IN_RANGE == creep.transfer(targets[0], RESOURCE_ENERGY)){
                    creep.moveTo(targets[0]);
                }
            } else {
                targets = creep.room.find(FIND_STRUCTURES,{
                   filter: function(targets){ 
                        return (targets.structureType == STRUCTURE_CONTAINER)
                        && _.sum(targets.store) < (targets.storeCapacity - 300)
                        && targets.pos.findInRange(FIND_SOURCES, 2).length == 0 } 
                });
                if(targets.length > 0){
                    if(ERR_NOT_IN_RANGE == creep.transfer(targets[0], RESOURCE_ENERGY)){
                        creep.moveTo(targets[0]);
                    }
                } else {
                    creep.moveTo(Game.flags['idleLT']);
                }
            }
        } else {
            targets = creep.room.find(FIND_STRUCTURES,{
                filter: function(targets){
                   return targets.structureType == STRUCTURE_STORAGE
                   && targets.store[RESOURCE_ENERGY] > creep.carryCapacity }
            });
            if(targets.length){
                target = creep.pos.findClosestByRange(targets);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }
        }
    }
}

module.exports = truck;