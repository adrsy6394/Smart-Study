import React from 'react';
import StudyPlanGenerator from '@/components/student/StudyPlanGenerator';

const StudyPlan = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Personalized Study Plan</h1>
        <p className="text-muted-foreground mt-1">
          Your AI-driven weekly schedule optimized for your learning pace.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <StudyPlanGenerator />
      </div>
    </div>
  );
};

export default StudyPlan;
