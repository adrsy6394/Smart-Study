import React, { useState } from 'react';
import SubjectMarksForm from '@/components/student/SubjectMarksForm';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const WeakSubjects = () => {
  const [analysis, setAnalysis] = useState(null);

  const handleAnalysisComplete = (analysisResult) => {
    setAnalysis(analysisResult);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Performance Analysis</h1>
        <p className="text-muted-foreground mt-1">
          Identify your strengths and weaknesses using AI-driven insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <SubjectMarksForm onAnalysisComplete={handleAnalysisComplete} />
        </div>

        <div className="md:col-span-8 space-y-6">
          <Card className="bg-card border-border h-full">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                AI Analysis Results
              </CardTitle>
              <CardDescription>Detailed breakdown of your academic standing.</CardDescription>
            </CardHeader>
            <CardContent className="border-t border-border pt-6">
              {analysis ? (
                <div className="space-y-6">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h4 className="font-semibold text-foreground mb-2">Summary</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {analysis.summary}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-background border border-border rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Average Score</h4>
                      <div className="text-2xl font-bold text-foreground">{analysis.average}%</div>
                    </div>
                    <div className="p-4 bg-background border border-border rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                      <div className={`text-2xl font-bold ${analysis.average >= 75 ? 'text-success' : 'text-warning'}`}>
                        {analysis.average >= 75 ? 'On Track' : 'Needs Focus'}
                      </div>
                    </div>
                  </div>

                  {analysis.weakSubjects && analysis.weakSubjects.length > 0 ? (
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-3">Priority Focus Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.weakSubjects.map((sub, idx) => (
                          <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive text-sm font-medium rounded-full border border-destructive/20">
                            <AlertTriangle className="w-4 h-4" />
                            {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-success/10 text-success rounded-lg border border-success/20">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">Excellent! No weak subjects identified.</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground opacity-60">
                   <AlertTriangle className="w-12 h-12 mb-4" />
                   <p>No analysis data available. Please submit your marks on the left.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WeakSubjects;
