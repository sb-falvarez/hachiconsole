import {IRequestCoverage} from '../interfaces/IRequestCoverage';
import { DocumentData } from '../interfaces/IRequestCoverage/DocumentData';
import { SignData } from '../interfaces/IRequestCoverage/SignData';
import { ICityCommune } from '../interfaces/ICityCommune';

import {citys} from '../data/citys';
import {communes} from '../data/communes';

export class RequestCoverage implements IRequestCoverage {
    typeDocument: string;
    rut: string;
    documentData: DocumentData;
    signData: SignData;
    constructor (line:string){
        const [,,,,,,birthDate,,,,,,,coverageNumber,,,,,,name,documentType,,rutNum,,,,address,addressNumber,houseNumber,,,,commune,city,phoneArea,phoneNumber,cellNumber,email] = line.split(';');
        this.typeDocument = documentType.toLocaleLowerCase() ==='avance' ? 'creditoAvance' : 'creditoSuperAvance';
        this.rut = rutNum;
        this.documentData =  {
            nombre: name,
            fechaNacimiento: birthDate.replace(/\//g, ""),
            direccion: address,
            nroDireccion: isNaN(parseInt(addressNumber)) ? 0 : parseInt(addressNumber),
            depto: isNaN(parseInt(houseNumber)) ? 0 : parseInt(houseNumber),
            ciudad:  citys.find(c => c.id === parseInt(city))?.name || '' ,
            comuna: communes.find(c => c.id === parseInt(commune))?.name || '',
            telefono: isNaN(parseInt(`${phoneArea}${phoneNumber}`)) ? 0 : parseInt(`${phoneArea}${phoneNumber}`),
            celular: parseInt(cellNumber),
            correoElectronico: email
        };
        this.signData = {sign: `${rutNum}${coverageNumber}${Math.round(+new Date()/1000)}` };
    }
}