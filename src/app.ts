import { inquirerMenu, pause  } from "./helpers/menu";
import { IOption } from "./interfaces/Ioption";
import { getFileName } from "./controller/Coverage";


const main = async() => {
 let opt:string;
 do{
    const option:IOption = await inquirerMenu();
    opt = option.option;
    switch(opt){
        case '1':
            await getFileName();
            break;
        case 'exit':
            console.log('Saliendo...');
            break;
    }
    await pause();
 }  while (opt !== 'exit');
}

main();