import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mypipe',
  pure:false
})
export class MyPipePipe implements PipeTransform {

 
  transform(value: any, arg: string): any {
    if(!arg){
      // console.log("!arg works ", value);
      return value;
    }else{
      // var i=0;
      // var character='';
      // console.log("else work arg.toLowerCase() ",arg);
      // arg=arg.toLocaleUpperCase();
    }
   return  value.filter(items=>{
      //   while (i <= items.groupName.length){
      //   character = items.groupName.charAt(i);
      // console.log("charchet is ",items.groupName);
      // if(items.groupName == items.groupName.toUpperCase()){
      //   console.log("upper hai");
      // }
      // else{
      //   console.log("lowrcase case hai")
      // }
      // if(character === character.toLowerCase()){
      //     arg=arg.toLowerCase();
      //     console.log("arg.toLowerCase() ",arg);
      //   character='';
      //   }
      // else{
      //     arg=arg.toUpperCase();
      //     console.log("arg.toUpperCase() ",arg);
      //   character='';
      // }
      
    //  console.log("arg is ",arg);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    //  console.log("items.groupName ",items.groupName);
    //  console.log("item are ",items.groupName.includes(arg));
    // console.log("items reyrn is ",items.groupName.includes(arg));
    return items.groupName.includes(arg)==true
      // }
       });

  }

}
