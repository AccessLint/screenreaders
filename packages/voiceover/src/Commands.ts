export interface Command {
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

export const activate: Command = {
  name: "Activate a control",
  keyCode: 49,
  modifiers: ['control down', 'option down']
};
