import React from 'react';
import ResourceRecommendations from '@/components/student/ResourceRecommendations';

const Resources = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Recommended Resources</h1>
        <p className="text-muted-foreground mt-1">
          AI-curated learning materials to help you master your weak subjects.
        </p>
      </div>

      <div className="grid gap-6">
        <ResourceRecommendations />
      </div>
    </div>
  );
};

export default Resources;
