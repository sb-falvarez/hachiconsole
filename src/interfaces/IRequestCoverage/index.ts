import { DocumentData } from "./DocumentData";
import { SignData } from "./SignData";

export interface IRequestCoverage {
    typeDocument: string;
    rut:          string;
    documentData: DocumentData;
    signData:     SignData;
}

