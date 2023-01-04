import { track,trigger } from "./effect.js"

export const reactive = (target) =>{
    return new Proxy(target,{
        get(target,key,receiver){
            console.log('get:',key)
            let res = Reflect.get(target,key,receiver)
            track(target,key)
            return res
        },
        set(target,key,value,receiver){
            console.log('set:',key)
            let res = Reflect.set(target,key,value,receiver)
            trigger(target,key)
            return res
        }
    })
}