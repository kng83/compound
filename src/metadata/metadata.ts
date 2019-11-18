import 'reflect-metadata';

const plane = {
    color: 'red'
};

// Reflect.defineMetadata('note','hi there',plane);
// const note =Reflect.getMetadata('note',plane);



Reflect.defineMetadata('note','hi there',plane,'color');
console.log(Reflect.getMetadata('note',plane,'color'));

