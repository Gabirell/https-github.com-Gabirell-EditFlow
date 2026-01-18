import { Software, OS, Language } from './types';

// UI Translation Dictionary
export const TRANSLATIONS = {
  [Language.ENGLISH]: {
    title: "EditFlow AI",
    subtitle: "Find any shortcut naturally",
    selectSoftware: "Select Software",
    selectOS: "Operating System",
    softwareLang: "Software Language",
    searchPlaceholder: "Ask like a human: 'How do I cut a clip?'",
    searchButton: "Find Shortcuts",
    loading: "Searching knowledge base...",
    noResults: "No shortcuts found. Try rephrasing your request.",
    tip: "Pro tip: You can ask for multiple actions at once.",
    context: "Context",
    settings: "Settings"
  },
  [Language.SPANISH]: {
    title: "EditFlow AI",
    subtitle: "Encuentra atajos naturalmente",
    selectSoftware: "Seleccionar Software",
    selectOS: "Sistema Operativo",
    softwareLang: "Idioma del Software",
    searchPlaceholder: "Pregunta naturalmente: '¿Cómo corto un clip?'",
    searchButton: "Buscar Atajos",
    loading: "Buscando en la base de conocimientos...",
    noResults: "No se encontraron atajos. Intenta reformular.",
    tip: "Consejo: Puedes pedir múltiples acciones a la vez.",
    context: "Contexto",
    settings: "Configuración"
  },
  [Language.PORTUGUESE]: {
    title: "EditFlow AI",
    subtitle: "Encontre atalhos naturalmente",
    selectSoftware: "Selecionar Software",
    selectOS: "Sistema Operacional",
    softwareLang: "Idioma do Software",
    searchPlaceholder: "Pergunte naturalmente: 'Como corto um clipe?'",
    searchButton: "Buscar Atajos",
    loading: "Pesquisando na base de conhecimento...",
    noResults: "Nenhum atalho encontrado. Tente reformular.",
    tip: "Dica: Você pode pedir várias acciones de uma vez.",
    context: "Contexto",
    settings: "Configurações"
  }
};

/**
 * High Quality Official Icons with specific requested sources
 */
export const SOFTWARE_ICONS: Record<Software, string> = {
  [Software.PREMIERE]: "https://cdn.icon-icons.com/icons2/3053/PNG/512/adobe_premiere_pro_macos_bigsur_icon_189485.png",
  [Software.AFTER_EFFECTS]: "https://cdn.icon-icons.com/icons2/21/PNG/512/after_effects_23552.png",
  [Software.FINAL_CUT]: "https://cdn.icon-icons.com/icons2/3053/PNG/512/final_cut_pro_macos_bigsur_icon_190177.png",
  [Software.DAVINCI]: "https://cdn.icon-icons.com/icons2/3053/PNG/512/davinci_resolve_macos_bigsur_icon_190261.png",
  [Software.BLENDER]: "https://cdn.icon-icons.com/icons2/21/PNG/512/blender_23505.png",
  [Software.CAPCUT]: "https://images.seeklogo.com/logo-png/43/1/capcut-logo-png_seeklogo-437025.png",
  [Software.NUKE]: "https://cdn.icon-icons.com/icons2/4113/PNG/512/nuke_logo_icon_248345.png"
};

/**
 * Fallback themes for fallback initials display
 */
export const SOFTWARE_THEMES: Record<Software, { bg: string, text: string, initials: string }> = {
  [Software.PREMIERE]: { bg: "bg-[#2D005A]", text: "text-[#9999FF]", initials: "Pr" },
  [Software.AFTER_EFFECTS]: { bg: "bg-[#00005B]", text: "text-[#D199FF]", initials: "Ae" },
  [Software.FINAL_CUT]: { bg: "bg-red-600", text: "text-white", initials: "Fc" },
  [Software.DAVINCI]: { bg: "bg-[#0575E6]", text: "text-white", initials: "Dr" },
  [Software.BLENDER]: { bg: "bg-[#F5792A]", text: "text-white", initials: "Bl" },
  [Software.CAPCUT]: { bg: "bg-black", text: "text-white", initials: "Cc" },
  [Software.NUKE]: { bg: "bg-[#F7B500]", text: "text-black", initials: "Nk" }
};

/**
 * Brand colors and styling for the selection buttons
 */
export const SOFTWARE_COLORS: Record<Software, string> = {
  [Software.PREMIERE]: "border-purple-600 bg-purple-600/10 text-purple-200 shadow-purple-500/10",
  [Software.AFTER_EFFECTS]: "border-indigo-600 bg-indigo-600/10 text-indigo-200 shadow-indigo-500/10",
  [Software.FINAL_CUT]: "border-red-600 bg-red-600/10 text-red-100 shadow-red-500/10",
  [Software.DAVINCI]: "border-blue-600 bg-blue-600/10 text-blue-200 shadow-blue-500/10",
  [Software.BLENDER]: "border-yellow-500 bg-yellow-500/10 text-yellow-100 shadow-yellow-500/10",
  [Software.CAPCUT]: "border-teal-500 bg-teal-500/10 text-teal-100 shadow-teal-500/10",
  [Software.NUKE]: "border-orange-600 bg-orange-600/10 text-orange-100 shadow-orange-500/10"
};