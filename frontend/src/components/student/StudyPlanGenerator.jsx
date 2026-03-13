import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CalendarHeart, Lightbulb, Clock } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/services/api';

const StudyPlanGenerator = ({ onPlanUpdate }) => {
  const [dailyHours, setDailyHours] = useState(2);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    fetchExistingPlan();
  }, []);

  const fetchExistingPlan = async () => {
    try {
      setFetching(true);
      const response = await api.get('/ai/study-plan');
      if (response.data.success && response.data.data) {
        setPlan(response.data.data);
        if (onPlanUpdate) onPlanUpdate(response.data.data);
      }
    } catch (err) {
      // 404 means no plan yet, which is fine
      if (err.response?.status !== 404) {
        console.error('Error fetching plan:', err);
      }
    } finally {
      setFetching(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!dailyHours || dailyHours <= 0 || dailyHours > 24) {
      setError('Please enter a valid number of daily hours (1-24).');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await api.post('/ai/generate-study-plan', { dailyHours });
      if (response.data.success) {
        toast.success('Study Plan Generated', {
           description: 'Your AI planner has successfully scheduled your focus zones.'
        });
        setPlan(response.data.data);
        if (onPlanUpdate) onPlanUpdate(response.data.data);
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Failed to generate plan. Have you analyzed performance first?';
      setError(msg);
      toast.error('Plan Generation Failed', { description: msg });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
     return (
       <Card className="bg-card border-border">
         <CardContent className="h-[200px] flex items-center justify-center">
           <Loader2 className="h-6 w-6 animate-spin text-muted-foreground delay-150" />
         </CardContent>
       </Card>
     );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Plan Display Block */}
      <Card className="bg-card border-border flex-1">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-lg text-foreground">{plan ? plan.title : 'Current Study Plan'}</CardTitle>
            <CardDescription>Your AI-generated focus zones for the week.</CardDescription>
          </div>
          
          <form onSubmit={handleGenerate} className="flex gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="hours" className="text-xs text-muted-foreground whitespace-nowrap">Daily Hours:</Label>
              <Input 
                id="hours"
                type="number"
                min="1"
                max="24"
                className="w-16 h-8 bg-input border-border text-foreground focus:ring-ring text-sm"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
              />
            </div>
            <Button type="submit" size="sm" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90 h-8">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Generate New Plan'}
            </Button>
          </form>
        </CardHeader>
        <CardContent className="border-t border-border pt-6 min-h-[150px]">
          {error && <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">{error}</div>}
          
          {!plan ? (
            <div className="flex flex-col items-center justify-center h-full space-y-3 opacity-80 py-10">
              <CalendarHeart className="h-10 w-10 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">No active plan. Check your performance first, then generate one.</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* General Tips */}
              {plan.generalTips && plan.generalTips.length > 0 && (
                <div className="bg-secondary/30 rounded-lg p-4 border border-border/50 flex gap-3">
                  <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-foreground">AI Study Tips</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      {plan.generalTips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Weekly Schedule Timeline Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-2">
                 {plan.days && plan.days.map((dayPlan, idx) => (
                    <Card key={idx} className="bg-background border border-border shadow-sm hover:border-primary/50 transition-colors">
                      <CardHeader className="p-4 pb-2">
                         <CardTitle className="text-base text-foreground font-semibold flex justify-between items-center">
                            {dayPlan.day}
                            <div className="flex items-center text-xs text-muted-foreground font-normal">
                              <Clock className="w-3 h-3 mr-1" />
                              {dayPlan.durationMinutes}m
                            </div>
                         </CardTitle>
                         <CardDescription className="text-sm text-primary font-medium truncate pt-1">
                            Focus: {dayPlan.focusSubject}
                         </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                         <ul className="text-sm text-muted-foreground space-y-2 mt-2">
                             {dayPlan.tasks && dayPlan.tasks.map((task, tIdx) => (
                               <li key={tIdx} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                                  <span className="leading-snug">{task}</span>
                               </li>
                             ))}
                         </ul>
                      </CardContent>
                    </Card>
                 ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyPlanGenerator;
