# Service Status Indicator (SSI) - Simplified Script-Driven Monitoring System

## Overview

Service Status Indicator (SSI) is a monitoring system designed to make service health reporting straightforward, transparent, and automation-friendly, without requiring complex monitoring stacks or tightly coupled agents.

SSI stands for **Service Status Indicator**, with the subtitle **Simplified Script-Driven Monitoring System**. This subtitle is intentional and descriptive, not decorative. It communicates the three foundational ideas behind the system: simplicity, scripts as the core abstraction, and a complete monitoring pipeline.

**Simplified** reflects the primary design goal of SSI. The system is intentionally minimal in its conceptual model and operational requirements. Users are not expected to configure large monitoring frameworks, define extensive metrics schemas, or manage specialized domain-specific languages. Instead, SSI reduces monitoring to a small number of well-understood building blocks that can be reasoned about easily, even by non-specialists. The complexity of data collection, transport, persistence, and presentation is handled by the system, not by the user.

**Script-Driven** describes the core operational principle of SSI. Monitoring logic is implemented through scripts, referred to as _service scripts_. These are typically Bash scripts, though the system is not conceptually limited to Bash. A service script encapsulates all business and monitoring logic relevant to a service: how health is determined, what constitutes success or failure, and which outputs represent the service’s current state. SSI does not attempt to interpret or abstract this logic further; instead, it executes the script and treats its result as authoritative. This approach allows users to reuse existing scripts, tooling, and operational knowledge without translation or reimplementation.

**Monitoring System** describes the complete end-to-end flow that SSI provides. Service scripts are executed on a Linux machine running the **ssi-agent**, which is responsible for invoking scripts, capturing their results, and transmitting structured status data to the backend. The backend persists, processes, and exposes this data through well-defined APIs. Client applications then present the information in a user-friendly and accessible way. The system as a whole forms a cohesive monitoring pipeline, abstracting away infrastructure and communication concerns while preserving full control over monitoring logic at the script level.

In practice, using SSI can be as simple as selecting an existing service script or writing a new one that reflects the desired health criteria. Once the script exists, SSI handles execution, status propagation, and visualization. This makes SSI suitable for environments where transparency, flexibility, and operational simplicity are valued more than heavy abstraction or vendor-specific tooling.
