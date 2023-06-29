class Person{
    constructor(name,age){
        this.name=name
        this.age=age
    }
    eat(){
        console.log(this.age+'岁的'+this.name+'在吃饭')
    }
    skill(_skill){
        this.eat()
        console.log(this.name+'擅长'+_skill)
    }
    hobby(_hobby){
        console.log(this.name+'喜欢'+_hobby)
    }
}
//继承parent的类
// class Child extends Parent{
//     speakEnglish(){
//         console.log('i can speak english')
//     }
// }
var xushilin=new Person('许仙',20)
xushilin.skill('看病')
xushilin.hobby('蛇')
var xushilin=new Person('许士林',2)
xushilin.skill('读书')
xushilin.hobby('兔子')
