import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { startupService, StartupSummary, CampaignSummary } from '../services/startupService';

interface FeaturedSectionProps {
  onViewDetails?: (id: number) => void;
}

function formatAmount(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}

export default function FeaturedSection({ onViewDetails }: FeaturedSectionProps) {
  const [startups, setStartups] = useState<StartupSummary[]>([]);
  const [campaigns, setCampaigns] = useState<Record<number, CampaignSummary[] | null>>({});
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [startupsRes, catsRes] = await Promise.all([
          startupService.listStartups({ page: 1, limit: 9 }),
          startupService.getCategories(),
        ]);
        const list = startupsRes.startups ?? [];
        setStartups(list);
        setCategories(catsRes.categories ?? []);
        list.forEach(s => {
          startupService.getCampaignsByStartup(s.id)
            .then(r => setCampaigns(prev => ({ ...prev, [s.id]: r.campaigns ?? [] })))
            .catch(() => setCampaigns(prev => ({ ...prev, [s.id]: [] })));
        });
      } catch {
        setError('Failed to load startups');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = activeCategory
    ? startups.filter(s => s.categoryId === activeCategory)
    : startups;

  return (
    <section className="bg-gradient-to-br from-[#F5F7FA] to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-[#0F1720] mb-2">Trending This Week</h2>
          <p className="text-[#6B7A8C]">High-performing startups with momentum</p>
        </div>

        {/* Category filter tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === null
                  ? 'bg-[#274060] text-white'
                  : 'bg-white border border-[#DCE3E8] text-[#6B7A8C] hover:border-[#274060] hover:text-[#274060]'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
                  activeCategory === cat.id
                    ? 'bg-[#274060] text-white'
                    : 'bg-white border border-[#DCE3E8] text-[#6B7A8C] hover:border-[#274060] hover:text-[#274060]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-7 h-7 animate-spin text-[#274060]" />
            <span className="ml-3 text-[#6B7A8C]">Loading startups…</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-5">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-[#6B7A8C] py-12">No startups found in this category.</p>
        )}

        {/* Cards */}
        {!loading && !error && filtered.length > 0 && (
          <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            {filtered.map(startup => {
              const campsData = campaigns[startup.id]; // null = loaded empty, undefined = still loading
              const camps = campsData ?? [];
              const activeCamp = camps.find(c => c.status === 'active');
              const raised = camps.reduce((s, c) => s + (c.raisedAmount ?? 0), 0);
              const target = camps.reduce((s, c) => s + (c.targetAmount ?? 0), 0);
              const pct = target > 0 ? Math.min(Math.round((raised / target) * 100), 100) : 0;
              const catName = categories.find(c => c.id === startup.categoryId)?.name;
              const campaignsLoaded = campsData !== undefined;

              return (
                <div
                  key={startup.id}
                  className="flex-shrink-0 w-80 bg-white border-2 border-[#DCE3E8] rounded-xl overflow-hidden hover:shadow-2xl hover:border-[#274060] transition-all duration-300 group flex flex-col"
                >
                  {/* Top accent */}
                  <div className="bg-gradient-to-r from-[#274060] to-[#3A5A7A] px-4 py-2 flex items-center justify-between">
                    {catName ? (
                      <span className="text-white text-xs font-semibold capitalize">{catName}</span>
                    ) : (
                      <span />
                    )}
                    {activeCamp && (
                      <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">Active</span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-lg flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                        {startup.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[#0F1720] text-base truncate">{startup.name}</h3>
                        <span className="text-sm text-[#6B7A8C]">{startup.location}</span>
                      </div>
                    </div>

                    <p className="text-sm text-[#6B7A8C] mb-4 line-clamp-2 flex-1">
                      {startup.description || 'No description provided.'}
                    </p>

                    {/* Funding progress */}
                    {!campaignsLoaded ? (
                      <div className="mb-4 flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin text-[#6B7A8C]" />
                        <span className="text-xs text-[#6B7A8C]">Loading campaign…</span>
                      </div>
                    ) : camps.length > 0 && target > 0 ? (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-[#6B7A8C]">{pct}% funded</span>
                          <span className="text-sm font-semibold text-[#274060]">
                            {formatAmount(raised)} / {formatAmount(target)}
                          </span>
                        </div>
                        <div className="w-full bg-[#DCE3E8] rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#274060] to-[#3A5A7A] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    ) : camps.length > 0 ? (
                      <div className="mb-4">
                        <span className="text-xs text-[#6B7A8C]">Campaign active · no target set</span>
                      </div>
                    ) : null}

                    <div className="flex items-center gap-2 pt-3 border-t border-[#F5F7FA]">
                      <button
                        onClick={() => onViewDetails?.(startup.id)}
                        className="flex-1 px-4 py-2.5 bg-[#274060] text-white text-sm rounded-lg hover:bg-[#3A5A7A] transition-all duration-200 group-hover:shadow-lg"
                      >
                        View Details
                      </button>
                      {startup.websiteUrl && (
                        <a
                          href={startup.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 border border-[#DCE3E8] rounded-lg text-[#6B7A8C] hover:border-[#274060] hover:text-[#274060] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
