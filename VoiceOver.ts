import { run as jxaRun } from '@jxa/run';
import { exec } from 'child_process';
import "@jxa/global-type";

import { Command } from './Commands.js';

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
    return jxaRun(({keyCode, modifiers}) => {
      const systemEvents = Application('System Events');
      systemEvents.keyCode(keyCode, { using: modifiers });
    }, command);
  }
}
