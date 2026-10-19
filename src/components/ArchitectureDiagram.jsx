import { useState } from "react";
import "./ArchitectureDiagram.css";
import {
  Globe,
  Shield,
  Layers,
  Server,
  Database,
  Activity,
  ArrowRight,
  Cpu,
  Boxes,
  Zap,
} from "lucide-react";

export default function ArchitectureDiagram({ diagramData }) {
  const [selectedNode, setSelectedNode] = useState(null);

  if (!diagramData || !diagramData.nodes) return null;

  return (
    <div className="arch-diagram">
      <div className="arch-diagram__header">
        <span className="arch-diagram__badge">Interactive Architecture Flow</span>
        <span className="arch-diagram__hint">Click any component to inspect infrastructure details</span>
      </div>

      <div className="arch-diagram__canvas">
        <div className="arch-diagram__flow">
          {diagramData.nodes.map((node, index) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <div key={node.id} className="arch-diagram__step">
                <button
                  type="button"
                  className={`arch-node arch-node--${node.type || "default"} ${
                    isSelected ? "arch-node--selected" : ""
                  }`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="arch-node__icon">
                    {node.icon === "globe" && <Globe size={20} />}
                    {node.icon === "shield" && <Shield size={20} />}
                    {node.icon === "alb" && <Layers size={20} />}
                    {node.icon === "compute" && <Server size={20} />}
                    {node.icon === "db" && <Database size={20} />}
                    {node.icon === "k8s" && <Boxes size={20} />}
                    {node.icon === "ai" && <Cpu size={20} />}
                    {node.icon === "monitor" && <Activity size={20} />}
                    {!["globe", "shield", "alb", "compute", "db", "k8s", "ai", "monitor"].includes(
                      node.icon
                    ) && <Zap size={20} />}
                  </div>
                  <div className="arch-node__info">
                    <span className="arch-node__tier">{node.tier}</span>
                    <span className="arch-node__label">{node.label}</span>
                  </div>
                  <span className="arch-node__pulse" />
                </button>

                {index < diagramData.nodes.length - 1 && (
                  <div className="arch-diagram__connector">
                    <div className="arch-diagram__line" />
                    <ArrowRight size={14} className="arch-diagram__arrow" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Node Inspector Drawer */}
        {selectedNode ? (
          <div className="arch-inspector">
            <div className="arch-inspector__header">
              <div>
                <span className="badge badge--cyan">{selectedNode.tier}</span>
                <h4 className="arch-inspector__title">{selectedNode.label}</h4>
              </div>
              <button
                type="button"
                className="arch-inspector__close"
                onClick={() => setSelectedNode(null)}
              >
                &times;
              </button>
            </div>
            <p className="arch-inspector__desc">{selectedNode.details}</p>
            {selectedNode.specs && (
              <div className="arch-inspector__specs">
                {selectedNode.specs.map((spec, idx) => (
                  <span key={idx} className="arch-inspector__spec-item">
                    • {spec}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="arch-inspector arch-inspector--placeholder">
            <p>Select any infrastructure component above to view its security posture, high-availability configuration, and specifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
