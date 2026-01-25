"use client"
import React, { useCallback } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
    { id: '1', position: { x: 0, y: 150 }, data: { label: 'Log Source (ETL)' }, type: 'input', className: 'bg-card border-emerald-500 font-bold' },
    { id: '2', position: { x: 250, y: 150 }, data: { label: 'Failure Detector' }, className: 'bg-card border-emerald-500' },
    { id: '3', position: { x: 500, y: 50 }, data: { label: 'Schema Drift Classifier' }, className: 'bg-card' },
    { id: '4', position: { x: 500, y: 250 }, data: { label: 'Null Check Classifier' }, className: 'bg-card' },
    { id: '5', position: { x: 750, y: 150 }, data: { label: 'SQL Agent (LLM)' }, className: 'bg-primary text-primary-foreground border-none' },
    { id: '6', position: { x: 1000, y: 150 }, data: { label: 'Sandbox Validator' }, type: 'output', className: 'bg-card border-emerald-500 font-bold' },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', label: 'Drift?' },
    { id: 'e2-4', source: '2', target: '4', label: 'Error?' },
    { id: 'e3-5', source: '3', target: '5' },
    { id: 'e4-5', source: '4', target: '5' },
    { id: 'e5-6', source: '5', target: '6', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

export function ArchitectureDiagram() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);

    const onNodeClick = (_: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
    }

    return (
        <div className="h-[400px] border rounded-xl overflow-hidden bg-muted/10 relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                fitView
            >
                <Background color="#94a3b8" gap={16} />
                <Controls />
            </ReactFlow>

            {selectedNode && (
                <div className="absolute top-4 right-4 w-64 p-4 bg-popover/95 border shadow-lg rounded-lg backdrop-blur animate-in fade-in slide-in-from-right-10 z-10">
                    <h4 className="font-bold mb-2 text-sm">{selectedNode.data.label}</h4>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                        {selectedNode.data.label === 'Log Source (ETL)' && "Ingests raw logs from Databricks/Airflow jobs."}
                        {selectedNode.data.label === 'Failure Detector' && "Parses error tracebacks to identify failure category using Regex/NLP."}
                        {selectedNode.data.label === 'Schema Drift Classifier' && "Checks if source schema differs from target table definition."}
                        {selectedNode.data.label === 'Null Check Classifier' && "Identifies specific column constraint violations."}
                        {selectedNode.data.label === 'SQL Agent (LLM)' && "LLM-based agent (GPT-4) that generates deterministic repair SQL (e.g. ALTER TABLE)."}
                        {selectedNode.data.label === 'Sandbox Validator' && "Runs the generated SQL in a safe transaction (dry-run) to verify fix before applying."}
                    </div>
                    <button onClick={() => setSelectedNode(null)} className="absolute top-2 right-2 text-xs hover:text-primary">✕</button>
                </div>
            )}

            <div className="absolute bottom-4 left-4 bg-background/80 p-2 rounded text-xs text-muted-foreground border">
                Tip: Click nodes to explore architecture.
            </div>
        </div>
    );
}
