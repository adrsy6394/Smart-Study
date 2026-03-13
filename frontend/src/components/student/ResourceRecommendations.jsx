import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Youtube, ExternalLink, GraduationCap, Link2, BookOpen } from 'lucide-react';
import api from '@/services/api';

const ResourceRecommendations = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError('');
      // It's a GET request now based on our controller update
      const response = await api.get('/ai/recommend-resources');
      if (response.data.success) {
        setResources(response.data.data);
      }
    } catch (err) {
      console.error('Fetch Resources Error:', err);
      setError('Failed to load resources. Try generating an analysis first.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const getYoutubeLink = (query) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  };

  const getGoogleLink = (query) => {
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  };

  if (loading) {
     return (
       <Card className="bg-card border-border flex-1 h-full min-h-[300px]">
         <CardContent className="h-full flex items-center justify-center">
           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
         </CardContent>
       </Card>
     );
  }

  return (
    <Card className="bg-card border-border flex-1 flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
           <CardTitle className="text-lg text-foreground flex items-center gap-2">
             <GraduationCap className="h-5 w-5 text-primary" /> 
             Recommended Resources
           </CardTitle>
           <CardDescription>Curated materials for your weak subjects.</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={fetchResources} className="h-8 border-border text-foreground hover:bg-secondary/50">
           Refresh
        </Button>
      </CardHeader>
      <CardContent className="border-t border-border pt-6 flex-1">
          {error && <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">{error}</div>}
          
          {(!resources || resources.length === 0) && !error ? (
              <div className="flex flex-col items-center justify-center h-full space-y-3 opacity-80 py-10">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
                <span className="text-sm text-muted-foreground text-center">
                  No recommendations right now. <br/> Submit some marks to identify weak subjects first!
                </span>
              </div>
          ) : (
             <div className="space-y-4">
               {resources.map((item, idx) => (
                 <div key={idx} className="p-4 rounded-lg bg-background border border-border/60 hover:border-primary/40 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                       <span className="px-2.5 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                         {item.subject}
                       </span>
                       <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                         {item.difficulty || item.type}
                       </span>
                    </div>
                    
                    <h4 className="text-base font-medium text-foreground mb-1">{item.topic}</h4>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                       <a href={getYoutubeLink(item.searchQuery)} target="_blank" rel="noopener noreferrer" className="flex-1">
                         <Button variant="outline" size="sm" className="w-full h-8 text-xs border-red-900/30 hover:bg-red-900/10 hover:text-red-400 group">
                           <Youtube className="w-3.5 h-3.5 mr-1.5 text-red-500 group-hover:text-red-400" /> Watch Videos
                         </Button>
                       </a>
                       <a href={getGoogleLink(item.searchQuery)} target="_blank" rel="noopener noreferrer" className="flex-1">
                         <Button variant="outline" size="sm" className="w-full h-8 text-xs border-blue-900/30 hover:bg-blue-900/10 hover:text-blue-400 group">
                           <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-blue-500 group-hover:text-blue-400" /> Web Articles
                         </Button>
                       </a>
                    </div>
                 </div>
               ))}
             </div>
          )}
      </CardContent>
    </Card>
  );
};

export default ResourceRecommendations;
