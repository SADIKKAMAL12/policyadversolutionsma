import { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { policyTabs } from '../data/policies';

interface PoliciesPageProps {
  onAgree: () => void;
}

export default function PoliciesPage({ onAgree }: PoliciesPageProps) {
  const [selectedTabId, setSelectedTabId] = useState(policyTabs[0].id);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedPolicy = policyTabs.find((tab) => tab.id === selectedTabId)!;

  useEffect(() => {
    setHasScrolledToBottom(false);
  }, [selectedTabId]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 50;

      if (scrolledToBottom) {
        setHasScrolledToBottom(true);
      }
    };

    const element = contentRef.current;
    element?.addEventListener('scroll', handleScroll);

    return () => element?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-2">Service & Policy Selection</h1>
            <p className="text-slate-300">Select a category and review the corresponding policy</p>
          </div>

          <div className="border-b border-slate-200">
            <div className="flex flex-wrap gap-2 p-6">
              {policyTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTabId(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedTabId === tab.id
                      ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={contentRef}
            className="h-[500px] overflow-y-auto p-8 scroll-smooth"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{selectedPolicy.title}</h2>

            {selectedPolicy.sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-wide">
                  {section.heading}
                </h3>
                <div className="text-slate-700 leading-relaxed space-y-2">
                  {Array.isArray(section.content) ? (
                    section.content.map((line, i) => (
                      <p key={i} className={line === '' ? 'h-2' : ''}>
                        {line}
                      </p>
                    ))
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
                {index < selectedPolicy.sections.length - 1 && (
                  <div className="my-6 h-px bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300"></div>
                )}
              </section>
            ))}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200">
            <button
              onClick={onAgree}
              disabled={!hasScrolledToBottom}
              className={`w-full max-w-md mx-auto block py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
                hasScrolledToBottom
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-105 cursor-pointer'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-6 h-6" />
                I AGREE TO THE POLICY
              </span>
            </button>
            {!hasScrolledToBottom && (
              <p className="text-center text-slate-500 text-sm mt-4">
                Please scroll to the bottom to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
