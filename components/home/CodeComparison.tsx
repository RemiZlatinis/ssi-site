"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { Check, Copy, Terminal, Server } from "lucide-react";

const examples = [
  {
    id: "agent-register",
    title: "Agent Registration",
    agent: {
      filename: "register_agent.sh",
      language: "bash",
      code: `#!/bin/bash
# SSI Agent Registration Script
# This runs on your Linux server

TOKEN="YOUR_REGISTRATION_TOKEN"
BACKEND_URL="wss://api.ssi.io/ws"

echo "Initializing SSI Agent..."
echo "Connecting to: $BACKEND_URL"

# Register with backend
curl -X POST \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "hostname": "'$(hostname)'",
    "os": "'$(uname -s)'",
    "version": "1.0.0"
  }' \\
  https://api.ssi.io/api/v1/agents/register

echo "Agent registered successfully!"`,
    },
    backend: {
      filename: "views.py",
      language: "python",
      code: `# SSI Backend - Agent Registration Handler
# Django Channels WebSocket Consumer

from channels.generic.websocket import AsyncWebsocketConsumer
import json

class AgentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.token = self.scope['url_route']['kwargs']['token']
        
        # Validate registration token
        if await self.validate_token(self.token):
            await self.accept()
            await self.register_agent()
            print(f"Agent connected: {self.token}")
        else:
            await self.close()
    
    async def validate_token(self, token):
        # Check token against database
        from .models import AgentToken
        return await AgentToken.objects.filter(
            token=token, 
            is_active=True
        ).aexists()
    
    async def register_agent(self):
        await self.send(json.dumps({
            'type': 'connection_established',
            'status': 'registered',
            'timestamp': timezone.now().isoformat()
        }))`,
    },
  },
  {
    id: "service-monitor",
    title: "Service Monitoring",
    agent: {
      filename: "monitor.py",
      language: "python",
      code: `#!/usr/bin/env python3
# SSI Agent - Service Monitor Module

import subprocess
import asyncio
import psutil

class ServiceMonitor:
    def __init__(self, websocket):
        self.ws = websocket
        self.services = ['nginx', 'postgresql', 'redis']
    
    async def check_services(self):
        for service in self.services:
            status = self.get_service_status(service)
            await self.send_status_update(service, status)
    
    def get_service_status(self, service_name):
        try:
            result = subprocess.run(
                ['systemctl', 'is-active', service_name],
                capture_output=True,
                text=True
            )
            return {
                'name': service_name,
                'status': 'running' if result.returncode == 0 else 'stopped',
                'uptime': self.get_uptime(service_name),
                'memory': self.get_memory_usage(service_name)
            }
        except Exception as e:
            return {'name': service_name, 'error': str(e)}
    
    async def send_status_update(self, service, status):
        await self.ws.send({
            'type': 'service_status',
            'data': status,
            'timestamp': datetime.now().isoformat()
        })`,
    },
    backend: {
      filename: "consumers.py",
      language: "python",
      code: `# SSI Backend - Real-time Status Consumer

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class StatusConsumer(AsyncWebsocketConsumer):
    async def receive(self, text_data):
        data = json.loads(text_data)
        
        if data['type'] == 'service_status':
            # Save to database
            await self.save_status(data['data'])
            
            # Broadcast to connected clients
            channel_layer = get_channel_layer()
            await channel_layer.group_send(
                f"agent_{self.agent_id}",
                {
                    "type": "status_update",
                    "message": data['data']
                }
            )
    
    async def status_update(self, event):
        # Send to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'status_update',
            'data': event['message']
        }))
    
    @database_sync_to_async
    def save_status(self, status_data):
        ServiceStatus.objects.create(
            agent=self.agent,
            service_name=status_data['name'],
            status=status_data['status'],
            metadata=status_data
        )`,
    },
  },
  {
    id: "logs-stream",
    title: "Real-time Logs",
    agent: {
      filename: "log_streamer.py",
      language: "python",
      code: `#!/usr/bin/env python3
# SSI Agent - Log Streaming

import asyncio
import aiofiles

class LogStreamer:
    def __init__(self, websocket):
        self.ws = websocket
        self.log_files = [
            '/var/log/syslog',
            '/var/log/nginx/access.log',
            '/var/log/postgresql/postgresql.log'
        ]
    
    async def stream_logs(self):
        tasks = [
            self.tail_file(log_file) 
            for log_file in self.log_files
        ]
        await asyncio.gather(*tasks)
    
    async def tail_file(self, filepath):
        async with aiofiles.open(filepath, 'r') as f:
            # Seek to end
            await f.seek(0, 2)
            
            while True:
                line = await f.readline()
                if line:
                    await self.ws.send({
                        'type': 'log_entry',
                        'source': filepath,
                        'content': line.strip(),
                        'timestamp': time.time()
                    })
                else:
                    await asyncio.sleep(0.1)`,
    },
    backend: {
      filename: "routing.py",
      language: "python",
      code: `# SSI Backend - WebSocket Routing & Broadcasting

from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(
        r'ws/agent/(?P<token>\w+)/$', 
        consumers.AgentConsumer.as_asgi()
    ),
    re_path(
        r'ws/client/(?P<user_id>\w+)/$', 
        consumers.ClientConsumer.as_asgi()
    ),
]

# Redis Channel Layer Configuration
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('redis', 6379)],
        },
    },
}

# Broadcasting to mobile clients
async def broadcast_to_clients(agent_id, message):
    channel_layer = get_channel_layer()
    await channel_layer.group_send(
        f"user_{agent_id}_notifications",
        {
            "type": "push_notification",
            "title": "Service Alert",
            "body": message,
            "data": {"agent_id": agent_id}
        }
    )`,
    },
  },
];

export function CodeComparison() {
  const [activeExample, setActiveExample] = useState(examples[0]);
  const [copiedSide, setCopiedSide] = useState<"agent" | "backend" | null>(null);

  const handleCopy = async (side: "agent" | "backend", code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedSide(side);
    setTimeout(() => setCopiedSide(null), 2000);
  };

  return (
    <div className="w-full">
      {/* Example Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => setActiveExample(example)}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeExample.id === example.id
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            )}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Code Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence mode="wait">
          {/* Agent Side */}
          <motion.div
            key={`agent-${activeExample.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  SSI Agent
                </span>
                <span className="text-xs text-zinc-500">({activeExample.agent.filename})</span>
              </div>
              <button
                onClick={() => handleCopy("agent", activeExample.agent.code)}
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
              >
                {copiedSide === "agent" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Code */}
            <div className="p-4 overflow-x-auto">
              <pre className="text-xs leading-5 text-zinc-800 dark:text-zinc-200 font-mono">
                <code>{activeExample.agent.code}</code>
              </pre>
            </div>
          </motion.div>

          {/* Backend Side */}
          <motion.div
            key={`backend-${activeExample.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  SSI Backend
                </span>
                <span className="text-xs text-zinc-500">({activeExample.backend.filename})</span>
              </div>
              <button
                onClick={() => handleCopy("backend", activeExample.backend.code)}
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
              >
                {copiedSide === "backend" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Code */}
            <div className="p-4 overflow-x-auto">
              <pre className="text-xs leading-5 text-zinc-800 dark:text-zinc-200 font-mono">
                <code>{activeExample.backend.code}</code>
              </pre>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Connection Arrow (Desktop only) */}
      <div className="hidden lg:flex justify-center -my-2 relative z-10">
        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-200 dark:bg-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300">
          <span>WebSocket Connection</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </div>
    </div>
  );
}
