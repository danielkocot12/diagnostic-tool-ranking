export const diagnosticData = {
  categories: [
    {
      name: "Interconnect Diagnostics",
      checks: [
        {
          name: "High-Speed Interconnect Bandwidth Monitoring",
          description: "Ensures efficient data transfer between GPUs or devices, critical for multi-GPU workloads.",
          tools: ["GCM Diagnostics", "AMD Instinct MI300X Accerlerator", "HWINFO", "Cisco ACI", "OpenDCDiag", "NVIDIA Nsight", "AMD ROCm", "AIDA64 Extreme"]
        },
        {
          name: "Interconnect Error Rate Analysis",
          description: "Identifies communication issues that could degrade performance or cause system instability.",
          tools: ["NVIDIA DGCM Diagnostics", "NVIDIA Nsight", "AMD ROCm", "OpenDCDiag", "Intel DCDiag", "Cisco ACI", "HWINFO"]
        },
        {
          name: "Signal Attenuation Measurement",
          description: "Detects signal degradation, which can impact interconnect reliability and speed.",
          tools: ["NVIDIA DGCM Diagnostics", "AMD ROCm", "OpenDCDiag", "HWINFO", "Cisco AI"]
        },
        {
          name: "Bandwidth Consistency Validation",
          description: "Verifies consistent interconnect performance, preventing bottlenecks.",
          tools: ["NVIDIA DGCM Diagnostics", "NVIDIA Nsight", "AMD ROCm", "OpenDCDiag", "HWINFO", "AIDA64 Extreme"]
        },
        {
          name: "Latency Analysis",
          description: "Measures time required for data to travel across interconnects between GPUs and other components",
          tools: ["NVIDIA DGCM Diagnostics", "NVIDIA Nsight", "NVPerf", "AMD ROCm Profiler", "NVLink"]
        }
      ]
    },
    {
      name: "Power and Thermal",
      checks: [
        {
          name: "Power Rail Voltage Stability Check",
          description: "Ensures stable power delivery to prevent crashes or thermal issues.",
          tools: ["HWINFO", "HWMonitor", "MSI Afterburner", "GPU Tweak III"]
        },
        {
          name: "GPU Core and Memory Thermal Monitoring",
          description: "Tracks temperatures to avoid overheating, which can reduce GPU lifespan.",
          tools: ["SpeedFan", "HWMonitor", "Open Hardware Monitor", "HWINFO"]
        },
        {
          name: "Thermal Throttling Detection",
          description: "Identifies performance reductions due to high temperatures, ensuring optimal operation.",
          tools: ["Open Hardware Monitor", "HWINFO", "MSI Afterburner", "Core Temp", "Intel XTU"]
        },
        {
          name: "GPU Power Consumption Logging",
          description: "Monitors energy usage for efficiency and system design improvements.",
          tools: ["HWINFO", "GPU-Z", "MSI Afterburner", "Radeon Software", "GeForce Experience", "HWMonitor"]
        },
        {
          name: "Cooling System Efficiency Check",
          description: "Validates the effectiveness of cooling mechanisms to maintain safe operating temperatures.",
          tools: ["NZXT CAM", "MSI Afterburner", "HWMonitor", "SpeedFan", "Fan Control", "Argus Monitor"]
        }
      ]
    },
    {
      name: "Memory Diagnostics",
      checks: [
        {
          name: "VRAM Error Detection (ECC and Non-ECC)",
          description: "Detects memory faults that could lead to data corruption or computation errors.",
          tools: ["NVIDIA DGCM Diagnostics", "NVIDIA Nsight", "AMD ROCm", "HWINFO", "AIDA64 Extreme", "OpenDCDiag"]
        },
        {
          name: "Memory Stress Testing for Integrity",
          description: "Ensures memory stability under high load conditions, preventing data loss or crashes.",
          tools: ["HWINFO", "AIDA64 Extreme", "NVIDIA Nsight", "MemtestG80", "MemtestCL", "OCCT", "FurMark", "TestMem5", "GPU-Z"]
        },
        {
          name: "Memory Bandwidth",
          description: "Measure the speed and efficiency of data transfer between GPU core and memory.",
          tools: ["AIDA64 Extreme", "CUDA Toolkit", "CLBenchmark", "OpenCL Bandwidth Tests", "SiSoftware Sandra"]
        },
        {
          name: "Memory Read/Write Errors",
          description: "Measure the accuracy, consistency, and reliability of read/write operations to the memory.",
          tools: ["NVIDIA Nsight", "MemtestCL"]
        },
        {
          name: "Memory Bank Conflicts",
          description: "Diagnose memory bank issues that lead to inefficient memory utilization or delays.",
          tools: ["NVIDIA MODS", "MemtestG80", "MemtestCL", "OCCT"]
        }
      ]
    },
    {
      name: "System-Level Checks",
      checks: [
        {
          name: "PCIe Signal Jitter Analysis",
          description: "Measures signal integrity to prevent communication errors across the PCIe bus.",
          tools: ["Specialized Hardware Tools"]
        },
        {
          name: "PCIe Lane Utilization Monitoring",
          description: "Tracks usage to identify underperforming or overloaded lanes.",
          tools: ["NVIDIA SMI", "AMD Radeon Software", "Intel VTune", "Windows Performance Monitor", "AIDA64 Extreme", "HWINFO"]
        },
        {
          name: "PCIe Slot Continuity Check",
          description: "Ensures electrical contacts are intact for reliable GPU communication.",
          tools: ["Passmark"]
        },
        {
          name: "Firmware and Driver Compatibility Testing",
          description: "Validates software and hardware compatibility for stable operation.",
          tools: ["NVIDIA SMI", "AMD Radeon Software", "Intel VTune", "System Tools"]
        },
        {
          name: "Clock and Timing Diagnostics",
          description: "Ensure that internal GPU clocks (core, memory) are synchronized and stable.",
          tools: ["NVIDIA SMI", "AMD Radeon Software", "Intel Graphics Monitor", "MSI Afterburner"]
        }
      ]
    },
    {
      name: "Compute Performance",
      checks: [
        {
          name: "GPU Compute Core Utilization Analysis",
          description: "Analyzes compute performance to ensure GPU resources are effectively utilized.",
          tools: ["NVIDIA SMI", "NVIDIA Nsight Compute", "NVIDIA Nsight Systems", "AMD ROCm", "AMD Radeon Software", "GPU-Z", "HWINFO", "TensorFlow Profiler", "PyTorch Profiler", "OpenCL Profilers"]
        },
        {
          name: "Cross-Platform Workload Benchmarking",
          description: "Provides performance metrics across systems for comparative analysis.",
          tools: ["Geekbench", "GFXBench", "3DMark", "Passmark", "Basemark GPU", "SPECviewperf", "Blender Benchmark", "Unigine Superposition", "LuxMark", "Phoronix Test Suite"]
        },
        {
          name: "Throughput (TOPS)",
          description: "reflects the rate at which operations are exected per second in the GPU",
          tools: ["NVIDIA Visual Profiler", "OmniTrace", "GPU-Z", "3DMark", "NVIDIA SMI", "Bandwidth Check", "NVIDIA Nsight Systems"]
        },
        {
          name: "Overclocking",
          description: "the ability to increase clock speed and memory beyond the manufacturer's recommended setting, which allows more instructions to be process per minute",
          tools: ["MSI Afterburner", "EVGA Precision X1", "GPU-Z", "HWINFO", "AMD Radeon Software"]
        },
        {
          name: "Thread Performance",
          description: "hundreds to thousands number of threads that allow for simulutaneous execution of many operations, making GPUs highly effective for tasks that can be broken down into parallel processes",
          tools: ["Dynatrace", "New Relic", "AppDynamics", "Sematext", "Datadog", "JProfiler", "Eclipse MAT"]
        }
      ]
    },
    {
      name: "General Diagnostic Tools",
      checks: [
        {
          name: "Stress Testing for Stability",
          description: "Simulates high-load scenarios to verify GPU reliability and performance.",
          tools: ["FurMark", "Unigine Heaven", "Unigine Superposition", "3DMark", "OCCT", "MSI Kombustor", "Blender Benchmark", "Prime95", "CUDA-Z", "GPGPU-Sim"]
        },
        {
          name: "Predictive Failure Analysis Using Logs",
          description: "Uses historical data to forecast potential issues, reducing downtime.",
          tools: ["NVIDIA Nsight Systems", "AMD ROCm Profiler", "Prometheus", "Grafana", "Splunk", "ELK Stack", "SMART Monitor", "HWINFO", "OpenTelemetry", "AIDA64"]
        },
        {
          name: "Driver and Firmware Integrity Test",
          description: "Verifies the correctness and stability of GPU drivers and firmware versions, identifying incompatibilities or corruption.",
          tools: ["NVIDIA Driver Checker", "AMD Driver Auto-Detect", "Firmware Update Utilities"]
        },
        {
          name: "Memory Integrity Check",
          description: "Tests GPU memory (VRAM) for errors, corruption, or failing modules using repeated read/write operations.",
          tools: ["MemtestG80", "MemtestCL", "AIDA64", "OCCT"]
        },
        {
          name: "Thermal Performance Monitoring",
          description: "Measures GPU temperature under various workloads to evaluate cooling efficiency and detect potential overheating issues.",
          tools: ["GPU-Z", "HWINFO", "NVIDIA SMI", "AMD Radeon Software"]
        }
      ]
    }
  ]
};