import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const user = await login(String(fd.get('email')), String(fd.get('password')));
      navigate(user.role === 'user' ? '/' : '/admin');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await register(
        String(fd.get('name')),
        String(fd.get('email')),
        String(fd.get('password')),
      );
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center gradient-sky bg-grain p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 font-display text-2xl font-bold text-forest-deep mb-6">
          <span className="grid place-items-center w-10 h-10 rounded-full gradient-forest text-primary-foreground">
            <Icon name="Bike" size={22} />
          </span>
          ВелоТропа
        </Link>

        <Card className="border-border shadow-2xl">
          <CardHeader className="text-center pb-2">
            <h1 className="font-display text-2xl font-bold">Личный кабинет</h1>
            <p className="text-sm text-muted-foreground">Вход и регистрация</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 mb-5 w-full">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="l-email">Email</Label>
                    <Input id="l-email" name="email" type="email" placeholder="admin@velotropa.ru" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="l-pass">Пароль</Label>
                    <Input id="l-pass" name="password" type="password" placeholder="••••••••" required />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full gradient-forest text-primary-foreground h-11">
                    {loading ? 'Вход...' : 'Войти'}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Демо-админ: admin@velotropa.ru / admin123
                </p>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="r-name">Имя</Label>
                    <Input id="r-name" name="name" placeholder="Иван Иванов" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-email">Email</Label>
                    <Input id="r-email" name="email" type="email" placeholder="you@mail.ru" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-pass">Пароль</Label>
                    <Input id="r-pass" name="password" type="password" placeholder="Минимум 6 символов" required minLength={6} />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full gradient-forest text-primary-foreground h-11">
                    {loading ? 'Создаём...' : 'Зарегистрироваться'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <Link to="/" className="block text-center text-sm text-primary mt-6 story-link w-fit mx-auto">
              ← Вернуться на сайт
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
