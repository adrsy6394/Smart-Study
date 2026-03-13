import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import SubjectMarksForm from '@/components/student/SubjectMarksForm';
import StudyPlanGenerator from '@/components/student/StudyPlanGenerator';
import ResourceRecommendations from '@/components/student/ResourceRecommendations';

const StudentDashboard = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [hasPlan, setHasPlan] = useState(false);

  const handleAnalysisComplete = (analysis, record) => {
    setAnalysisData({ analysis, record });
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your performance and view AI-driven recommendations.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Analyze New Marks
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-foreground">Overall Average</CardTitle>
            <LineChart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {analysisData?.analysis?.average ? `${analysisData.analysis.average}%` : '--%'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Submit marks to analyze</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-foreground">Weak Subjects</CardTitle>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {analysisData ? analysisData.analysis.weakSubjects.length : '0'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Identified by AI</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-foreground">Study Plan</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${hasPlan ? 'text-primary' : 'text-foreground'}`}>
              {hasPlan ? 'Active' : 'Inactive'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {hasPlan ? 'Schedule generated' : 'Generate a schedule'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-foreground">Resources</CardTitle>
            <BookOpen className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
               {analysisData ? analysisData.analysis.weakSubjects.length * 2 : '--'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Pending exploration</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Content Blocks */}
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4 flex flex-col gap-6">
          <SubjectMarksForm onAnalysisComplete={handleAnalysisComplete} />
          
          {/* We'll mount recommendations under the input form so they don't fight for space with the study plan */}
          {analysisData && analysisData.analysis.weakSubjects.length > 0 && (
             <ResourceRecommendations />
          )}
        </div>

        <div className="md:col-span-8 flex flex-col gap-6">
          <Card className="bg-card border-border flex-1">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Latest AI Analysis</CardTitle>
              <CardDescription>Your recent performance breakdown.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[150px] border-t border-border pt-6">
              {analysisData ? (
                <div className="space-y-4">
                  <p className="text-foreground leading-relaxed">
                    {analysisData.analysis.summary}
                  </p>
                  {analysisData.analysis.weakSubjects.length > 0 && (
                     <div>
                       <h4 className="font-semibold text-sm text-foreground mb-2">Focus Areas:</h4>
                       <div className="flex flex-wrap gap-2">
                         {analysisData.analysis.weakSubjects.map((sub, idx) => (
                           <span key={idx} className="px-3 py-1 bg-destructive/10 text-destructive text-sm font-medium rounded-full">
                             {sub}
                           </span>
                         ))}
                       </div>
                     </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                   <span className="text-sm text-muted-foreground">No data available yet. Please input your marks.</span>
                </div>
              )}
            </CardContent>
          </Card>

          <StudyPlanGenerator onPlanUpdate={() => setHasPlan(true)} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
