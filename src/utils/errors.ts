// Converte qualquer erro (Supabase, rede, validação) em uma mensagem curta e
// em português, própria para mostrar ao usuário. Nunca devolve detalhes
// técnicos como nomes de tabela, políticas ou stack trace.
const FALLBACK = 'Algo deu errado. Tente novamente em instantes.';

function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  const maybe = (error as { message?: unknown } | null)?.message;
  return typeof maybe === 'string' ? maybe : '';
}

export function friendlyError(error: unknown): string {
  const raw = messageOf(error);
  const message = raw.toLowerCase();
  if (!message) return FALLBACK;

  if (message.includes('network request failed') || message.includes('failed to fetch'))
    return 'Sem conexão com a internet. Verifique sua rede e tente de novo.';
  if (message.includes('invalid login credentials')) return 'E-mail ou senha incorretos.';
  if (message.includes('user already registered'))
    return 'Este e-mail já está cadastrado.';
  if (message.includes('email not confirmed'))
    return 'Confirme seu e-mail pelo link que enviamos antes de entrar.';
  if (message.includes('password should be at least'))
    return 'A senha é curta demais. Use pelo menos 6 caracteres.';
  if (message.includes('rate limit') || message.includes('too many requests'))
    return 'Muitas tentativas seguidas. Aguarde um pouco e tente de novo.';
  if (message.includes('row-level security') || message.includes('permission denied'))
    return 'Você não tem permissão para fazer isso.';
  if (message.includes('duplicate key') || message.includes('already exists'))
    return 'Já existe um registro com esses dados.';
  if (
    message.includes('jwt') ||
    message.includes('refresh token') ||
    message.includes('not authenticated')
  )
    return 'Sua sessão expirou. Entre novamente.';
  if (message.includes('timeout') || message.includes('timed out'))
    return 'A operação demorou demais. Tente novamente.';
  if (message.includes('variáveis do supabase'))
    return 'O app não foi configurado: faltam as variáveis do Supabase no arquivo .env.';

  // Mensagens já escritas em português pelo próprio app podem ser mostradas.
  if (/[áàâãéêíóôõúç]/.test(message) && raw.length <= 160) return raw;
  return FALLBACK;
}
