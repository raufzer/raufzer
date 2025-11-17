import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function GoroutineComparisonChart() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Detect dark mode
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Memory (KB)', 'Creation Time (μs)', 'Context Switch (μs)', 'Max Concurrent (K)'],
                datasets: [
                    {
                        label: 'OS Thread',
                        data: [8192, 2000, 10, 10],
                        backgroundColor: isDark ? 'rgba(248, 113, 113, 0.8)' : 'rgba(239, 68, 68, 0.8)',
                        borderColor: isDark ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)',
                        borderWidth: 2,
                        borderRadius: 8,
                        hoverBackgroundColor: isDark ? 'rgba(248, 113, 113, 1)' : 'rgba(239, 68, 68, 1)',
                    },
                    {
                        label: 'Goroutine',
                        data: [2, 1, 0.2, 1000],
                        backgroundColor: isDark ? 'rgba(74, 222, 128, 0.8)' : 'rgba(34, 197, 94, 0.8)',
                        borderColor: isDark ? 'rgb(74, 222, 128)' : 'rgb(34, 197, 94)',
                        borderWidth: 2,
                        borderRadius: 8,
                        hoverBackgroundColor: isDark ? 'rgba(74, 222, 128, 1)' : 'rgba(34, 197, 94, 1)',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                animation: {
                    duration: 1200,
                    easing: 'easeInOutQuart',
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Goroutines vs OS Threads Comparison',
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: 'Inter, system-ui, sans-serif',
                        },
                        color: isDark ? 'rgb(229, 231, 235)' : 'rgb(31, 41, 55)',
                        padding: { top: 10, bottom: 20 },
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            color: isDark ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)',
                            font: {
                                size: 13,
                                family: 'Inter, system-ui, sans-serif',
                            },
                            usePointStyle: true,
                            padding: 15,
                            boxWidth: 12,
                            boxHeight: 12,
                        },
                    },
                    tooltip: {
                        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        titleColor: isDark ? 'rgb(243, 244, 246)' : 'rgb(17, 24, 39)',
                        bodyColor: isDark ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
                        borderColor: isDark ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    const value = context.parsed.y;
                                    const metric = context.label;

                                    // Format based on metric type
                                    if (metric.includes('Memory')) {
                                        label += value >= 1000 ? `${(value / 1024).toFixed(0)} MB` : `${value} KB`;
                                    } else if (metric.includes('Time')) {
                                        label += value >= 1000 ? `${(value / 1000).toFixed(2)} ms` : `${value} μs`;
                                    } else if (metric.includes('Switch')) {
                                        label += `${value} μs`;
                                    } else if (metric.includes('Concurrent')) {
                                        label += value >= 1000 ? `${(value / 1000).toFixed(0)}M` : `${value}K`;
                                    }
                                }
                                return label;
                            }
                        }
                    },
                },
                scales: {
                    y: {
                        type: 'logarithmic',
                        ticks: {
                            color: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                            font: {
                                size: 12,
                                family: 'Inter, system-ui, sans-serif',
                            },
                            callback: function (value) {
                                if (value === 0.1) return '0.1';
                                if (value === 1) return '1';
                                if (value === 10) return '10';
                                if (value === 100) return '100';
                                if (value === 1000) return '1000';
                                if (value === 10000) return '10000';
                                return value;
                            }
                        },
                        grid: {
                            color: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.5)',
                            lineWidth: 1,
                        },
                        title: {
                            display: true,
                            text: 'Value (logarithmic scale)',
                            color: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                            font: {
                                size: 12,
                                family: 'Inter, system-ui, sans-serif',
                            },
                        },
                    },
                    x: {
                        ticks: {
                            color: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                            font: {
                                size: 11,
                                family: 'Inter, system-ui, sans-serif',
                            },
                        },
                        grid: {
                            color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.3)',
                        },
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [isDark]);

    return (
        <div className="my-8 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div style={{ height: '420px', position: 'relative' }}>
                <canvas ref={chartRef}></canvas>
            </div>
            <div className="mt-6 text-sm text-gray-700 dark:text-gray-300">
                <p className="text-center mb-4 leading-relaxed">
                    <strong className="text-base">Key Insight:</strong> Y-axis uses logarithmic scale due to massive differences.
                    Goroutines are
                    <span className="text-green-600 dark:text-green-400 font-bold"> 4,096× more memory efficient</span>,
                    <span className="text-green-600 dark:text-green-400 font-bold"> 2,000× faster to create</span>, and
                    <span className="text-green-600 dark:text-green-400 font-bold"> 100,000× more scalable</span>!
                </p>
                <div className="grid grid-cols-2 gap-4 text-center text-xs">
                    <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/20 rounded-lg border border-red-200 dark:border-red-800 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-bold text-red-700 dark:text-red-400 mb-2 text-sm">🔴 OS Thread</p>
                        <p className="mb-1 text-gray-800 dark:text-gray-200">8MB memory</p>
                        <p className="mb-1 text-gray-800 dark:text-gray-200">2ms creation time</p>
                        <p className="text-gray-800 dark:text-gray-200">~10K max concurrent</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/20 rounded-lg border border-green-200 dark:border-green-800 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-bold text-green-700 dark:text-green-400 mb-2 text-sm">🟢 Goroutine</p>
                        <p className="mb-1 text-gray-800 dark:text-gray-200">2KB memory</p>
                        <p className="mb-1 text-gray-800 dark:text-gray-200">0.001ms creation time</p>
                        <p className="text-gray-800 dark:text-gray-200">~1M max concurrent</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
