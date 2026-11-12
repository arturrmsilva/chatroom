import type { Ionicons } from '@expo/vector-icons';

// Nome válido de ícone do conjunto Ionicons. Tipar assim faz o TypeScript
// recusar, em tempo de compilação, um nome de ícone que não existe.
export type IconName = keyof typeof Ionicons.glyphMap;
