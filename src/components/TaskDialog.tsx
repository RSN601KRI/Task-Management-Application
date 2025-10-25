import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '@/types/task';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: (taskData: { title: string; description: string; status: TaskStatus }) => Promise<void>;
}

export const TaskDialog = ({ open, onOpenChange, task, onSave }: TaskDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<{ title: string; description: string; status: TaskStatus } | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  }, [task, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    if (!description.trim()) {
      toast.error('Please enter a task description');
      return;
    }

    const changes = {
      title: title.trim(),
      description: description.trim(),
      status
    };

    if (task) {
      // If editing, show confirmation dialog
      setPendingChanges(changes);
      setConfirmDialogOpen(true);
    } else {
      // If creating new task, proceed without confirmation
      await saveChanges(changes);
    }
  };

  const saveChanges = async (changes: { title: string; description: string; status: TaskStatus }) => {
    setIsSubmitting(true);
    try {
      await onSave(changes);
      onOpenChange(false);
      toast.success(task ? 'Task updated successfully' : 'Task created successfully');
    } catch (error) {
      toast.error('Failed to save task. Please try again.');
    } finally {
      setIsSubmitting(false);
      setConfirmDialogOpen(false);
      setPendingChanges(null);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
              <DialogDescription>
                {task ? 'Update the task details below.' : 'Fill in the details to create a new task.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                  maxLength={100}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter task description"
                  rows={4}
                  maxLength={500}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus)}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Task Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update this task with the following changes?
              <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
                {pendingChanges && (
                  <>
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Title:</p>
                      <p className="text-sm">{pendingChanges.title}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Description:</p>
                      <p className="text-sm">{pendingChanges.description}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm">Status:</p>
                      <p className="text-sm capitalize">{pendingChanges.status}</p>
                    </div>
                  </>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => pendingChanges && saveChanges(pendingChanges)}
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? 'Updating...' : 'Confirm Update'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
