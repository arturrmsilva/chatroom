import { friendlyError } from '@/utils/errors';

describe('friendlyError', () => {
  it('traduz falha de rede', () => {
    expect(friendlyError(new Error('Network request failed'))).toMatch(/Sem conexão/);
  });
  it('traduz erros de login e cadastro do Supabase Auth', () => {
    expect(friendlyError({ message: 'Invalid login credentials' })).toBe(
      'E-mail ou senha incorretos.',
    );
    expect(friendlyError(new Error('User already registered'))).toMatch(
      /já está cadastrado/,
    );
  });
  it('traduz bloqueio de segurança do banco (RLS)', () => {
    expect(
      friendlyError({
        message: 'new row violates row-level security policy for table "rooms"',
      }),
    ).toMatch(/permissão/);
  });
  it('mantém mensagens já escritas em português pelo app', () => {
    expect(friendlyError(new Error('Informe um e-mail válido.'))).toBe(
      'Informe um e-mail válido.',
    );
  });
  it('usa mensagem genérica para erro desconhecido ou vazio', () => {
    expect(friendlyError(undefined)).toMatch(/Algo deu errado/);
    expect(friendlyError(new Error('xyz internal stack'))).toMatch(/Algo deu errado/);
  });
});
