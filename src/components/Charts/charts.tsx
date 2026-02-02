import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartProps } from "../../types/charts";
import { Pie } from "react-chartjs-2";



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export function BarChart({ labels, values }: ChartProps) {
    if (!labels?.length || !values?.length) return null;

    const data = {
        labels,
        datasets: [
            {
                label: "Projects",
                data: values,
                backgroundColor: ["#f87171", "#facc15", "#34d399"] // red, yellow, green
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "#ffffff" // make legend text white
                }
            },
            title: {
                display: true,
                text: "Project Status",
                color: "#ffffff" // make title text white
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#ffffff" // make x-axis labels white
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.2)" // optional: lighten grid lines
                }
            },
            y: {
                ticks: {
                    color: "#ffffff" // make y-axis labels white
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.2)"
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
}

export function Piechart({ labels, values }: ChartProps) {
    if (!labels?.length || !values?.length) return null;

    const data = {
        labels,
        datasets: [
            {
                label: "Tasks",
                data: values,
                backgroundColor: ["red", "blue", "green", "purple", "yellow", "grey"]
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    color: "white" // ← Legend text color
                }
            },
            title: {
                display: true,
                text: "Tasks Status Pie",
                color: "white" // ← Title text color
            },
            tooltip: {
                bodyColor: "white", // ← Tooltip text
                titleColor: "white"
            }
        }
    };

    return <Pie data={data} options={options} />;
}