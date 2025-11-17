import { useEffect, useRef, useState } from 'react';

interface MermaidProps {
    chart: string;
    className?: string;
}

export default function Mermaid({ chart, className = '' }: MermaidProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Detect dark mode
        const checkDarkMode = () => {
            const darkMode = document.documentElement.classList.contains('dark');
            setIsDark(darkMode);
        };

        // Check initially
        checkDarkMode();

        // Watch for theme changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!containerRef.current) return;

            try {
                // Dynamically import mermaid
                const mermaid = (await import('mermaid')).default;

                // Theme-specific colors - matching chart color scheme for consistency
                const themeVariables = isDark ? {
                    // Dark theme: Use bright, saturated colors (like charts) for fills with dark text
                    primaryColor: '#93c5fd', // Lighter blue (matches chart light blue fills)
                    primaryTextColor: '#000000', // Pure black for maximum contrast
                    primaryBorderColor: '#60a5fa',
                    lineColor: '#e5e7eb', // Lighter line color for visibility
                    secondaryColor: '#c4b5fd', // Lighter purple (matches chart style)
                    secondaryTextColor: '#000000', // Pure black on purple
                    tertiaryColor: '#86efac', // Lighter green (matches chart style)
                    tertiaryTextColor: '#000000', // Pure black on green
                    background: '#0f172a',
                    mainBkg: '#1e293b',
                    secondBkg: '#334155',
                    tertiaryBkg: '#475569',
                    textColor: '#e5e7eb', // Light text for default unstyled nodes (inline styles override this)
                    border1: '#475569',
                    border2: '#64748b',
                    arrowheadColor: '#e5e7eb', // Lighter for visibility
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '16px',
                    // Edge label colors - ensure visibility
                    edgeLabelBackground: 'transparent',
                    clusterBkg: '#1e293b',
                    clusterBorder: '#64748b',
                    defaultLinkColor: '#e5e7eb', // Light color for links
                    titleColor: '#f3f4f6',
                    // Gantt specific - bright colors with dark text (chart style)
                    gridColor: '#334155',
                    todayLineColor: '#f87171',
                    doneTaskBkgColor: '#86efac', // Light green
                    doneTaskBorderColor: '#34d399',
                    activeTaskBkgColor: '#93c5fd', // Light blue
                    activeTaskBorderColor: '#60a5fa',
                    critTaskBkgColor: '#fca5a5', // Light red
                    critTaskBorderColor: '#f87171',
                    taskTextColor: '#000000', // Pure black for maximum contrast
                    taskTextOutsideColor: '#f3f4f6',
                    taskTextLightColor: '#000000', // Pure black
                    sectionBkgColor: '#1e293b',
                    altSectionBkgColor: '#0f172a',
                    sectionBkgColor2: '#334155',
                    excludeBkgColor: '#475569',
                    // Sequence specific - enhanced
                    actorBorder: '#64748b',
                    actorBkg: '#1e293b',
                    actorTextColor: '#f1f5f9',
                    actorLineColor: '#94a3b8',
                    signalColor: '#f1f5f9',
                    signalTextColor: '#f1f5f9',
                    labelBoxBkgColor: '#334155',
                    labelBoxBorderColor: '#64748b',
                    labelTextColor: '#f1f5f9',
                    loopTextColor: '#f1f5f9',
                    noteBorderColor: '#64748b',
                    noteBkgColor: '#475569',
                    noteTextColor: '#f1f5f9',
                    activationBorderColor: '#60a5fa',
                    activationBkgColor: '#1e3a8a',
                    sequenceNumberColor: '#f1f5f9',
                } : {
                    // Light theme colors - clean and professional
                    primaryColor: '#3b82f6',
                    primaryTextColor: '#0f172a',
                    primaryBorderColor: '#2563eb',
                    lineColor: '#64748b',
                    secondaryColor: '#8b5cf6',
                    tertiaryColor: '#10b981',
                    background: '#ffffff',
                    mainBkg: '#f8fafc',
                    secondBkg: '#f1f5f9',
                    tertiaryBkg: '#e2e8f0',
                    textColor: '#0f172a',
                    border1: '#cbd5e1',
                    border2: '#94a3b8',
                    arrowheadColor: '#64748b',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '16px', // Increased from 14px
                    // Gantt specific - beautiful colors
                    gridColor: '#e2e8f0',
                    todayLineColor: '#ef4444',
                    doneTaskBkgColor: '#86efac',
                    doneTaskBorderColor: '#22c55e',
                    activeTaskBkgColor: '#93c5fd',
                    activeTaskBorderColor: '#3b82f6',
                    critTaskBkgColor: '#fca5a5',
                    critTaskBorderColor: '#ef4444',
                    taskTextColor: '#0f172a',
                    taskTextOutsideColor: '#0f172a',
                    taskTextLightColor: '#f8fafc',
                    // Sequence specific - enhanced
                    actorBorder: '#cbd5e1',
                    actorBkg: '#f8fafc',
                    actorTextColor: '#0f172a',
                    actorLineColor: '#64748b',
                    signalColor: '#0f172a',
                    signalTextColor: '#0f172a',
                    labelBoxBkgColor: '#f1f5f9',
                    labelBoxBorderColor: '#cbd5e1',
                    labelTextColor: '#0f172a',
                    loopTextColor: '#0f172a',
                    noteBorderColor: '#cbd5e1',
                    noteBkgColor: '#fef3c7',
                    noteTextColor: '#0f172a',
                    activationBorderColor: '#3b82f6',
                    activationBkgColor: '#dbeafe',
                    sequenceNumberColor: '#0f172a',
                };

                // Initialize mermaid with configuration
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'base',
                    themeVariables,
                    fontFamily: 'Inter, system-ui, sans-serif',
                    securityLevel: 'loose',
                    flowchart: {
                        useMaxWidth: true,
                        htmlLabels: true,
                        curve: 'basis',
                        padding: 30, // Increased padding to prevent text cutoff
                        nodeSpacing: 100, // Increased space between nodes
                        rankSpacing: 100, // Increased space between ranks
                        diagramPadding: 30, // Increased diagram padding
                    },
                    sequence: {
                        diagramMarginX: 50,
                        diagramMarginY: 10,
                        actorMargin: 50,
                        width: 150,
                        height: 65,
                        boxMargin: 10,
                        boxTextMargin: 5,
                        noteMargin: 10,
                        messageMargin: 35,
                        mirrorActors: true,
                        useMaxWidth: true,
                    },
                    gantt: {
                        titleTopMargin: 25,
                        barHeight: 28, // Increased for better text visibility
                        barGap: 8, // Increased spacing between bars
                        topPadding: 75, // Increased top padding
                        leftPadding: 120, // Increased left padding for labels
                        gridLineStartPadding: 35,
                        fontSize: 15, // Increased font size
                        numberSectionStyles: 4,
                        useMaxWidth: true,
                    },
                });

                // Generate unique ID for this diagram
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

                // Render the diagram
                const { svg } = await mermaid.render(id, chart);

                if (containerRef.current) {
                    containerRef.current.innerHTML = svg;
                }
            } catch (error) {
                console.error('Error rendering Mermaid diagram:', error);
                if (containerRef.current) {
                    containerRef.current.innerHTML = `
            <div style="padding: 1rem; background: ${isDark ? '#7f1d1d' : '#fee'}; border: 1px solid ${isDark ? '#991b1b' : '#fcc'}; border-radius: 0.5rem; color: ${isDark ? '#fca5a5' : '#c00'};">
              <strong>Error rendering diagram:</strong>
              <pre style="margin-top: 0.5rem; font-size: 0.875rem;">${error}</pre>
            </div>
          `;
                }
            }
        };

        renderDiagram();
    }, [chart, isDark]);

    return (
        <div className="my-8 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div
                className={`mermaid-container ${className}`}
                ref={containerRef}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'auto',
                    minHeight: '400px', // Increased from 250px for better visibility
                    padding: '1.5rem', // Increased padding
                }}
            />
        </div>
    );
}
