import colors from "colors";
import { readInput } from "../helpers/menu";
import { RequestCoverage } from "../classes/RequestCoverage";
import { existsFile, readFile } from "../services/FileService";
import { createCoverage } from "../services/CoverageService";
import cliProgress from 'cli-progress';
import { writeFile } from "../services/LogService";

const getFileName =async () => {
        console.log('Arrastre el archivo o Ingrese la ruta del mismo');
        const path = await readInput('Ruta del archivo');
        const data = processFile(path);
    }
const getExtension = (fileName: string) => {
        const extension = fileName.split('.').pop();
        return extension;
    }
const processFile = async (path: string) => {
        const filePath = path.replace(/'/g, "");
        const exists = await existsFile(filePath);
        const extension = getExtension(filePath);
        if(!exists){
            console.log(colors.red('El archivo no existe'));
            return;
        }
        console.log(extension);
        if(extension !== 'csv') {  
            console.log(colors.red('El archivo no es un archivo valido'));
            return;
        }
        const uid:string = Math.round(+new Date()/1000).toString();
        const logFile = `${uid}.log`;
        const lines :string[] = await readFile(filePath);
        console.log('Por favor espere...');
        console.log(`Process Id: ${uid}`);
        console.log(`Procesando ${lines.length -1} registros`);
        const processBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        processBar.start(lines.length -1, 0);
        lines.map( async (line, index) => {
            if(index > 0){
               const request: RequestCoverage = new RequestCoverage(line);
               await createCoverage(request).then(res => {
                   if(res.status === 200){
                    writeFile(logFile,JSON.stringify(res.data));
                   }else{
                    writeFile(logFile,res);
                   }
                   processBar.increment();
               });               
            }
            if(index === lines.length -1){
                processBar.stop();
            }
        });
}

export { getFileName, processFile };
