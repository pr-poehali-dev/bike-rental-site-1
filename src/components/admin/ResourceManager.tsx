import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';
import { contentApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ResourceDef, FieldDef } from './resourceConfig';

type Row = Record<string, unknown>;

const ResourceManager = ({ def }: { def: ResourceDef }) => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const tableFields = def.fields.filter((f) => !f.hideInTable);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const items = await contentApi.list(def.resource);
      setRows(items);
    } catch (e) {
      toast({ title: 'Ошибка загрузки', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [def.resource, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    const init: Row = {};
    def.fields.forEach((f) => {
      init[f.key] = f.type === 'boolean' ? true : f.type === 'list' ? [] : '';
    });
    setForm(init);
    setEditing({});
  };

  const openEdit = (row: Row) => {
    setForm({ ...row });
    setEditing(row);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload: Row = {};
      def.fields.forEach((f) => {
        payload[f.key] = form[f.key];
      });
      if (editing && editing.id) {
        await contentApi.update(def.resource, { id: editing.id, ...payload });
        toast({ title: 'Сохранено' });
      } else {
        await contentApi.create(def.resource, payload);
        toast({ title: 'Добавлено' });
      }
      setEditing(null);
      load();
    } catch (e) {
      toast({ title: 'Ошибка', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteId == null) return;
    try {
      await contentApi.remove(def.resource, deleteId);
      toast({ title: 'Удалено' });
      load();
    } catch (e) {
      toast({ title: 'Ошибка', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setDeleteId(null);
    }
  };

  const renderCell = (f: FieldDef, val: unknown) => {
    if (f.type === 'boolean') {
      return val ? (
        <Badge className="bg-leaf text-forest-deep border-0">Да</Badge>
      ) : (
        <Badge variant="secondary">Нет</Badge>
      );
    }
    if (f.key === 'status') {
      return <Badge variant="outline">{String(val)}</Badge>;
    }
    const text = String(val ?? '');
    return text.length > 60 ? text.slice(0, 60) + '…' : text;
  };

  const setField = (key: string, value: unknown) =>
    setForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            <Icon name={def.icon} size={24} className="text-primary" /> {def.title}
          </h2>
          <p className="text-sm text-muted-foreground">{rows.length} записей</p>
        </div>
        {!def.readOnly && (
          <Button onClick={openCreate} className="gradient-forest text-primary-foreground">
            <Icon name="Plus" size={18} /> Добавить
          </Button>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        {loading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {tableFields.map((f) => (
                  <TableHead key={f.key}>{f.label}</TableHead>
                ))}
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={String(row.id)}>
                  {tableFields.map((f) => (
                    <TableCell key={f.key}>{renderCell(f, row[f.key])}</TableCell>
                  ))}
                  <TableCell className="text-right whitespace-nowrap">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                      <Icon name="Pencil" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => setDeleteId(Number(row.id))}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={tableFields.length + 1} className="text-center text-muted-foreground py-8">
                    Нет записей
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editing?.id ? `Редактировать ${def.singular}` : `Добавить ${def.singular}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {def.fields.map((f) => (
              <div key={f.key} className="space-y-2">
                <Label>{f.label}</Label>
                {f.type === 'textarea' && (
                  <Textarea
                    value={String(form[f.key] ?? '')}
                    onChange={(e) => setField(f.key, e.target.value)}
                    rows={3}
                  />
                )}
                {f.type === 'text' && (
                  <Input
                    value={String(form[f.key] ?? '')}
                    placeholder={f.placeholder}
                    onChange={(e) => setField(f.key, e.target.value)}
                  />
                )}
                {f.type === 'number' && (
                  <Input
                    type="number"
                    value={String(form[f.key] ?? '')}
                    onChange={(e) => setField(f.key, e.target.value === '' ? '' : Number(e.target.value))}
                  />
                )}
                {f.type === 'boolean' && (
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={!!form[f.key]}
                      onCheckedChange={(c) => setField(f.key, c)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {form[f.key] ? 'Включено' : 'Выключено'}
                    </span>
                  </div>
                )}
                {f.type === 'select' && (
                  <Select
                    value={String(form[f.key] ?? '')}
                    onValueChange={(v) => setField(f.key, v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите" />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options?.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {f.type === 'list' && (
                  <Textarea
                    value={(Array.isArray(form[f.key]) ? (form[f.key] as string[]) : []).join('\n')}
                    placeholder="Каждый пункт с новой строки"
                    onChange={(e) =>
                      setField(f.key, e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))
                    }
                    rows={4}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Отмена</Button>
            <Button onClick={save} disabled={saving} className="gradient-forest text-primary-foreground">
              {saving ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId != null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
            <AlertDialogDescription>Это действие нельзя отменить.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResourceManager;
