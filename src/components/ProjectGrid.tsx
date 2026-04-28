import { useEffect, useState } from 'react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Mimicking an API call using fetch to the local JSON
    const fetchProjects = async () => {
      try {
        const response = await fetch('/src/data/projects.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // Add fallback images for display
        const projectsWithImages = data.map((p: Project, i: number) => ({
          ...p,
          imageUrl: [
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format",
            "https://images.unsplash.com/photo-1666209282400-c7d956461df0?q=80"
          ][i % 3]
        }));
        setProjects(projectsWithImages);
      } catch (err) {
        setError('Failed to load projects. Please ensure the project data exists.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="py-24 text-center font-mono opacity-50">Loading archives...</div>;
  if (error) return <div className="py-24 text-center text-red-500 font-mono">{error}</div>;

  return (
    <section id="projects" className="py-24 px-8 md:px-20 bg-paper">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
          <div>
            <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-gold mb-6">Portfolio</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-ink">Selected Works</h3>
          </div>
          <p className="max-w-md text-ink/60 text-lg leading-relaxed">
            A curated selection of our most challenging and rewarding commissions across three continents.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              id={`project-card-${project.id}`}
            >
              <div 
                className="relative aspect-[4/5] overflow-hidden bg-ink/5 mb-6"
                onClick={() => setSelectedImage(`${project.imageUrl}&w=1600&q=95`)}
              >
                <img
                  src={project.imageUrl + "&w=800&q=80"}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 p-3 bg-paper rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <ArrowUpRight className="w-5 h-5 text-ink" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-2xl font-serif text-ink">{project.title}</h4>
                  <span className="font-mono text-xs opacity-40">{project.year}</span>
                </div>
                <p className="text-sm text-ink/50 uppercase tracking-widest">{project.location}</p>
                <p className="pt-4 text-ink/70 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 bg-ink/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-paper/50 hover:text-paper p-2 transition-colors z-110"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-[1280px] max-h-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Selected project view"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
