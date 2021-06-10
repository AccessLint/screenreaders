import { exec } from 'child_process';

export async function sh(cmd: string): Promise<{ stdout: string; stderr: string; }> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    })
  });
}

