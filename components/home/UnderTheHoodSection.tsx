import { readFileSync } from "fs";
import { join } from "path";
import { UnderTheHoodClient } from "./UnderTheHoodClient";

// Read files at BUILD TIME - cached by Next.js SSG
function getCodeExample(filename: string): string {
  return readFileSync(
    join(process.cwd(), "code-examples", filename),
    "utf-8"
  );
}

const connections = [
  {
    id: "script-to-log",
    title: "Service Script → Log File",
    description: "BASH script outputs CSV-formatted status to log file via systemd",
    connectionLabel: "echo → log",
    source: {
      filename: "system-updates.bash",
      language: "bash",
      code: getCodeExample("01-service-script.txt"),
      iconName: "FileText",
      iconColor: "text-green-500",
      label: "Service Script",
    },
    destination: {
      filename: "system-updates.log",
      language: "log",
      code: getCodeExample("01-log-output.txt"),
      iconName: "FileText",
      iconColor: "text-blue-500",
      label: "Log Output",
    },
  },
  {
    id: "agent-to-backend",
    title: "Agent → Backend",
    description: "Log file changes trigger WebSocket events to the backend",
    connectionLabel: "WebSocket",
    source: {
      filename: "monitor.py",
      language: "python",
      code: getCodeExample("02-agent-monitor.txt"),
      iconName: "Terminal",
      iconColor: "text-green-500",
      label: "Agent Monitor",
    },
    destination: {
      filename: "agent_consumer.py",
      language: "python",
      code: getCodeExample("02-backend-consumer.txt"),
      iconName: "Server",
      iconColor: "text-blue-500",
      label: "Backend Consumer",
    },
  },
  {
    id: "backend-internal",
    title: "Backend Internal",
    description: "Django signals broadcast updates to connected clients via channel layer",
    connectionLabel: "Django Signals",
    source: {
      filename: "receivers.py",
      language: "python",
      code: getCodeExample("03-signal-receiver.txt"),
      iconName: "Radio",
      iconColor: "text-purple-500",
      label: "Signal Receiver",
    },
    destination: {
      filename: "client_consumer.py",
      language: "python",
      code: getCodeExample("03-client-consumer.txt"),
      iconName: "Server",
      iconColor: "text-blue-500",
      label: "Client Consumer",
    },
  },
  {
    id: "frontend-update",
    title: "Frontend Update",
    description: "React Native receives SSE events and updates the UI in real-time",
    connectionLabel: "React Native",
    source: {
      filename: "AgentsContext.tsx",
      language: "typescript",
      code: getCodeExample("04-agents-context.txt"),
      iconName: "Radio",
      iconColor: "text-cyan-500",
      label: "Agents Context",
    },
    destination: {
      filename: "index.tsx",
      language: "typescript",
      code: getCodeExample("04-overview-screen.txt"),
      iconName: "Smartphone",
      iconColor: "text-pink-500",
      label: "Overview Screen",
    },
  },
];

export function UnderTheHoodSection() {
  return <UnderTheHoodClient connections={connections} />;
}
