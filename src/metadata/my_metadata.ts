import 'reflect-metadata';

export function Field(): PropertyDecorator {
    return (target, key) => {
        let t = target;
        const fields = Reflect.getOwnMetadata('fields', t) || [];
        if (!fields.includes(key)) {
            fields.push(key)
        }
        Reflect.defineMetadata('fields', fields, t)
    }
} //

export function TryCatch() {
    return function (target: object, key:string, propertyDesc: PropertyDescriptor) {
        const fn = propertyDesc.value;
        propertyDesc.value = function (...args:any) {
            try {
                console.log('try catch this', this, target);
                return fn.call(this, ...args);
            } catch (e) {
                return null;
            }
        }
    }
}


class Demo {
    getFields() {
        return Reflect.getMetadata('fields', this);
    }
}

class Biko extends Demo {
    @Field()
    param_3 = 4;
    @Field()
    param_5 = 6;
}

class Bobo extends Demo {
    @Field()
    param_4 = 3;

    @TryCatch()
    superFunction(arg:any) {
        return arg.id[1];
    }

    @TryCatch()
    getPara() {
        return this.param_4;
    }
}


let biko = new Biko();
let bobo = new Bobo();
let value = bobo.superFunction({ id: [12, 34] });
console.log(value);

