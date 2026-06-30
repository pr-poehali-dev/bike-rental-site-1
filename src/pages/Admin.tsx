import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';
import { RESOURCE_DEFS } from '@/components/admin/resourceConfig';
import ResourceManager from '@/components/admin/ResourceManager';
import UsersManager from '@/components/admin/UsersManager';

type View = string;

const roleLabels: Record<string, string> = {
  admin: 'Администратор',
  editor: 'Редактор',
  user: 'Пользователь',
};

const Admin = () => {
  const { user, loading, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<View>('bikes');

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Icon name="LoaderCircle" size={40} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role === 'user') {
    return (
      <div className="min-h-screen grid place-items-center gradient-sky p-4">
        <div className="text-center bg-card p-10 rounded-2xl shadow-xl border border-border max-w-md">
          <Icon name="ShieldAlert" size={48} className="text-destructive mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Доступ запрещён</h1>
          <p className="text-muted-foreground mb-6">
            Эта страница доступна только администраторам и редакторам.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>На сайт</Button>
            {!user && (
              <Button onClick={() => navigate('/login')} className="gradient-forest text-primary-foreground">
                Войти
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    ...RESOURCE_DEFS.map((d) => ({ id: d.resource, label: d.title, icon: d.icon })),
    ...(isAdmin ? [{ id: 'users', label: 'Пользователи', icon: 'Users' }] : []),
  ];

  const NavList = ({ onPick }: { onPick?: () => void }) => (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setView(item.id);
            onPick?.();
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            view === item.id
              ? 'gradient-forest text-primary-foreground'
              : 'text-foreground/80 hover:bg-secondary'
          }`}
        >
          <Icon name={item.icon} size={18} />
          {item.label}
        </button>
      ))}
    </nav>
  );

  const activeDef = RESOURCE_DEFS.find((d) => d.resource === view);

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border p-4 fixed h-screen">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary mb-6">
          <span className="grid place-items-center w-9 h-9 rounded-full gradient-forest text-primary-foreground">
            <Icon name="Bike" size={18} />
          </span>
          ВелоТропа
        </Link>
        <div className="flex-1 overflow-y-auto">
          <NavList />
        </div>
      </aside>

      <div className="flex-1 lg:ml-64 flex flex-col">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Icon name="Menu" size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 overflow-y-auto">
                <div className="font-display text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <Icon name="LayoutDashboard" size={20} /> Админ-панель
                </div>
                <NavListWrapper>
                  <NavList />
                </NavListWrapper>
              </SheetContent>
            </Sheet>
            <h1 className="font-display text-lg font-bold hidden sm:block">
              Панель управления
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-tight">{user.name}</p>
              <Badge variant="secondary" className="text-xs">{roleLabels[user.role]}</Badge>
            </div>
            <Avatar>
              <AvatarFallback className="gradient-forest text-primary-foreground font-semibold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={() => { logout(); navigate('/'); }} title="Выйти">
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-8 max-w-6xl w-full mx-auto">
          {view === 'users' ? (
            <UsersManager />
          ) : activeDef ? (
            <ResourceManager def={activeDef} key={activeDef.resource} />
          ) : null}

          <Separator className="my-8" />
          <p className="text-xs text-muted-foreground text-center">
            ВелоТропа · Админ-панель · Роль: {roleLabels[user.role]}
          </p>
        </main>
      </div>
    </div>
  );
};

const NavListWrapper = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export default Admin;
