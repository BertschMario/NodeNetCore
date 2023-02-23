let myControllers: {[key:string]:any} = {};

@Controller('/class')
class MyClass {
    annotated: boolean
}

@Controller('/test')
class MyClass2 {
    annotated: boolean
}

function Controller(path:string) {
    return function decorator(target) {
        myControllers[path] = target
    }
}

console.log(myControllers)