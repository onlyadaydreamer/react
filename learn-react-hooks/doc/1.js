function show(obj){
  let number = obj.number;
  setTimeout(function(){
      console.log(obj.number);
  },3000);
}

let obj = {number:0};
show(obj);
obj.number = 3;