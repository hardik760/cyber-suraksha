'use client';

import { useEffect, useState, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';

export default function DigitalTwin() {
  const [simulation, setSimulation] = useState<any>(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const cyRef = useRef<any>(null);

  useEffect(() => {
    // Load simulation from session storage
    const simData = sessionStorage.getItem('current_simulation');
    if (simData) {
      setSimulation(JSON.parse(simData));
    }
  }, []);

  useEffect(() => {
    if (!simulation || typeof window === 'undefined') return;

    // Initialize Cytoscape
    import('cytoscape').then((cytoscapeModule) => {
      const cytoscape = cytoscapeModule.default;

      const container = document.getElementById('cy');
      if (!container || cyRef.current) return;

      const cy = cytoscape({
        container,
        elements: [
          // Nodes
          { data: { id: 'employee_1', label: '💻 Workstation', status: 'healthy' } },
          { data: { id: 'email_server', label: '✉️ Email Server', status: 'healthy' } },
          { data: { id: 'database', label: '🗄️ Database', status: 'healthy' } },
          { data: { id: 'auth_system', label: '🔐 Auth System', status: 'healthy' } },
          { data: { id: 'file_server', label: '📁 File Server', status: 'healthy' } },
          { data: { id: 'cloud_storage', label: '☁️ Cloud Storage', status: 'healthy' } },
          { data: { id: 'backup_server', label: '💾 Backup', status: 'healthy' } },
          { data: { id: 'vendor_portal', label: '🏢 Vendor Portal', status: 'healthy' } },
          // Edges
          { data: { source: 'employee_1', target: 'email_server' } },
          { data: { source: 'email_server', target: 'database' } },
          { data: { source: 'employee_1', target: 'auth_system' } },
          { data: { source: 'auth_system', target: 'file_server' } },
          { data: { source: 'file_server', target: 'cloud_storage' } },
          { data: { source: 'cloud_storage', target: 'backup_server' } },
          { data: { source: 'vendor_portal', target: 'database' } },
        ],
        style: [
          {
            selector: 'node',
            style: {
              'label': 'data(label)',
              'text-valign': 'center',
              'text-halign': 'center',
              'background-color': '#2563eb',
              'color': '#fff',
              'font-size': '12px',
              'width': '80px',
              'height': '80px',
              'text-wrap': 'wrap',
              'text-max-width': '80px',
            },
          },
          {
            selector: 'node[status="infected"]',
            style: {
              'background-color': '#ef4444',
            },
          },
          {
            selector: 'node[status="scanning"]',
            style: {
              'background-color': '#f59e0b',
            },
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#dee2e6',
              'target-arrow-color': '#dee2e6',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
            },
          },
        ],
        layout: {
          name: 'circle',
          padding: 50,
        },
      });

      cyRef.current = cy;
    });
  }, [simulation]);

  useEffect(() => {
    if (!isPlaying || !simulation || !cyRef.current) return;

    if (currentEventIndex >= simulation.events.length) {
      setIsPlaying(false);
      return;
    }

    const event = simulation.events[currentEventIndex];
    const timeout = currentEventIndex === 0 ? 0 : 1500;

    const timer = setTimeout(() => {
      const node = cyRef.current.$(`#${event.node_id}`);
      if (node) {
        if (event.event_type === 'infection' || event.event_type === 'initial_compromise') {
          node.data('status', 'infected');
          node.style('background-color', '#ef4444');
        }
      }
      setCurrentEventIndex(currentEventIndex + 1);
    }, timeout);

    return () => clearTimeout(timer);
  }, [isPlaying, currentEventIndex, simulation]);

  const startSimulation = () => {
    setIsPlaying(true);
    setCurrentEventIndex(0);
    // Reset all nodes
    if (cyRef.current) {
      cyRef.current.nodes().forEach((node: any) => {
        node.data('status', 'healthy');
        node.style('background-color', '#2563eb');
      });
    }
  };

  if (!simulation) {
    return (
      <DashboardLayout>
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Digital Twin Sandbox</h1>
          <p className="text-textSecondary mt-2">No simulation loaded. Go to Attack Scenarios to launch one.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Digital Twin Sandbox</h1>
          <p className="text-textSecondary mt-2">Watch attack propagation in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Network Visualization</h3>
                <button
                  onClick={startSimulation}
                  disabled={isPlaying}
                  className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
                >
                  {isPlaying ? 'Playing...' : 'Start Simulation'}
                </button>
              </div>
              <div
                id="cy"
                className="w-full h-[500px] border border-border rounded-lg"
              />
            </Card>
          </div>

          <div>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Event Timeline</h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {simulation.events.map((event: any, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      index < currentEventIndex ? 'bg-red-50' : 'bg-gray-50'
                    }`}
                  >
                    <p className="text-sm font-medium text-textPrimary">{event.description}</p>
                    <p className="text-xs text-textSecondary mt-1">
                      {event.event_type} - {event.node_id}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Simulation Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-textSecondary">Infected Nodes</p>
              <p className="text-2xl font-bold text-danger">{simulation.final_state?.infected_nodes?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm text-textSecondary">Score Impact</p>
              <p className="text-2xl font-bold text-danger">{simulation.final_state?.score_impact || 0}</p>
            </div>
            <div>
              <p className="text-sm text-textSecondary">BPI Change</p>
              <p className="text-2xl font-bold text-warning">+{simulation.final_state?.bpi_change || 0}%</p>
            </div>
            <div>
              <p className="text-sm text-textSecondary">Duration</p>
              <p className="text-2xl font-bold text-primary">{Math.round((simulation.final_state?.time_to_complete || 0) / 1000)}s</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
