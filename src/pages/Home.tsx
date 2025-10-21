import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, ListChecks, BarChart3, Users, Zap, Shield } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
  const features = [
    {
      icon: ListChecks,
      title: 'Smart Task Organization',
      description: 'Organize your tasks with intuitive categories and status tracking. Keep everything in one place.',
    },
    {
      icon: BarChart3,
      title: 'Visual Progress Tracking',
      description: 'Track your progress with beautiful visualizations. See what matters at a glance.',
    },
    {
      icon: Users,
      title: 'Collaboration Ready',
      description: 'Share tasks and collaborate with your team. Work together seamlessly.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built for speed and efficiency. Get more done in less time with our optimized interface.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We take your privacy seriously.',
    },
    {
      icon: CheckSquare,
      title: 'Simple & Intuitive',
      description: 'No learning curve. Start organizing your tasks immediately with our clean interface.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-accent">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium">New: Dark mode support</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
            Organize Your Tasks,
            <br />
            Achieve Your Goals
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
            TaskFlow helps you manage your daily tasks with ease. Stay organized, 
            boost productivity, and never miss a deadline again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="shadow-elegant">
              <Link to="/login">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-lg overflow-hidden shadow-elegant bg-card border animate-scale-in">
            <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
              <CheckSquare className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you manage tasks efficiently and achieve more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover-scale transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl mb-4">
                Built for Modern Teams
              </CardTitle>
              <CardDescription className="text-lg">
                TaskFlow is designed from the ground up to help individuals and teams 
                stay organized and productive in today's fast-paced world.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                  <div className="text-muted-foreground">Tasks Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-primary rounded-2xl p-12 shadow-elegant">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of users who are already organizing their tasks with TaskFlow.
          </p>
          <Button asChild size="lg" variant="secondary" className="shadow-md">
            <Link to="/login">Start Free Today</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}