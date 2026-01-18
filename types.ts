export enum Software {
  PREMIERE = 'Adobe Premiere Pro',
  AFTER_EFFECTS = 'Adobe After Effects',
  FINAL_CUT = 'Final Cut Pro',
  DAVINCI = 'DaVinci Resolve',
  BLENDER = 'Blender 3D',
  CAPCUT = 'CapCut',
  NUKE = 'Foundry Nuke'
}

export enum OS {
  MAC = 'macOS',
  WINDOWS = 'Windows',
  LINUX = 'Linux'
}

export enum Language {
  ENGLISH = 'English',
  SPANISH = 'Español',
  PORTUGUESE = 'Português (BR)'
}

export interface ShortcutResult {
  action: string;
  keys: string[];
  description: string;
  context: string;
}

export interface SearchState {
  query: string;
  results: ShortcutResult[];
  isLoading: boolean;
  error: string | null;
}

export interface AppConfig {
  software: Software;
  os: OS;
  softwareLanguage: Language; 
  uiLanguage: Language; 
}