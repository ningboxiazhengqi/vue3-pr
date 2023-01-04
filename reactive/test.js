let activeEffect;
export const effect = (fn) => {
     const _effect = function () {
        activeEffect = _effect;
        fn()
     }
     _effect()
}

const targetMap = new WeakMap()
export const track = (target,key) =>{
   let depsMap = targetMap.get(target)
   if(!depsMap){
       depsMap = new Map()
       targetMap.set(target,depsMap)
   }
   let deps = depsMap.get(key)
   if(!deps){
      deps = new Set()
      depsMap.set(key,deps)
   }
 
   deps.add(activeEffect)
}

export const trigger = (target,key) => {
    const depsMap = targetMap.get(target)
    const deps = depsMap.get(key)
    deps.forEach(effect=>effect())
 }


 import {track,trigger} from './effect.js'
 const isObject = (target) => target != null && typeof target == "object";
 export const reactive = (target) => {
     return new Proxy(target,{
         get (target,key,receiver) {
           const res  = Reflect.get(target,key,receiver)
  
           track(target,key)  
           return res
         },
         set (target,key,value,receiver) {
            const res = Reflect.set(target,key,value,receiver)
  
             
            trigger(target,key)
            return res
         }
     })
 }
 
 

