import { RequestCoverage } from "../classes/RequestCoverage";
import { createCoverage } from "./CoverageService";

describe('Test Coverage Service', () => {
    test('Shold be return error', async () => {
        const request = new RequestCoverage(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
        const result = await createCoverage(request);
        expect(result).toBe("error: -creditoSuperAvance - connect ECONNREFUSED 127.0.0.1:3000");
    })
});