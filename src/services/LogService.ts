import fs from 'fs';
export const writeFile = (filePath: string, data: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath,`${data}\r\n`    , (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}