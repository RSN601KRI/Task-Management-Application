import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onCreateTask: () => void;
}

export const EmptyState = ({ onCreateTask }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="rounded-full bg-primary/10 p-6 mb-6">
        <CheckCircle2 className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">No tasks yet</h3>
      <p className="text-muted-foreground mb-6 text-center max-w-sm">
        Get started by creating your first task and stay organized.
      </p>
      <Button onClick={onCreateTask} size="lg">
        Create Your First Task
      </Button>
    </div>
  );
};
