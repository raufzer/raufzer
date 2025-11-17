import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function MemoryUsageChart() {
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
            type: 'line',
            data: {
                labels: ['1K', '5K', '10K', '50K', '100K'],
                datasets: [
                    {
                        label: 'OS Threads (GB)',
                        data: [1, 5, 10, 50, 100],
                        borderColor: isDark ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)',
                        backgroundColor: isDark ? 'rgba(248, 113, 113, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        borderWidth: 3,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 9,
                        pointBackgroundColor: isDark ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)',
                        pointBorderColor: isDark ? 'rgb(17, 24, 39)' : '#fff',
                        pointBorderWidth: 3,
                        pointHoverBorderWidth: 4,
                        fill: true,
                    },
                    {
                        label: 'Goroutines (MB)',
                        data: [2, 10, 20, 100, 200],
                        borderColor: isDark ? 'rgb(74, 222, 128)' : 'rgb(34, 197, 94)',
                        backgroundColor: isDark ? 'rgba(74, 222, 128, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                        borderWidth: 3,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 9,
                        pointBackgroundColor: isDark ? 'rgb(74, 222, 128)' : 'rgb(34, 197, 94)',
                        pointBorderColor: isDark ? 'rgb(17, 24, 39)' : '#fff',
                        pointBorderWidth: 3,
                        pointHoverBorderWidth: 4,
                        fill: true,
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
                        text: 'Memory Consumption: Goroutines vs OS Threads',
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
                                    if (label.includes('Threads')) {
                                        label += value.toFixed(1) + ' GB';
                                    } else {
                                        label += value.toFixed(0) + ' MB';
                                    }
                                }
                                return label;
                            },
                            afterLabel: function (context) {
                                const count = context.label;
                                if (context.datasetIndex === 0) {
                                    // OS Threads
                                    return `~1MB per thread`;
                                } else {
                                    // Goroutines
                                    return `~2KB per goroutine`;
                                }
                            }
                        }
                    },
                },
                scales: {
                    y: {
                        type: 'logarithmic',
                        min: 1,
                        ticks: {
                            color: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                            font: {
                                size: 12,
                                family: 'Inter, system-ui, sans-serif',
                            },
                            callback: function (value) {
                                if (value === 1) return '1';
                                if (value === 10) return '10';
                                if (value === 100) return '100';
                                if (value === 1000) return '1000';
                                return value;
                            }
                        },
                        grid: {
                            color: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.5)',
                            lineWidth: 1,
                        },
                        title: {
                            display: true,
                            text: 'Memory Usage (logarithmic scale)',
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
                                size: 12,
                                family: 'Inter, system-ui, sans-serif',
                            },
                        },
                        grid: {
                            color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.3)',
                        },
                        title: {
                            display: true,
                            text: 'Number of Concurrent Tasks',
                            color: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                            font: {
                                size: 12,
                                family: 'Inter, system-ui, sans-serif',
                            },
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
                    <strong className="text-base"> Dramatic Difference:</strong> At 100K concurrent tasks, OS threads consume
                    <span className="text-red-600 dark:text-red-400 font-bold"> 100GB </span>
                    while goroutines use only
                    <span className="text-green-600 dark:text-green-400 font-bold"> 200MB</span>!
                    That's a <span className="text-green-600 dark:text-green-400 font-bold">500× improvement</span>.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center text-xs">
                    <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/20 rounded-lg border border-red-200 dark:border-red-800 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-bold text-red-700 dark:text-red-400 mb-2 text-sm"> OS Threads</p>
                        <p className="mb-1">100K threads = 100GB RAM</p>
                        <p className="text-[11px] opacity-80">~1MB per thread</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/20 rounded-lg border border-green-200 dark:border-green-800 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-bold text-green-700 dark:text-green-400 mb-2 text-sm"> Goroutines</p>
                        <p className="mb-1">100K goroutines = 200MB RAM</p>
                        <p className="text-[11px] opacity-80">~2KB per goroutine</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
