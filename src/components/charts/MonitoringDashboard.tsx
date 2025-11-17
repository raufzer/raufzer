import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function MonitoringDashboard() {
    const successGaugeRef = useRef<HTMLCanvasElement>(null);
    const timeoutGaugeRef = useRef<HTMLCanvasElement>(null);
    const latencyChartRef = useRef<HTMLCanvasElement>(null);
    const successGaugeInstance = useRef<Chart | null>(null);
    const timeoutGaugeInstance = useRef<Chart | null>(null);
    const latencyChartInstance = useRef<Chart | null>(null);
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
        // Sample data
        const successRate = 97.8;
        const timeoutRate = 2.1;
        const totalRequests = 1_234_567;
        const latencyData = [45, 52, 48, 51, 49, 55, 47, 50, 53, 48, 46, 51];
        const timeLabels = ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '10m', '11m', '12m'];

        // Success Rate Gauge
        if (successGaugeRef.current) {
            const ctx = successGaugeRef.current.getContext('2d');
            if (ctx) {
                if (successGaugeInstance.current) {
                    successGaugeInstance.current.destroy();
                }

                successGaugeInstance.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [successRate, 100 - successRate],
                            backgroundColor: [
                                isDark ? 'rgb(74, 222, 128)' : 'rgb(34, 197, 94)',
                                isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.5)',
                            ],
                            borderWidth: 0,
                        }],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '75%',
                        plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false },
                        },
                    },
                });
            }
        }

        // Timeout Rate Gauge
        if (timeoutGaugeRef.current) {
            const ctx = timeoutGaugeRef.current.getContext('2d');
            if (ctx) {
                if (timeoutGaugeInstance.current) {
                    timeoutGaugeInstance.current.destroy();
                }

                const isHealthy = timeoutRate < 5;
                timeoutGaugeInstance.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [timeoutRate, 100 - timeoutRate],
                            backgroundColor: [
                                isHealthy
                                    ? (isDark ? 'rgb(74, 222, 128)' : 'rgb(34, 197, 94)')
                                    : (isDark ? 'rgb(248, 113, 113)' : 'rgb(239, 68, 68)'),
                                isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.5)',
                            ],
                            borderWidth: 0,
                        }],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '75%',
                        plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false },
                        },
                    },
                });
            }
        }

        // Latency Chart
        if (latencyChartRef.current) {
            const ctx = latencyChartRef.current.getContext('2d');
            if (ctx) {
                if (latencyChartInstance.current) {
                    latencyChartInstance.current.destroy();
                }

                latencyChartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: timeLabels,
                        datasets: [{
                            label: 'Avg Latency (ms)',
                            data: latencyData,
                            borderColor: isDark ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)',
                            backgroundColor: isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                            borderWidth: 3,
                            tension: 0.4,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            pointBackgroundColor: isDark ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)',
                            pointBorderColor: isDark ? 'rgb(17, 24, 39)' : '#fff',
                            pointBorderWidth: 2,
                            fill: true,
                        }],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },
                        animation: {
                            duration: 1000,
                            easing: 'easeInOutQuart',
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                                titleColor: isDark ? 'rgb(243, 244, 246)' : 'rgb(17, 24, 39)',
                                bodyColor: isDark ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
                                borderColor: isDark ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)',
                                borderWidth: 1,
                                padding: 10,
                                cornerRadius: 6,
                                callbacks: {
                                    label: (context) => `${context.parsed.y}ms`,
                                },
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                    color: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                                    font: { size: 11, family: 'Inter, system-ui, sans-serif' },
                                    callback: (value) => `${value}ms`,
                                },
                                grid: {
                                    color: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.4)',
                                },
                            },
                            x: {
                                ticks: {
                                    color: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
                                    font: { size: 10, family: 'Inter, system-ui, sans-serif' },
                                },
                                grid: {
                                    color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.3)',
                                },
                            },
                        },
                    },
                });
            }
        }

        return () => {
            if (successGaugeInstance.current) successGaugeInstance.current.destroy();
            if (timeoutGaugeInstance.current) timeoutGaugeInstance.current.destroy();
            if (latencyChartInstance.current) latencyChartInstance.current.destroy();
        };
    }, [isDark]);

    const successRate = 97.8;
    const timeoutRate = 2.1;
    const totalRequests = 1_234_567;
    const avgLatency = 49;

    return (
        <div className="my-8 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    📊 Tracking Service Monitoring Dashboard
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Real-time metrics for fire-and-forget tracking operations
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Success Rate Gauge */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="text-center mb-2">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                            Success Rate
                        </p>
                    </div>
                    <div className="relative" style={{ height: '120px' }}>
                        <canvas ref={successGaugeRef}></canvas>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {successRate}%
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">✓ Healthy</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            Target: ≥95%
                        </p>
                    </div>
                </div>

                {/* Timeout Rate Gauge */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="text-center mb-2">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                            Timeout Rate
                        </p>
                    </div>
                    <div className="relative" style={{ height: '120px' }}>
                        <canvas ref={timeoutGaugeRef}></canvas>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {timeoutRate}%
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">✓ Healthy</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            Target: &lt;5%
                        </p>
                    </div>
                </div>

                {/* Total Requests Counter */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 shadow-sm">
                    <div className="text-center">
                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide mb-3">
                            Total Requests
                        </p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            {totalRequests.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            <span>Last 24 hours</span>
                        </div>
                    </div>
                </div>

                {/* Average Latency */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800 shadow-sm">
                    <div className="text-center">
                        <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wide mb-3">
                            Avg Latency
                        </p>
                        <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            {avgLatency}ms
                        </p>
                        <div className="flex items-center justify-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>Last 12 min</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latency Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Average Latency Over Time
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Tracking request response times (last 12 minutes)
                    </p>
                </div>
                <div style={{ height: '200px' }}>
                    <canvas ref={latencyChartRef}></canvas>
                </div>
            </div>

            {/* Status Indicators */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="text-gray-600 dark:text-gray-400">All systems operational</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                    <span className="text-gray-600 dark:text-gray-400">Monitoring active</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-500">Last updated: Just now</span>
                </div>
            </div>
        </div>
    );
}
