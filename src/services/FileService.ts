import fs from 'graceful-fs';
export  const  readFile =(filePath: string): Promise<string[]> => {
    let lines:string[] = [];
    try{
        lines = fs.readFileSync(filePath, 'utf8').split('\n');
    }
    catch(err){
        console.log(err);
    }
    return Promise.resolve(lines);
}
export  const existsFile =(filePath: string): Promise<boolean> => {
    let exists:boolean = false;
    try{
        exists = fs.existsSync(filePath);
    }
    catch(err){
        console.log(err);
    }
    return Promise.resolve(exists);
}
