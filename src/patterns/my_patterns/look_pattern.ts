
namespace Look_1{
    
    class Look {
        name = "Pawel";
        myAge = 34;
    }
    
    // this can be used to make super Class with loot of power
    class Some {
        protected customModel = new Look();
    
        get verify() {
            let role = <Look>{};
            Object.keys(this.customModel).forEach((key) => {
                console.log(key);
                (role as any)[key] = (this as any).customModel[key];
            });
            return role
    
        };
    }
    
    let some = new Some();
    console.log(some.verify.myAge);
    
}


