import { run as jxaRun } from '@jxa/run';
import { exec } from 'child_process';
import "@jxa/global-type";

interface Command {
  keyCode: number;
  modifiers: string[];
  name?: string;
  description?: string;
}

export const rotor: Command = {
  name: "Rotor",
  description: "VO+U",
  keyCode: 32,
  modifiers: ['control down', 'option down']
};

export const moveRight: Command = {
  name: "Move Right",
  description: "VO+right arrow",
  keyCode: 124,
  modifiers: ['control down', 'option down']
};

export const startInteracting: Command = {
  name: "Start Interacting with Item",
  keyCode: 125,
  modifiers: ['control down', 'option down', 'shift down']
};

export class VoiceOver {
  public launch(): Promise<{ stdout: string; stderr: string; }> {
    return new Promise((resolve, reject) => {
      exec('/System/Library/CoreServices/VoiceOver.app/Contents/MacOS/VoiceOverStarter', (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve({ stdout, stderr });
        }
      })
    });
  }

  public stop(): Promise<unknown> {
    return jxaRun(({key, options}) => {
      const systemEvents = Application('System Events');
      systemEvents.keyCode(key, options);
    }, { key: 96, options: { using : 'command down'} });
  }

  public lastPhrase(): Promise<string> {
    return jxaRun(() => {
      const voiceOver = Application('VoiceOver');
      // @ts-expect-error
      return voiceOver.lastPhrase.content();
    })
  }

  public execute(command: Command): Promise<unknown> {
    console.log(command);
    return jxaRun(({keyCode, modifiers}) => {
      const systemEvents = Application('System Events');
      systemEvents.keyCode(keyCode, { using: modifiers });
    }, command);
  }
}
