import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/services/api';

const SubjectMarksForm = ({ onAnalysisComplete }) => {
  const [subjects, setSubjects] = useState([{ name: '', marks: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: '', marks: '' }]);
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const handleChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    const hasEmpty = subjects.some(s => !s.name.trim() || s.marks === '');
    if (hasEmpty) {
      setError('Please fill out all subject names and marks.');
      return;
    }

    setLoading(true);
    
    try {
      const subjectNames = subjects.map(s => s.name);
      const scores = subjects.map(s => Number(s.marks));

      const response = await api.post('/ai/analyze-performance', { subjects: subjectNames, marks: scores });

      if (response.data.success) {
        toast.success('Analysis Complete', {
           description: 'Your academic performance has been analyzed by AI.'
        });
        if (onAnalysisComplete) {
          // Backend sends: { success, data: record, analysis: analysisResult }
          onAnalysisComplete(response.data.analysis, response.data.data);
        }
        // Reset form after successful submission
        setSubjects([{ name: '', marks: '' }]);
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Failed to analyze marks';
      setError(msg);
      toast.error('Analysis Failed', { description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Input Marks</CardTitle>
        <CardDescription>Enter your recent test scores to get AI feedback.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">{error}</div>}
          
          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Subject Name (e.g., Math)"
                    value={subject.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="bg-input border-border focus:border-ring focus:ring-ring text-foreground"
                    required
                  />
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Marks"
                    value={subject.marks}
                    onChange={(e) => handleChange(index, 'marks', e.target.value)}
                    className="bg-input border-border focus:border-ring focus:ring-ring text-foreground"
                    required
                  />
                </div>
                {subjects.length > 1 ? (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    className="text-muted-foreground hover:text-destructive flex-shrink-0"
                    onClick={() => handleRemoveSubject(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                ) : (
                  <div className="w-10"></div> /* Placeholder for alignment */
                )}
              </div>
            ))}
          </div>

          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={handleAddSubject}
            className="w-full border-dashed border-border text-foreground hover:bg-secondary/50"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Subject
          </Button>

          <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
              </>
            ) : (
              'Get AI Analysis'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubjectMarksForm;
