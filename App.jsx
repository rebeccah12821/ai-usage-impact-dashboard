import React, { useState } from "react";
import "./App.css";

const AI_MODELS = [
  { name: "ChatGPT", co2PerQuery: 2, gpuSecPerQuery: 0.36, costPerQuery: 0.00007 },
  { name: "Perplexity", co2PerQuery: 2, gpuSecPerQuery: 0.36, costPerQuery: 0.00007 },
  { name: "Gemini", co2PerQuery: 2, gpuSecPerQuery: 0.36, costPerQuery: 0.00007 },
];

// CO2 context: how far you could travel for the same emissions
const co2Context = (co2_grams) => {
  const car_per_mile = 404;
  const bus_per_mile = 150;
  const plane_per_mile = 254;

  return {
    car_miles: co2_grams / car_per_mile,
    bus_miles: co2_grams / bus_per_mile,
    plane_miles: co2_grams / plane_per_mile
  };
};

export default function App() {
  const [model, setModel] = useState(AI_MODELS[0]);
  const [queries, setQueries] = useState(10);

  const computeUsed = queries * model.gpuSecPerQuery;
  const gpuHours = computeUsed / 3600;
  const co2 = queries * model.co2PerQuery;
  const cost = queries * model.costPerQuery;
  const comparison = co2Context(co2);

  // New legal considerations for individuals
  const legalConsiderations = [
    "Check terms of service for AI tool usage rights",
    "Avoid inputting sensitive personal information",
    "Verify ownership of AI-generated content",
    "Disclose AI use in academic/work submissions"
  ];

  return (
    <div className="dashboard">
      <h1>AI Usage Impact Dashboard</h1>
      <div className="input-section">
        <label>
          AI Model:
          <select
            value={model.name}
            onChange={e => setModel(AI_MODELS.find(m => m.name === e.target.value))}
          >
            {AI_MODELS.map(m => (
              <option key={m.name} value={m.name}>{m.name}</option>
            ))}
          </select>
        </label>
        <label>
          Questions Asked:
          <input
            type="number"
            min={1}
            value={queries}
            onChange={e => setQueries(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="output-section">
        <h2>Impact Summary</h2>
        <ul>
          <li>
            <strong>Compute Used:</strong> {computeUsed.toFixed(2)} GPU seconds ({gpuHours.toExponential(2)} GPU hours)
          </li>
          <li>
            <strong>CO₂ Emitted:</strong> {co2.toFixed(1)} grams
            <div className="comparison">
              (Equivalent to driving {comparison.car_miles.toFixed(2)} miles, 
              bus {comparison.bus_miles.toFixed(2)} miles, 
              or flying {comparison.plane_miles.toFixed(2)} miles)
            </div>
          </li>
          <li>
            <strong>Estimated Cost:</strong> ${cost.toFixed(4)}
          </li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>Legal Considerations</h2>
        <ul>
          {legalConsiderations.map((item, index) => (
            <li key={index}>⚠️ {item}</li>
          ))}
        </ul>
      </div>

      <div className="info-section">
        <details>
          <summary>How are these numbers calculated?</summary>
          <ul>
            <li>Each AI query uses about 0.36 GPU seconds and emits about 2 grams CO₂e</li>
            <li>Cloud GPU cost is about $2.50 per GPU hour</li>
            <li>Vehicle emissions based on EPA averages</li>
          </ul>
        </details>
      </div>

      <footer>
        <small>
          Data sources: Nature (2024), Google Cloud, EPA emissions data
        </small>
      </footer>
    </div>
  );
}
